import logo from './loader/logo'

const style = require('!!raw-loader!./loader/style.css')

export default {
    name: 'loader',
    metaInfo: {
        title: 'Website',
        style: [
            { cssText: style, type: 'text/css' }
        ],
        script: [
            {
                innerHTML: `document.getElementById('loading').removeAttribute('data-server-rendered')`,
                type: 'text/javascript',
                body: true
            }
        ],
        __dangerouslyDisableSanitizers: ['script', 'style']
    },
    render(h) {
        return <div id="loading">
            <div id="bg">
                <div id="animation"></div>
            </div>
            <div id="b">
                <div id="h"></div>
                <div id="l">
                    {h(logo)}
                </div>
                <div id="nlpt"> </div>
                <div style="animation:a-s .25s 1.25s 1 forwards;opacity:0" class="msg">Loading</div>
            </div>
        </div>
    }
}