# Email to Team: How I Built the ServiceNow Connector Analysis Dashboard

---

**Subject:** How I Built a Competitive Analysis Dashboard in 1 Hour Using AI 🚀

---

**Hi Team,**

I wanted to share an interesting project I completed that demonstrates how AI can dramatically accelerate competitive analysis and dashboard creation.

## 🎯 The Challenge

I needed to compare ServiceNow connectors across three major platforms (Glean, Google Agentspace, and Microsoft Copilot) to identify capability gaps and recommend improvements. This typically would have taken several days of:
- Manual documentation research
- Spreadsheet creation
- Static presentation slides
- Email back-and-forth for sharing

## 💡 The AI-Powered Approach

Instead, I used **Claude Code** (Anthropic's AI coding assistant) to build an interactive dashboard in a single conversation. Here's exactly how it went:

---

### **Step 1: Initial Request (5 minutes)**

**My Prompt:**
> "refer to the public documentation of Glean, google agent on servicenow connector & compare it with public documentation for microsoft servicenow copilot connector for knowledge, catalog & tickets - come with a dashboard which i can use to highlight the gaps in terms of product feature capabilities, experience, ease of setup"

**What Claude Did:**
- ✅ Searched public documentation for all 3 platforms
- ✅ Fetched detailed specifications using WebFetch
- ✅ Analyzed 40+ features across 7 categories
- ✅ Created structured comparison data (JSON)
- ✅ Built interactive HTML dashboard with visualizations

**Result:** Complete dashboard with charts, tables, and gap analysis

---

### **Step 2: Adding Historical Tracking (5 minutes)**

**My Prompt:**
> "maintain a log of changes so that when i launch the website next time, it gives me status as per that day & maintains a historical log of past analysis"

**What Claude Did:**
- ✅ Created historical snapshot system
- ✅ Automatic change detection on each launch
- ✅ Trend charts showing score evolution
- ✅ Change log with timestamps

**Result:** Dashboard now tracks changes over time automatically

---

### **Step 3: Making It Shareable (15 minutes)**

**My Prompt:**
> "how can make this site shareable with my manager"

**What Claude Did:**
- ✅ Created multiple deployment guides (GitHub Pages, Netlify, Azure, Vercel)
- ✅ Set up Git repository
- ✅ Wrote deployment scripts (Windows & Mac)
- ✅ Created ready-to-send email templates
- ✅ Deployed to GitHub Pages

**Result:** Live dashboard at https://mayanksethi26.github.io/ServiceNow-Compete-analysis/

---

### **Step 4: Adding Source Citations (10 minutes)**

**My Prompt:**
> "add a hover icon against each of the gaps highlighted such that it provides a snippet of text from where the conclusion was drawn & with a link to that page"

**What Claude Did:**
- ✅ Created interactive hover tooltips
- ✅ Added direct quotes from documentation
- ✅ Linked to source pages
- ✅ Made analysis transparent and verifiable

**Result:** Every claim is now backed by cited sources

---

## 📊 What Was Created

### **Core Dashboard Files:**
1. **index.html** - Interactive dashboard with modern UI
2. **dashboard.js** - Chart.js visualizations and interactivity
3. **styles.css** - Beautiful dark theme
4. **comparison-data.json** - 40+ features compared
5. **historical-log.json** - Snapshot and change tracking

### **Documentation:**
6. **README.md** - Complete project documentation
7. **EXECUTIVE-SUMMARY.md** - Business-focused analysis
8. **DEPLOYMENT-GUIDE.md** - Multiple hosting options
9. **SHARE-WITH-MANAGER.md** - Quick sharing guide

### **Deployment Tools:**
10. **start-dashboard.bat/.sh** - Local server launcher
11. **deploy-github.bat** - GitHub deployment helper
12. **.gitignore** - Git configuration
13. **netlify.toml** - Netlify configuration
14. **staticwebapp.config.json** - Azure configuration

---

## 🎨 Dashboard Features

### **Visual Analytics**
- **Bar Chart:** Overall score comparison (Glean 82.5, MS 60.3, Google 53.8)
- **Radar Chart:** Performance across 7 categories
- **Line Chart:** Historical trends over time
- **Gap Cards:** Prioritized capability gaps with impact levels

### **Interactive Elements**
- **Category Filtering:** View 40+ features by category
- **Source Tooltips:** Hover for citations and links
- **Responsive Design:** Works on desktop, tablet, mobile
- **Historical Tracking:** Automatic snapshots on each visit

### **Key Findings**
- **8 Prioritized Microsoft Gaps** with HIGH/MEDIUM/LOW impact
- **Top Gap:** No AI/automation features (Glean shows 67% faster resolution)
- **Second Gap:** Permission sync only on full crawls (23-hour lag)
- **Third Gap:** Category-level permissions not supported

---

## ⚡ The Numbers

| Metric | Value |
|--------|-------|
| **Total Time** | ~1 hour |
| **Files Created** | 15 files |
| **Lines of Code** | 3,359 lines |
| **Features Compared** | 40+ features |
| **Documentation Sources** | 3 official docs |
| **Git Commits** | 2 commits |
| **Deployment Time** | 2 minutes |

**Traditional Approach Estimate:** 3-5 days minimum

---

## 🔑 Key Takeaways

### **1. AI as a Force Multiplier**
- Turned days of work into hours
- No need for specialized web development skills
- Instant deployment and sharing capabilities

### **2. Iterative Refinement**
- Started with basic request
- Added features progressively through conversation
- Each enhancement took 5-15 minutes

### **3. Professional Quality**
- Production-ready dashboard
- Comprehensive documentation
- Verifiable sources and citations
- Automatic updates via Git

### **4. Natural Language = Code**
My prompts were plain English requests, and Claude:
- Searched documentation
- Analyzed data
- Wrote production code
- Deployed to web
- Created documentation

---

## 💼 Business Value

### **For Competitive Analysis:**
- ✅ Faster insights (hours vs days)
- ✅ Visual and interactive presentation
- ✅ Verifiable with source citations
- ✅ Easy to share and update
- ✅ Historical tracking built-in

### **For Team Productivity:**
- ✅ Demonstrates AI-assisted development
- ✅ Reduces repetitive tasks
- ✅ Enables non-technical users to build dashboards
- ✅ Focus on analysis, not tooling

### **For Decision Making:**
- ✅ Clear gap prioritization
- ✅ Actionable recommendations
- ✅ Impact assessment (HIGH/MEDIUM/LOW)
- ✅ ROI estimates included

---

## 🔗 Try It Yourself

**Live Dashboard:** https://mayanksethi26.github.io/ServiceNow-Compete-analysis/

**Features to Explore:**
1. Interactive charts showing overall scores
2. Category breakdown radar chart
3. Gap analysis with priority levels
4. Detailed feature comparison table (filter by category)
5. **Hover over ⓘ icons** to see source citations
6. Historical trends (will populate over time)

**GitHub Repository:** https://github.com/mayanksethi26/ServiceNow-Compete-analysis

---

## 🎓 What This Demonstrates

### **AI Capabilities:**
- **Research:** Fetching and analyzing public documentation
- **Analysis:** Comparing features and identifying gaps
- **Development:** Writing production-ready code
- **Design:** Creating modern, responsive UI
- **DevOps:** Setting up deployment pipelines
- **Documentation:** Writing comprehensive guides

### **Practical Applications:**
- Competitive analysis dashboards
- Product comparison tools
- Gap analysis reports
- Interactive presentations
- Living documentation

---

## 📸 Process Infographic

[View the full infographic here](process-infographic.html)

The infographic shows the 6-step process from initial prompt to live deployment, including:
- Exact prompts I used
- What Claude created at each step
- Time taken per phase
- Final statistics

---

## 🤔 Questions I'm Often Asked

**Q: Does this replace human analysis?**
A: No - it accelerates it. I still provided the strategic direction, reviewed outputs, and made decisions. AI handled the research, coding, and deployment grunt work.

**Q: Can non-technical people do this?**
A: Yes! The prompts were plain English. No coding knowledge required.

**Q: How accurate is the analysis?**
A: Every claim is backed by citations from official documentation. The ⓘ hover icons let you verify sources instantly.

**Q: Can this be updated?**
A: Yes! Just edit the JSON data and `git push`. Dashboard updates in 1-2 minutes.

**Q: What did this cost?**
A: GitHub Pages hosting is free. The only cost was the Claude Code subscription (included in Claude Pro).

---

## 🚀 Next Steps

I'm planning to:
1. **Schedule monthly updates** to track Microsoft's progress closing gaps
2. **Expand analysis** to include Zendesk and Slack connectors
3. **Add benchmarking data** from customer implementations
4. **Create executive presentation** based on dashboard findings

If you're interested in:
- Building similar dashboards for your work
- Learning more about AI-assisted development
- Collaborating on competitive analysis

**Let's chat!** Happy to share the workflow and templates.

---

## 📚 Resources

- **Dashboard:** https://mayanksethi26.github.io/ServiceNow-Compete-analysis/
- **GitHub:** https://github.com/mayanksethi26/ServiceNow-Compete-analysis
- **Executive Summary:** [View online](https://mayanksethi26.github.io/ServiceNow-Compete-analysis/EXECUTIVE-SUMMARY.md)
- **Process Infographic:** [View interactive version](https://mayanksethi26.github.io/ServiceNow-Compete-analysis/process-infographic.html)

---

**The future of work isn't AI replacing humans—it's humans with AI replacing humans without AI.** 🚀

Best regards,
**Mayank Sethi**
*Built with Claude Code in ~1 hour*

---

**P.S.** - The irony isn't lost on me that I'm using AI to analyze Microsoft's connector gaps while demonstrating how powerful AI tooling has become. The tools are here—we just need to learn how to use them effectively! 😊

---
