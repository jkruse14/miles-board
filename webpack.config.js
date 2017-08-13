var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: ['./app/src/index.js'],
    output: {
        path: __dirname + '/app/assets/javascripts',
        filename: 'app-bundle.js'
    },
    module: {
        rules: [
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
            }, // compiles Less to CSS
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                exclude: /node_modules/,
                use: [
                    'file-loader?name=[name].[ext]&outputPath=../images/',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            optipng: {
                                optimizationLevel: 7,
                            },
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            pngquant: {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                ]
            }
        ]
    }
};
