# 🤖 Weekly Automation Guide

## Overview

Your dashboard now features **fully automated weekly updates** that:
- ✅ Check documentation URLs every Monday at 9 AM UTC
- ✅ Detect when content changes (using MD5 hashing)
- ✅ Automatically update historical snapshots
- ✅ Create GitHub issues notifying you of changes
- ✅ Update the "Last Updated" date
- ✅ Maintain a weekly update log
- ✅ Show "Auto-updates: Weekly" badge on dashboard

**You don't need to run anything manually - GitHub Actions does it all!**

---

## 🎯 What Gets Checked

### Documentation URLs Monitored:

**Microsoft:**
- `learn.microsoft.com/en-us/microsoftsearch/servicenow-knowledge-overview`
- `learn.microsoft.com/en-us/microsoftsearch/servicenow-catalog-connector`
- `learn.microsoft.com/en-us/microsoftsearch/servicenow-tickets-overview`

**Glean:**
- `docs.glean.com/connectors/native/servicenow/about`
- `www.glean.com/agents/servicenow`

**Google:**
- `cloud.google.com/agentspace/docs/connect-servicenow`

---

## 📅 Schedule

**Automatic Checks:**
- **Every Monday at 9 AM UTC** (2 AM PT / 5 AM ET / 10 AM London)
- **Runs via GitHub Actions** (cloud-based, no local machine needed)

**Dashboard Updates:**
- Changes committed automatically
- Live site updates within 1-2 minutes
- GitHub issue created if changes detected

---

## 🚀 Setup (One-Time)

### Step 1: Commit & Push Automation Files

The automation is already set up! Just push the files:

```bash
cd C:\Users\mayanksethi\servicenow-connector-comparison

git add .github/workflows/weekly-update.yml
git add auto-update-weekly.py
git add weekly-update-log.json
git add requirements.txt
git add index.html dashboard.js styles.css

git commit -m "Add weekly automated documentation checking"
git push
```

### Step 2: Verify GitHub Actions is Enabled

1. Go to: https://github.com/mayanksethi26/ServiceNow-Compete-analysis/actions
2. If you see "Workflows", you're all set!
3. If not, click "I understand my workflows, go ahead and enable them"

### Step 3: Test the Automation

Trigger a manual run to test:

1. Go to: https://github.com/mayanksethi26/ServiceNow-Compete-analysis/actions
2. Click "Weekly Documentation Check & Update"
3. Click "Run workflow" → Select "main" branch → "Run workflow"
4. Watch it run (takes ~1-2 minutes)

---

## 📊 How It Works

### When Monday 9 AM UTC Arrives:

**1. GitHub Actions Triggers**
```
⏰ Cron schedule activates
🤖 Spins up Ubuntu runner
📥 Checks out your repository
```

**2. Documentation Check**
```python
for each URL:
    - Fetch page content
    - Calculate MD5 hash
    - Compare with previous hash
    - Log if changed
```

**3. If Changes Detected**
```
✅ Update comparison-data.json (lastUpdated date)
✅ Create new historical snapshot
✅ Add to weekly-update-log.json
✅ Commit changes
✅ Push to GitHub
✅ Create GitHub issue with summary
```

**4. Dashboard Auto-Updates**
```
GitHub Pages detects new commit
→ Rebuilds site (1-2 min)
→ Your dashboard shows latest data
```

---

## 📧 Notifications

### When Changes Are Detected:

**GitHub Issue Created:**
```
Title: 📊 Weekly Update: 2026-02-03

Body:
## 📊 Weekly Documentation Update

**Date:** 2026-02-03

### Changes Detected:

- **microsoft**: Content changed (hash: a3b2c1d4...)
- **glean**: Content changed (hash: e5f6g7h8...)

### Updated Scores:

- Glean: 82.5
- Google: 53.8
- Microsoft: 62.6

[View Dashboard](https://mayanksethi26.github.io/ServiceNow-Compete-analysis/)
```

**Email Notification:**
- GitHub sends email for new issues (if enabled in settings)
- Go to GitHub Settings → Notifications to configure

---

## 🧪 Manual Testing

### Test Locally Before Push:

```bash
# Install dependencies
pip install -r requirements.txt

# Run the check script
python auto-update-weekly.py
```

**Expected Output:**
```
============================================================
Weekly Automated Documentation Check
============================================================

Checking documentation URLs...

[MICROSOFT]
  Checking: https://learn.microsoft.com/...
    > No changes

[GLEAN]
  Checking: https://docs.glean.com/...
    > No changes

...

============================================================
NO CHANGES DETECTED
============================================================
All documentation unchanged since last check

[OK] Weekly check complete - no action needed
```

---

## 🎨 Dashboard UI Updates

### New Visual Elements:

**1. Auto-Update Badge (Header)**
```
🤖 Auto-updates: Weekly (Every Monday)
```
- Gradient purple badge
- Subtle pulse animation
- Hover shows last check date

**2. Updated Metadata**
```
Last Updated: 2026-01-29
Version: 1.0.1
🤖 Auto-updates: Weekly
```

**3. Historical Chart**
- Now shows **weekly snapshots** instead of daily
- X-axis labeled with weekly dates
- Clearer trend visualization

---

## 🔧 Configuration

### Change Check Frequency:

Edit `.github/workflows/weekly-update.yml`:

```yaml
schedule:
  # Daily at 9 AM UTC
  - cron: '0 9 * * *'

  # Twice weekly (Monday & Thursday)
  - cron: '0 9 * * 1,4'

  # First day of month
  - cron: '0 9 1 * *'
```

### Add More URLs to Monitor:

Edit `auto-update-weekly.py`:

```python
DOCS_TO_MONITOR = {
    'microsoft': [
        'https://learn.microsoft.com/...',
        'https://techcommunity.microsoft.com/...',  # NEW
    ],
    'glean': [...],
    'google': [...]
}
```

### Adjust Change Detection Sensitivity:

The script uses MD5 hashing - even minor HTML changes trigger updates.

**To be more selective:**
```python
# Add keyword filtering
if any(keyword in content.lower() for keyword in SIGNIFICANT_KEYWORDS):
    # Only flag if significant keywords found
```

---

## 📈 Monitoring & Logs

### View Automation History:

**GitHub Actions Runs:**
- https://github.com/mayanksethi26/ServiceNow-Compete-analysis/actions
- Shows all runs, success/failure, logs

**Weekly Update Log:**
- `weekly-update-log.json` - Tracks all checks and changes
- View at: https://mayanksethi26.github.io/ServiceNow-Compete-analysis/weekly-update-log.json

**Historical Snapshots:**
- `historical-log.json` - Weekly data points for charts
- Includes automated and manual updates

---

## ⚠️ Troubleshooting

### Automation Not Running:

**Check 1: Actions Enabled?**
```
Go to: Settings → Actions → General
Ensure: "Allow all actions and reusable workflows" is selected
```

**Check 2: Branch Protection?**
```
Go to: Settings → Branches
If main is protected, add "GitHub Actions" to allowed users
```

**Check 3: Workflow File Location?**
```
File must be at: .github/workflows/weekly-update.yml
Case-sensitive! Must be lowercase "workflows"
```

### Changes Not Detected:

**Reason 1: Pages use JavaScript loading**
- Some docs load content dynamically
- Script only sees initial HTML
- **Solution:** Use browser automation (Selenium) instead

**Reason 2: CDN caching**
- Content cached at CDN level
- **Solution:** Add cache-busting headers

**Reason 3: A/B testing**
- Pages serve different content randomly
- **Solution:** Fetch multiple times and compare

### GitHub Actions Quota:

**Free tier:** 2,000 minutes/month
**Each run:** ~2 minutes
**Monthly cost:** ~8-10 minutes (4-5 runs)

**Well within limits!**

---

## 🎯 Best Practices

### 1. Review Issues Weekly

When you receive a GitHub issue about changes:
1. Click the issue link
2. Review what changed
3. Manually verify significance
4. Update scores in `comparison-data.json` if needed
5. Close the issue

### 2. Manual Score Updates

Automation detects *changes* but doesn't update *scores*. You still need to:
```bash
# 1. Edit comparison-data.json
# Update scores based on new features

# 2. Commit changes
git add comparison-data.json
git commit -m "Update scores based on new Microsoft AI features"
git push

# Next Monday's automation will pick up your changes
```

### 3. Monitor False Positives

Documentation pages change for minor reasons:
- Copyright year updates
- Navigation changes
- Analytics script updates

**These are noise.** Focus on issues that mention:
- "New feature"
- "Now supports"
- "Updated capabilities"

### 4. Quarterly Deep Reviews

While automation monitors weekly:
- **Do quarterly manual reviews** of all documentation
- **Re-evaluate priorities** and gap analysis
- **Update executive summary** with trends

---

## 📚 Files Overview

| File | Purpose |
|------|---------|
| `.github/workflows/weekly-update.yml` | GitHub Actions workflow |
| `auto-update-weekly.py` | Python script that checks docs |
| `weekly-update-log.json` | Log of all automated checks |
| `requirements.txt` | Python dependencies |
| `index.html` | Updated with auto-update badge |
| `dashboard.js` | Loads weekly log, shows next check |
| `styles.css` | Styling for auto-update badge |

---

## 🚀 Next Steps

**After pushing the automation files:**

1. ✅ Verify GitHub Actions enabled
2. ✅ Trigger manual workflow run to test
3. ✅ Wait until next Monday to see first auto-run
4. ✅ Check email for GitHub issue notification
5. ✅ Review dashboard shows "Auto-updates: Weekly" badge

**Your dashboard is now fully automated!** 🎉

---

## 🆘 Support

**GitHub Actions failing?**
- Check: https://github.com/mayanksethi26/ServiceNow-Compete-analysis/actions
- View logs to see error messages

**Script errors?**
- Run locally: `python auto-update-weekly.py`
- Check Python version: `python --version` (needs 3.7+)

**Questions?**
- Review workflow logs
- Check this guide's troubleshooting section
- Test manually first before debugging automation

---

**Dashboard now updates itself every week - sit back and let the automation work!** ✨