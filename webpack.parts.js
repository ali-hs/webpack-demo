const webpack = require('webpack');

exports.devServer = function({host, port}) {
  return {
    devServer: {
      // Enable history API fallback so HTML History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Don't refresh if hot loading fails. if you want
      // refresh behavior set hot: true instead.
      hotOnly: true,

      // Display only error to reduce the amount of output.

      stats: 'errors-only',

      // Parse host and prot from env to allow customization.

      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`
      host, // Defaults to `localhost`
      port, // Defaults to 8080
    },

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  };
};


exports.lintJavascript = function({include, exclude, options}) {
  return {
    module: {
      rules: [
        {
          test: /\.js$/,
          include,
          exclude,
          enforce: 'pre',

          loader:'eslint-loader',
          options,
        },
      ],
    },
  };
};

exports.loadCSS = function({include, exclude} = {} ) {
  return {
    module: {
      rules: [
        {
          test:/\.css$/,
          include,
          exclude,

          use: ['style-loader', 'css-loader'],
        },
      ],
    },
  };
};
