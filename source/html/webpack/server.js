import create from './create'
import Vue from 'vue'
import loader from '../loader'

export default async context =>
    new Promise(
        (resolve, reject) => {

            if(context.payload.ssr) {

                let { application, router } = create()
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

                let application = new Vue(loader)
                context.meta = application.$meta()
                resolve(application)

            }

        }
    )