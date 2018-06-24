import Vue from 'vue'
import Vuex from 'vuex'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import VueMeta from 'vue-meta'
import Application from '../application'

Vue.use(Vuex)
Vue.use(VueI18n)
Vue.use(VueRouter)
Vue.use(VueMeta)

export default function create() {

    const router = new VueRouter({
            mode: 'history',
            routes: APPLICATION.routes
        }),
        store = new Vuex.Store({
            state: {
                ready: false,
                busy: true,
                component: '',
                task: '',
            }
        }),
        i18n = new VueI18n({
            locale: 'en',
            messages: {
                en: APPLICATION.locales
            },
        }),
        application = {
            router,
            i18n,
            store,
            render: h =>
                h({
                    ...Application
                })
        },
        _t = i18n._t

    i18n._t = function (key, _locale, messages, host) {
        var values = [], len = arguments.length - 4;
        while ( len-- > 0 ) values[ len ] = arguments[ len + 4 ];
        if(!key.match(/^(component|module)/)) {
            let component = host.$options.component,
                task = host.$options.task,
                module = host.$options.module
            if(i18n._te(`component.${component}.${key}`, _locale, messages))
                key = `component.${component}.${key}`
            else if(i18n._te(`component.${component}.${task}.${key}`, _locale, messages))
                key = `component.${component}.${task}.${key}`
            else if(i18n._te(`module.${module}.${key}`, _locale, messages))
                key = `module.${module}.${key}`
        }
        return _t.apply(i18n, [key, _locale, messages, host].concat(values))
    }

    return { application, router, i18n, store }
}