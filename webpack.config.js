var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry:[
        './js/app.js'
    ],

    output: {
        filename: 'bundle.[hash].js',
        publicPath: ''
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot',
                    'babel-loader?presets[]=es2015&presets[]=react'
                ]
            },
            {test: /\.css$/, exclude: /node_modules/, loader: "style-loader!css-loader"},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: 'temp.hbs',
            filename:"index.html",
            inject: 'body'
        })
    ]
};
