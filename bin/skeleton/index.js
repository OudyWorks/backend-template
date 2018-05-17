import {
    Server,
    Application
} from '@oudyworks/backend'
import Template from './template'
import build from '@oudyworks/backend-template/build'

const server = new Server()

Template.use(Application)
// Template.ssr = true

process.on('unhandledRejection', (reason, p) => {
    // this to catch unhandled Rejection, of course we'll have a lot of them :D
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason)
})

Promise.all([
    Application.start(__dirname),
    build(__dirname)
]).then(
    () => {

        server.listen(8080, '127.0.0.1')

        console.log('Started!')

    }
)