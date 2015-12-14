/* 
 * @Author: boxizen
 * @Date:   2015-12-12 00:15:28
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-13 20:48:17
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
        url = task.url,
        done = task.done;

    request(url, function(err, res, body) {

        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var link = $('.news_textList_top').find('.news_textList_section').find('.news_textList_section_title');

        _.each(link, function(item) {
            var itemLink = $(item).find('a').attr('href');
            flower.push({
                url: itemLink
            })
        })

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '娱乐',
            flower: flower,
            from: '网易娱乐',
            category: 2
        };
        done(null, task);
    })
}