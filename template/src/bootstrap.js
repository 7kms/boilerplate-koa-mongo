import Koa from 'koa';
import Router from 'koa-router'
import apiRouter from './routers'
import {logger} from './utils/index'
import middleware from './middleware'
import onerror from 'koa-onerror'
import session from 'koa-session'
import MongoSessionStore from './lib/session-mongo'

global.__logger__ = logger

export default (port)=>{
  const server = new Koa()
  const router = new Router()
  server.keys = ['app-secret-key'];
  // server.proxy = true;
  onerror(server);
  server.use(session({
      key:'ndogstatistics',
      store: new MongoSessionStore()
  },server));

  router.use('/api', async(ctx,next)=>{
        let requestDate = Date.now();
        _console.log(`request ${ctx.request.url}`)
        await next();
        _console.log(`response %s %d`, ctx.request.url, Date.now() - requestDate)
    }, middleware(), apiRouter.routes());

  server.use(router.routes())
  
  server.listen(port, (err) => {
    if(!err){
      _console.info(`> App is ready on http://localhost:${port}`)
    }else{
      _console.error(err)
      process.exit(0)
    }
  })
}
