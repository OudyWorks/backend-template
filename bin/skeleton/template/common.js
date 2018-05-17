import loader from '@oudyworks/backend-template/html/loader'
import application from '@oudyworks/backend-template/html/application'
import logo from '@oudyworks/backend-template/html/loader/logo'
import Vue from 'vue'

Vue.use(function (Vue) {
    Vue.prototype.$application.modules = {
        'logo.mobile': [
            'logo'
        ],
        'header-logo': [
            'logo'
        ]
    }
})

logo.render = (h) =>
    <h1>LOGO</h1>

loader.metaInfo.title = 'Loading'
loader.metaInfo.titleTemplate = '%s - WebsiteName'
loader.metaInfo.script.push({
    src: '/static/js/app.html.js',
    type: 'text/javascript',
    async: true
})
application.metaInfo.titleTemplate = '%s - WebsiteName'
application.metaInfo.script.push({
    src: '/static/js/app.html.js',
    type: 'text/javascript'
})