const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    devtool: 'source-map', // for matter.js, https://github.com/liabru/matter-js/issues/1001
    mode: 'production',
    entry: {
        newTab: './src/newTab.jsx',
        physics: './src/physics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "public" },
                { from: "fish", to: "fish" }
            ],
        }),
        new HtmlWebpackPlugin({
            template: './src/newTab.html',
            filename: 'newTab.html',
        }),
        new MiniCssExtractPlugin()
        ],
    module: {
        rules: [{ 
            test: /\.(js|jsx)$/, 
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-react'],
                }
            } 
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        }],
    },
};