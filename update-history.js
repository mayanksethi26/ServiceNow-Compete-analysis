// Update Historical Log Script
// Run this before launching the dashboard to update historical data

const fs = require('fs');
const path = require('path');

// Load data files
const comparisonData = JSON.parse(fs.readFileSync('comparison-data.json', 'utf8'));
const historicalData = JSON.parse(fs.readFileSync('historical-log.json', 'utf8'));

// Calculate scores (same logic as dashboard.js)
function calculateScores() {
    const scores = {
        glean: { overall: 0, byCategory: {} },
        google: { overall: 0, byCategory: {} },
        microsoft: { overall: 0, byCategory: {} }
    };

    let totalWeight = 0;

    for (const [categoryKey, category] of Object.entries(comparisonData.categories)) {
        const categoryWeight = category.weight;
        totalWeight += categoryWeight;

        let gleanCategoryScore = 0;
        let googleCategoryScore = 0;
        let microsoftCategoryScore = 0;
        let maxCategoryScore = 0;

        for (const [featureKey, feature] of Object.entries(category.features)) {
            gleanCategoryScore += feature.glean.score;
            googleCategoryScore += feature.google.score;
            microsoftCategoryScore += feature.microsoft.score;
            maxCategoryScore += 10;
        }

        const gleanPercent = (gleanCategoryScore / maxCategoryScore) * categoryWeight;
        const googlePercent = (googleCategoryScore / maxCategoryScore) * categoryWeight;
        const microsoftPercent = (microsoftCategoryScore / maxCategoryScore) * categoryWeight;

        scores.glean.byCategory[categoryKey] = gleanPercent;
        scores.google.byCategory[categoryKey] = googlePercent;
        scores.microsoft.byCategory[categoryKey] = microsoftPercent;

        scores.glean.overall += gleanPercent;
        scores.google.overall += googlePercent;
        scores.microsoft.overall += microsoftPercent;
    }

    scores.glean.overall = (scores.glean.overall / totalWeight) * 100;
    scores.google.overall = (scores.google.overall / totalWeight) * 100;
    scores.microsoft.overall = (scores.microsoft.overall / totalWeight) * 100;

    return scores;
}

// Get today's date
const today = new Date().toISOString().split('T')[0];
const latestSnapshot = historicalData.snapshots[historicalData.snapshots.length - 1];

// Check if we need to create a new snapshot
if (latestSnapshot.date === today) {
    console.log(`✓ Historical data already up to date for ${today}`);
    process.exit(0);
}

console.log(`Updating historical data from ${latestSnapshot.date} to ${today}...`);

// Calculate current scores
const currentScores = calculateScores();

// Calculate changes
const gleanChange = currentScores.glean.overall - latestSnapshot.scores.glean.overall;
const googleChange = currentScores.google.overall - latestSnapshot.scores.google.overall;
const microsoftChange = currentScores.microsoft.overall - latestSnapshot.scores.microsoft.overall;

// Create new snapshot
const newSnapshot = {
    date: today,
    version: comparisonData.version,
    summary: `Automated daily update - ${today}`,
    scores: currentScores,
    keyGaps: latestSnapshot.keyGaps
};

historicalData.snapshots.push(newSnapshot);

// Add change log entries if scores changed significantly
if (Math.abs(gleanChange) > 0.5 || Math.abs(googleChange) > 0.5 || Math.abs(microsoftChange) > 0.5) {
    const changes = [];
    if (Math.abs(gleanChange) > 0.5) {
        changes.push(`Glean: ${gleanChange > 0 ? '+' : ''}${gleanChange.toFixed(1)}`);
    }
    if (Math.abs(googleChange) > 0.5) {
        changes.push(`Google: ${googleChange > 0 ? '+' : ''}${googleChange.toFixed(1)}`);
    }
    if (Math.abs(microsoftChange) > 0.5) {
        changes.push(`Microsoft: ${microsoftChange > 0 ? '+' : ''}${microsoftChange.toFixed(1)}`);
    }

    if (changes.length > 0) {
        historicalData.changeLog.push({
            date: today,
            description: `Score changes detected: ${changes.join(', ')}`
        });
        console.log(`  → Score changes: ${changes.join(', ')}`);
    }
} else {
    console.log(`  → No significant score changes (< 0.5 points)`);
}

// Save updated historical data
fs.writeFileSync('historical-log.json', JSON.stringify(historicalData, null, 2));

console.log(`✓ Historical data updated successfully!`);
console.log(`  New snapshot: ${today}`);
console.log(`  Scores: Glean ${currentScores.glean.overall.toFixed(1)}, Google ${currentScores.google.overall.toFixed(1)}, Microsoft ${currentScores.microsoft.overall.toFixed(1)}`);

if (gleanChange !== 0 || googleChange !== 0 || microsoftChange !== 0) {
    console.log(`  Changes: Glean ${gleanChange > 0 ? '+' : ''}${gleanChange.toFixed(1)}, Google ${googleChange > 0 ? '+' : ''}${googleChange.toFixed(1)}, Microsoft ${microsoftChange > 0 ? '+' : ''}${microsoftChange.toFixed(1)}`);
}

console.log(`\nNext steps:`);
console.log(`  1. Review the updated historical-log.json`);
console.log(`  2. Commit: git add historical-log.json && git commit -m "Update historical data for ${today}"`);
console.log(`  3. Push: git push`);