import Component from '@oudyworks/backend-template/component'

export default {
    name: 'error',
    path: '*',
    component: Component.extend({
        name: 'component-error',
        metaInfo() {
            return {
                title: this.$t(`${this.code}.title`),
                meta: [
                    {
                        name: 'description',
                        content: this.$t(`${this.code}.message`)
                    }
                ]
            }
        },
        classes() {
            return {
                'header': {
                    set: [
                        'uk-hidden'
                    ]
                },
                'header-mobile': {
                    set: [
                        'uk-hidden'
                    ]
                },
                'main': {
                    remove: [
                        'uk-section',
                        'uk-section-default'
                    ]
                },
                'sidebar': {
                    set: [
                        'uk-hidden'
                    ]
                },
                'footer': {
                    set: [
                        'uk-hidden'
                    ]
                }
            }
        },
        data() {
            return {
                code: 404,
            }
        },
        render(h, {data, $t, state}) {
            return <div class="uk-height-viewport uk-flex uk-flex-middle uk-flex-center uk-text-center">
                <div class="uk-section">
                    <span uk-icon="icon: warning; ratio: 8"></span>
                    <h2>{data.code}</h2>
                    <p>{this.$t(`${data.code}.title`)}</p>
                    <p>{this.$t(`${data.code}.message`)}</p>
                    <p>
                        <router-link to="/">{this.$t('home')}</router-link> - <a onClick={() => history.go(-1)}>{this.$t('goback')}</a>
                    </p>
                    {
                        data.error && <pre class="uk-text-left">{JSON.stringify(error, null, 4)}</pre>
                    }
                </div>
            </div>
        }
    })
}