/* eslint import/no-extraneous-dependencies: off */
/* eslint import/no-dynamic-require: off */
const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { WebpackManifestPlugin } = require('webpack-manifest-plugin')

const rootDirectory = fs.realpathSync(process.cwd())
const outputDir = path.resolve(rootDirectory, 'dist')
const publicDir = path.resolve(rootDirectory, 'public')
const clientDir = path.resolve(rootDirectory, 'src')
const aliases = require(path.resolve(rootDirectory, 'config/aliases'))

const { getModuleRules } = require('./webpack.rules')

// for Sentry.io and similar tools set to true
const BUILD_SOURCE_MAP = false
const mode = 'production'

module.exports = {
  mode,

  target: 'web',

  // entry: path.resolve(clientDir, 'index.js'),
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

  module: getModuleRules(mode),

  optimization: {
    minimize: false,
    emitOnErrors: true,
    moduleIds: 'deterministic',
    chunkIds: 'deterministic',
    // runtimeChunk: 'single',

    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      // chunks: 'async',
      cacheGroups: {
        defaultVendors: {
          // test: /[\\/]node_modules[\\/]/,
          // reuseExistingChunk: true,
          priority: -10,
          test: /[\\/]node_modules[\\/]/,
          // name: 'vendors',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },

    // TODO: Splitting Chunks
    // currently doesnt work on Webpack 5
    // splitChunks: { chunks: 'all' },

    // runtimeChunk: 'single',
    // splitChunks: {
    //   cacheGroups: {
    //     uilib: {
    //       test: /[\\/]node_modules[\\/](@material-ui|date-fns|@date-io)[\\/]/,
    //       name: 'mui',
    //       chunks: 'all',
    //     },
    //     vendor: {
    //       test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    //       name: 'react',
    //       chunks: 'all',
    //     },
    //     commons: {
    //       test: /[\\/]node_modules[\\/]/,
    //       name: 'vendors',
    //       chunks: 'all',
    //     },
    //   },
    // },
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        // cache: true,
        terserOptions: {
          parse: {
            // we want terser to parse ecma 8 code. However, we don't want it
            // to apply any minfication steps that turns valid ecma 5 code
            // into invalid ecma 5 code. This is why the 'compress' and 'output'
            // sections only apply transformations that are ecma 5 safe
            // https://github.com/facebook/create-react-app/pull/4234
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            // Disabled because of an issue with Uglify breaking seemingly valid code:
            // https://github.com/facebook/create-react-app/issues/2376
            // Pending further investigation:
            // https://github.com/mishoo/UglifyJS2/issues/2011
            comparisons: false,
            // drop_console: true,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true,
          },
        },
      }),
    ],
  },

  plugins: [
    new CleanWebpackPlugin({
      verbose: false,
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
    new WebpackManifestPlugin({
      fileName: 'assets.json',
      filter: fileDescr => fileDescr.isChunk,
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

  // https://webpack.js.org/configuration/stats/#stats-presets
  // stats: 'detailed',
  // stats: 'verbose',
  // stats: 'normal',
  // stats: 'minimal',

  stats: {
    preset: 'verbose',
    assets: false, // true to show images, icons, etc.
    assetsSpace: 50,
    assetsSort: '!size',
    colors: true,
    children: false,

    chunkModules: false,
    chunkOrigins: false,
    chunksSort: '!size',

    entrypoints: true,
    logging: false,
    modules: false,
    relatedAssets: true,
    timings: true,

    groupAssetsByInfo: false,
    groupAssetsByChunk: false,
    groupAssetsByEmitStatus: false,
  },

  performance: {
    hints: false,
  },
}