import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */
const nextConfig = {
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

const withMDX = createMDX({
  // Add markdown plugins here, as desired
})

export default withMDX(nextConfig);
