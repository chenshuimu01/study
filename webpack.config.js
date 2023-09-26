const path = require('path');
const getPath = (pathStr) => path.resolve(__dirname, pathStr);
const HtmlWebpackPlugin = require('html-webpack-plugin');
console.log('webpack');
module.exports = {
  mode: 'development',
  entry: [
    getPath('./src/index.js'),
  ],
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: 'bundle.js',
  // },
  module: {
    rules: [
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
      // {
      //   test: /\.css$/,
      //   exclude: /node_modules/,
      //   use: [
      //     'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         modules: true,
      //       },
      //     },
      //   ],
      // },
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
      template: getPath('public/index.html'), // 输入你的HTML模板路径
    }),
  ],
};
