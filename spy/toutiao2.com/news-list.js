/* 
 * @Author: boxizen
 * @Date:   2016-01-07 23:30:06
 * @Last Modified by:   boxizen
 * @Last Modified time: 2016-01-07 23:52:34
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

    var domain = 'http://toutiao2.com';

    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var aArr = $('.articles').find('.right-col').find('h1').find('a');

        _.each(aArr, function(linkObj) {
            var link = $(linkObj).attr('href');
            flower.push({
                url: link.match(/http:/) ? link : domain + link
            })
        })

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '娱乐',
            flower: flower,
            category: 201,
            from: '娱乐头条'
        };

        done(null, task);
    })
}