/* 
* @Author: boxizen
* @Date:   2015-12-14 19:30:04
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-14 20:25:10
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

        var title = $('.topic-title').text(),
        	coverPic = $('.main-pic').find('img').attr('src'),
        	user = $('.topic-info').find('.author').find('span').text(),
        	img = $('.topic-info').find('.author').find('img').attr('src'),
        	content = $('#article').html(),
        	pubdate = $('span[itemprop="datePublished"]').text();

        $ = cheerio.load(content, {
            decodeEntities: false
        });
        $('.share_top').remove();

        // 赋值
        honey.title = title;        
        honey.coverPic = coverPic;        
        honey.user = user;
        honey.img = img,
        honey.content = $.html();
        honey.date = new Date(pubdate).valueOf();
        honey.from = '极客公园';
        honey.timeLabel = pubdate;

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '科技',
            honey: honey,
            flower: flower,
            category: 301,
            publishAt: new Date(pubdate)
        };

        done(null, task);
    })
}