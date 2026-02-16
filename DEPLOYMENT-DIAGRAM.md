# 🎯 GitHub Pages Deployment - Visual Guide

## 📊 Deployment Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     DEPLOYMENT WORKFLOW                         │
└─────────────────────────────────────────────────────────────────┘

1️⃣  SETUP (One-time)
    ┌──────────────────────┐
    │ Repository Settings  │
    │  → Pages Settings    │
    │  → Select "GitHub    │
    │     Actions" source  │
    └──────────────────────┘
              ↓
              
2️⃣  TRIGGER (Automatic)
    ┌──────────────────────┐
    │   Push to 'main'     │
    │      or Manual       │
    │   Workflow Trigger   │
    └──────────────────────┘
              ↓
              
3️⃣  BUILD (GitHub Actions)
    ┌──────────────────────┐
    │  Checkout Code       │
    └──────────────────────┘
              ↓
    ┌──────────────────────┐
    │  Setup Pages         │
    └──────────────────────┘
              ↓
    ┌──────────────────────┐
    │  Upload Artifacts    │
    │   • index.html       │
    │   • dashboard.html   │
    │   • styles.css       │
    │   • weather.js       │
    │   • dashboard.js     │
    │   • *.md docs        │
    └──────────────────────┘
              ↓
              
4️⃣  DEPLOY (GitHub Pages)
    ┌──────────────────────┐
    │  Deploy to GitHub    │
    │  Pages Environment   │
    └──────────────────────┘
              ↓
              
5️⃣  LIVE! ✅
    ┌──────────────────────────────────────────┐
    │  https://rdendtler.github.io/           │
    │         LHF-Tempest-Copilot/            │
    └──────────────────────────────────────────┘
```

## 🔄 Continuous Deployment

```
Developer Push → GitHub Actions → Automatic Deploy → Live Site Updated
     ↑                                                         ↓
     └─────────────────── Repeat on Every Push ──────────────┘
```

## 📁 Repository Structure

```
LHF-Tempest-Copilot/
├── .github/
│   └── workflows/
│       └── deploy.yml          ← GitHub Actions workflow
├── .nojekyll                   ← Prevents Jekyll processing
├── index.html                  ← Main page
├── dashboard.html              ← Dashboard page
├── styles.css                  ← Modern rustic styles
├── weather.js                  ← Weather logic + wet bulb calc
├── dashboard.js                ← Dashboard functionality
├── README.md                   ← Overview
├── CONFIG.md                   ← Configuration guide
├── SETUP.md                    ← Setup instructions
├── DEPLOYMENT.md               ← Deployment guide (this file)
└── POST-MERGE-CHECKLIST.md    ← Quick checklist
```

## ⚡ Workflow Triggers

The deployment workflow runs when:
- ✅ Code is pushed to `main` branch
- ✅ Manually triggered from Actions tab
- ❌ NOT on pull requests (to avoid deploying unmerged code)

## 🔐 Required Permissions

The workflow has these permissions (automatically configured):

```yaml
permissions:
  contents: read      # Read repository files
  pages: write        # Deploy to GitHub Pages
  id-token: write     # Authenticate deployment
```

## 📈 Deployment Timeline

```
Merge PR → 10 sec → Workflow Start → 60-90 sec → Deploy → 10 sec → Live!
           ↑                ↑                      ↑              ↑
         Trigger        Build & Upload          Deploy      DNS Propagate
```

**Total time: ~2 minutes from merge to live site**

## 🎨 What Gets Deployed

All static files in the repository root:
- ✅ HTML files (pages)
- ✅ CSS files (styles)
- ✅ JavaScript files (logic)
- ✅ Markdown files (documentation)
- ✅ .nojekyll file (configuration)

## 🚀 Quick Start Commands

### View Deployment Status
```bash
# Go to: https://github.com/rdendtler/LHF-Tempest-Copilot/actions
```

### Trigger Manual Deployment
```bash
# 1. Go to Actions tab
# 2. Select "Deploy to GitHub Pages"
# 3. Click "Run workflow"
# 4. Select branch: main
# 5. Click "Run workflow"
```

### Check Live Site
```bash
# Visit: https://rdendtler.github.io/LHF-Tempest-Copilot/
```

## 🔧 Customization Options

### Deploy from Different Branch
Edit `.github/workflows/deploy.yml`:
```yaml
on:
  push:
    branches: ["production"]  # Change from "main"
```

### Deploy Specific Directory
Edit `.github/workflows/deploy.yml`:
```yaml
- name: Upload artifact
  uses: actions/upload-pages-artifact@v3
  with:
    path: './dist'  # Instead of '.'
```

### Add Custom Domain
1. Create `CNAME` file in repository root
2. Add your domain name to the file
3. Configure DNS with your provider
4. Update in Settings → Pages → Custom domain

## ✅ Success Indicators

After deployment, you should see:
- ✅ Green checkmark in Actions tab
- ✅ "Deploy to GitHub Pages" workflow succeeded
- ✅ Site accessible at GitHub Pages URL
- ✅ All pages load correctly
- ✅ Weather data fetches (after adding station ID)

## 📞 Support

**Workflow Issues?**
- Check Actions tab for error logs
- Verify GitHub Pages is enabled
- Ensure 'main' branch has latest code

**Site Not Loading?**
- Wait a few minutes after deployment
- Clear browser cache
- Check workflow completed successfully

**Weather Not Working?**
- Add Tempest station ID to weather.js
- Check browser console for errors
- Verify API token is correct

---

**🎉 Your site is configured for automatic deployment!**

Every time you push to `main`, your site updates automatically. No manual deployment needed!
