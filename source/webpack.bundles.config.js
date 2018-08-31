const base =  require('./webpack.base.config'),
    path = require('path'),
    merge = require('webpack-merge')

module.exports = function webpackBundles(dirname, entry, includeApplication = false) {
    return merge(
        base(dirname, 'bundles', includeApplication),
        {
            target: 'node',
            entry,
            output: {
                libraryTarget: 'commonjs2',
                path: dirname,
                filename: 'webpack.bundle.[name].js',
            },
            module: {
                rules: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: /node_modules/
                    },
                    {
                        test: /\.css$/,
                        use: [
                            'vue-style-loader',
                            'css-loader'
                        ]
                    },
                    {
                        test: /\.(less)$/,
                        use: [
                            {
                                loader: 'css-loader',
                            },
                            {
                                loader: 'less-loader',
                            }
                        ]
                    },
                ]
            },
            resolve: {
                alias: {
                    'template-uikit': path.join(__dirname, 'uikit-bundle.js')
                }
            },
        }
    )
}