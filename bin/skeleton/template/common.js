const appScript = {
        src: '/static/js/app.html.js',
        type: 'text/javascript',
        async: true
    },
    icon = {
        href: 'data:;base64,iVBORw0KGgo=',
        rel: 'icon'
    }

export default application => {
    application.metaInfo.titleTemplate = '%s - Website'
    application.metaInfo.script.push(appScript)
    application.metaInfo.link = [icon]
}