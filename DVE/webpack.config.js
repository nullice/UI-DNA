const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
/**
 * Created by nullice on 2017/4/15.
 */

module.exports = {
    /*...*/
    target: 'node',
    context: __dirname ,
    entry: {
        index: ["babel-polyfill","./index.js"],
    },
    output: {
        path: __dirname + "/bin/JS",
        filename: "main.js",
        // publicPath: "http://cdn.design-enzyme.com/UI-DNA/",
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!postcss-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax',
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ]
    },
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
};









