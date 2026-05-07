import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const useBasePath = process.env.GITHUB_ACTIONS === "true" && repositoryName.length > 0;

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  basePath: useBasePath ? `/${repositoryName}` : "",
  assetPrefix: useBasePath ? `/${repositoryName}/` : undefined,
};

export default nextConfig;