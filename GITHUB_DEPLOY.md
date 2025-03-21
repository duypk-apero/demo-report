# GitHub Pages Deployment Instructions

Follow these steps to deploy your Markdown Viewer app to GitHub Pages:

## 1. Create a new GitHub repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" in the top right, then "New repository"
3. Name your repository (e.g., "markdown-viewer")
4. Keep it public
5. Don't initialize with README, .gitignore, or license
6. Click "Create repository"

## 2. Push your code to GitHub

Once your repository is created, GitHub will show commands to push your existing repository. Copy and run the following commands (replace YOUR_USERNAME with your GitHub username and REPO_NAME with your repository name):

```bash
git remote add origin https://github.com/duypk-apero/demo-report.git
git branch -M main
git push -u origin main
```

## 3. Configure GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch and "/docs" folder
5. Click "Save"
6. Wait a few minutes for your site to deploy
7. Your site will be available at: https://YOUR_USERNAME.github.io/REPO_NAME/

## 4. Verify deployment

1. Visit the URL provided in the GitHub Pages section
2. You should see your Markdown Viewer app with all the sample files loaded
3. The dark/light mode and responsive design should work as expected

## 5. Adding new markdown files

To add new markdown files to your deployed site:

1. Edit the `staticMarkdownFiles` array in `src/utils/fileHelper.ts`
2. Add your new markdown file with content
3. Rebuild using the deployment script: `.\deploy-gh-pages.ps1`
4. Commit and push changes to GitHub
5. Wait for GitHub Pages to update (usually a few minutes)

Your Markdown Viewer is now successfully deployed to GitHub Pages and can be accessed from anywhere! 