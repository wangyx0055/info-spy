/* 
* @Author: boxizen
* @Date:   2015-12-17 14:41:44
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-17 15:02:20
*/

'use strict';

var _ = require('underscore'),
    request = require('request'),
    conf = require('../../conf'),

    logger = console;

function get(callback) {
    var contractor = conf.contractor,
        host = contractor.host,
        port = contractor.port,
        url = 'http://' + host + ':' + port + '/api/entry/onGet';

    request({
        method: 'GET',
        url: url,
        json: true
    }, function(err, body, res) {
        callback(res.status, res.result);
    });
}
exports.get = get;