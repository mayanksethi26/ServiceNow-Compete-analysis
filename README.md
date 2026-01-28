# ServiceNow Connector Comparison Dashboard

A comprehensive, interactive dashboard comparing ServiceNow connectors from **Glean**, **Google Agentspace**, and **Microsoft Copilot** across multiple dimensions including features, capabilities, ease of setup, and user experience.

## Features

### 📊 Visual Analytics
- **Overall Score Comparison**: Bar chart showing aggregate scores for each platform
- **Category Breakdown**: Radar chart displaying performance across 7 key categories
- **Historical Trends**: Line chart tracking score changes over time

### 🔍 Gap Analysis
- Identifies specific capability gaps in Microsoft's offering compared to competitors
- Prioritizes gaps by impact (High, Medium, Low)
- Provides actionable insights for product development

### 📋 Detailed Feature Comparison
- 40+ features compared across all three platforms
- Filterable by category (Data Types, Authentication, Permissions, Sync, etc.)
- Color-coded support indicators and detailed descriptions

### 📜 Historical Tracking
- Automatically logs changes on each launch
- Maintains snapshots of scores over time
- Change log showing what evolved and when

### 🎨 Beautiful UI
- Modern dark theme with smooth animations
- Fully responsive design
- Interactive charts powered by Chart.js

## Dashboard Structure

```
servicenow-connector-comparison/
├── index.html              # Main dashboard page
├── styles.css              # Beautiful dark theme styling
├── dashboard.js            # Interactive functionality and charts
├── comparison-data.json    # Structured comparison data
├── historical-log.json     # Historical snapshots and change log
└── README.md              # This file
```

## 🚀 Share with Your Manager

See **[SHARE-WITH-MANAGER.md](SHARE-WITH-MANAGER.md)** for quick deployment options:
- **Netlify Drag & Drop** (2 minutes) - Easiest!
- **GitHub Pages** (5 minutes) - Best for updates
- **ZIP File** (1 minute) - For email sharing

Full deployment guide: **[DEPLOYMENT-GUIDE.md](DEPLOYMENT-GUIDE.md)**

## Getting Started Locally

### Option 1: Simple HTTP Server (Recommended)

**Python 3:**
```bash
cd servicenow-connector-comparison
python -m http.server 8000
```

**Node.js:**
```bash
cd servicenow-connector-comparison
npx http-server -p 8000
```

**Or use the launcher:**
- Windows: Double-click `start-dashboard.bat`
- Mac/Linux: Run `./start-dashboard.sh`

Then open: `http://localhost:8000`

### Option 2: Direct File Access

Simply open `index.html` in your web browser. Note: Some browsers may restrict local file access to JSON files, so a local server is recommended.

## Data Categories

The dashboard evaluates connectors across 7 weighted categories:

| Category | Weight | Description |
|----------|--------|-------------|
| **Data Types & Coverage** | 25% | Knowledge articles, catalog items, tickets, news, projects |
| **Authentication & Security** | 15% | OAuth, basic auth, Entra ID integration |
| **Permissions & Access Control** | 20% | Query-time enforcement, user criteria, ACL support |
| **Sync & Real-Time Capabilities** | 15% | Real-time sync, incremental updates, custom schedules |
| **Filtering & Customization** | 10% | Catalog filters, query builders, URL customization |
| **Setup & Ease of Use** | 10% | Setup complexity, documentation quality, role guidance |
| **AI & Automation Features** | 20% | AI agents, ticket summarization, response drafting |
| **Known Limitations** | 5% | Attachments indexing, ACL evaluation, schema flexibility |

## Key Findings

### 🏆 Glean - Overall Leader (82.5/100)
- **Strengths**: AI & Automation (53 pts), Permissions (50 pts), Data Coverage (39 pts)
- **Standout Features**:
  - AI agents with 67% faster ticket resolution
  - Query-time permission enforcement
  - Broadest data type support (News, APM/SPM)

### 🚀 Google Agentspace (53.8/100)
- **Strengths**: Real-Time Sync (30 pts), Filtering (18 pts)
- **Standout Features**:
  - Webhook-based real-time synchronization
  - Incident creation/update API
  - Optimized data ingestion

### 🔷 Microsoft Copilot (60.3/100)
- **Strengths**: Filtering (28 pts), Permissions (29 pts), Authentication (18 pts)
- **Standout Features**:
  - Microsoft Entra ID OIDC integration
  - Extensive documentation
  - Custom query filters with encoded queries

## Microsoft Gap Analysis

### Top Priority Gaps

1. **AI & Automation Features** (HIGH IMPACT)
   - No AI agents for ticket workflow automation
   - No ticket summarization or response drafting
   - No knowledge article auto-generation

2. **Permission Sync** (HIGH IMPACT)
   - Incremental crawls don't update permissions (only full crawls)
   - 15-minute minimum sync delay vs real-time

3. **Category-Level Permissions** (HIGH IMPACT)
   - Only item-level permissions supported
   - Category permissions ignored

4. **Data Coverage** (MEDIUM IMPACT)
   - No News Articles or APM/SPM Projects support
   - Ticket attachments/comments not indexed

5. **ACL Evaluation** (HIGH IMPACT)
   - Doesn't comprehensively evaluate ACL rules

## Updating the Dashboard

### Manual Data Updates

1. **Edit comparison-data.json**
   - Update scores, add new features, modify capabilities
   - Increment version number
   - Update lastUpdated date

2. **Historical tracking is automatic**
   - On each launch with a new date, the dashboard detects changes
   - Creates new snapshot in historical-log.json
   - Logs significant score changes

### Adding New Features

```json
"newFeature": {
  "name": "Feature Name",
  "description": "Feature description",
  "glean": {
    "supported": true,
    "details": "Implementation details",
    "score": 10
  },
  "google": { ... },
  "microsoft": { ... }
}
```

### Updating Gap Analysis

Edit `historical-log.json` → `snapshots[latest]` → `keyGaps`:

```json
{
  "category": "Category Name",
  "gap": "Description of the gap",
  "impact": "high|medium|low",
  "priority": 1
}
```

## Documentation Sources

- **Glean**: [docs.glean.com/connectors/native/servicenow](https://docs.glean.com/connectors/native/servicenow/about)
- **Google**: [cloud.google.com/agentspace/docs](https://docs.cloud.google.com/agentspace/docs/connect-servicenow)
- **Microsoft**: [learn.microsoft.com/microsoftsearch](https://learn.microsoft.com/en-us/microsoftsearch/)

## Technology Stack

- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Charting**: Chart.js 4.4.1
- **Design**: Custom dark theme with CSS Grid and Flexbox
- **Data**: JSON-based data storage

## Future Enhancements

- [ ] Backend API for persistent historical tracking
- [ ] Export reports to PDF/Excel
- [ ] Email notifications for significant changes
- [ ] Integration with GitHub Actions for automated updates
- [ ] Comparison with additional platforms (Slack, Zendesk)

## License

This dashboard is provided as-is for internal analysis and decision-making.

## Support

For questions or issues, please contact the dashboard maintainer or refer to the official documentation links provided above.

---

**Last Updated**: 2026-01-28 | **Version**: 1.0.0