# Clean up previous builds
if (Test-Path "dist") {
  Write-Host "Cleaning up previous build..."
  Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue
}

# Build the Next.js app
Write-Host "Building Next.js app..."
npm run build

# Create docs directory for GitHub Pages
if (Test-Path "docs") {
  Remove-Item -Recurse -Force docs -ErrorAction SilentlyContinue
}
New-Item -ItemType Directory -Path "docs" | Out-Null

# Copy the built files to docs folder
Write-Host "Copying built files to docs folder..."
Copy-Item -Path "dist\*" -Destination "docs\" -Recurse -Force

# Create a .nojekyll file to disable Jekyll processing
Write-Host "Creating .nojekyll file..."
New-Item -ItemType File -Path "docs\.nojekyll" | Out-Null

Write-Host "Done! The site is ready for GitHub Pages deployment."
Write-Host "Push the docs folder to your GitHub repository."
Write-Host "Then enable GitHub Pages in your repository settings to serve from the docs folder." 