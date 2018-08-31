import create from './create'
import Vue from 'vue'
import UIkit from 'template-uikit'
import backend from '@oudyworks/backend-client'

const { application, router, i18n, store } = create()

Vue.set(store.state, 'state', window.__INITIAL_STATE__)

class Client {
    static async setup() {
        Vue.mixin({
            beforeRouteEnter(to, from, next) {
                new Promise(
                    (resolve, reject) =>
                        Client.mixin.beforeRouteEnter(to, from, resolve, reject)
                ).then(
                    route => {
                        if(route)
                            return next(route)
                        let promises = []
                        Client.getState(promises, to, from, next)
                        Promise.all(promises).then(
                            states =>
                                next(
                                    vm => {
                                        states.map(
                                            ({response, next}) =>
                                                next.bind(vm)(response, vm)
                                        )
                                        to.matched.forEach(
                                            route =>
                                                Object.values(route.components).forEach(
                                                    component => {
                                                        vm.$set(vm.$store.state, 'component', component.component)
                                                        vm.$set(vm.$store.state, 'task', component.task || 'default')
                                                    }
                                                )
                                        )
                                        Client.getBreadcrumbs.bind(vm)(to, vm)
                                    }
                                )
                
                        ).catch(
                            error =>
                                Client.catchError(error, to, next)
                        )
                    }
                ).catch(
                    () =>
                        next(false)
                )
            },
            beforeRouteUpdate(to, from, next) {
                let promises = []
                Client.getState(promises, to, from, next)
                Promise.all(promises).then(
                    states => {
                        states.map(
                            ({response, next}) =>
                                next.bind(this)(response, this)
                        )
                        Client.getBreadcrumbs.bind(this)(to, this)
                        next()
                    }
                ).catch(
                    error =>
                        Client.catchError(error, to, next)
                )
            },
            beforeRouteLeave(to, from, next) {
                next()
            },
            methods: {
                refresh() {
                    let promises = []
                    Client.getState(promises, this.$router.currentRoute)
                    Promise.all(promises).then(
                        states => {
                            states.map(
                                ({response, next}) =>
                                    next.bind(this)(response, this)
                            )
                        }
                    )
                }
            }
        })
    }
    static init(url, websocket = true) {
        return this.setup().then(
            () => 
                this.connect(url, websocket)
        ).then(
            () => 
                this.mount()
        )
    }
    static mount() {
        return new Vue({
            el: 'body > *',
            ...application
        })
    }
    static connect(url, websocket = true) {
        return backend.connect(url, websocket).then(
            () => {
                if(backend.websocket)
                    backend.websocket.onclose = () =>
                        setTimeout(
                            () =>
                                this.connect(url, websocket),
                            3000
                        )
                }
        )
    }
    static getState(promises, to, from, next) {
        to.matched.forEach(
            route =>
                Object.values(route.components).forEach(
                    component => {
                        if(component.getState)
                            promises.push(
                                new Promise(
                                    async (resolve, reject) => {
    
                                        let getState = component.getState
    
                                        switch (typeof component.getState) {
                                            case 'boolean':
                                                getState = (to, backend) => {
                                                    let bind = {
                                                            resolved: false,
                                                            next(response) {
                                                                Object.keys(response).forEach(
                                                                    key =>
                                                                        this.vm.$set(
                                                                            this.vm.$data, key, response[key]
                                                                        )
                                                                )
                                                            },
                                                            vm: null
                                                        }
                                                    return backend.request({
                                                        url: to.path,
                                                        data: to.query,
                                                        subscribe: !!component.subscribe,
                                                        resolve: (response) => {
                                                            if(response.error)
                                                                reject(response.error)
                                                            else {
                                                                if(bind.vm)
                                                                    bind.next(response)
                                                                else
                                                                    resolve({
                                                                        response,
                                                                        next: (response, vm) => {
                                                                            bind.vm = vm
                                                                            bind.next(response)
                                                                            if(!!component.subscribe)
                                                                                vm.$on(
                                                                                    'beforeDestroy',
                                                                                    () =>
                                                                                        backend.get(
                                                                                            to.path,
                                                                                            {
                                                                                                unSubscribe: response.subscription
                                                                                            }
                                                                                        )
                                                                                )
                                                                        }
                                                                    })
                                                            }
                                                        }
                                                    })
                                                }
                                                break
                                        }
    
                                        getState(to, backend)
    
                                    }
                                )
                            )
                    }
                )
        )
    }
    static catchError(error, to, next) {
        next({ name: 'error', params: { code: error.code, '0': to.path }})
    }
    static getBreadcrumbs(to) {
        this.$set(
            this.$store.state,
            'breadcrumbs',
            [
                {
                    url: '/',
                    name: 'Shepherd'
                }
            ]
        )
        to.matched.forEach(
            route =>
                Object.values(route.components).forEach(
                    component => {
                        if(component.breadcrumbs) {

                            let breadcrumbs = component.breadcrumbs.bind(this)()

                            breadcrumbs.forEach(
                                element =>
                                    this.$set(
                                        this.$store.state.breadcrumbs,
                                        this.$store.state.breadcrumbs.length,
                                        element
                                    )
                            )

                        }
                    }
                )
        )
    }
}

Client.mixin = {
    beforeRouteEnter(to, from, next, abort) {
        return next()
    }
}

Object.assign(
    Client,
    { application, router, i18n, store }
)

// window.onbeforeunload = function() {
//     backend.websocket.onclose = function () {}
//     backend.websocket.close()
// }

export default Client