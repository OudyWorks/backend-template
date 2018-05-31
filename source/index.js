import Renderer from '@oudyworks/backend/Renderer'
import HTML from './html'
import booleanify from 'booleanify'

class Template extends Renderer {
    static use(Application) {
        Application.triggers.beforeInitiate.push(
            async (application, request, response) => {
                response.ssr = booleanify(request.getGET('ssr')) || this.ssr
            }
        )
        Application.triggers.afterRoute.push(
            async (application, request, response, route) => {
                if(!application.socket && !route.viewLess && !response.ssr && request.accepts.type(this.types) == 'html') {
                    Object.keys(route).forEach(
                        key =>
                            delete route[key]
                    )
                    route.component = 'template'
                    route.task = 'default'
                    route.url = /.*/
                    route.allowed = true
                }
            }
        )
        Application.triggers.beforeLoad.push(
            async (application, request, response, route, payload) => {
                payload.ssr = response.ssr
                payload.state = {}
            }
        )
        Application.components.template = {
            default: {
                async run(application, request, response, route, payload) {
                    return payload
                }
            }
        }
        Application.Renderer = this
    }
    static async render(application, request, response, route, payload) {

        let type = request.accepts.type(this.types),
            language = request.accepts.language(this.languages)

        if(type == 'html' && !application.socket)
            payload = await HTML.render(application, request, response, route, payload)

        return super.render(application, request, response, route, payload)

    }
}

Template.ssr = false
Template.types = ['html', 'json']
Template.languages = ['en', 'fr', 'ar']

export default Template