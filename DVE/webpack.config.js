/**
 * Created by bgllj on 2016/5/25.
 */
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main:'./index.js',
        vendor:['vue']
    },
    output: {
        path: './bin/JS',
        filename: 'main.js'
    },
    target: 'web',

    module:{
        loaders:[
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', query: {presets: 'es2015',}},
            {test: /\.css$/, loader: 'style-loader!css-loader' },
            {test: /\.sass$/, loaders: ["style", "css", "sass"]},
            {test: /\.scss$/, loaders: ["style", "css", "sass"]},
            {test: /\.(png|jpg|jpeg)$/, loader: 'url?limit=8000&name=../bin/img/[name].[ext]'},
            {test: /\.vue$/, loader: 'vue'},

            ]},
    plugins: [
        new webpack.BannerPlugin("---------nullice--------Banner 注释"),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}})
        
        new CopyWebpackPlugin([{ context: 'Enzymes/', from:"*_lib.jsx", to: __dirname+'/bin/JSX' }])
        
        
    ],
    devtool: 'eval-source-map'
};

