/* 
 * @Author: boxizen
 * @Date:   2015-12-24 15:58:40
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-28 12:53:19
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
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
            'Referer': 'http://jandan.net/',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Host': 'jandan.net',
            'Pragma': 'no-cache',
            'Cookie': '2980115714=23; _ga=GA1.2.501299602.1450165971; _gat=1; Hm_lvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1451269094,1451273929,1451275254,1451278335; Hm_lpvt_fd93b7fb546adcfbcf80c4fc2b54da2c=1451278335',
            'Upgrade-Insecure-Requests': 1
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

        var fContent = $.html().replace(/data-original="\/\//g, 'src="http://');

        // 给所有站内图片链接带上proxy标识
        if (coverPic.indexOf('//') == 0) {
            coverPic = coverPic.split('//')[1];
        }

        if (coverPic.indexOf('tankr.net') != -1) {
            coverPic = 'proxy/jandan/redirect=' + coverPic;
            honey.external = 1;
        }

        fContent = fContent.replace(/http:\/\/tankr.net/g, 'proxy/jandan/redirect=tankr.net');
        // 赋值
        honey.title = title;
        honey.coverPic = coverPic;
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