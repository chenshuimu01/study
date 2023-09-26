const path = require('path');
const getPath = (pathStr) => path.resolve(__dirname, pathStr);
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    getPath('./src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'), // 输出目录为dist文件夹
    filename: 'static/js/[name].[hash].js', // 输出的JavaScript文件路径
    clean: true, // 每次构建前清理dist文件夹
    // publicPath: '/', // 添加publicPath，确保正确的资源路径
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:8].[ext]', 
              outputPath: 'static/images', // 可选，指定输出目录
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/,
        // include: /node_modules/,
        use: [
          'style-loader', 
          // 'css-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, './public'),
    port: 8080,
    open: true,
    hot: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html', // 使用public下的index.html作为模板
      filename: 'index.html', // 输出的HTML文件名
      hash: true,
      minify: {
        collapseWhitespace: true,
      },
    }),
  ],
};
