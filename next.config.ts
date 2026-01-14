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
};

export default withNextIntl(nextConfig);
