/* 
 * @Author: boxizen
 * @Date:   2015-11-19 00:42:01
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-29 20:35:16
 */

'use strict';

var fs = require('fs'),
    path = require('path'),
    Schedule = require('node-schedule'),

    conf = require('./conf'),
    task = require('./api/task/task'),

    fetch = task.fetch,

    logger = console,
    taskFiles = [],
    spymans = {},
    task = {},
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
        time = [];
    for (var i = 1; i <= 60; i++) {
        time.push(i);
    }
    rule.minute = time;

    logger.info("获取线索");
    fetchClue();

    Schedule.scheduleJob(rule, function() {
        logger.info("获取线索");
        fetchClue();
    });
}

// 获取任务
function fetchClue() {

    if (clueQueue.length < MAXCLUE) {
        // 抓取任务
        fetch(function(err, clue) {
            if (!clue) {
                return;
            }
            clueQueue.push(clue);
            // 封装任务列表
            var task = {
                url: clue.url,
                done: onTaskDone
            }

            run(task);
        })

    } else {
        logger.info("任务队列已满");
    }
}

// 完成任务
function onTaskDone() {

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
        //fetchClue();
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
    run: run
}