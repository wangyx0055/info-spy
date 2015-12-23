/* 
* @Author: boxizen
* @Date:   2015-12-23 23:52:48
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-24 00:13:30
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
        honey = {},
        url = task.url,
        done = task.done;

    var options = {
        url: url
    };

    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var title = $('#page-title').text(),
            coverPic = null,
            user = $('.media-heading').find('a').text(),
            userImg = $('.blog-author').find('img').attr('src'),
            content = $('.body-content').html(),
            pubdate = $('.submitted').find('span').eq(1).text(),
            timeLabel = $('.submitted').find('span').eq(1).text();

        if(user == '' || typeof(user) == 'undefined') {
        	user = null;
        }

        if(userImg == '' || typeof(userImg) == 'undefined') {
        	userImg = null;
        }

        $ = cheerio.load(content, {
            decodeEntities: false
        });

        // 删除一些不必要的信息
        $('.blog-author').remove();

        // 赋值
        honey.title = title;
        honey.coverPic = coverPic;
        honey.user = user;
        honey.img = userImg,
        honey.content = $.html();
        honey.date = new Date(pubdate).valueOf();
        honey.from = 'w3cplus';
        honey.timeLabel = timeLabel;

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '前端',
            honey: honey,
            flower: flower,
            category: 1,
            publishAt: new Date(pubdate).valueOf()
        };

        done(null, task);
    })
}