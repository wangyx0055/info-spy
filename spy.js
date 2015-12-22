/* 
 * @Author: boxizen
 * @Date:   2015-11-19 00:42:01
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-22 19:49:33
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    Schedule = require('node-schedule'),

    conf = require('./conf'),
    clue = require('./api/clue/clue'),
    harvest = require('./api/harvest/harvest'),

    taskFiles = [],
    spymans = {},
    logger = console,

    clueQueue = [],

    MAXCLUE = 5;


// 查看域名
function getTopDomain(url) {
    var urlPatts = /[^./]+\.(com|cn|net|io)/;
    return url.match(urlPatts) ? url.match(urlPatts)[0] : null;
}

// 定时任务
function cronJob() {
    var rule = new Schedule.RecurrenceRule(),
        time = [10, 20, 30, 40, 50, 60];

    rule.second = time;
    Schedule.scheduleJob(rule, function() {
        var crtClue = clueQueue.shift();
        if (typeof(crtClue) != 'undefined') {
            run({
                oid: crtClue.objectId,
                eid: crtClue.eid,
                tag: crtClue.tag,
                url: crtClue.url,
                done: onTaskDone
            });
        }
        if (clueQueue.length < MAXCLUE) {
            fetchClue();
        } else {
            logger.info("任务队列已满");
        }
    });
}

// 获取任务
function fetchClue() {
    var fetch = clue.fetch;
    fetch(function(err, clues) {
        if (err) {
            logger.info(err);
            return;
        }
        if (!clues) {
            logger.info("没有收到新任务");
            return;
        }
        clues.forEach(function(clue) {
            clueQueue.push(clue);
            var crtClue = clueQueue.shift();
            run({
                oid: crtClue.objectId,
                tag: crtClue.tag,
                url: crtClue.url,
                done: onTaskDone
            });
        })
    })
}

// 完成任务
function onTaskDone(err, task) {
    if (err) {
        logger.info(err);
        return;
    }
    harvest.create(task);
}

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
    // 文件排序，让_.js文件排在前面
    taskFiles.sort();
    taskFiles.forEach(function(file) {
        var mod = require(file + '.js'),
            parts = file.split('/'),
            domain = parts[2],
            spider = parts[3],
            spy = spymans[domain];

        if (!spy || typeof(spy) == 'undefined') {
            spy = {};
        }
        spy[spider] = mod;
        spymans[domain] = spy;
    })
}

// 初始化spy准备工作
function init() {
    findTask('./spy');
    arragement();
}

// 执行spy任务
function run(task) {

    if (!task) {
        cronJob();
        return;
    }

    var url = task.url,
        domain = getTopDomain(url),
        theSpy = spymans[domain];

    if (!theSpy || typeof(theSpy) == 'undefined') {
        logger.info("没有找到合适的特工");
        return;
    }
    var route = theSpy['_'],
        handleName;
    if (!route || typeof(route) == 'undefined') {
        logger.info("匹配路由出错");
        return;
    }
    for (var i = 0; i < route.length; i++) {
        if (url.match(route[i][0])) {
            handleName = route[i][1];
            break;
        }
    }
    if (!handleName || typeof(handleName) == "undefined") {
        logger.info("没有找到对应处理器");
        return;
    }

    var handle = theSpy[handleName];
    handle(task);
}


module.exports = {
    init: init,
    run: run,
    onTaskDone: onTaskDone
}