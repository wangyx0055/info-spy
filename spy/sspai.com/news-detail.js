'use strict';

var _ = require('underscore'),

    request = require('request'),
    iconv = require('iconv-lite'),
    cheerio = require('cheerio'),
    url = require('url'),
    util = require('./util.js'),

    logger = console;

module.exports = function(task) {
    var flower = [],
        honey = {},
        url = task.url,
        done = task.done;

    request(url, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var title = $('.banner').find('.title').text(),
            coverPic = $('.banner').find('img').attr('src'),
            user = $('.banner').find('.info').find('.author').text().replace(/ /g, '').replace(/\n/g, ''),
            content = $('.main').find('.box').find('.content').html();
        var timeLabel = $('.publish-time').eq(0).text().replace(/ /g, '').replace(/\n/g, ''),
            pubdate = util.getTimeLabel(timeLabel);
        

        // 赋值
        honey.title = title;
        honey.coverPic = coverPic;
        honey.user = user;
        honey.img = null;
        honey.content = content;
        honey.date = new Date(pubdate).valueOf();
        honey.from = '少数派';
        honey.timeLabel = pubdate;

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '软件',
            honey: honey,
            flower: flower,
            category: 5,
            publishAt: new Date(pubdate).valueOf()
        };

        done(null, task);
    })
}