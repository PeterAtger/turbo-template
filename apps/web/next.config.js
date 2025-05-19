/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['mongoose'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.google.com',
        pathname: '/s2/favicons',
      }, {
        protocol: 'https',
        hostname: 'cdn.brandfetch.io',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // eslint-disable-next-line no-param-reassign
    config.experiments = {
      topLevelAwait: true,
      layers: true,
    };
    return config;
  },
  output: 'standalone',
};

export default nextConfig;
