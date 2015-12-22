/* 
 * @Author: boxizen
 * @Date:   2015-12-12 00:15:35
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-20 20:59:17
 */

'use strict';

var _ = require('underscore'),

    request = require('request'),
    iconv = require('iconv-lite'),
    cheerio = require('cheerio'),
    url = require('url'),
    iconv = require('iconv-lite'),

    date = require('../../components/date/date'),

    logger = console;

module.exports = function(task) {
    var flower = [],
        honey = {},
        userImgArr = [],
        url = task.url,
        done = task.done;

    var headers = {
        'accept-encoding': 'gzip,deflate'
    }

    request({
        url: url,
        encoding: null
    }, function(err, res, body) {

        var body = iconv.decode(body, 'GBK')

        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var title = $('#h1title').text(),
            img = $('.avatar.latest').attr('src'),
            pubdate = $('.topic_date').text(),
            like = $('.likes_num').text(),
            yearLabel = $('.ep-time-soure').text().match(/\d{4}-\d{2}-\d{2}/)[0],
            timeLabel = $('.ep-time-soure').text().match(/\d{2}:\d{2}:\d{2}/)[0],
            pubdate = new Date(yearLabel + ' ' + timeLabel).valueOf();
        var content = $('#endText').eq($('#endText').length - 1).html();

        if ($('.nph_bg').find('textarea')) {
            var gallery = '<imageset>',
                i = 0;
            _.each($('.nph_bg').find('textarea').find('li'), function(item) {
                if (i == 0) {
                    honey.coverPic = $(item).find('i').eq(0).text();
                }
                var img = '<img src="' + $(item).find('i').eq(0).text() + '" alt="' + $(item).find('p').text() + '" title="' + $(item).find('h2').text() + '"/>';
                gallery += img;
                i++;
            });
            gallery += '</imageset>';
            honey.gallery = gallery;
        }

        $ = cheerio.load(content, {
            decodeEntities: false
        });
        $('.gg200x300').remove();

        honey.title = title;
        honey.user = '网易娱乐';
        honey.date = pubdate;
        honey.timeLabel = yearLabel;
        honey.content = $.html();
        honey.from = '网易娱乐';

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '娱乐',
            honey: honey,
            flower: flower,
            category: 2,
            publishAt: pubdate
        };
        //task.time = context.performance;
        done(null, task);
    })
}