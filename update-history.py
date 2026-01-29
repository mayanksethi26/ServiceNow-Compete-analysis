#!/usr/bin/env python3
"""Update Historical Log Script - Python Version"""

import json
from datetime import datetime
import subprocess
import sys

def calculate_scores(comparison_data):
    """Calculate scores from comparison data"""
    scores = {
        'glean': {'overall': 0, 'byCategory': {}},
        'google': {'overall': 0, 'byCategory': {}},
        'microsoft': {'overall': 0, 'byCategory': {}}
    }

    total_weight = 0

    for category_key, category in comparison_data['categories'].items():
        category_weight = category['weight']
        total_weight += category_weight

        glean_score = 0
        google_score = 0
        microsoft_score = 0
        max_score = 0

        for feature_key, feature in category['features'].items():
            glean_score += feature['glean']['score']
            google_score += feature['google']['score']
            microsoft_score += feature['microsoft']['score']
            max_score += 10

        glean_percent = (glean_score / max_score) * category_weight
        google_percent = (google_score / max_score) * category_weight
        microsoft_percent = (microsoft_score / max_score) * category_weight

        scores['glean']['byCategory'][category_key] = glean_percent
        scores['google']['byCategory'][category_key] = google_percent
        scores['microsoft']['byCategory'][category_key] = microsoft_percent

        scores['glean']['overall'] += glean_percent
        scores['google']['overall'] += google_percent
        scores['microsoft']['overall'] += microsoft_percent

    scores['glean']['overall'] = (scores['glean']['overall'] / total_weight) * 100
    scores['google']['overall'] = (scores['google']['overall'] / total_weight) * 100
    scores['microsoft']['overall'] = (scores['microsoft']['overall'] / total_weight) * 100

    return scores

def main():
    print("=" * 50)
    print("Update Historical Dashboard Data")
    print("=" * 50)
    print()

    # Load data files
    try:
        with open('comparison-data.json', 'r') as f:
            comparison_data = json.load(f)
        with open('historical-log.json', 'r') as f:
            historical_data = json.load(f)
    except FileNotFoundError as e:
        print(f"ERROR: Could not find {e.filename}")
        print("Make sure you're running this from the dashboard directory.")
        sys.exit(1)

    # Get today's date
    today = datetime.now().strftime('%Y-%m-%d')
    latest_snapshot = historical_data['snapshots'][-1]

    # Check if already updated today
    if latest_snapshot['date'] == today:
        print(f"[OK] Historical data already up to date for {today}")
        sys.exit(0)

    print(f"Updating historical data from {latest_snapshot['date']} to {today}...")

    # Calculate current scores
    current_scores = calculate_scores(comparison_data)

    # Calculate changes
    glean_change = current_scores['glean']['overall'] - latest_snapshot['scores']['glean']['overall']
    google_change = current_scores['google']['overall'] - latest_snapshot['scores']['google']['overall']
    microsoft_change = current_scores['microsoft']['overall'] - latest_snapshot['scores']['microsoft']['overall']

    # Create new snapshot
    new_snapshot = {
        'date': today,
        'version': comparison_data['version'],
        'summary': f'Automated daily update - {today}',
        'scores': current_scores,
        'keyGaps': latest_snapshot['keyGaps']
    }

    historical_data['snapshots'].append(new_snapshot)

    # Add change log entries if scores changed significantly
    if abs(glean_change) > 0.5 or abs(google_change) > 0.5 or abs(microsoft_change) > 0.5:
        changes = []
        if abs(glean_change) > 0.5:
            changes.append(f"Glean: {'+' if glean_change > 0 else ''}{glean_change:.1f}")
        if abs(google_change) > 0.5:
            changes.append(f"Google: {'+' if google_change > 0 else ''}{google_change:.1f}")
        if abs(microsoft_change) > 0.5:
            changes.append(f"Microsoft: {'+' if microsoft_change > 0 else ''}{microsoft_change:.1f}")

        if changes:
            historical_data['changeLog'].append({
                'date': today,
                'description': f"Score changes detected: {', '.join(changes)}"
            })
            print(f"  > Score changes: {', '.join(changes)}")
    else:
        print(f"  > No significant score changes (< 0.5 points)")

    # Update lastUpdated in comparison data
    comparison_data['lastUpdated'] = today

    # Save updated files
    with open('historical-log.json', 'w') as f:
        json.dump(historical_data, f, indent=2)

    with open('comparison-data.json', 'w') as f:
        json.dump(comparison_data, f, indent=2)

    print()
    print("[OK] Historical data updated successfully!")
    print(f"  New snapshot: {today}")
    print(f"  Last updated date: {today}")
    print(f"  Scores: Glean {current_scores['glean']['overall']:.1f}, Google {current_scores['google']['overall']:.1f}, Microsoft {current_scores['microsoft']['overall']:.1f}")

    if glean_change != 0 or google_change != 0 or microsoft_change != 0:
        print(f"  Changes: Glean {'+' if glean_change > 0 else ''}{glean_change:.1f}, Google {'+' if google_change > 0 else ''}{google_change:.1f}, Microsoft {'+' if microsoft_change > 0 else ''}{microsoft_change:.1f}")

    print()
    print("Next steps:")
    print("  1. Review the updated files (historical-log.json, comparison-data.json)")
    print(f"  2. Commit: git add historical-log.json comparison-data.json && git commit -m 'Update historical data for {today}'")
    print("  3. Push: git push")

    # Ask if user wants to commit and push
    try:
        response = input("\nWould you like to commit and push changes now? (y/n): ")
        if response.lower() == 'y':
            print("\nCommitting changes...")
            subprocess.run(['git', 'add', 'historical-log.json', 'comparison-data.json'], check=True)
            subprocess.run(['git', 'commit', '-m', f'Update historical data for {today}'], check=True)

            print("\nPushing to GitHub...")
            subprocess.run(['git', 'push'], check=True)

            print()
            print("=" * 50)
            print("DONE! Dashboard will update in 1-2 minutes.")
            print("=" * 50)
    except KeyboardInterrupt:
        print("\nSkipping commit/push.")
    except subprocess.CalledProcessError as e:
        print(f"\nERROR during git operation: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()