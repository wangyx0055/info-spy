/* 
 * @Author: boxizen
 * @Date:   2015-12-24 15:58:40
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-24 17:03:12
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
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
        }
    };

    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var title = $('#content').find('h1').text(),
            coverPic = $('meta[property="og:image"]').attr('content'),
            user = $('.time_s').eq(0).find('a').text(),
            content = $('.post.f').eq(0).html(),
            pubdate = $('.time_s').eq(0).text().split('@')[1].split(',')[0].replace(/ /g, ''),
            timeLabel = $('.time_s').eq(0).text().split('@')[1].replace(/ /g, '');

        $ = cheerio.load(content, {
            decodeEntities: false
        });

        // 删除一些不必要的信息
        $('script').remove();
        $('.comment-big').remove();
        $('h1').remove();
        $('.time_s').remove();
        $('.share-links').remove();
        $('.star-rating').remove();
        $('.jandan-zan').remove();
        $('.break').remove();

        var fContent = $.html().replace(/data-original="\/\//g,'src="http://');

        // 赋值
        honey.title = title;
        honey.coverPic = coverPic.match(/http:/) ? 'http:' + coverPic : coverPic;
        honey.user = user;
        honey.img = null;
        honey.content = fContent;
        honey.date = new Date(pubdate).valueOf();
        honey.from = '煎蛋';
        honey.timeLabel = timeLabel;

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '娱乐',
            honey: honey,
            flower: flower,
            category: 2,
            publishAt: new Date(pubdate).valueOf()
        };

        done(null, task);
    })
}