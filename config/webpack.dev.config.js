/* eslint import/no-extraneous-dependencies: off */
/* eslint import/no-dynamic-require: off */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const eslintFormatter = require('react-dev-utils/eslintFormatter')

const rootDirectory = fs.realpathSync(process.cwd())
const outputDir = path.resolve(rootDirectory, 'dist')
const clientDir = path.resolve(rootDirectory, 'src')
const stylesDir = path.resolve(rootDirectory, 'src/assets/styles')
const aliases = require(path.resolve(rootDirectory, 'config/aliases'))

module.exports = {
  mode: 'development',

  target: 'web',

  // https://webpack.js.org/configuration/devtool/#development
  devtool: 'eval-cheap-source-map', // fast, transformed code (lines only)
  // devtool: 'inline-source-map', // slow, original source

  entry: path.resolve(clientDir, 'index.js'),

  resolve: {
    alias: {
      ...aliases,
    },
    modules: ['./', 'node_modules'],
    extensions: ['.js', '.jsx'],
  },

  output: {
    path: outputDir,
    publicPath: '/',
    filename: '[name].js',
    // https://github.com/webpack/webpack/issues/11660
    chunkLoading: false,
    wasmLoading: false,
  },

  context: rootDirectory,

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              fix: true,
              formatter: eslintFormatter,
              eslintPath: 'eslint',
              configFile: path.resolve(rootDirectory, 'config/.eslintrc.js'),
            },
          },
        ],
        include: clientDir,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [
                'lodash',
                require.resolve('react-refresh/babel'),
              ],
              // cacheDirectory: true,
              // cacheCompression: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      {
        test: /\.pcss$/,
        include: stylesDir,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-import', {
                    root: rootDirectory,
                    path: stylesDir,
                  }],
                  ['postcss-flexbugs-fixes'],
                  ['autoprefixer'],
                  ['cssnano', { zindex: false }],
                  // require('postcss-import')({
                  //   root: clientDir,
                  //   path: stylesDir,
                  // }),
                  // require('postcss-flexbugs-fixes'),
                  // require('autoprefixer')(),
                  // require('cssnano')({ zindex: false }),
                ],
              },
            },
          },
        ],
      },
      // {
      //   test: /\.(png|jpe?g|gif|woff|woff2|ttf|eot|ico)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //   use: ['url-loader?limit=5000&name=[name].[hash].[ext]?'],
      // },
      {
        // Exclude `js` files to keep "css" loader working as it injects
        // its runtime that would otherwise processed through "file" loader.
        // Also exclude `html` and `json` extensions so they get processed
        // by webpacks internal loaders.
        test: /\.(ico|gif|jpg|jpeg|png|svg|woff|woff2|ttf|eot)$/,
        exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/, /node_modules/],
        loader: 'file-loader',
        options: {
          outputPath: '',
          context: path.resolve(rootDirectory, 'src/assets/'),
          name: '[path][name].[ext]',
          emitFile: true,
        },
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ReactRefreshWebpackPlugin(),
    new webpack.NormalModuleReplacementPlugin(
      /popper.js/,
      path.resolve(__dirname, '../node_modules/popper.js/dist/esm/popper.js'),
    ),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(rootDirectory, 'public/index-template.html'),
      chunksSortMode: 'none',
    }),

    new webpack.DefinePlugin({
      'process.env': {
        APP_ENV: JSON.stringify(process.env.APP_ENV || 'development'),
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
      },
    }),
  ],
}
