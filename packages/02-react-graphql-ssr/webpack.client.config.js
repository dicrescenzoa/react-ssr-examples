const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = (env, {mode}) => {
  const config = {
    entry: './src/client/index',
    target: "web",
    cache: false,

    optimization: {
      minimize: false
    },

    output: {
      path: path.resolve("./dist/client"),
      publicPath: 'http://localhost:3003/',
      chunkFilename: "[name].chunk.js",
    },

    resolve: {
      extensions: ['.jsx', '.js', '.json']
    },

    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: require.resolve('babel-loader'),
          options: {
            presets: [require.resolve('@babel/preset-react')]
          }
        }
      ]
    },

    plugins: []
  };

  if (mode === 'development') {
    config.devtool = 'source-map';
    config.plugins.push(new HtmlWebpackPlugin({
      template: './public/index.html'
    }));
  }

  return config;
};
