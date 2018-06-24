import create from './create'
import Vue from 'vue'
import loader from '../loader'

export default async context =>
    new Promise(
        (resolve, reject) => {

            if(context.payload.ssr) {

                let { application, router, store } = create()

                Vue.set(store.state, 'state', context.payload.state)

                application.metaInfo = {
                    script: [
                        { innerHTML: `window.__INITIAL_STATE__ = ${JSON.stringify(context.payload.state)}`, type: 'text/javascript' }
                    ]
                }
                application = new Vue(application)
                router.push(context.request.url)
                router.onReady(
                    () => {
                        context.router = application.$router
                        context.meta = application.$meta()
                        resolve(application)
                    }
                )

            } else {

                loader.metaInfo.script.push({ innerHTML: `window.__INITIAL_STATE__ = ${JSON.stringify(context.payload.state)}`, type: 'text/javascript' })

                let application = new Vue(loader)
                context.meta = application.$meta()
                resolve(application)

            }

        }
    )