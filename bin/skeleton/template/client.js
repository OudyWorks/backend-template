import theme from './theme.less'
import Client from '@oudyworks/backend-template/html/webpack/client'
import common from './common'
import Vue from 'vue'
import backend from '@oudyworks/backend-client'

const init = () =>
    Client.setup().then(
        () => 
            Client.connect()
    ).then(
        () => 
            Client.mount()
    )

if (/comp|inter|loaded/.test(document.readyState))
    init()
else
    document.addEventListener(
        'DOMContentLoaded',
        () =>
            init()
    )