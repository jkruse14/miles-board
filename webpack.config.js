var path = require('path');
var webpack = require('webpack');

//const HtmlWebpackPlugin = require('html-webpack-plugin');
//var ExtractTextPlugin = require("extract-text-webpack-plugin");

// const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
//     template: './src/index.html',
//     filename: 'index.html',
//     inject: 'head',
//     chunks: [
//         'app', 'constants', 'directives', 'filters', 'providers', 'services', 'components'
//     ],
//     chunksSortMode: function (chunk1, chunk2) {
//         var orders = [
//             'app',
//             'constants',
//             'directives',
//             'filters',
//             'providers',
//             'services',
//             'components'
//         ];
//         var order1 = orders.indexOf(chunk1.names[0]);
//         var order2 = orders.indexOf(chunk2.names[0]);
//         if (order1 > order2) {
//             return 1;
//         } else if (order1 < order2) {
//             return -1;
//         } else {
//             return 0;
//         }
//     }
// });

module.exports = {
    entry: ['./app/src/index.js'],
    //     components: './app/src/components/index.js',
    //     constants: '.app/src/constants/index.js',
    //     directives: './app/src/directives/index.js',
    //     filters: './app/src/filters/index.js',
    //     providers: './app/src/providers/index.js',
    //     services: './app/src/services/index.js'
    // },
    output: {
        path: __dirname + '/app/assets/javascripts',
        filename: 'app-bundle.js'
    },
    module: {
        loaders: [
            {
                //include: path.resolve(__dirname, 'app/src'),
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.spec.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }, {
                test: /\.html$/,
                loader: 'ngtemplate-loader?module=milesBoard&relativeTo=' + (path.resolve(__dirname, './app/src/')) + '!html-loader',
                //loader: 'html-loader',
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
                exclude: /node_modules/
            } // compiles Less to CSS
        ]
    }
};
