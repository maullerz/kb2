/* eslint-disable */
const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const openBrowser = require('react-dev-utils/openBrowser');

const appDirectory = fs.realpathSync(process.cwd());
const contentBase = path.resolve(appDirectory, 'public');

process.env.NODE_ENV = 'development'
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

const LOCALHOST_BACKEND ='http://localhost:4000'
const STAGING_BACKEND = 'https://api.evetools.org'
const useStaging = false

// Proxy for develop
const proxy = {
  '/api': {
    target: useStaging ? STAGING_BACKEND : LOCALHOST_BACKEND,
    // pathRewrite: { '^/api': '' },
    secure: false,
    prependPath: false,
  },
};

const developmentConfig = require('./webpack.dev.config.js');

// more options here: https://webpack.js.org/configuration/dev-server/
const devServerConfig = {
  contentBase,
  publicPath: developmentConfig.output.publicPath,
  host: '0.0.0.0',
  hot: true,
  hotOnly: true,
  inline: true,
  historyApiFallback: true,
  quiet: false,
  noInfo: false,
  lazy: false,
  // overlay: {
  //   warnings: true,
  //   errors: true,
  // },

  proxy,
  compress: true,
  disableHostCheck: true,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
  },
  // more info here: https://webpack.js.org/configuration/stats/
  stats: {
    assets: true,
    children: false,
    chunks: true,
    chunkModules: false,
    colors: true,
    entrypoints: false,
    errors: true,
    errorDetails: true,
    modules: false,
    timings: true,
    warnings: true,
  },
  // if you are not happy with all that verbose info in your console,
  // just uncomment next line:
  // stats: 'minimal',
};

let compiler;

try {
  compiler = webpack(developmentConfig);
} catch (err) {
  console.log('Failed to compile.');
  console.log();
  console.log(err.message || err);
  console.log();
  console.log('compiler:', compiler)
  process.exit(1);
}

const devServer = new WebpackDevServer(compiler, devServerConfig);

devServer.listen(PORT, HOST, (err) => {
  if (err) {
    console.error(err);

    return;
  }
  console.log();
  console.log(`Starting webpack-dev-server on http://${HOST}:${PORT}`);
  console.log('API proxy:');
  devServerConfig.proxy.forEach((devProxy) => {
    console.log(`  ${devProxy.context} => ${devProxy.target}`);
  });
  console.log();
  console.log();

  openBrowser(`http://localhost:${PORT}`);
});

const quitSignals = ['SIGINT', 'SIGTERM'];

quitSignals.forEach((sig) => {
  process.on(sig, () => {
    devServer.close();
    process.exit();
  });
});
