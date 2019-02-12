const glob = require("glob");
const path = require('path');
const options = require('../packager');
const receivedOutDir = options.output || 'dist';
const receivedEntry = options.entry;

module.exports = {
    mode: 'production',
    watch: false,
    entry: glob.sync(path.join(__dirname, '/../', receivedEntry)),
    output: {
        library: 'app',
        libraryTarget: 'commonjs2',
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