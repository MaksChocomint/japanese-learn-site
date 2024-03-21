/** @type {import('next').NextConfig} */

import { withNextVideo } from "next-video/process";

const nextConfig = {
  output: `standalone`,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withNextVideo(nextConfig);
