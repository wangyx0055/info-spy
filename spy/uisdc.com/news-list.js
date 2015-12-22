/* 
 * @Author: boxizen
 * @Date:   2015-12-22 19:44:58
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-22 19:57:27
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

    var domain = 'http://www.uisdc.com/archives/page/',
    	MAXPAGE = 10;

    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var linkArr = $('.hentry').find('.entry-header');

        _.each(linkArr, function(item) {
            var link = $(item).find('h2').find('a').attr('href');
            flower.push({
                url: link
            })
        })

        var nextPage = 2;

        if (task.url.match(/archives\/page\/\d+/)) {
            nextPage = parseInt(task.url.match(/\d+/)[0]) + 1;
        }

        // 添加下一页
        if (nextPage <= MAXPAGE) {
            flower.push({
                url: domain + nextPage
            })
        }

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '设计',
            flower: flower,
            category: 4,
            from: '优设网'
        };

        done(null, task);
    })
}