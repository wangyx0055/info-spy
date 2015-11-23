/* 
 * @Author: boxizen
 * @Date:   2015-11-19 17:28:49
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-23 15:50:55
 */

'use strict';

var _ = require('underscore'),

    request = require('request'),
    iconv = require('iconv-lite'),
    cheerio = require('cheerio'),
    url = require('url'),
    imgUtil = require('../../components/img/img'),

    logger = console;

module.exports = function(url) {
    var flower = [],
        honey = {},
        userImgArr = [];

    request(url, function(err, res, body) {
        var $ = cheerio.load(body, {
            decodeEntities: false
        });
        var title = $('.topic_info').find('h1').text(),
            img = $('.avatar.latest').attr('src'),
            user = $('.meta_professor').attr('title'),
            pubdate = $('.topic_date').text(),
            like = $('.likes_num').text(),
            content = $('.callout').html();

        honey.title = title;
        honey.img = img;
        honey.user = user;
        honey.date = pubdate;
        honey.like = like;
        honey.content = content;

        logger.info(honey);
    })
}