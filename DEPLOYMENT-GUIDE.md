# 🚀 Deployment Guide: Share Your Dashboard

This guide provides multiple options to share your ServiceNow Connector Comparison Dashboard with your manager and team.

---

## 🎯 Quick Comparison

| Method | Difficulty | Time | Cost | Best For |
|--------|-----------|------|------|----------|
| **GitHub Pages** | ⭐ Easy | 5 min | Free | Public or internal sharing |
| **Netlify** | ⭐ Easy | 3 min | Free | Quick sharing with custom domain |
| **Azure Static Web Apps** | ⭐⭐ Medium | 10 min | Free | Microsoft employees, enterprise |
| **Vercel** | ⭐ Easy | 3 min | Free | Modern hosting with preview URLs |
| **OneDrive/SharePoint** | ⭐ Easy | 2 min | Free | Internal Microsoft sharing |
| **ZIP File** | ⭐ Very Easy | 1 min | Free | One-time sharing, no updates |

---

## Option 1: GitHub Pages (Recommended) ⭐

**Best for**: Simple, free, and works for both public and private repos.

### Step 1: Initialize Git Repository

```bash
cd C:\Users\mayanksethi\servicenow-connector-comparison
git init
git add .
git commit -m "Initial commit: ServiceNow connector comparison dashboard"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `servicenow-connector-comparison`
3. **Important**: Choose **Private** if this is internal Microsoft data
4. Click "Create repository"

### Step 3: Push to GitHub

```bash
git remote add origin https://github.com/YOUR-USERNAME/servicenow-connector-comparison.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. Go to your repository settings: `https://github.com/YOUR-USERNAME/servicenow-connector-comparison/settings/pages`
2. Under "Source", select: `main` branch, `/ (root)` folder
3. Click "Save"
4. Wait 2-3 minutes for deployment

### Step 5: Share the URL

Your dashboard will be available at:
```
https://YOUR-USERNAME.github.io/servicenow-connector-comparison/
```

**For Private Repos**: Share the URL with collaborators who have access to your repository.

---

## Option 2: Netlify (Fastest) ⚡

**Best for**: Instant deployment with drag-and-drop.

### Method A: Drag & Drop (No Git Required)

1. Go to https://app.netlify.com/drop
2. Drag the entire `servicenow-connector-comparison` folder
3. Get instant URL: `https://random-name-123.netlify.app`
4. Optional: Change to custom subdomain in Site Settings

### Method B: Connect Git Repository

1. Push code to GitHub (see Option 1, Steps 1-3)
2. Go to https://app.netlify.com
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select your repository
5. Click "Deploy site"

**Your URL**: `https://your-site-name.netlify.app`

### Customize Your URL

1. Go to Site Settings → Domain Management
2. Click "Options" → "Edit site name"
3. Change to: `servicenow-comparison.netlify.app`

---

## Option 3: Azure Static Web Apps (Microsoft Internal) 🔷

**Best for**: Microsoft employees with Azure access.

### Prerequisites

- Azure subscription (use your Microsoft account)
- Azure CLI or use Azure Portal

### Deploy via Azure Portal

1. Go to https://portal.azure.com
2. Click "Create a resource" → Search "Static Web App"
3. Click "Create"

**Configuration**:
- **Subscription**: Your Azure subscription
- **Resource Group**: Create new or use existing
- **Name**: `servicenow-comparison`
- **Plan type**: Free
- **Region**: Choose closest region
- **Deployment source**: GitHub
  - Sign in and select your repository
  - Branch: `main`
  - Build presets: Custom
  - App location: `/`
  - Leave API location blank
  - Output location: leave blank

4. Click "Review + Create" → "Create"
5. Wait 2-3 minutes for deployment

**Your URL**: `https://servicenow-comparison.azurestaticapps.net`

### Deploy via Azure CLI

```bash
# Install Azure CLI if not installed
# https://aka.ms/installazurecli

# Login
az login

# Create Static Web App
az staticwebapp create \
  --name servicenow-comparison \
  --resource-group YourResourceGroup \
  --source https://github.com/YOUR-USERNAME/servicenow-connector-comparison \
  --location "westus2" \
  --branch main \
  --app-location "/" \
  --login-with-github
```

---

## Option 4: Vercel 🔺

**Best for**: Modern hosting with great performance.

### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to project
cd C:\Users\mayanksethi\servicenow-connector-comparison

# Deploy
vercel

# Follow prompts:
# - Setup and deploy: Y
# - Scope: Your account
# - Link to existing project: N
# - Project name: servicenow-comparison
# - Directory: ./
# - Want to modify settings: N
```

**Your URL**: `https://servicenow-comparison.vercel.app`

### Deploy via Vercel Website

1. Go to https://vercel.com/new
2. Import Git Repository (connect GitHub)
3. Select your repository
4. Click "Deploy"

---

## Option 5: OneDrive/SharePoint (Internal Microsoft) 📁

**Best for**: Quick internal sharing within Microsoft.

### Steps

1. Copy the entire folder to OneDrive:
   - `C:\Users\mayanksethi\OneDrive\servicenow-connector-comparison\`

2. Right-click folder → Share → "People in Microsoft can view"

3. Copy sharing link

4. **Important**: Tell recipients to:
   - Download the entire folder
   - Open `index.html` in their browser
   - OR run `start-dashboard.bat`

**Limitation**: They'll need to run locally, but good for quick internal sharing.

---

## Option 6: Simple ZIP File 📦

**Best for**: One-time sharing, email attachment.

### Create ZIP

```bash
# PowerShell
cd C:\Users\mayanksethi
Compress-Archive -Path servicenow-connector-comparison -DestinationPath servicenow-dashboard.zip
```

### Share Instructions

Include this note:
```
To view the dashboard:
1. Extract the ZIP file
2. Double-click "start-dashboard.bat" (Windows) or "start-dashboard.sh" (Mac/Linux)
3. Open browser to: http://localhost:8000
```

---

## 🔐 Security Considerations

### For Public Deployment

If deploying publicly, review [comparison-data.json](comparison-data.json) to ensure:
- ✅ No internal Microsoft data
- ✅ No confidential metrics
- ✅ No unreleased product info

### For Private/Internal Deployment

- Use **GitHub Private Repository** + GitHub Pages
- Use **Azure Static Web Apps** with authentication
- Use **Netlify** with password protection (Pro plan)

### Enable Password Protection (Netlify)

1. Go to Site Settings → Access Control
2. Enable "Visitor access"
3. Set password
4. Share URL + password with your manager

---

## 🔄 Continuous Updates

### Automatic Updates with Git

Once deployed via GitHub/Netlify/Vercel:

```bash
# Make changes to comparison-data.json
# Then commit and push

git add comparison-data.json historical-log.json
git commit -m "Update scores and gaps"
git push

# Dashboard automatically redeploys in 1-2 minutes!
```

### Webhook for Auto-Updates (Advanced)

Create a GitHub Action to automatically update data:

Create `.github/workflows/update-dashboard.yml`:

```yaml
name: Update Dashboard
on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:  # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Update timestamp
        run: |
          sed -i "s/\"lastUpdated\": \".*\"/\"lastUpdated\": \"$(date +%Y-%m-%d)\"/" comparison-data.json
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add comparison-data.json
          git commit -m "Auto-update: $(date +%Y-%m-%d)" || exit 0
          git push
```

---

## 📧 Email Template for Your Manager

```
Subject: ServiceNow Connector Comparison Dashboard

Hi [Manager Name],

I've created an interactive dashboard comparing ServiceNow connectors (Glean vs Google Agentspace vs Microsoft Copilot) based on public documentation.

🔗 Dashboard: [YOUR-DEPLOYED-URL]

Key Findings:
• Glean leads (82.5/100) with strong AI/automation
• Microsoft scores 60.3/100 - gaps in AI features and permission sync
• 8 prioritized gaps with impact analysis and recommendations

The dashboard includes:
✓ Interactive visualizations and charts
✓ Detailed 40+ feature comparison
✓ Gap analysis with priorities
✓ Historical tracking (auto-updates on each visit)

📄 Executive Summary: [Link to EXECUTIVE-SUMMARY.md on deployed site]

Let me know if you have questions or need additional analysis.

Best regards,
[Your Name]
```

---

## 🆘 Troubleshooting

### GitHub Pages shows 404

- Wait 5 minutes after enabling Pages
- Check repository is public OR collaborator has access
- Verify main branch has index.html at root

### Charts not loading

- Check browser console for errors
- Ensure all files deployed (especially comparison-data.json)
- Verify CDN links work (Chart.js)

### Data not updating

- Clear browser cache (Ctrl+Shift+R / Cmd+Shift+R)
- Verify JSON files are valid (use JSONLint)
- Check deployment logs on hosting platform

---

## 🎯 Recommended Approach

**For Microsoft Internal Use:**
1. ✅ Use **GitHub Private Repository** + **GitHub Pages**
2. ✅ Add your manager as collaborator
3. ✅ Enable branch protection
4. ✅ Set up automatic updates via Git

**For External Sharing:**
1. ✅ Use **Netlify** with custom domain
2. ✅ Review data for confidentiality
3. ✅ Enable password protection if needed

---

Need help? Check the main [README.md](README.md) or [EXECUTIVE-SUMMARY.md](EXECUTIVE-SUMMARY.md).