import Template from '@oudyworks/backend-template'
import HTML from '@oudyworks/backend-template/html'
import path from 'path'

HTML.loadBundles(path.join(__dirname, '../webpack.bundle.html.js'))


export default Template