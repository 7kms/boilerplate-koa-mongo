import Logger from 'mini-logger'
import config from '../config'

export const autobind =  (self, options)=>{
    options = Object.assign({}, options);
    const filter = key => {
        const match = pattern => typeof pattern === 'string' ? key === pattern : pattern.test(key);
        if (options.include) {
            return options.include.some(match);
        }
        if (options.exclude) {
            return !options.exclude.some(match);
        }
        return true;
    };
    for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(self))) {
        const val = self[key];
        if (key !== 'constructor' && typeof val === 'function' && filter(key)) {
            self[key] = val.bind(self);
        }
    }
    return self;
}

export const logger = Logger({
    dir: config.dir.logdir,
    // categories: ['rejected'],
    format: 'YYYY-MM-DD-[{category}][.log]',
    stdout: true,
    timestamp:true
})
