/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Update this with your repo name if deploying to GitHub Pages with custom domain
  // basePath: '/markdown-viewer',
}

module.exports = nextConfig 