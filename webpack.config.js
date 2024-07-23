
const webpack = require('webpack');
const path = require('path');
//const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin({filename: '[name].bundle.css', allChunks: true});

const port = process.env.PORT || 3000;

module.exports = {
  // Webpack configuration goes here
  entry: "./src/index.tsx",
  output: { path: path.join(__dirname, "logAnalyzer/bundle"), filename: "index.bundle.js", hashFunction: 'xxhash64', },
  mode: process.env.NODE_ENV || "development",
  resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
  devServer: { contentBase: path.join(__dirname, "src") },
  devtool: 'inline-source-map',
  plugins: [//new UglifyJsPlugin(), 
    extractCSS,
    //new HtmlWebpackPlugin()
           ],
  module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: ["ts-loader"],
            },
            {
              test: /\.css$/,
              use: extractCSS.extract([{
                  loader: 'css-loader'
              }])
            },
            {   test: /\.(gif|GIF|png|jpg)/,
                use: 'url-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
        ],
    },
};