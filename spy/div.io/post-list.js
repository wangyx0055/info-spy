/* 
* @Author: boxizen
* @Date:   2015-12-09 19:38:02
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-09 19:44:58
*/

'use strict';

var _ = require('underscore'),

    request = require('request'),
    iconv = require('iconv-lite'),
    cheerio = require('cheerio'),
    url = require('url'),

    logger = console;

module.exports = function(task) {
    var flower = [],
        honey = [],
        url = task.url,
        done = task.done;

    var options = {
        url: url
    };

    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var list = $('.hot-topics').find('ul').eq(0).find('li');
        _.each(list, function(item) {
            var link = $(item).find('.title').attr('href');
            flower.push({
                url: link
            })
        })

        var pagList = $('.pagination').find('li').find('a');
        _.each(pagList, function(item) {
        	var link = $(item).attr('href');
            flower.push({
                url: link
            })
        })

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '前端',
            honey: honey,
            flower: flower,
            category: 1
        };

        done(null, task);
    })
}