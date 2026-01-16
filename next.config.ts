import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'filemanager.pro-shazmlc.cloud',
      },
      {
        protocol: 'https',
        hostname: 'filemanager.pro-shazmlc.cloud',
      },
    ],
  },
  // تحسينات الأداء
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // تحسين TypeScript compilation
  typescript: {
    // Skip type checking during build (faster, but less safe)
    // يمكن تفعيله في CI/CD
    ignoreBuildErrors: false,
  },
  // تحسين ESLint
  eslint: {
    // Skip ESLint during build (faster)
    ignoreDuringBuilds: false,
  },
  // تحسين webpack
  webpack: (config, { dev, isServer }) => {
    // تحسين الأداء في development
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
      };
    }
    return config;
  },
  // تحسين experimental features
  experimental: {
    optimizePackageImports: ['lucide-react', 'next-intl'],
  },
};

export default withNextIntl(nextConfig);
