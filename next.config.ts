// eslint-disable-next-line @typescript-eslint/no-explicit-any
const nextConfig: any = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "**",
      },
    ],
  },
  serverActions: {
    bodySizeLimit: '50mb',
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
};

export default nextConfig;
