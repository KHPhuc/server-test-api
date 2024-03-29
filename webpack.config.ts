import webpack from "webpack";
import path from "path";
import nodeExternals from "webpack-node-externals";

module.exports = {
  entry: ["webpack/hot/poll?100", "./src/main.ts"],
  watch: true,
  target: "node",
  externals: [
    nodeExternals({
      allowlist: ["webpack/hot/poll?100"],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  mode: "development",
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "main.js",
  },
};
