import {
    createBundleRenderer
} from 'vue-server-renderer'
import path from 'path'
import fs from 'fs'

class HTML {
    static loadBundles(bundle) {
        this.renderer = createBundleRenderer(fs.readFileSync(bundle, 'utf8'))
    }
    static render(application, request, response, route, payload) {

        let context = {application, request, response, route, payload}

        return this.renderer.renderToString(context).then(
            html => {

                let meta = context.meta.inject()

                return `<!doctype html><html${payload.ssr ? ' data-vue-meta-server-rendered' : ''} ${meta.htmlAttrs.text()}><head>${meta.meta.text()}${meta.title.text()}${meta.link.text()}${meta.style.text()}${meta.script.text()}${meta.noscript.text()}</head><body ${meta.bodyAttrs.text()}>${html}${meta.script.text({body: true})}</body></html>`

            }
        )

    }
}

HTML.renderer = null

export default HTML