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

    request(url, function(err, result, body) {

        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var linkArr = $('.list-article').find('li.type-big');

        _.each(linkArr, function(item) {
            var link = $(item).find('.title').find('a').attr('href');
            flower.push({
                url: link
            })
        })


        // 完成任务
        task.harvest = {
            author: 'boxi',
            tag: '软件',
            flower: flower,
            category: 5,
            from: '少数派'
        };

        done(null, task);
    })
}