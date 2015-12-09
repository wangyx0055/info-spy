/* 
* @Author: boxizen
* @Date:   2015-12-02 15:41:59
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-09 11:17:39
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
        $('.alipay_support').remove();
        $('.similarity').remove();
        $('.wp_share_box').remove();
        $('.postmetadata').remove();
        var html = $.html();

        var $ = cheerio.load(html, {
            decodeEntities: false
        });
        var title = $('#content').find('.post').find('h2').text();
        var post = $('#content').find('.post').find('.entry').html();
        honey.title = title;
        honey.content = post;
        
        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '前端',
            honey: honey,
            flower: flower,
            category: 1
        };
        done(null, task);
    })
}