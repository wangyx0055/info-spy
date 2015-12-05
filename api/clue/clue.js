/* 
 * @Author: boxizen
 * @Date:   2015-11-29 16:45:53
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-05 22:18:19
 */

'use strict';

var _ = require('underscore'),
    request = require('request'),
    conf = require('../../conf'),

    logger = console;

function fetch(callback) {
    var contractor = conf.contractor,
        host = contractor.host,
        port = contractor.port,
        url = 'http://' + host + ':' + port + '/api/clue/onGetList';

    request({
        method: 'GET',
        url: url,
        //timeout: 10000,
        json: true
    }, function(err, res, clue) {
        if(err || !clue) {
            callback("服务器异常", null);
            return;
        }
        callback(null, clue.length > 0 ? clue : null);
    });
}
exports.fetch = fetch;