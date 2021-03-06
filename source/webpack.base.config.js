const path = require('path'),
    fs = require('fs'),
    webpack = require('webpack'),
    VueLoaderPlugin = require('vue-loader').VueLoaderPlugin

module.exports = function webpackBase(dirname, environment, includeApplication) {
    return  {
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                // {
                //     test: /\.txt$/,
                //     use: 'raw-loader'
                // }
            ]
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                'template-uikit': path.join(__dirname, 'uikit.js'),
                'APPLICATION': path.resolve(includeApplication ? dirname : __dirname, './webpack.common.js')
            }
        },
        plugins: [
            new webpack.ProvidePlugin({
                'APPLICATION': 'APPLICATION'
            }),
            new VueLoaderPlugin(),
            {
                apply(compiler) {
                    compiler.hooks.afterEmit.tap('AfterEmitPlugin', compilation => {
                        let hash
                        try {
                            hash = require(path.join(dirname, `./webpack.${environment}.hash.js`))
                        } catch(e) {}
                        if(compilation.hash != hash)
                            fs.writeFileSync(path.join(dirname, `./webpack.${environment}.hash.js`), `module.exports = '${compilation.hash}'`)
                    })
                }
            }
        ],
        mode: 'development'
    }
}