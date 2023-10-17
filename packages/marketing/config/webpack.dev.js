const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFedereationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const commonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8081,
    historyApiFallback: {
      index: 'index.html',
    },  
  },
  plugins: [
    new ModuleFedereationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',
      exposes: {
        './Marketing': './src/bootstrap.js',
      },
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
        template: './public/index.html'
    }),
  ]
};

module.exports = merge(commonConfig, devConfig);
