let create = require('./create').default,
    Vue = require('vue').default,
    UIkit = require('uikit').default

const { application, router } = create()

export default new Vue({
    el: 'body > *',
    ...application
})