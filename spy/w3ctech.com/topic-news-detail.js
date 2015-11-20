/* 
* @Author: boxizen
* @Date:   2015-11-19 17:28:49
* @Last Modified by:   boxizen
* @Last Modified time: 2015-11-20 17:33:11
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
		honey = {};
		
	var userImgArr = [];

	request(url, function(err, res, body) {		
		var $ = cheerio.load(body);				
		_.each($('#topic-list').find('img'), function(img) {
			//logger.info($(img).attr('src'));
			imgUtil.download($(img).attr('src'));
		})
	})
}