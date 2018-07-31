const axios = require('axios');

let headerConfig = ()=>{
    let obj = {
        headers : {
            'Content-Type': 'application/json'
        }
    };
    return obj
}

let CancelToken = axios.CancelToken;

const baseObj = {
    timeout: 100000,
    // withCredentials: true,
    responseType: 'json'
}

const errorProcess = (error)=>{
    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);
        console.error(error.response.data)
    
        return Promise.reject(error.response.data)
      } else {
        console.error(error.message)
        return Promise.reject(error.message)
      }
   
}

const successProcess = (res)=>{
    return Promise.resolve(res.data)
}

const $apiProcess = (httpConfig)=>{
    return axios(httpConfig).then(successProcess).catch(errorProcess)
}

exports.createCancelTokenSource = ()=>{
    return CancelToken.source();
}

const generateRequestObj = (method,url,paramsObj,cancelToken,noToken)=>{
    let obj = {
        method: method,
        url,
        cancelToken
    };
    if(method === 'get'){
        obj.params = {params: JSON.stringify(paramsObj)}
    }else{
        obj.data = paramsObj
    }
    return Object.assign({},baseObj,obj,headerConfig(noToken))
}

exports.$get = (url, paramsObj={}, cancelToken)=>{
   let configObj = generateRequestObj('get',url,paramsObj,cancelToken);
   console.log(configObj)
   return $apiProcess(configObj)
}

exports.$getwithCustomCookie = (url, paramsObj={}, cookie)=>{
    let configObj = generateRequestObj('get',url,paramsObj);
    configObj.headers.Cookie = cookie;
    configObj.withCredentials =  true;
    return $apiProcess(configObj)
}

exports.$post = (url, paramsObj={}, cancelToken)=>{
    let configObj = generateRequestObj('post',url,paramsObj,cancelToken);
    return $apiProcess(configObj)
}

exports.$postwithoutauthor = (url, paramsObj={}, cancelToken)=>{
    let configObj = generateRequestObj('post',url,paramsObj,cancelToken,true);
    return $apiProcess(configObj)
}

exports.$postwithformdata= (url, paramsObj={})=>{
    let arr = [];
    for(let i in paramsObj){
        if(paramsObj[i] && paramsObj.hasOwnProperty(i)){
            arr.push(`${i}=${encodeURIComponent(paramsObj[i])}`);
        }
    }
    let configObj = Object.assign({},baseObj,{
        method: 'post',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        url,
        data: arr.join('&')
    })
    return $apiProcess(configObj)
}

exports.$delete = (url, paramsObj={}, cancelToken)=>{
    let configObj = generateRequestObj('delete',url,paramsObj,cancelToken);
    return $apiProcess(configObj)
}