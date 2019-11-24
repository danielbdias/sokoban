const path = require("path")

module.exports = {
  devtool: "source-map",
  entry: "./src",
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    port: 9000
  }
}
