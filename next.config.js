const { hostname } = require("os")

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
      {
        protocol: "https",
        hostname: "**.myanimelist.net",
      },
      {
        protocol: "https",
        hostname: "gogocdn.net",
      },
      {
        protocol: "https",
        hostname: "s4.anilist.co",
      },
    ],
  },
}

module.exports = nextConfig
