import recursiveReadSync from 'recursive-readdir-sync'
import path from 'path'
import fs from 'fs'

const routesRegex = /components[\\\/]([a-zA-Z0-9]+)[\\\/](tasks[\\\/]([a-zA-Z0-9]+)[\\\/])?route.js$/,
    moduleRegex = /modules[\\\/]([a-zA-Z0-9]+)[\\\/]component.(js|vue)$/,
    componentLocalesRegex = /components[\\\/]([a-zA-Z0-9]+)[\\\/](tasks[\\\/]([a-zA-Z0-9]+)[\\\/])?locale[\\\/]source.js$/

export default async directory => {

    let files = recursiveReadSync(path.join(directory)),

    routes = files.filter(
            file =>
                file.match(routesRegex)
        ).map(
            route => {
                let [,component,,task = 'default'] = route.match(routesRegex)
                console.log('component', component, task)
                return `\trequire('${route}').default`
            }
        ),
        modules = files.filter(
            file =>
                file.match(moduleRegex)
        ).map(
            file => {
                let [,module] = file.match(moduleRegex)
                console.log('module', module)
                return `\t'${module}': require('${file}').default`
            }
        ),
        locales = files.filter(
            file =>
                file.match(componentLocalesRegex)
        ).map(
            file => {
                let [,component,,task = 'default'] = file.match(componentLocalesRegex)
                console.log('locale', component, task)
                return `\t\t'${component+(task != 'default' ? '.'+task : '')}': require('${file}').default`
            }
        )

    routes = [routes.join(',\n')]
    modules = [modules.join(',\n')]
    locales = [locales.join(',\n')]

    routes.unshift('export const routes = [')
    routes.push(']')
    modules.unshift('export const modules = {')
    modules.push('}')
    locales.unshift("\t'component': {")
    locales.unshift('export const locales = {')
    locales.push('\t}')
    locales.push('}')
    fs.writeFileSync(
        path.join(directory, 'webpack.common.js'),
        [
            routes.join('\n'),
            modules.join('\n'),
            locales.join('\n'),
        ].join('\n\n'),
        'utf-8'
    )

}