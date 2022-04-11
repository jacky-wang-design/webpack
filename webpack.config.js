const path = require("path")
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin') // 源码中以对象形式导出，并且命名必须与plugin同名（矫情）
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry:
    // entry1: './entry/entry1.js',
    // entry2: './entry/entry2.js'
    './src/index.js',
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
      directory: path.join(__dirname, './src'),
    },
    compress: true,
    port: 9000,
  },
  plugins: [
    new HtmlPlugin({
      template: './src/index.html',
      // template: path.resolve(__dirname, '/src/index.html'),
      // inject: "body",
      filename: 'index.[contenthash:8].html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.(s[ac]|c)ss$/i, //匹配所有的 sass/scss/css 文件
        use: [
          // 'style-loader',
          MiniCssExtractPlugin.loader, // 添加 loader
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }
    ]
  }
}