/* 
* @Author: boxizen
* @Date:   2015-12-22 21:11:22
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-22 21:21:58
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

        var title = $('＃content').find('.title').text(),
            coverPic = $('.content_banner img').attr('src'),
            //user = $('a[title="Posts by homme"]').text(),
            content = $('.content_banner').find('.text').html(),
            //pubdate = $('span[itemprop="datePublished"]').attr('datetime'),
            //timeLabel = pubdate.split('T')[0];

        $ = cheerio.load(content, {
            decodeEntities: false
        });

        // 删除一些不必要的信息
        $('.appendInfo').remove();
        $('.commentform').remove();
        $('.script').remove();
        $('style').remove();

        // 赋值
        honey.title = title;
        honey.coverPic = coverPic;
        //honey.user = user;
        //honey.img = null,
        honey.content = content;
        //honey.date = new Date(pubdate).valueOf();
        honey.from = '腾讯设计';
        //honey.timeLabel = timeLabel;

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '设计',
            honey: honey,
            flower: flower,
            category: 4,
            //publishAt: new Date(pubdate).valueOf()
        };

        done(null, task);
    })
}