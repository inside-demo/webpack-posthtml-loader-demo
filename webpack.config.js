const webpack = require('webpack');
const DashboardPlugin = require('webpack-dashboard/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    target: 'web',
    devtool: 'inline-source-map',
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: './app.js'
    },
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: '[name].js'
    },
    plugins: [
        new DashboardPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/template.html')
        })
    ],
    devServer: {
        open: true,
        contentBase: [path.resolve(__dirname, 'docs')]
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    'html-loader',
                    {
                        loader: 'posthtml-loader',
                        options: {
                            plugins: [
                                require('posthtml-include')({ 
                                    root: path.resolve(__dirname, 'src') 
                                })
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader'
            }
        ]
    }
};