const colors = require('colors');
const logger = require('tracer').colorConsole({
    format : " {{timestamp}} <{{title}}> {{message}} (in {{path}}:{{line}})",
    dateformat : "HH:MM:ss.L",
    filters: {
        log: colors.gray,
        trace : colors.magenta,
        debug : colors.blue,
        info : colors.green,
        warn : colors.yellow,
        error : [ colors.red, colors.bold ]
    }
})

module.exports = logger
// module.exports = (() =>{
//     if(typeof logger !== 'undefined'){
//         let master
//         if(typeof window !== 'undefined'){
//             master =window
//         }else{
//             master = global
//         }
//         master._console = master.console
//         delete master.console
//         master.console = logger
//     }
//     return logger
// })()
