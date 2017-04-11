/**
 * Created by bgllj on 2016/5/25.
 */
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main:['babel-polyfill','./index.js'],
        // vendor:["vue"]
    },
    output: {
        path: './bin/JS',
        filename: 'main.js'
    },
    target: 'node',

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
        new webpack.BannerPlugin("UI-DNA By nullce - nullice.com - ui@nullice.com\n"+"这些代码由 Webpack1 打包生成，查看源代码请到 https://github.com/nullice/UI-DNA/tree/master/DVE"),
        // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
        new CopyWebpackPlugin(
            [{ context: 'Enzymes/', from:"*_lib.jsx", to: __dirname+'/bin/JSX' },
                { context: 'Proteins/', from:"*_lib.jsx", to: __dirname+'/bin/JSX' },
                { context: 'Proteins/libs', from:"*.jsx", to: __dirname+'/bin/JSX/Proteins_libs' },
        ]),
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

