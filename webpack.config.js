const path = require("path")
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 源码中以对象形式导出，并且命名必须与plugin同名（矫情）
module.exports = {
  entry: {
    entry1: './entry/entry1.js',
    entry2: './entry/entry2.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.[contenthash].js'
  },
  mode: "development",
  // cache: {
  //   type: "memory"
  // },
  devtool: 'eval-cheap-module-source-map',
  optimization: {
    splitChunks: {
      chunks: 'initial',
      maxAsyncRequests: 3,
      minSize: 1,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 1,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, './pubplic'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlPlugin({
      template: path.resolve(__dirname, './pubplic/index.html'),
      inject: "body",
      filename: 'index.[contenthash].html'

    }),
    new CleanWebpackPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      }
    ]
  }
}