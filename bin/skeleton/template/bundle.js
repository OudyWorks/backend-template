import bundle from '@oudyworks/backend-template/html/webpack/server'
import loader from '@oudyworks/backend-template/html/loader'
import logo from '@oudyworks/backend-template/html/loader/logo'
import common from './common'

logo.render = (h) =>
    <h1>
        LOGO
    </h1>

loader.metaInfo.title = 'Loading'
common(loader)

export default bundle