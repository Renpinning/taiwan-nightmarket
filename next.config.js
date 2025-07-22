const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  basePath: process.env.NODE_ENV === 'production' ? '/taiwan-nightmarket' : '',
  // 修改 assetPrefix 的設定
  assetPrefix: process.env.NODE_ENV === 'production' ? '/taiwan-nightmarket' : '', // 移除完整 URL
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_DEBUG:
      process.env.NODE_ENV === 'development' ? 'true' : 'false',
  },
  // 添加 generateBuildId 來解決 _ssgManifest.js 問題
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    }
    return config
  },
  images: {
    domains: ['foreign-ap.rti.org.tw'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'foreign-ap.rti.org.tw',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
      },
    ],
    unoptimized: true,
  },
  async rewrites() {
    if (process.env.NODE_ENV === 'development') {
      return [
        {
          source: '/api/:path*',
          destination: 'https://foreign-ap.rti.org.tw/api/:path*',
        },
      ]
    }
    return []
  },
}

module.exports = nextConfig
