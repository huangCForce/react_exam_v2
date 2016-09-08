var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry:[
        'webpack-dev-server/client?http://127.0.0.1:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server',
        './js/app.js'
    ],

    output: {
        path: path.join(__dirname, 'dist'),
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
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]

}
