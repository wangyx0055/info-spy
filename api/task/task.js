/* 
 * @Author: boxizen
 * @Date:   2015-11-29 16:45:53
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-11-29 20:34:58
 */

'use strict';

var _ = require('underscore'),
    request = require('request'),

    conf = require('../../conf');

function fetch(callback) {
    var contractor = conf.contractor,
        host = contractor.host,
        port = contractor.port,
        url = 'http://' + host + ':' + port + '/api/clue/fetchClue';

    request({
        method: 'GET',
        url: url,
        //timeout: 10000,
        json: true
    }, function(err, res, clue) {
        callback(null, clue.length > 0 ? clue[0] : null);
    });
}
exports.fetch = fetch;