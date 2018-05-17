import fs from 'fs'
import path from 'path'
import eTag from 'etag'
import mime from 'mime'
import DataLoader from 'dataloader'
import {Readable} from 'stream'
import zlib from 'zlib'

const reader = new DataLoader(
    files =>
        Promise.all(
            files.map(
                file => {

                    let body = fs.readFileSync(path.join(__dirname, '../../static', file)),
                        etag = eTag(body)
                    
                    return {
                        body,
                        etag
                    }
                }
            )
        ),
    {
        cache: false
    }
)

class Controller {

    static async run(application, request, response, route, payload) {

        let file = request.path.replace(/^\/static/, ''),
            encoding = request.headers['accept-encoding'] || ''

        encoding = encoding.match(/\bgzip\b/) && 'gzip' || encoding.match(/\bdeflate\b/) && 'deflate' || ''

        let {
            body,
            etag
        } = await reader.load(file)

        let readable = new Readable()

        readable._read = function noop() {}
        readable.push(body)
        readable.push(null)
        if (encoding == 'gzip')
            readable = readable.pipe(zlib.createGzip())
        else if(encoding == 'deflate')
            readable = readable.pipe(zlib.createDeflate())

        response.setHeader('Cache-Control', 'max-age=290304000, public')
        response.setHeader('ETag', etag)
        response.setHeader('Content-Type', mime.getType(file))
        response.setHeader('Content-Encoding', encoding || undefined)

        return readable

    }

}

Controller.route = {
    url: /\/static/,
    allowed: true,
    viewLess: true
}

export default Controller