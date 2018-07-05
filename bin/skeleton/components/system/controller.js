

export default class Controller {

    static async beforeInitiate(application, request, response) {



    }

    static async beforeLoad(application, request, response, route, payload) {



    }

    static async afterLoad(application, request, response, route, payload) {

        if(payload.constructor.name == 'Object' && (application.socket || request.accepts.type('html', 'json') == 'json')) {

            Object.assign(
                payload,
                payload.state
            )

            delete payload.ssr
            delete payload.state

        }

    }

}