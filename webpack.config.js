var glob = require("glob")


module.exports = {
    mode: 'production',
    entry: path.join(__dirname, '/../', receivedOutDir),
    output: {
        path: path.join(__dirname, '/../', receivedOutDir),
        filename: 'app.bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    }
  };