/* 
 * @Author: boxizen
 * @Date:   2015-12-14 18:00:58
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-14 20:25:34
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

    var options = {
        url: url
    };

    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var linkArr = $('.headlist').find('li');
        _.each(linkArr, function(item) {
            var href = $(item).find('a').attr('href');
            flower.push({
                url: href.match(/http/) ? href : 'http://www.geekpark.net' + href
            })
        })

        var itemList = $('.masonry-area').find('.gpcard');
        _.each(itemList, function(item) {
            var imgLink = $(item).find('.img-link');
            var link = $(imgLink).attr('href')
            if (link) {
                flower.push({
                    url: link.match(/http/) ? link : 'http://www.geekpark.net' + link
                })
            }
        })

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '科技',
            flower: flower,
            category: 301,
            from: '极客公园'
        };

        done(null, task);
    })
}