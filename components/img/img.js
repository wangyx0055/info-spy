/* 
 * @Author: boxizen
 * @Date:   2015-11-19 17:59:42
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-19 18:08:44
 */

'use strict';

var fs = require('fs'),
    url = require('url'),
    path = require('path'),
    http = require('http'),

    express = require('express'),

    app = express();

function download(url) {

	console.info("1");

    app.get(url, function(req, res, next) {
        //..db get file realpath
        res.download('../../download/load/img/', url);
        console.log("~~~:"+url);
    });
}
exports.download = download;