import DB from '../lib/db'
class Log {
    constructor(){

    }
    insert = async (ctx)=>{
        let db = await DB();
        let obj = ctx.request.body;
        let res = await db.collection('statistic').insert(obj)
        return ctx.respondData(200,res);
    }
    info = async (ctx)=>{
       return ctx.respondData(200)
    }
}


export default new Log();