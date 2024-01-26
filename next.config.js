/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.module.rules.push({
      test: /\.hbs$/,
      loader: "handlebars-loader",
    });

    return config;
  },
};

module.exports = nextConfig;
