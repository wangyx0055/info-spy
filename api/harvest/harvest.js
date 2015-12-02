/* 
 * @Author: boxizen
 * @Date:   2015-12-01 14:04:34
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-01 14:48:21
 */

'use strict';

var _ = require('underscore'),
    request = require('request'),
    conf = require('../../conf'),
    logger = console;

function create(task, callback) {
    var contractor = conf.contractor,
        host = contractor.host,
        port = contractor.port,
        url = 'http://' + host + ':' + port + '/api/harvest/onCreate';

    request({
        method: 'put',
        url: url,
        json: true,
        body: task
    }, function(err, res, body) {});
}
exports.create = create;