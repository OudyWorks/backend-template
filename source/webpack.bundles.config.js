const base =  require('./webpack.base.config'),
    merge = require('webpack-merge')

module.exports = function webpackBundles(dirname, entry) {
    return merge(
        base(dirname, 'bundles'),
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
                ]
            },
        }
    )
}