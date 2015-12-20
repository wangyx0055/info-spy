/* 
 * @Author: boxizen
 * @Date:   2015-12-14 20:29:51
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-20 15:47:52
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

        var title = $('h1[itemprop="headline"]').text(),
            coverPic = $('meta[property="og:image"]').attr('content'),
            user = $('a[title="Posts by homme"]').text(),
            content = '<div><img src="' + coverPic + '" /></div>' + $('#entry-content').html(),
            pubdate = $('span[itemprop="datePublished"]').attr('datetime'),
            timeLabel = pubdate.split('T')[0];

        // 赋值
        honey.title = title;
        honey.coverPic = coverPic;
        honey.user = user;
        honey.img = null,
        honey.content = content;
        honey.date = new Date(pubdate).valueOf();
        honey.from = 'ifanr';
        honey.timeLabel = timeLabel;

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '科技',
            honey: honey,
            flower: flower,
            category: 3,
            publishAt: new Date(pubdate).valueOf()
        };

        done(null, task);
    })
}