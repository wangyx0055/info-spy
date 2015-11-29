/* 
 * @Author: boxizen
 * @Date:   2015-11-20 16:00:08
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-29 16:39:28
 */

'use strict';

var _ = require('underscore'),

    request = require('request'),
    iconv = require('iconv-lite'),
    cheerio = require('cheerio'),
    url = require('url'),
    imgUtil = require('../../components/img/img'),

    logger = console;

module.exports = function(task) {
    var flower = [],
        honey = [],
        url = task.url,
        done = task.done;

    var options = {
        url: url
    };
    
    request(options, function(err, result, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });
        var listItem = $('.topic_list').find('.topic_list_content');

        _.each(listItem, function(item) {

            var title = $(item).find('.title').text(),
                link = $(item).find('.title').attr('href'),
                img = $(item).find('.latest').find('img').attr('src'),
                author = $(item).find('.latest').find('img').attr('title'),
                category = $(item).find('.badge_category').text(),
                cateLink = $(item).find('.badge_category').attr('href'),
                watch = $(item).find('.number').text(),
                like = $(item).find('.likes_num').text(),
                date = $(item).find('.relative-date').text();

            var honeyData = {};
            honeyData.title = title;
            honeyData.img = img;
            honeyData.author = author;
            honeyData.category = category;
            honeyData.cateLink = cateLink;
            honeyData.watch = watch;
            honeyData.like = like;
            honeyData.date = date;

            honey.push(honeyData);
            flower.push({
                url: link
            })

        })

        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '前端',
            honey: honey,
            flower: flower
        };
        //task.time = context.performance;
        done(null, task);
    })
}