/**
 * Created by bgllj on 2016/5/25.
 */
const webpack = require('webpack');
const path = require('path');
// const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main:['./components/vue-color-cylinder/test/sample.js'],
        // vendor:["vue"]
    },
    output: {
        path: './',
        filename: 'vcc.js'
    },
    target: 'web',

    module:{
        loaders:[
            {test: /\.vue$/, loader: 'vue'},
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: 'style-loader!css-loader' },
            {test: /\.sass$/, loaders: ["style", "css", "sass"]},
            {test: /\.scss$/, loaders: ["style", "css", "scss"]},
            {test: /\.(png|jpg|jpeg)$/, loader: 'url?limit=8000&name=../bin/img/[name].[ext]'},

            ]},
    plugins: [
        // new webpack.BannerPlugin("---------nullice--------Banner 注释"),
         // new webpack.ProvidePlugin({Vue: 'vue'}),// 注册全局标识符

    ],
    devtool: 'eval',

    vue: {
        loaders: {
            scss: 'style!css!sass',
            // js: 'babel-loader?{"presets":["es2015", "stage-0"], plugins: ["transform-runtime"]}'
        }
    },
    babel: {
        // enable stage 0 babel transforms.
        presets: ['es2015', 'stage-0'],
        plugins: ['transform-runtime',/*"transform-remove-console"*/]
    }
    

    // resolveLoader: {
    //     root: path.join(__dirname, 'node_modules')
    // },
};

