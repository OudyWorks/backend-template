const base =  require('./webpack.base.config'),
    merge = require('webpack-merge'),
    path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    uikitVersion = require('uikit/package.json').version

module.exports = function webpackBundles(dirname, entry) {
    return merge(
        base(dirname, 'clients'),
        {
            entry,
            output: {
                path: path.join(dirname, 'static'),
                filename: 'js/app.[name].js',
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['es2015', {
                                    targets: {
                                        browsers: [
                                            "> 1%",
                                            "last 2 versions"
                                        ]
                                    }
                                }]
                            ]
                        },
                        exclude: /node_modules/
                    },
                    {
                        test: /\.(less|css)$/,
                        use: [
                            {
                                loader: 'style-loader'
                            },
                            {
                                loader: 'css-loader',
                                options: {
                                    // sourceMap: true,
                                    // modules: true
                                }
                            },
                            {
                                loader: 'less-loader',
                                options: {
                                    // relativeUrls: true
                                }
                            }
                        ]
                        // use: ExtractTextPlugin.extract({
                        //     fallback: 'style-loader',
                        //     use: [
                        //         {
                        //             loader: 'css-loader',
                        //             options: {
                        //                 // sourceMap: true,
                        //                 // modules: true
                        //             }
                        //         },
                        //         {
                        //             loader: 'less-loader',
                        //             options: {
                        //                 // relativeUrls: true
                        //             }
                        //         }
                        //     ]
                        // })
                    },
                    // {
                    //     test: /\.css$/,
                    //     use: [
                    //         {
                    //             loader: 'style-loader'
                    //         },
                    //         {
                    //             loader: 'css-loader'
                    //         }
                    //     ]
                    //     // loader: ExtractTextPlugin.extract({
                    //     //     use: 'css-loader',
                    //     //     fallback: 'vue-style-loader'
                    //     // })
                    // },
                    // {
                    //     test: /\.css$/,
                    //     use: [
                    //         'vue-style-loader',
                    //         'css-loader'
                    //     ]
                    // },
                    {
                        loader: 'html-loader',
                        test: /\.svg$/,
                        options: {
                            minimize: false
                        }
                    }
                ]
            },
            plugins: [
                // new ExtractTextPlugin('css/app.[name].css'),
                new webpack.DefinePlugin({
                    BUNDLED: true,
                    VERSION: `'${uikitVersion}'`
                })
            ],
        }
    )
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.mode = 'production'
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            },
            extractComments: true
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}