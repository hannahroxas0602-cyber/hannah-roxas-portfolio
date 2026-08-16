import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/continuum/continuum",
        destination: "/continuum",
        permanent: true,
      },
      {
        source: "/page/good",
        destination: "/goodfriends",
        permanent: true,
      },
      {
        source: "/continnum-notes",
        destination: "/continuum-research-notes",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
