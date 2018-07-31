import program from 'commander';
import BootStrap from '../src/bootstrap';

program.option('-p, --port <n>')
       .parse(process.argv)

// console.log('program.port %j',program.port)
// console.log('program.client',program.client)
// console.log('program.api',program.api)

BootStrap(program.port);
