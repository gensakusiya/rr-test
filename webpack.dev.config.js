const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const productionConfig = require('./webpack.config');

const HOST = 'localhost';
const PORT = 8000;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://' + HOST + ':' + PORT,
    'webpack/hot/only-dev-server',
  ].concat(productionConfig.entry),
  resolve: productionConfig.resolve,
  output: {
    path: resolveApp('build'),
    pathinfo: true,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
    publicPath: '/',
    devtoolModuleFilenameTemplate: info =>
      path.resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              forceEnv: 'development',
            },
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: (loader) => [
                require('postcss-import')({ root: loader.resourcePath }),
                require('postcss-cssnext')(),
                require('cssnano')()
              ],
            },
          },
        ],
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          }
        ],
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: resolveApp('public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    contentBase: 'public',
    hot: true,
    host: HOST,
    port: PORT,
  },
};
