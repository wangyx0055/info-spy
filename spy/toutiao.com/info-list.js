/* 
 * @Author: boxizen
 * @Date:   2015-12-02 15:29:15
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-06 23:54:48
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

    request(url, function(err, res, body) {

        logger.info(body);

        var $ = cheerio.load(body, {
            decodeEntities: false
        });

        var listArr = $('#pagelet-feedlist').find('ul').find('li');

        logger.info(listArr.length);

        _.each(listArr, function(item) {
            logger.info($(item).find('.info').find('a').attr('href'));
        })

        // 完成任务
        task.harvest = {
            author: 'boxizen',
            tag: '娱乐',
            honey: honey,
            flower: flower,
            from: 'toutiao',
            category: 2
        };
        done(null, task);
    })
}