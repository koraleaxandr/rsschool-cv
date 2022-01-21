/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const {merge} = require('webpack-merge');
const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = {
    entry: {
        main: path.resolve(__dirname, 'src/js/index.ts'),
    },
    module: {
   rules: [
            // JavaScript
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            // TypeScript
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: ['ts-loader'],
            },
            //FILES
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
            //CSS
            {
                test: /\.css$/i,
                use: ["style-loader", {
                    loader: "css-loader",
                    options: {
                        url: false,
                    }
                }],
            },
            //SVG
            {
                test: /\.svg$/,
                use: 'svg-inline-loader'
            },
        ],
  },
  resolve: {
        extensions: ['.js', '.ts'],
    },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index_bundle.js'
  },
  plugins: [
         new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'async Race',
            template: path.resolve(__dirname, './src/template.html'), // шаблон
            filename: 'index.html', // название выходного файла
        }),
               new CopyPlugin({
      patterns: [
        { from: "src/assets", to: "assets" },
        // { from: "other", to: "public" },
      ],
    }),
    ],  
}

module.exports = ({
    mode
}) => {
    const isProductionMode = mode === 'prod';
    const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

    return merge(baseConfig, envConfig);
};