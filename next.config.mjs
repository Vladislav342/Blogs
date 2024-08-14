import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  webpack: config => {
    config.resolve.alias['<YOUR MODULE NAME>'] = path.resolve(
      '<YOUR MODULE PATH AS SHOWN IN THE WARNING>',
    );
    return config;
  },
};

export default nextConfig;
