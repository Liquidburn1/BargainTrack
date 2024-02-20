// /** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

//if it doesnt work

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    domains: ["m.media-amazon.com"],
  },
};

module.exports = nextConfig;
