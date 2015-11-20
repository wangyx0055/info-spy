/* 
 * @Author: boxizen
 * @Date:   2015-11-19 00:42:01
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-20 10:34:13
 */

'use strict';

var fs = require('fs'),
    path = require('path'),

    logger = console,
    domains = [],
    spyFiles = [];


// 收集域名信息
function countDomains() {
    var domainPath = path.resolve(__dirname, 'spy');
    fs.readdir(domainPath, function(err, files) {
        domains = files;
    })
}

// 初始化spy准备工作
function init() {
    countDomains();
}
exports.init = init;

// 执行spy任务
function run(url) {
    logger.info('url为:' + url);

    var urlPatts = /([^.\s]*.[^.]*)$/;

    logger.info(url.match(urlPatts)[0]);
    
}
exports.run = run;