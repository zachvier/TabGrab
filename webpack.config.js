const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env = {}) => {
  const target = env.target || 'chrome';
  const manifestFile = target === 'firefox' ? 'manifest.firefox.json' : 'manifest.json';
  const outputPath = path.resolve(__dirname, 'dist', target);

  return {
    entry: {
      popup: './app/javascripts/popup.js',
      tabWatcher: './app/javascripts/tabWatcher.js',
    },
    output: {
      filename: '[name].js',
      path: outputPath,
      clean: true,
    },
    resolve: {
      alias: {
        '@browser': path.resolve(__dirname, `app/javascripts/browser/${target}`),
      },
    },
    module: {
      rules: [
        {
          test: /\.handlebars$/,
          loader: "handlebars-loader"
        },
        {
          test: /\.scss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
      ],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          { from: `app/${manifestFile}`, to: "manifest.json" },
          { from: "app/popup.html", to: "popup.html" },
          { from: "app/images", to: "images" },
          { from: "app/_locales", to: "_locales" },
        ],
      }),
    ],
  };
};
