/* 
 * @Author: boxizen
 * @Date:   2015-11-19 00:42:37
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-19 15:21:12
 */

'use strict';

var program = require('commander'),

    logger = console;

function start() {
    // 配置命令行参数
    program.version('0.0.1')
        .option('-u, --url <url>', 'url')
        .parse(process.argv);

    if (program.url) {
        console.log('url:', program.url);
    }
    
}

start();