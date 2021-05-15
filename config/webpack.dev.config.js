/* eslint import/no-extraneous-dependencies: off */
/* eslint import/no-dynamic-require: off */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const rootDirectory = fs.realpathSync(process.cwd())
const outputDir = path.resolve(rootDirectory, 'dist')
const clientDir = path.resolve(rootDirectory, 'src')
const aliases = require(path.resolve(rootDirectory, 'config/aliases'))

const { getModuleRules } = require('./webpack.rules')

const mode = 'development'

module.exports = {
  mode,

  // https://webpack.js.org/configuration/devtool/#development
  // devtool: 'eval-cheap-source-map', // fast, transformed code (lines only)
  devtool: 'inline-source-map', // slow, original source

  entry: {
    main: path.resolve(clientDir, 'index.js'),
  },

  context: clientDir,

  output: {
    pathinfo: true,
    path: outputDir,
    publicPath: '/',
    filename: '[name].[hash].js',
  },

  resolve: {
    alias: {
      ...aliases,
    },
    modules: ['./', 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  module: getModuleRules(mode),

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    // new webpack.NormalModuleReplacementPlugin(
    //   /popper.js/,
    //   path.resolve(__dirname, '../node_modules/popper.js/dist/esm/popper.js'),
    // ),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(rootDirectory, 'public/index-dev.html'),
      filename: 'index.html',
      minify: false,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        APP_ENV: JSON.stringify(process.env.APP_ENV || 'development'),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],

  // https://webpack.js.org/configuration/stats/
  // stats: {
  //   all: false, // for faster build and rebuild times
  // }
  // stats: 'errors-only',
  // stats: {
  //   preset: 'verbose',
  //   assets: false, // true to show images, icons, etc.
  //   assetsSpace: 50,
  //   assetsSort: '!size',
  //   colors: true,
  //   children: false,

  //   chunkModules: false,
  //   chunkOrigins: false,
  //   chunksSort: '!size',

  //   entrypoints: true,
  //   logging: false,
  //   modules: false,
  //   relatedAssets: true,
  //   timings: true,

  //   groupAssetsByInfo: false,
  //   groupAssetsByChunk: false,
  //   groupAssetsByEmitStatus: false,
  // },
}
