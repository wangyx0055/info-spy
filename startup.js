/* 
 * @Author: boxizen
 * @Date:   2015-11-19 00:42:37
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-20 16:56:01
 */

'use strict';

var program = require('commander'),
	
	spy = require('./spy'),

    logger = console;

function start() {
    
    // 配置命令行参数
    program.version('0.0.1')
        .option('-u, --url <url>', 'url')
        .parse(process.argv);

    // 初始化spy配置参数
    spy.init();

    // 运行spy
    if (program.url) {
        spy.run(program.url);
    }
    
}

start();