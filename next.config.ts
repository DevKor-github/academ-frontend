import type { NextConfig } from 'next';
import createMDX from '@next/mdx';
import { ENV_KEYS } from '@/util/env';

for (const key of ENV_KEYS) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const nextConfig: NextConfig = {
  transpilePackages: ['next-mdx-remote'],
  async redirects() {
    return [
      {
        source: '/policy',
        destination: '/notice/terms-of-use',
        permanent: false,
      },
      {
        source: '/about',
        destination: '/notice/about-academ',
        permanent: false,
      },
      {
        source: '/notice',
        destination: '/notices/1',
        permanent: false,
      },
      {
        source: '/notices',
        destination: '/notices/1',
        permanent: false,
      },
    ];
  },
};

import remarkGfm from 'remark-gfm';

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: { remarkPlugins: [remarkGfm] },
});

export default withMDX(nextConfig);
