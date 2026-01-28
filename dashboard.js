// Global data storage
let comparisonData = null;
let historicalData = null;
let currentFilter = 'all';

// Initialize dashboard
async function initDashboard() {
    try {
        // Load data
        await Promise.all([
            loadComparisonData(),
            loadHistoricalData()
        ]);

        // Calculate scores
        const scores = calculateScores();

        // Update metadata
        updateMetadata();

        // Render components
        renderSummaryCards(scores);
        renderCharts(scores);
        renderGapAnalysis();
        renderCategoryFilters();
        renderComparisonTable();
        renderHistoricalAnalysis();

        // Check for updates and log changes
        await checkForUpdates(scores);

    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
}

// Load comparison data
async function loadComparisonData() {
    try {
        const response = await fetch('comparison-data.json');
        comparisonData = await response.json();
    } catch (error) {
        console.error('Error loading comparison data:', error);
    }
}

// Load historical data
async function loadHistoricalData() {
    try {
        const response = await fetch('historical-log.json');
        historicalData = await response.json();
    } catch (error) {
        console.error('Error loading historical data:', error);
    }
}

// Calculate scores for each platform
function calculateScores() {
    const scores = {
        glean: { overall: 0, byCategory: {} },
        google: { overall: 0, byCategory: {} },
        microsoft: { overall: 0, byCategory: {} }
    };

    let totalWeight = 0;

    // Calculate category scores
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
            maxCategoryScore += 10; // Max score per feature
        }

        // Normalize to percentage
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

    // Normalize overall scores to 100
    scores.glean.overall = (scores.glean.overall / totalWeight) * 100;
    scores.google.overall = (scores.google.overall / totalWeight) * 100;
    scores.microsoft.overall = (scores.microsoft.overall / totalWeight) * 100;

    return scores;
}

// Update metadata display
function updateMetadata() {
    document.getElementById('lastUpdated').textContent =
        `Last Updated: ${comparisonData.lastUpdated}`;
    document.getElementById('versionBadge').textContent =
        `Version: ${comparisonData.version}`;
}

// Render summary cards
function renderSummaryCards(scores) {
    document.getElementById('gleanScore').textContent =
        scores.glean.overall.toFixed(1);
    document.getElementById('googleScore').textContent =
        scores.google.overall.toFixed(1);
    document.getElementById('microsoftScore').textContent =
        scores.microsoft.overall.toFixed(1);
}

// Render charts
function renderCharts(scores) {
    renderOverallChart(scores);
    renderRadarChart(scores);
}

// Render overall comparison bar chart
function renderOverallChart(scores) {
    const ctx = document.getElementById('overallChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Glean', 'Google Agentspace', 'Microsoft Copilot'],
            datasets: [{
                label: 'Overall Score',
                data: [
                    scores.glean.overall,
                    scores.google.overall,
                    scores.microsoft.overall
                ],
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(52, 168, 83, 0.8)',
                    'rgba(0, 120, 212, 0.8)'
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(52, 168, 83)',
                    'rgb(0, 120, 212)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(71, 85, 105, 0.3)'
                    },
                    ticks: {
                        color: '#cbd5e1'
                    }
                },
                x: {
                    grid: {
                        display: false
                    },
                    ticks: {
                        color: '#cbd5e1'
                    }
                }
            },
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Score: ${context.parsed.y.toFixed(1)}/100`;
                        }
                    }
                }
            }
        }
    });
}

// Render radar chart for category comparison
function renderRadarChart(scores) {
    const ctx = document.getElementById('radarChart').getContext('2d');

    const categories = Object.keys(comparisonData.categories);
    const categoryLabels = categories.map(key =>
        comparisonData.categories[key].name
    );

    const gleanData = categories.map(key => {
        const weight = comparisonData.categories[key].weight;
        return (scores.glean.byCategory[key] / weight) * 100;
    });

    const googleData = categories.map(key => {
        const weight = comparisonData.categories[key].weight;
        return (scores.google.byCategory[key] / weight) * 100;
    });

    const microsoftData = categories.map(key => {
        const weight = comparisonData.categories[key].weight;
        return (scores.microsoft.byCategory[key] / weight) * 100;
    });

    new Chart(ctx, {
        type: 'radar',
        data: {
            labels: categoryLabels,
            datasets: [
                {
                    label: 'Glean',
                    data: gleanData,
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: 'rgb(99, 102, 241)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgb(99, 102, 241)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(99, 102, 241)'
                },
                {
                    label: 'Google',
                    data: googleData,
                    backgroundColor: 'rgba(52, 168, 83, 0.2)',
                    borderColor: 'rgb(52, 168, 83)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgb(52, 168, 83)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(52, 168, 83)'
                },
                {
                    label: 'Microsoft',
                    data: microsoftData,
                    backgroundColor: 'rgba(0, 120, 212, 0.2)',
                    borderColor: 'rgb(0, 120, 212)',
                    borderWidth: 2,
                    pointBackgroundColor: 'rgb(0, 120, 212)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(0, 120, 212)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                r: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(71, 85, 105, 0.3)'
                    },
                    angleLines: {
                        color: 'rgba(71, 85, 105, 0.3)'
                    },
                    pointLabels: {
                        color: '#cbd5e1',
                        font: {
                            size: 11
                        }
                    },
                    ticks: {
                        color: '#94a3b8',
                        backdropColor: 'transparent'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#cbd5e1'
                    }
                }
            }
        }
    });
}

// Render gap analysis
function renderGapAnalysis() {
    const container = document.getElementById('gapsContainer');
    const latestSnapshot = historicalData.snapshots[historicalData.snapshots.length - 1];

    if (!latestSnapshot || !latestSnapshot.keyGaps) {
        container.innerHTML = '<div class="empty-state">No gaps identified</div>';
        return;
    }

    const gaps = latestSnapshot.keyGaps.sort((a, b) => a.priority - b.priority);

    container.innerHTML = gaps.map(gap => `
        <div class="gap-card priority-${gap.impact}">
            <div class="gap-header">
                <div class="gap-category">${gap.category}</div>
                <div class="gap-priority">
                    <span class="priority-badge ${gap.impact}">
                        ${gap.impact} impact
                    </span>
                    <span class="badge">Priority ${gap.priority}</span>
                </div>
            </div>
            <div class="gap-description">${gap.gap}</div>
        </div>
    `).join('');
}

// Render category filters
function renderCategoryFilters() {
    const container = document.getElementById('categoryFilters');
    const categories = Object.entries(comparisonData.categories);

    const filterButtons = [
        { key: 'all', name: 'All Features' },
        ...categories.map(([key, cat]) => ({ key, name: cat.name }))
    ];

    container.innerHTML = filterButtons.map(filter => `
        <button
            class="filter-button ${filter.key === currentFilter ? 'active' : ''}"
            onclick="filterCategory('${filter.key}')"
        >
            ${filter.name}
        </button>
    `).join('');
}

// Filter category
function filterCategory(categoryKey) {
    currentFilter = categoryKey;
    renderCategoryFilters();
    renderComparisonTable();
}

// Render comparison table
function renderComparisonTable() {
    const container = document.getElementById('comparisonTable');
    const categories = currentFilter === 'all'
        ? Object.entries(comparisonData.categories)
        : [[currentFilter, comparisonData.categories[currentFilter]]];

    let tableHTML = '';

    categories.forEach(([categoryKey, category]) => {
        tableHTML += `
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; color: var(--text-primary);">
                ${category.name}
            </h3>
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th style="width: 25%;">Feature</th>
                        <th style="width: 25%;">Glean</th>
                        <th style="width: 25%;">Google Agentspace</th>
                        <th style="width: 25%;">Microsoft Copilot</th>
                    </tr>
                </thead>
                <tbody>
        `;

        for (const [featureKey, feature] of Object.entries(category.features)) {
            tableHTML += `
                <tr>
                    <td>
                        <div class="feature-name">${feature.name}</div>
                        <div class="feature-description">${feature.description}</div>
                    </td>
                    ${renderFeatureCell(feature.glean)}
                    ${renderFeatureCell(feature.google)}
                    ${renderFeatureCell(feature.microsoft)}
                </tr>
            `;
        }

        tableHTML += `
                </tbody>
            </table>
        `;
    });

    container.innerHTML = tableHTML;
}

// Render feature cell
function renderFeatureCell(featureData) {
    const supportIcon = featureData.score >= 8 ? 'yes' :
                       featureData.score >= 4 ? 'partial' : 'no';
    const supportText = featureData.score >= 8 ? '✓' :
                       featureData.score >= 4 ? '~' : '✗';
    const scoreClass = featureData.score >= 7 ? 'high' :
                      featureData.score >= 4 ? 'medium' : 'low';

    return `
        <td>
            <div class="support-indicator">
                <span class="support-icon ${supportIcon}">${supportText}</span>
                <span class="score-badge ${scoreClass}">${featureData.score}/10</span>
            </div>
            <div class="support-details">${featureData.details}</div>
        </td>
    `;
}

// Render historical analysis
function renderHistoricalAnalysis() {
    renderTrendChart();
    renderChangeLog();
}

// Render trend chart
function renderTrendChart() {
    const ctx = document.getElementById('trendChart').getContext('2d');

    const snapshots = historicalData.snapshots;
    const dates = snapshots.map(s => s.date);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'Glean',
                    data: snapshots.map(s => s.scores.glean.overall),
                    borderColor: 'rgb(99, 102, 241)',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Google Agentspace',
                    data: snapshots.map(s => s.scores.google.overall),
                    borderColor: 'rgb(52, 168, 83)',
                    backgroundColor: 'rgba(52, 168, 83, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Microsoft Copilot',
                    data: snapshots.map(s => s.scores.microsoft.overall),
                    borderColor: 'rgb(0, 120, 212)',
                    backgroundColor: 'rgba(0, 120, 212, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(71, 85, 105, 0.3)'
                    },
                    ticks: {
                        color: '#cbd5e1'
                    }
                },
                x: {
                    grid: {
                        color: 'rgba(71, 85, 105, 0.3)'
                    },
                    ticks: {
                        color: '#cbd5e1'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#cbd5e1'
                    }
                }
            }
        }
    });
}

// Render change log
function renderChangeLog() {
    const container = document.getElementById('changeLogContainer');
    const changes = historicalData.changeLog;

    if (!changes || changes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                No changes logged yet. The dashboard will track changes on subsequent launches.
            </div>
        `;
        return;
    }

    container.innerHTML = changes.slice().reverse().map(change => `
        <div class="changelog-item">
            <div class="changelog-date">${change.date}</div>
            <div class="changelog-description">${change.description}</div>
        </div>
    `).join('');
}

// Check for updates and log changes
async function checkForUpdates(currentScores) {
    const latestSnapshot = historicalData.snapshots[historicalData.snapshots.length - 1];

    // Check if this is a new day or version update
    const today = new Date().toISOString().split('T')[0];

    if (latestSnapshot.date !== today) {
        // Calculate score changes
        const gleanChange = currentScores.glean.overall - latestSnapshot.scores.glean.overall;
        const googleChange = currentScores.google.overall - latestSnapshot.scores.google.overall;
        const microsoftChange = currentScores.microsoft.overall - latestSnapshot.scores.microsoft.overall;

        // Add new snapshot
        const newSnapshot = {
            date: today,
            version: comparisonData.version,
            summary: "Automated daily update",
            scores: currentScores,
            keyGaps: latestSnapshot.keyGaps // Keep same gaps unless manually updated
        };

        historicalData.snapshots.push(newSnapshot);

        // Add change log entries
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

            historicalData.changeLog.push({
                date: today,
                description: `Score changes detected: ${changes.join(', ')}`
            });
        }

        // Note: In a real application, you would save this to the server
        console.log('Updated historical data:', historicalData);
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDashboard);