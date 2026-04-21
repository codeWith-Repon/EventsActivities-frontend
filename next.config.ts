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
    bodySizeLimit: '10mb',
  },
};

export default nextConfig;
