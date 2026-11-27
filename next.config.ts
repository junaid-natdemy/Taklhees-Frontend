import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'motion',
      'date-fns',
      '@radix-ui/react-avatar',
    ],
  },
  images: {
    unoptimized: process.env.NODE_ENV === 'development',
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85, 95],
    minimumCacheTTL: 2592000,
    deviceSizes: [390, 640, 768, 1024, 1280, 1536, 1920, 2560, 3840],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'takhleesbusiness.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
      },
    ],
  },
  // Ensure redirects from legacy root URLs to country versions
  async redirects() {
    return [
      {
        source: '/courses',
        destination: '/in/courses',
        permanent: true,
      },
      {
        source: '/teachers',
        destination: '/in/teachers',
        permanent: true,
      },
      {
        source: '/admissions',
        destination: '/in/admissions',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/ae/services',
        permanent: true,
      },
      {
        source: '/branches',
        destination: '/ae/branches',
        permanent: true,
      },
      {
        source: '/gallery',
        destination: '/ae/gallery',
        permanent: true,
      },
      {
        source: '/career',
        destination: '/ae/career',
        permanent: true,
      },
      {
        source: '/careers',
        destination: '/ae/career',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/ae/blog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
