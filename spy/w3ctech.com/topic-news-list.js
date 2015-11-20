/* 
* @Author: boxizen
* @Date:   2015-11-20 16:00:08
* @Last Modified by:   boxizen
* @Last Modified time: 2015-11-20 16:25:53
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
		
	
	request(url, function(err, result, body) {

	})
}