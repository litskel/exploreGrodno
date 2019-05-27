/* eslint no-process-env: "off" */
/* eslint no-undef: "off" */
/* eslint no-console: "off" */
/* eslint one-var: "off" */
/* eslint vars-on-top: "off" */

var WebpackDevServer = require('webpack-dev-server')
var webpack = require('webpack')
// var connect = require('express');
var commons = require('./webpack.config.js')
// var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {
  entry: {
    index: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './js/index.js'
    ]
  },
  devtool: 'eval-source-map',
  output: {
    path: __dirname + '',
    filename: '[name].js',
    devtoolModuleFilenameTemplate: '[resource-path]'
  },
  module: {
    rules: commons.rules
  },
  resolve: {
    modules: commons.modules,
    alias: {}
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.LoaderOptionsPlugin({
      // test: /\.xxx$/, // may apply this only for some modules
      options: {
        devtoolLineToLine: true
      }
    })
  ]
}

var compiler = webpack(config)

var server = new WebpackDevServer(compiler, {
  contentBase: __dirname + '/',
  // debug: true,
  hot: true,
  // verbose: true,
  stats: {
    colors: true,
    assets: false,
    chunks: false,
    chunkModules: false,
    modules: true
  }
})

server.listen(8086, '0.0.0.0', function () {
  console.log('Demo is available at', server.listeningApp._connectionKey)
})
