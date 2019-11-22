const Webpack = require('webpack');
const merge = require('webpack-merge');
const { resolve } = require('path');
const common = require('./common');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  output: {
    filename: 'js/bundle.[hash].min.js',
    path: resolve(__dirname, '../build'),
    publicPath: '/',
  },
  plugins: [new Webpack.optimize.ModuleConcatenationPlugin()],
});
