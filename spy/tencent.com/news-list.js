/* 
* @Author: boxizen
* @Date:   2015-12-22 21:06:41
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-22 21:09:47
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
        url = task.url,
        done = task.done;

    var options = {
        url: url
    };

    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var linkArr = $('#content').find('.content_text');

        _.each(linkArr, function(item) {
            var link = $(item).find('.title').find('a.up').attr('href');
            flower.push({
                url: link
            })
        })

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '设计',
            flower: flower,
            category: 4,
            from: '腾讯设计'
        };

        done(null, task);
    })
}