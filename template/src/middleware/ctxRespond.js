
'use strict';

const respondData = function(status,json){
    if(!json){
        json = {}
        switch(status){
            case 401:
                json.msg = "forbidden"
                break;
            case 200:
                json.msg = "success"
                break;
        }
    }
    if(typeof json == 'string'){
        json = {msg:json}
    }
    this.status = status;
    this.body = {
        status,
        result: json
    }
}

export default () => {
    return async (ctx, next) => {
        ctx.respondData = respondData.bind(ctx)
        await next();
    }
}