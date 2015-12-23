/* 
 * @Author: boxizen
 * @Date:   2015-12-23 23:52:54
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-24 00:02:06
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

    var domain = 'http://www.w3cplus.com',
        page = 'http://www.w3cplus.com/?page=',
        MAXPAGE = 10;

    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var linkArr = $('.page-inner').find('.node-blog');

        _.each(linkArr, function(item) {
            var link = $(item).find('h1').find('a').attr('href');
            flower.push({
                url: link.match(/http/) ? link : domain + link
            })
        })

        var nextPage = 2;

        if (task.url.match(/page=\d+/)) {
            var pageStr = task.url.match(/page=\d+/)[0];
            nextPage = parseInt(pageStr.match(/\d+/)[0]) + 1;
        }

        // 添加下一页
        if (nextPage <= MAXPAGE) {
            flower.push({
                url: page + nextPage
            })
        }

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '前端',
            flower: flower,
            category: 1,
            from: 'w3cplus'
        };

        done(null, task);
    })
}