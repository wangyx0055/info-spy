/* 
* @Author: boxizen
* @Date:   2015-12-22 19:58:41
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-22 23:25:50
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

        var title = $('.post-title').text(),
            coverPic = $('img.alignnone').attr('src'),
            user = null,
            userImg = null,
            content = $('.entry-content').html(),
            pubdate = $('.published').text(),
            timeLabel = $('.published').text();

        $ = cheerio.load(content, {
            decodeEntities: false
        });

        // 删除一些不必要的信息
        $('.post-copyright').remove();
        $('.similarity').remove();
        $('.wumii-hook').remove();
        $('style').remove();

        // 赋值
        honey.title = title;
        honey.coverPic = coverPic;
        honey.user = user;
        honey.img = userImg,
        honey.content = $.html();
        honey.date = new Date(pubdate).valueOf();
        honey.from = '优设网';
        honey.timeLabel = timeLabel;

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '设计',
            honey: honey,
            flower: flower,
            category: 4,
            publishAt: new Date(pubdate).valueOf()
        };

        done(null, task);
    })
}