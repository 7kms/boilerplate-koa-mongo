import koaBody from 'koa-body'
import compose from 'koa-compose'
import parseQurery from './parseQuery'
import ctxRespond from './ctxRespond'

export default ()=>{
    return compose([
        ctxRespond(),
        koaBody({ multipart: true , strict: false}),
        parseQurery()
    ])
}