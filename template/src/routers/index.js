import Router from 'koa-router';

import Log from './log';

const router = new Router()

router.use('/log',Log.routes())

export default router;