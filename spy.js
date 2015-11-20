/* 
 * @Author: boxizen
 * @Date:   2015-11-19 00:42:01
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-20 18:01:22
 */

'use strict';

var fs = require('fs'),
    path = require('path'),

    logger = console,
    taskFiles = [],
    spymans = {};


// 收集任务文件
function findTask(path) {

    // 以同步的方式读写文件以保证程序可以按照正常的顺序执行
    var files = fs.readdirSync(path);

    files.forEach(function(item) {
        var tmpPath = path + '/' + item,
            stats = fs.statSync(tmpPath);

        if (stats.isDirectory()) {
            findTask(tmpPath);
        } else {
            taskFiles.push(tmpPath.replace(/.js/g, ''));
        }

    })
}

// 整理任务
function arragement() {

    taskFiles.forEach(function(file) {

        var mod = require(file + '.js'),
            parts = file.split('/'),
            domain = parts[1],
            spider = parts[2],
            spy = spymans[domain];

        logger.info("----");
        logger.info(spy);

        if (!spy || typeof(spy) == 'undefined') {
            spy = {};
        }

        spy[spider] = mod;
        spymans[domain] = spy;
    })
}

// 查看域名
function getTopDomain(url) {
    var urlPatts = /[^.]+\.(com|cn|net|io)/;
    return url.match(urlPatts) ? url.match(urlPatts)[0] : null;
}


// 初始化spy准备工作
function init() {
    findTask('./spy');
    arragement();
}


// 执行spy任务
function run(url) {
    var domain = getTopDomain(url);
}


module.exports = {
    init: init,
    run: run
}