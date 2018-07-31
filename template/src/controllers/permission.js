
class Permission {
    static async needLogin(ctx,next){
        if(ctx.session.user && ctx.session.user.active){
            ctx._uid = String(ctx.session.user._id)
            ctx.session.user = Object.assign({},ctx.session.user)
            await next()
        }else{
            ctx.respondData(401,"session expired, please relogin")
        }
    }
    static async needAdmin(ctx,next){
        let {user} = ctx.session;
        if(user && (user.isAdmin || user.isMaster)){
            ctx._uid = String(ctx.session.user._id)
            ctx.session.user = Object.assign({},ctx.session.user)
            await next()
        }else{
            ctx.respondData(401)
        }
    }
}


export default Permission