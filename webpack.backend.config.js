const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: "node",
  mode: "development",
  entry: {
    app: ["./src/offlineSolving.js"]
  },
  output: {
    path: path.resolve(__dirname, "./build"),
    filename: "bundle-back.js"
  },
  externals: [nodeExternals()]
}
