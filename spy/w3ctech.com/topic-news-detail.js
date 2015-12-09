/* 
 * @Author: boxizen
 * @Date:   2015-11-19 17:28:49
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 13:52:10
 */

'use strict';

var _ = require('underscore'),

    request = require('request'),
    iconv = require('iconv-lite'),
    cheerio = require('cheerio'),
    url = require('url'),

    date = require('../../components/date/date'),    

    logger = console;

module.exports = function(task) {
    var flower = [],
        honey = {},
        userImgArr = [],
        url = task.url,
        done = task.done;

    request(url, function(err, res, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var title = $('.topic_info').find('h1').text(),
            img = $('.avatar.latest').attr('src'),
            user = $('.meta_professor').attr('title'),
            pubdate = $('.topic_date').text(),
            like = $('.likes_num').text(),
            content = $('.callout').html(),
            time = $('.topic_info').find('time').attr('title'),
            timeLabel = $('.topic_info').find('time').text();

        var pubdate = new Date(time).valueOf();
        
        honey.title = title;
        honey.img = img;
        honey.user = user;
        honey.date = pubdate;
        honey.like = like;
        honey.timeLabel = timeLabel;
        honey.content = content;
        honey.from = 'w3ctech';        

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '前端',
            honey: honey,
            flower: flower,
            category: 1,
            publishAt: pubdate
        };
        //task.time = context.performance;
        done(null, task);
    })
}