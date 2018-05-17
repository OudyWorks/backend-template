const config = require('@oudyworks/backend-template/webpack.clients.config'),
    path = require('path')

module.exports = config(
    __dirname,
    {
        'html': path.join(__dirname, './template/client.js')
    }
)