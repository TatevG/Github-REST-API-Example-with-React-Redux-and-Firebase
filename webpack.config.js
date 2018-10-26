const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const modules = require('./webpack.config.modules');

const publicPath = '/';
const srcPath = path.join(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');

let BASE_URL = '';

const config = {

    entry: {
        app: path.join(srcPath, 'index.jsx'),
        forks: path.join(srcPath, 'containers', 'forks', 'index.jsx'),
        root: path.join(srcPath, 'containers', 'root', 'index.jsx'),
    },

    output: {
        path: outputPath,
        publicPath: publicPath,
        filename: '[name].bundle-[hash].js',
    },
    optimization: {
        minimize: process.env.NODE_ENV !== 'developmant',
        runtimeChunk: {
            name: 'vendor'
        },
        splitChunks: {
            chunks: "all",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 10,
            maxInitialRequests: 5,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                default: false,
                commons: {
                    test: /node_modules/,
                    name: "vendor",
                    chunks: "initial",
                    minSize: 3
                },
                styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    enforce: true
                }
            }
        }
    },

    module: modules,
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'developmant'),
            'process.env.BASE_URL': JSON.stringify(BASE_URL),
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.html'),

        }),
        new MiniCssExtractPlugin({
            filename: "[name][hash].css",
        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        port: 3080,
        host: 'localhost',
        disableHostCheck: true,
        historyApiFallback: true,
    },
};
if (process.env.NODE_ENV === 'developmant') {
    config.devtool = 'source-map';
}
module.exports = config;