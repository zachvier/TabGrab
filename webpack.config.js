const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    popup: './app/javascripts/popup.js',
    tabWatcher: './app/javascripts/tabWatcher.js', // Background service worker
    welcome: './app/javascripts/welcome.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
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
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "app/manifest.json", to: "manifest.json" },
        { from: "app/*.html", to: "[name][ext]" },
        { from: "app/images", to: "images" },
        { from: "app/_locales", to: "_locales" },
      ],
    }),
  ],
};