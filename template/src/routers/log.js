import Router from 'koa-router';
import Controller from '../controllers/log';

const router = new Router();


router.post('/', Controller.insert)

router.get('/', Controller.info)

export default router