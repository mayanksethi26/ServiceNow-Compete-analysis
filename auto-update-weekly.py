#!/usr/bin/env python3
"""
Automated Weekly Documentation Checker
Checks documentation URLs for changes and updates the dashboard
"""

import json
import hashlib
import requests
from datetime import datetime
import sys
import os

# Documentation URLs to monitor
DOCS_TO_MONITOR = {
    'glean': [
        'https://docs.glean.com/connectors/native/servicenow/home',
        'https://docs.glean.com/connectors/native/servicenow/about',
        'https://docs.glean.com/connectors/native/servicenow/setup',
        'https://docs.glean.com/connectors/native/servicenow/setup-advanced',
        'https://docs.glean.com/connectors/native/servicenow/servicenow-custom-role',
        'https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-1',
        'https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-2',
        'https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-3',
        'https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-4',
        'https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-5',
        'https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-6',
        'https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-7',
        'https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-8',
        'https://docs.glean.com/troubleshooting/error-codes/servicenow/servicenow-9',
        'https://www.glean.com/agents/servicenow'
    ],
    'google': [
        'https://docs.cloud.google.com/integration-connectors/docs/connectors/servicenow/configure',
        'https://docs.cloud.google.com/gemini/enterprise/docs/servicenow',
        'https://docs.cloud.google.com/gemini/enterprise/docs/servicenow/set-up-data-store',
        'https://docs.cloud.google.com/gemini/enterprise/docs/servicenow/third-party-config'
    ],
    'microsoft': [
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-knowledge-overview',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-knowledge-admin-setup',
        'https://learn.microsoft.com/en-us/microsoftsearch/granting-table-access-servicenow',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-knowledge-deployment',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-knowledge-troubleshooting',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-catalog-overview',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-catalog-admin-setup',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-catalog-deployment',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-catalog-troubleshooting',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-tickets-overview',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-tickets-admin-setup',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-tickets-deployment',
        'https://learn.microsoft.com/en-us/microsoftsearch/servicenow-tickets-troubleshooting'
    ]
}

# Keywords that indicate significant changes
SIGNIFICANT_KEYWORDS = [
    'new feature', 'now supports', 'added support', 'enhancement',
    'improved', 'updated', 'released', 'available', 'beta',
    'real-time', 'AI', 'automation', 'permission', 'sync'
]

def fetch_url_content(url):
    """Fetch content from URL and return hash + last-modified"""
    try:
        response = requests.get(url, timeout=10, headers={
            'User-Agent': 'ServiceNow-Comparison-Bot/1.0'
        })
        response.raise_for_status()

        content = response.text
        content_hash = hashlib.md5(content.encode()).hexdigest()
        last_modified = response.headers.get('last-modified', 'unknown')

        return {
            'status': 'success',
            'hash': content_hash,
            'last_modified': last_modified,
            'size': len(content)
        }
    except Exception as e:
        return {
            'status': 'error',
            'error': str(e)
        }

def load_previous_state():
    """Load previous documentation state"""
    try:
        with open('weekly-update-log.json', 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        return {
            'lastCheck': None,
            'documentationState': {},
            'updates': []
        }

def save_update_log(log_data):
    """Save update log"""
    with open('weekly-update-log.json', 'w') as f:
        json.dump(log_data, f, indent=2)

def calculate_scores(comparison_data):
    """Calculate current scores from comparison data"""
    scores = {
        'glean': {'overall': 0, 'byCategory': {}},
        'google': {'overall': 0, 'byCategory': {}},
        'microsoft': {'overall': 0, 'byCategory': {}}
    }

    total_weight = 0

    for category_key, category in comparison_data['categories'].items():
        category_weight = category['weight']
        total_weight += category_weight

        glean_score = sum(f['glean']['score'] for f in category['features'].values())
        google_score = sum(f['google']['score'] for f in category['features'].values())
        microsoft_score = sum(f['microsoft']['score'] for f in category['features'].values())
        max_score = len(category['features']) * 10

        scores['glean']['byCategory'][category_key] = (glean_score / max_score) * category_weight
        scores['google']['byCategory'][category_key] = (google_score / max_score) * category_weight
        scores['microsoft']['byCategory'][category_key] = (microsoft_score / max_score) * category_weight

        scores['glean']['overall'] += scores['glean']['byCategory'][category_key]
        scores['google']['overall'] += scores['google']['byCategory'][category_key]
        scores['microsoft']['overall'] += scores['microsoft']['byCategory'][category_key]

    scores['glean']['overall'] = (scores['glean']['overall'] / total_weight) * 100
    scores['google']['overall'] = (scores['google']['overall'] / total_weight) * 100
    scores['microsoft']['overall'] = (scores['microsoft']['overall'] / total_weight) * 100

    return scores

def main():
    print("=" * 60)
    print("Weekly Automated Documentation Check")
    print("=" * 60)
    print()

    today = datetime.now().strftime('%Y-%m-%d')

    # Load previous state
    update_log = load_previous_state()
    previous_state = update_log.get('documentationState', {})

    # Check all documentation URLs
    print("Checking documentation URLs...")
    current_state = {}
    changes_detected = []

    for platform, urls in DOCS_TO_MONITOR.items():
        print(f"\n[{platform.upper()}]")
        current_state[platform] = {}

        for url in urls:
            print(f"  Checking: {url}")
            result = fetch_url_content(url)
            current_state[platform][url] = result

            if result['status'] == 'success':
                # Compare with previous state
                prev_hash = previous_state.get(platform, {}).get(url, {}).get('hash')

                if prev_hash and prev_hash != result['hash']:
                    changes_detected.append({
                        'platform': platform,
                        'url': url,
                        'description': f'Content changed (hash: {result["hash"][:8]}...)'
                    })
                    print(f"    > CHANGE DETECTED!")
                elif not prev_hash:
                    print(f"    > First check (baseline)")
                else:
                    print(f"    > No changes")
            else:
                print(f"    > ERROR: {result['error']}")

    # Load comparison data
    with open('comparison-data.json', 'r') as f:
        comparison_data = json.load(f)

    # Calculate current scores
    current_scores = calculate_scores(comparison_data)

    # Update comparison data lastUpdated
    comparison_data['lastUpdated'] = today

    # Determine if we should update
    should_update = len(changes_detected) > 0

    if should_update:
        print(f"\n{'=' * 60}")
        print(f"CHANGES DETECTED: {len(changes_detected)} documentation change(s)")
        print(f"{'=' * 60}")

        for change in changes_detected:
            print(f"  - {change['platform']}: {change['description']}")

        # Save updated comparison data
        with open('comparison-data.json', 'w') as f:
            json.dump(comparison_data, f, indent=2)

        # Update historical log
        with open('historical-log.json', 'r') as f:
            historical_data = json.load(f)

        # Add weekly snapshot
        new_snapshot = {
            'date': today,
            'version': comparison_data['version'],
            'summary': f'Automated weekly update - {len(changes_detected)} change(s) detected',
            'scores': current_scores,
            'keyGaps': historical_data['snapshots'][-1]['keyGaps']
        }
        historical_data['snapshots'].append(new_snapshot)

        # Add to changelog
        historical_data['changeLog'].append({
            'date': today,
            'description': f'Weekly auto-check: {len(changes_detected)} documentation change(s) detected'
        })

        with open('historical-log.json', 'w') as f:
            json.dump(historical_data, f, indent=2)

        # Update weekly log
        update_log['lastCheck'] = today
        update_log['documentationState'] = current_state
        update_log['updates'].append({
            'date': today,
            'changes': changes_detected,
            'scores': {
                'glean': current_scores['glean']['overall'],
                'google': current_scores['google']['overall'],
                'microsoft': current_scores['microsoft']['overall']
            }
        })
        save_update_log(update_log)

        # Set GitHub Actions output
        if os.getenv('GITHUB_OUTPUT'):
            with open(os.getenv('GITHUB_OUTPUT'), 'a') as f:
                f.write(f'changes_detected=true\n')

        print(f"\nScores: Glean {current_scores['glean']['overall']:.1f}, "
              f"Google {current_scores['google']['overall']:.1f}, "
              f"Microsoft {current_scores['microsoft']['overall']:.1f}")
        print("\n[OK] Dashboard updated with weekly changes")

    else:
        print(f"\n{'=' * 60}")
        print("NO CHANGES DETECTED")
        print(f"{'=' * 60}")
        print("All documentation unchanged since last check")

        # Update last check date but don't change data
        update_log['lastCheck'] = today
        update_log['documentationState'] = current_state
        save_update_log(update_log)

        # Set GitHub Actions output
        if os.getenv('GITHUB_OUTPUT'):
            with open(os.getenv('GITHUB_OUTPUT'), 'a') as f:
                f.write(f'changes_detected=false\n')

        print("\n[OK] Weekly check complete - no action needed")

    print()
    print("Next automated check: Next Monday at 9 AM UTC")
    print(f"Dashboard: https://mayanksethi26.github.io/ServiceNow-Compete-analysis/")

if __name__ == '__main__':
    main()