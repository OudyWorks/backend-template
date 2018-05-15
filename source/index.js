import Renderer from '@oudyworks/backend/Renderer'
import HTML from './html'

class Template extends Renderer {
    static async render(application, request, response, route, payload) {

        let type = request.accepts.type(this.types),
            language = request.accepts.language(this.languages)

        if(type == 'html')
            payload = await HTML.render(application, request, response, route, payload)

        return super.render(application, request, response, route, payload)

    }
}

Template.types = ['html', 'json']
Template.languages = ['en', 'fr', 'ar']

export default Template