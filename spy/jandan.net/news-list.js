/* 
 * @Author: boxizen
 * @Date:   2015-12-24 15:58:35
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-28 11:36:00
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
        url: url,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',            
            'Host': 'jandan.net',
            'Pragma': 'no-cache',
            'Upgrade-Insecure-Requests': 1,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36',
        }
    };

    var domain = 'http://jandan.net/page/',
        MAXPAGE = 10;

    request(options, function(err, result, body) {

        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var linkArr = $('#content').find('.list-post');

        _.each(linkArr, function(item) {
            var link = $(item).find('.thumbs_b').find('a').attr('href');
            flower.push({
                url: link
            })
        })


        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '娱乐',
            flower: flower,
            category: 2,
            from: '煎蛋'
        };

        done(null, task);
    })
}