/* 
 * @Author: boxizen
 * @Date:   2015-12-09 19:38:11
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 20:22:53
 */

'use strict';

var _ = require('underscore'),

    request = require('request'),
    iconv = require('iconv-lite'),
    cheerio = require('cheerio'),
    url = require('url'),
    dateUtil = require('./date'),
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

        // 获取基本信息
        var content = $('.topic-firstfloor-detail').html(),
            img = $('.topic-firstfloor-info').find('img').attr('src'),
            user = $('.topic-firstfloor-info').find('p').find('a').text(),
            pubdateStr = $('.topic-firstfloor-info').find('p').text().split('发布于')[1].replace(/\n/g, '').replace(/ /g, '');

        var pubdate = dateUtil(pubdateStr),
            date = new Date(pubdate),
            timeLabel = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

        // 获取标题
        var titleHtml = $('.topic-firstfloor-info').find('h1').html();
        $ = cheerio.load(titleHtml, {
            decodeEntities: false
        });
        $('.muted').remove();
        $('.com-tag').remove();
        $('.topic-firstfloor-info-at-node').remove();
        var title = $.html().replace(/\n/g, '').replace(/ /g, '');

        // 赋值
        honey.title = title;
        honey.img = img;
        honey.user = user;
        honey.content = content;
        honey.date = pubdate;
        honey.from = 'div.io';
        honey.timeLabel = timeLabel;


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