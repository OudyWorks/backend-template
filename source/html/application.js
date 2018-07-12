import Vue from 'vue'
import classes from './application/classes'

require('./application/style.less')

let $application = {
    defaultClasses: {},
    classes: {},
    layout: {
        mobile: {
            breakpoint: 's',
            logo: 'center', // left, center, right
            toggle: 'left', // left, right
            toggleText: 'Menu', // left, right
            search: false, // left, right
            animation: 'offcanvas', // offcanvas, modal, dropdown
        },
        toolbar: {
            fullWith: false,
            center: false
        },
        header: {
            layout: 'horizontal-left', //horizontal-left, horizontal-center, horizontal-right, stacked-center-a, stacked-center-b, stacked-center-split, stacked-left-a, stacked-left-b, offcanvas-top-a, offcanvas-top-b, offcanvas-center-a, offcanvas-center-b, modal-top-a, modal-top-b, modal-center-a, modal-center-b
            fullWidth: false,
            removeLogoPadding: false
        },
        navbar: {
            sticky: 0, // 0: Static, 1: Sticky, 2: Sticky on scroll up
        },
        sidebar: {
            width: '1-5', // 1-5, 1-4, 1-3, 2-5, 1-2
            gutter: '', // , small, large, collapse
            divider: false,
            breakpoint: 'm',
            first: false
        },
        breadcrumbs: false,
        offcanvas: true,
        pageContainer: false,
    },
    modules: {

    },
    update(to) {
        this.classes = classes(this.layout)
        Object.keys(this.defaultClasses).forEach(
            position => {
                if (this.defaultClasses[position]) {
                    if (this.defaultClasses[position].set)
                        this.classes[position] = this.defaultClasses[position].set
                    if (this.defaultClasses[position].append)
                        this.classes[position] = this.classes[position].concat(this.defaultClasses[position].append)
                    if (this.defaultClasses[position].prepend)
                        this.classes[position] = this.defaultClasses[position].prepend.concat(this.classes[position])
                    if (this.defaultClasses[position].remove && this.classes[position])
                    this.defaultClasses[position].remove.forEach((className) => {
                            let index = this.classes[position].indexOf(className)
                            if (index != -1)
                                this.classes[position].splice(index, 1)
                        })
                }
            }
        )
        to.matched.forEach(
            route =>
                Object.keys(route.components).forEach(
                    component => {
                        if(route.components[component].classes) {
                            let classes = route.components[component].classes
                            if(typeof classes == 'function')
                                classes = classes(route.instances[component])
                            Object.keys(classes).forEach(
                                position => {
                                    if (classes[position]) {
                                        if (classes[position].set)
                                            this.classes[position] = classes[position].set
                                        if (classes[position].append)
                                            this.classes[position] = this.classes[position].concat(classes[position].append)
                                        if (classes[position].prepend)
                                            this.classes[position] = classes[position].prepend.concat(this.classes[position])
                                        if (classes[position].remove && this.classes[position])
                                            classes[position].remove.forEach((className) => {
                                                let index = this.classes[position].indexOf(className)
                                                if (index != -1)
                                                    this.classes[position].splice(index, 1)
                                            })
                                    }
                                }
                            )
                        }
                    }
                )
        )
    },
    render(position, h) {
        return this.modules && this.modules[position] && this.modules[position].map(
            module =>
                h(APPLICATION.modules[module])
        )
    }
}

Vue.use(function (Vue) {
    Vue.prototype.$application = $application
})


export default {
    name: 'application',
    metaInfo: {
        title: '',
        titleTemplate: '%s - Website',
        meta: [
            {
                charset: 'UTF-8'
            },
            {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge'
            },
            {
                'http-equiv': 'content-type',
                content: 'text/html; charset=utf-8'
            },
            {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1'
            }
        ],
        script: [
            // {
            //     src: '/static/js/app.html.js',
            //     type: 'text/javascript',
            //     async: true
            // }
        ],
        link: [
            // {
            //
            //     href: '/static/css/app.html.css',
            //     rel: 'stylesheet'
            // }
        ],
        __dangerouslyDisableSanitizers: ['script', 'style']
    },
    data() {
        return {
            
        }
    },
    created() {

        this.$application.router = this.$router

        this.$router.beforeEach(
            (to, from, next) => {
                this.$set(this.$store.state, 'busy', true)
                next()
            }
        )
        this.$router.beforeResolve(
            (to, from, next) => {
                this.$application.update(to)
                next()
            }
        )
        this.$router.onReady(
            () => {
                this.$application.update(this.$router.currentRoute)
                this.$set(this.$store.state, 'ready', true)
            }
        )
        this.$router.afterEach(
            (to, from) => {
                this.$set(this.$store.state, 'busy', false)
            }
        )

    },
    render(h) {

        let application = this.$application,
            mobileModule = 'skjdhkjsh',
            mobile = {
                logo: application.render('logo.mobile', h),
                toggle: <a class="uk-navbar-toggle" href={'#'+mobileModule} uk-toggle="">
                    {
                        (() => {
                            let elements = [
                                <div uk-navbar-toggle-icon=""></div>
                            ]
                            if(application.layout.mobile.toggleText)
                                elements[application.layout.mobile.toggle == 'right' ? 'unshift' : 'push'](
                                    <span class={`uk-margin-small-${application.layout.mobile.toggle}`}>
                                        {application.layout.mobile.toggleText}
                                    </span>
                                )
                            return elements
                        })()
                    }
                </a>,
                search: <a class="uk-navbar-item">
                    TPL_SEARCH
                </a>
            },
            toolbar = {
                left: application.render('toolbar.left', h),
                right: application.render('toolbar.right', h),
            },
            header = {
                logo: application.render('logo', h),
                navbar: application.render('navbar', h)
            }

        let page = <div class={application.classes['page']} hidden={!this.$store.state.ready}>
            <div class={application.classes['header-mobile']}>
                <nav class="uk-navbar-container uk-navbar" uk-navbar="">
                    {
                        ['logo', 'toggle', 'search'].map(p => application.layout.mobile[p]).includes('left') && <div class="uk-navbar-left">
                            {
                                application.layout.mobile.toggle == 'left' && mobile.toggle
                            }
                        </div>
                    }
                    {
                        application.layout.mobile['logo'] == 'center' && <div class="uk-navbar-center">
                            {
                                mobile.logo
                            }
                        </div>
                    }
                    {
                        ['logo', 'toggle', 'search'].map(p => application.layout.mobile[p]).includes('right') && <div class="uk-navbar-right">
                            {
                                application.layout.mobile.toggle == 'right' && mobile.toggle
                            }
                        </div>
                    }
                </nav>
                <div id={mobileModule} uk-offcanvas="" mode="push" overlay flip={application.layout.mobile.toggle == 'right'}>
                    <div class="uk-offcanvas-bar">
                        <button class="uk-offcanvas-close uk-icon" type="button" uk-close=""></button>
                        <div class="uk-margin-auto-vertical uk-width-1-1">
                            <h2>Hello offcanvas</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class={application.classes['toolbar']}>
                <div class={application.classes['toolbar.container']}>
                    <div>
                        <div class="uk-grid-medium uk-child-width-auto uk-flex-middle" uk-grid="margin: uk-margin-small-top">
                            {toolbar.left}
                            {
                                application.layout.toolbar.center && toolbar.right
                            }
                        </div>
                    </div>
                    {
                        !application.layout.toolbar.center && <div class="uk-margin-auto-left">
                            <div class="uk-grid-medium uk-child-width-auto uk-flex-middle" uk-grid="margin: uk-margin-small-top">
                                {toolbar.right}
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div uk-header="" class={application.classes['header']}>
                {
                    ['horizontal-left', 'horizontal-center', 'horizontal-right'].includes(application.layout.header.layout) && (() => {

                        let $header = <div class="uk-navbar-container">
                            <div class={application.classes['header.container']}>
                                <nav uk-navbar="" class="uk-navbar">
                                    <div class="uk-navbar-left">
                                        <div class="uk-navbar-item">
                                            {
                                                application.render('header-logo', h)
                                            }
                                        </div>
                                        {
                                            application.layout.header.layout == 'horizontal-left' && header.navbar
                                        }
                                    </div>
                                    <div class="uk-navbar-center">
                                        {
                                            application.layout.header.layout == 'horizontal-center' && header.navbar
                                        }
                                    </div>
                                    <div class="uk-navbar-right">
                                        {
                                            application.layout.header.layout == 'horizontal-right' && header.navbar
                                        }
                                        {
                                            application.render('header', h)
                                        }
                                    </div>
                                </nav>
                            </div>
                        </div>

                        return $header

                    })()
                }
            </div>
            <div>
                {
                    application.render('section-top', h)
                }
            </div>
            <div class={application.classes['main']} uk-height-viewport="expand: true">
                <div class={application.classes['main.container']}>
                    <div class={application.classes['main.grid']} uk-grid="">
                        <div class={`uk-width-expand@${application.layout.sidebar.breakpoint}`}>
                            <div class={application.classes['breadcrumbs']}>
                                {
                                    application.render('breadcrumbs', h)
                                }
                            </div>
                            <router-view ref="view"></router-view>
                        </div>
                        <aside class={application.classes['sidebar']}>
                                {
                                    application.render('sidebar', h)
                                }
                        </aside>
                    </div>
                </div>
            </div>
            <div>
                {
                    application.render('section-bottom', h)
                }
            </div>
            <footer class={application.classes['footer']}>
                {
                    application.render('footer', h)
                }
            </footer>
            <div uk-spinner="" hidden={!this.$store.state.busy}></div>
        </div>

        if(application.layout.pageContainer)
            page = <div class="tm-page-container">
                {page}
            </div>

        if(application.layout.offcanvas)
            page = <div class="uk-offcanvas-content">
                {page}
            </div>

        return page
    }
}