import DB from './db';

class MongoStore {
    constructor (options) {
        options = options || {};
        options.collection = options.collection || 'sessions';
        // options.connection = options.connection || mongoose;
        options.expires = options.expires || 60 * 60 * 24 * 14; // 2 weeks
        options.model = options.model || 'SessionStore';
        this.options = options;
    }
    get = async (sid)=>{
        let db = await DB();
        await db.collection(this.options.collection).remove({_expired : {$lt:new Date()}});
        let data = await db.collection(this.options.collection).findOne({id : sid});
        if(!data){
            data = {};
        }
        let _expired = new Date(new Date().getTime() + this.options.expires);
        await db.collection(this.options.collection).update({id : data.id},{$set:{_expired : _expired}});
        delete data._id;
        delete data.id;
        return data;            
    }
    set = async (session, { sid =  this.getID(24), maxAge = this.options.expires } = {})=>{
        let db = await DB();
        session._expired = new Date(new Date().getTime() + this.options.expires);
        await db.collection(this.options.collection).update({id : sid},{$set:session},{upsert:true});
        return sid;
    }
    destroy = async(sid)=>{
        let db = await DB();
        await db.collection(this.options.collection).remove({id : sid});
    }
}

export default MongoStore;