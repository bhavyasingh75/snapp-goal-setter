/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    appDir: true,
  },
  // If your app directory is in src/app, uncomment the following line:
  // distDir: 'src/.next',
}

module.exports = nextConfig