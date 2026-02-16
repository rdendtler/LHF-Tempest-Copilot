# GitHub Pages Deployment Guide

This repository is configured for automatic deployment to GitHub Pages using GitHub Actions.

## 🚀 Automatic Deployment Setup

### Prerequisites
- Repository must be public (or GitHub Pro for private repos)
- GitHub Pages must be enabled in repository settings

### How It Works

1. **GitHub Actions Workflow**
   - Located at `.github/workflows/deploy.yml`
   - Triggers automatically on push to `main` branch
   - Can also be triggered manually from Actions tab

2. **Deployment Process**
   - Workflow checks out the repository
   - Configures GitHub Pages
   - Uploads all static files (HTML, CSS, JS)
   - Deploys to GitHub Pages environment

3. **Site URL**
   - Your site will be available at: `https://rdendtler.github.io/LHF-Tempest-Copilot/`
   - Updates automatically when you push to `main`

## 📋 Setup Steps

### 1. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Click **Pages** (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Save the settings

### 2. Merge to Main Branch

Once your pull request is merged to the `main` branch, the deployment will trigger automatically.

```bash
# The workflow will run automatically on merge to main
# No manual intervention required!
```

### 3. Verify Deployment

1. Go to the **Actions** tab in your repository
2. You should see a workflow run for "Deploy to GitHub Pages"
3. Click on it to see the deployment progress
4. Once complete (green checkmark), your site is live!

### 4. Access Your Site

Visit: `https://rdendtler.github.io/LHF-Tempest-Copilot/`

## 🔧 Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow** button
4. Select `main` branch
5. Click **Run workflow**

## 📁 What Gets Deployed

The workflow deploys all files in the repository root:
- `index.html` - Main page
- `dashboard.html` - Dashboard page
- `styles.css` - Styles
- `weather.js` - Weather logic
- `dashboard.js` - Dashboard logic
- `README.md`, `CONFIG.md`, `SETUP.md` - Documentation

The `.nojekyll` file ensures GitHub Pages serves files directly without Jekyll processing.

## 🔍 Troubleshooting

### Site Not Updating?

1. Check the Actions tab for workflow status
2. Ensure the workflow completed successfully (green checkmark)
3. Clear your browser cache
4. Wait a few minutes - DNS updates can take time

### Workflow Failing?

1. Check the workflow logs in the Actions tab
2. Ensure GitHub Pages is enabled in Settings → Pages
3. Verify the `main` branch exists and has the latest code
4. Check that repository has required permissions

### 404 Error?

1. Ensure GitHub Pages source is set to "GitHub Actions"
2. Check that `index.html` exists in the repository root
3. Verify the deployment completed successfully

## 🔒 Permissions

The workflow requires these permissions (already configured):
- `contents: read` - Read repository files
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - Authenticate deployment

## 📝 Customizing the Workflow

The workflow file is at `.github/workflows/deploy.yml`. You can customize:

- **Branch**: Change `branches: ["main"]` to deploy from a different branch
- **Trigger**: Add more triggers like `pull_request` for preview deployments
- **Path**: Modify `path: '.'` to deploy a subdirectory

## 🌐 Custom Domain (Optional)

To use a custom domain like `weather.littlehill.farm`:

1. Add a `CNAME` file to the repository root with your domain name
2. Configure DNS with your domain provider:
   - Add a CNAME record pointing to `rdendtler.github.io`
3. Go to Settings → Pages → Custom domain
4. Enter your domain and save

## 🎯 Next Steps

1. ✅ Merge PR to `main` branch
2. ✅ Verify workflow runs successfully
3. ✅ Visit your live site
4. ✅ Add Tempest Station ID to `weather.js`
5. ✅ Enjoy your weather station website!

---

**Need Help?**
- Check workflow logs in Actions tab
- Review GitHub Pages documentation
- Ensure all setup steps are completed
