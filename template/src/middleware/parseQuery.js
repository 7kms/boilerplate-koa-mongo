'use strict';
export default () => {
    return async(ctx, next) => {
        let paramsStr = ctx.request.query.params;
        let paramsObj = {}
        
        if(paramsStr){
            // console.log('===== query params parse start ======')
            paramsObj = JSON.parse(paramsStr)
            Object.assign(ctx.request.query, paramsObj)
            delete ctx.request.query.params
            // console.log(paramsObj,ctx.request.query)
        }
        // console.log('===== query params parse end ======')
        await next();
        
    }
}