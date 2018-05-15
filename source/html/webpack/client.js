let create = require('./create').default,
    Vue = require('vue').default,
    UIkit = require('uikit/src/js/uikit').default,
    UIkitIcons = require('uikit/dist/js/uikit-icons')

UIkitIcons(UIkit)

const { application, router } = create()

export default new Vue({
    el: 'body > *',
    ...application
})