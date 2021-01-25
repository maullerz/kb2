/* eslint import/no-extraneous-dependencies: off */
/* eslint import/no-dynamic-require: off */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const rootDirectory = fs.realpathSync(process.cwd())
const outputDir = path.resolve(rootDirectory, 'dist')
const publicDir = path.resolve(rootDirectory, 'public')
const clientDir = path.resolve(rootDirectory, 'src')
const stylesDir = path.resolve(rootDirectory, 'src/assets/styles')
const aliases = require(path.resolve(rootDirectory, 'config/aliases'))

// for Sentry.io and similar tools set to true
const BUILD_SOURCE_MAP = false

module.exports = {
  mode: 'production',

  target: 'web',

  entry: {
    main: path.resolve(clientDir, 'index.js'),
  },

  output: {
    path: outputDir,
    publicPath: '/',
    // Unfortunately Webpack have issues with contenthash currently
    // It changes on repeated builds even if content not changed
    // https://github.com/webpack/webpack/issues/9520
    // anyway it is still very useful for long term caching
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    // https://github.com/webpack/webpack/issues/11660
    chunkLoading: false,
    wasmLoading: false,
  },

  context: clientDir,

  devtool: BUILD_SOURCE_MAP && 'hidden-source-map',

  resolve: {
    alias: {
      ...aliases,
    },
    modules: ['./', 'node_modules'],
    extensions: ['.js', '.jsx', '.scss'],
  },

  optimization: {
    minimize: true,
    emitOnErrors: true,
    // moduleIds: 'deterministic',
    // runtimeChunk: 'single',
    // splitChunks: {
    //   cacheGroups: {
    //     defaultVendors: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanOnceBeforeBuildPatterns: ['**/*'],
    }),
    new CopyWebpackPlugin({
      patterns: [{
        from: publicDir,
        to: outputDir,
        globOptions: {
          ignore: ['**/index-template.html'],
        },
      }],
    }),
    new webpack.NormalModuleReplacementPlugin(
      /popper.js/,
      path.resolve(__dirname, '../node_modules/popper.js/dist/esm/popper.js'),
    ),
    new HtmlWebpackPlugin({
      template: path.resolve(publicDir, 'index-template.html'),
      filename: 'index.html',
      minify: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      chunkFilename: '[name].[contenthash].css',
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BABEL_ENV: JSON.stringify('production'),
        APP_ENV: JSON.stringify(process.env.APP_ENV || ''),
        API_HOST: JSON.stringify(process.env.API_HOST || ''),
      },
    }),
  ],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          plugins: ['lodash'],
          cacheDirectory: true,
          cacheCompression: false,
        },
      },
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
        ],
      },

      {
        test: /\.pcss$/,
        include: stylesDir,
        use: [
          MiniCssExtractPlugin.loader,
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
                  //   root: rootDirectory,
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

  // stats: {
  //   assets: true,
  //   children: false,
  //   chunks: true,
  //   chunkModules: false,
  //   colors: true,
  //   entrypoints: false,
  //   env: true,
  //   errors: true,
  //   errorDetails: true,
  //   publicPath: true,
  //   performance: false,
  //   modules: false,
  //   timings: true,
  //   warnings: true,
  // },

  // performance: {
  //   hints: false,
  // },
}
