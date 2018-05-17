const config = require('@oudyworks/backend-template/webpack.bundles.config'),
    path = require('path')

module.exports = config(
    __dirname,
    {
        'html': path.join(__dirname, './template/bundle.js')
    }
)