/* 
 * @Author: boxizen
 * @Date:   2016-01-07 23:30:13
 * @Last Modified by:   boxizen
 * @Last Modified time: 2016-01-07 23:56:51
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

        var title = $('.single-post__title').text(),
            coverPic = null,
            user = null,
            userImg = null,
            content = $('.content-wrapper').find('.article').html();

        var timeLabel = $('.single-post__postmeta').text().match(/\d+-\d+-\d+/)[0],
            pubdate = timeLabel.replace(/\./g, '-');

        $ = cheerio.load(content, {
            decodeEntities: false
        });

        var fContent = '';

        _.each($('p'), function(p) {
        	fContent += '<p>' + $(p).html() + '</p>';
        })

        // 赋值
        honey.title = title;
        honey.coverPic = coverPic;
        honey.user = user;
        honey.img = userImg;
        honey.content = fContent;
        honey.date = new Date(pubdate).valueOf();
        honey.from = '娱乐头条';
        honey.timeLabel = timeLabel;

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '娱乐',
            honey: honey,
            flower: flower,
            category: 201,
            publishAt: new Date(pubdate).valueOf()
        };

        done(null, task);
    })
}