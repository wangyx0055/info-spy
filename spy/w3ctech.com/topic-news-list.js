/* 
 * @Author: boxizen
 * @Date:   2015-11-20 16:00:08
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 01:25:20
 */

'use strict';

var _ = require('underscore'),

    request = require('request'),
    iconv = require('iconv-lite'),
    cheerio = require('cheerio'),
    url = require('url'),
    imgUtil = require('../../components/img/img'),

    logger = console;

module.exports = function(task) {
    var flower = [],
        honey = [],
        url = task.url,
        done = task.done;

    var domain = "http://www.w3ctech.com";

    var options = {
        url: url
    };

    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });
        var listItem = $('.topic_list').find('.topic_list_content');

        _.each(listItem, function(item) {

            var link = $(item).find('.title').attr('href');
            flower.push({
                url: link.match(/http/) ? link : domain + link
            })

        })

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '前端',
            honey: honey,
            flower: flower,
            category: '1'
        };
        //task.time = context.performance;
        done(null, task);
    })
}