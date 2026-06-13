const isGitHubPages = process.env.GITHUB_PAGES === "true";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  assetPrefix: isGitHubPages ? "/Toketz/" : undefined,
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
