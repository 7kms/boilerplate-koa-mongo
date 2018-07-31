

import path from 'path';
import DEV_CON from './dev';
import PRO_CON from './product';
import TEST_CON from './test';


let obj  = {
    app:{
        port: 6602
    },
    dir:{
        logdir: path.resolve(__dirname,'../logs')
    }
}
let envObj = process.env.NODE_ENV == 'production' ? PRO_CON : process.env.NODE_ENV == 'gray' ? TEST_CON : DEV_CON;  
const config = Object.assign({},obj,envObj)

export default config