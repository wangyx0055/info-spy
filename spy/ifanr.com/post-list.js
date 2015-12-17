/* 
 * @Author: boxizen
 * @Date:   2015-12-14 20:30:11
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-14 21:18:46
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

        var linkArr = $('.posts-list').find('.new-post-item-content');

        _.each(linkArr, function(item) {
            var link = $(item).find('.news-pic').attr('href');
            flower.push({
                url: link
            })
        })

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '科技',
            flower: flower,
            category: 3,
            from: 'ifanr'
        };

        done(null, task);
    })
}