# Historical Tracking Guide

## 🤔 Why Historical Data Doesn't Update Automatically

**The Issue:** Web browsers cannot write to local files for security reasons. While the dashboard calculates new scores and detects changes, it cannot save them back to `historical-log.json`.

**The Solution:** Run a simple script before viewing the dashboard to update the historical data.

---

## ✅ How to Update Historical Data

### **Quick Start (Recommended)**

Run one of these scripts from your dashboard directory:

**Windows:**
```bash
update-history.bat
```

**Mac/Linux (Python):**
```bash
python update-history.py
```

**Cross-platform (Node.js):**
```bash
node update-history.js
```

---

## 📅 When to Run the Script

### **Daily Update Workflow:**

1. **Before checking the dashboard:**
   ```bash
   update-history.bat  # or .py
   ```

2. **Script will:**
   - ✅ Check if today's snapshot exists
   - ✅ Calculate current scores
   - ✅ Create new snapshot if date changed
   - ✅ Log score changes to changelog
   - ✅ Update historical-log.json
   - ✅ Ask if you want to commit & push

3. **View your dashboard:**
   - Local: `start-dashboard.bat`
   - Online: https://mayanksethi26.github.io/ServiceNow-Compete-analysis/

---

## 📊 What the Script Does

### **Example Output:**

```
==================================================
Update Historical Dashboard Data
==================================================

Updating historical data from 2026-01-28 to 2026-01-29...
  > Score changes: Microsoft: +2.3
[OK] Historical data updated successfully!
  New snapshot: 2026-01-29
  Scores: Glean 82.5, Google 53.8, Microsoft 62.6
  Changes: Glean +0.0, Google +0.0, Microsoft +2.3

Next steps:
  1. Review the updated historical-log.json
  2. Commit: git add historical-log.json && git commit -m 'Update historical data for 2026-01-29'
  3. Push: git push

Would you like to commit and push changes now? (y/n):
```

---

## 🔄 After Data Updates

### **If you edited comparison-data.json:**

1. **Edit the data:**
   ```bash
   # Update scores, features, etc. in comparison-data.json
   ```

2. **Run update script:**
   ```bash
   update-history.bat
   ```

3. **Commit both files:**
   ```bash
   git add comparison-data.json historical-log.json
   git commit -m "Update Microsoft scores and historical data"
   git push
   ```

4. **Dashboard updates in 1-2 minutes**

---

## 🎯 Automated Daily Updates (Optional)

### **Option 1: Windows Task Scheduler**

Create a daily task to run `update-history.bat` automatically:

1. Open Task Scheduler
2. Create Basic Task
3. Trigger: Daily at 9 AM
4. Action: Start a program
5. Program: `C:\...\servicenow-connector-comparison\update-history.bat`

### **Option 2: Cron Job (Mac/Linux)**

```bash
# Edit crontab
crontab -e

# Add this line (runs daily at 9 AM)
0 9 * * * cd /path/to/servicenow-connector-comparison && python update-history.py
```

### **Option 3: GitHub Actions (Advanced)**

Create `.github/workflows/update-history.yml`:

```yaml
name: Update Historical Data
on:
  schedule:
    - cron: '0 9 * * *'  # Daily at 9 AM UTC
  workflow_dispatch:  # Manual trigger

jobs:
  update:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-python@v4
        with:
          python-version: '3.x'
      - name: Update historical data
        run: python update-history.py
      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add historical-log.json
          git commit -m "Auto-update historical data $(date +%Y-%m-%d)" || exit 0
          git push
```

---

## 🔍 Troubleshooting

### **"Already up to date for today"**
✅ This is normal! The script only creates one snapshot per day.

### **"Node.js is not installed"**
Use Python version instead: `python update-history.py`

### **"No module named 'json'"**
Your Python installation is working fine - `json` is built-in. This shouldn't happen.

### **Git errors during commit/push**
- Make sure you're in the correct directory
- Ensure you have git configured: `git config --global user.name "Your Name"`
- Check you have push access to the repository

### **Scores look wrong**
- Check `comparison-data.json` for correct values
- Verify all features have scores 0-10
- Run the script again to recalculate

---

## 📝 Manual Updates (Without Scripts)

If you can't run the scripts, you can manually update `historical-log.json`:

1. **Add a new snapshot:**
```json
{
  "date": "2026-01-29",
  "version": "1.0.1",
  "summary": "Manual update",
  "scores": {
    "glean": { "overall": 82.5, "byCategory": {...} },
    "google": { "overall": 53.8, "byCategory": {...} },
    "microsoft": { "overall": 60.3, "byCategory": {...} }
  },
  "keyGaps": [...]
}
```

2. **Add to changelog (if scores changed):**
```json
{
  "date": "2026-01-29",
  "description": "Score changes detected: Microsoft: +2.3"
}
```

3. **Commit and push:**
```bash
git add historical-log.json
git commit -m "Update historical data for 2026-01-29"
git push
```

---

## 🎯 Best Practices

1. **Run before viewing**: Always run the update script before checking the dashboard
2. **Daily consistency**: Run at the same time each day for clean trend lines
3. **After edits**: Always run after editing `comparison-data.json`
4. **Commit messages**: Use clear commit messages: "Update historical data for YYYY-MM-DD"
5. **Review changes**: Check the diff before pushing to catch any issues

---

## 📚 Related Files

- `update-history.bat` - Windows script
- `update-history.py` - Python script (cross-platform)
- `update-history.js` - Node.js script (alternative)
- `historical-log.json` - Historical data storage
- `comparison-data.json` - Current feature comparison

---

## ❓ FAQ

**Q: Why can't the browser do this automatically?**
A: Security restrictions prevent browsers from writing to local files.

**Q: Do I need to run this every time I view the dashboard?**
A: Only if the date has changed since last update.

**Q: What if I forget to run it for a few days?**
A: The script only creates one snapshot per day, so you'll have gaps in your historical chart. Just run it to create today's snapshot.

**Q: Can I run it multiple times per day?**
A: Yes! It will only create one snapshot per day and skip if already updated.

**Q: What if scores haven't changed?**
A: The script still creates a snapshot but won't add a changelog entry (< 0.5 point change threshold).

---

Need help? Check the main [README.md](README.md) or open an issue on GitHub.