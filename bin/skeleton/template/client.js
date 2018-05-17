import theme from './theme.less'
import create from '@oudyworks/backend-template/html/webpack/create'
import common from './common'
import Vue from 'vue'
import UIkit from 'uikit/src/js/uikit'
import UIkitIcons from 'uikit/dist/js/uikit-icons'

UIkitIcons(UIkit)

const { application, router } = create(),
    init = () =>
        new Vue({
            el: 'body > *',
            ...application
        })

if (/comp|inter|loaded/.test(document.readyState))
    init()
else
    document.addEventListener(
        'DOMContentLoaded',
        init
    )