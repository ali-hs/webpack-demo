const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');

const parts = require('./webpack.parts');

const PATHS  = {
  app : path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const common = merge( [
  {
    entry: {
      app: PATHS.app,
    },
    output: {
      path: PATHS.build,
      filename: '[name].js',
    },

    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack demo',
      }),
    ],
  },
]);

function production() {
  return common;
}

function development() {

  return merge([
    common,
    {
      plugins: [
        new webpack.NamedModulesPlugin(),
      ],
    },
    parts.devServer({
      // Customize host/port here if needed
      host: process.env.HOST,
      port: process.env.PORT,
    }),
    parts.lintJavascript({
      include: PATHS.app,
      options: {
        // Emit warnings over errors to avoid crashing
        // HMR on errors.
        emitWarnings: true,
      },
    }),
  ]);
}

module.exports = function( env ) {
  if( env === 'production')
    return production();
  return development();
};
