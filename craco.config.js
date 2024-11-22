const CracoLessPlugin = require('craco-less');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = {
  webpack: {
    plugins: {
      add: [new ESLintWebpackPlugin()]
    }
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
