const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const PATHS  = {
  app : path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build'),
};

const common = {
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
};

function production() {
  return common;
}

function development() {
  const config = {
    devServer: {
        // Enable history API fallback so HTML5 History API baed
        // routing works. This is a good default that will come
        // in handy in more complicated setup.
      historyApiFallback: true,

        // Don't refresh if hot loading fails. If you want
        // refresh behavior, set hot: true instead.
      hotOnly: true,

        // Display only errors to reduce the amount of output.
      stats: 'errors-only',

        // Parse host and port from env to allow customizations.
        //
      host: process.env.HOST, // Defaults to `localhost`
      port: process.env.PORT, // Defaults to 8080
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          enforce: 'pre', // force the webpack to run this loader first.

          loader: 'eslint-loader',
          options: {
            emitWarnings: true,
          },
        },
      ],
    },
    plugins:[
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.LoaderOptionsPlugin( {
        options: {
          eslint: {
              // Fail only on errors
            failOnWarning: false,
            failOnError: true,
              // Disable/enable autofix
            fix:false,

              //output to jenkins compatible xml
            outputReport: {
              filePath: 'checkstyle.xml',
              formatter: require('eslint/lib/formatters/checkstyle'),
            },

          },
        },
      }),
    ],
  };

  return Object.assign(
    {},
    common,
    config,
    {
      plugins: common.plugins.concat(config.plugins),
    }
  );
}


module.exports = function( env ) {
  if( env === 'production')
    return production();
  return development();
};
