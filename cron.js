/* 
 * @Author: boxizen
 * @Date:   2015-11-19 00:41:31
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-17 15:02:56
 */

'use strict';

var Schedule = require('node-schedule'),
    entry = require('./api/entry/entry'),
    spy = require('./spy'),

    logger = console;

// 定时任务
function cronJob() {
    var rule = new Schedule.RecurrenceRule(),
        time = [30];

    rule.second = time;

    Schedule.scheduleJob(rule, function() {
        entry.get(function(status, result) {
            if (status == 1) {
                spy.run({
                    oid: result.objectId,
                    tag: result.tag,
                    url: result.url,
                    done: spy.onTaskDone
                });
            } else {
            	logger.info(result);
            }
        })
    });
}
exports.cronJob = cronJob;