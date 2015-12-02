/* 
 * @Author: boxizen
 * @Date:   2015-11-19 00:42:37
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-02 17:41:17
 */

'use strict';

var program = require('commander'),
    cluster = require('cluster'),
    OS = require('os'),

    spy = require('./spy'),
    conf = require('./conf'),

    cpus = OS.cpus().length,
    maxClusterCount = cpus * 2,

    logger = console;

function start() {

    // 配置命令行参数
    program.version('0.0.1')
        .option('-u, --url <url>', 'url')
        .parse(process.argv);

    // 打印系统信息
    logger.info('pid:', process.pid);

    // 捕获异常
    process.on('uncaughtException', function(e) {
        logger.error('Caught exception:', e.stack);
    });

    // 初始化配置参数
    conf.init();
    spy.init();

    // 生产模式下启用多线程
    if (!program.url && cluster.isMaster) {
        for (var i = 0; i < cpus; i++) {
            cluster.fork();
        }
        cluster.on('exit', function() {
            console.log('A worker process died, restarting...');
            cluster.fork();
        });
    }

    // 调试模式
    if (program.url) {
        var task = {};
        task.url = program.url;
        task.done = function(err, result) {
            console.log(result.harvest);
        }
        spy.run(task);
    }

    // 生产模式
    if (!cluster.isMaster) {
        spy.run();
    }
}

start();