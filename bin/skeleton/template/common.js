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
    <h1>
        AE
    </h1>

const appScript = {
    src: '/static/js/app.html.js',
    type: 'text/javascript',
    async: true
},
icon = {
    href: 'data:;base64,iVBORw0KGgo=',
    rel: 'icon'
}

loader.metaInfo.title = 'Loading'
loader.metaInfo.titleTemplate = '%s - Website'
loader.metaInfo.script.push(appScript)
loader.metaInfo.link = [icon]
application.metaInfo.titleTemplate = '%s - Website'
application.metaInfo.script.push(appScript)
application.metaInfo.link = [icon]