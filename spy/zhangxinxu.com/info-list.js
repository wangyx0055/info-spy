/* 
 * @Author: boxizen
 * @Date:   2015-12-02 15:41:53
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 11:17:43
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
        honey = [],
        url = task.url,
        done = task.done,
        linkArr = [];

    var options = {
        url: url
    };

    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });
        var navLink = $('.navigation_top').find('a');
        var post = $('#content').find('.post');
        _.each(navLink, function(item) {
            var link = $(item).attr('href');
            linkArr.push(link);
        })
        _.each(post, function(item) {
            var link = $(item).find('h2').find('a').attr('href');
            linkArr.push(link);
        })

        var uniqArr = _.uniq(linkArr);

        _.each(uniqArr, function(item) {
            flower.push({
                url: item
            })
        })

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