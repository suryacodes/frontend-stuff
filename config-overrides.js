const {
  override,
  addWebpackPlugin,
  addWebpackModuleRule,
} = require("customize-cra");
const { GenerateSW } = require("workbox-webpack-plugin");

module.exports = override(
  // Add worker-loader for Web Workers
  addWebpackModuleRule({
    test: /\.worker\.js$/,
    use: { loader: "worker-loader" },
  }),

  // Add Workbox service worker plugin
  addWebpackPlugin(
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10MB limit
    })
  )
);
