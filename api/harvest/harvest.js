/* 
 * @Author: boxizen
 * @Date:   2015-11-29 16:46:01
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-01 10:41:58
 */

'use strict';

var _ = require('underscore'),
    request = require('request'),

    conf = require('../../conf');

function harvest(task) {
    // 服务器配置
    var contractor = conf.contractor,
        host = contractor.host,
        port = contractor.port,
        url = 'http://' + host + ':' + port + '/api/task/harvest';

    request({
        method: 'PUT',
        url: url,
        //timeout: 10000,
        json: true,
        body: task
    }, function(err, res, body) {
        
    });
}
module.exports = harvest;