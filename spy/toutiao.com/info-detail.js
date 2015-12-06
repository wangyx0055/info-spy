/* 
* @Author: boxizen
* @Date:   2015-12-02 15:29:22
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-02 15:34:02
*/

'use strict';

module.exports = function(task) {
    var flower = [],
        honey = [],
        url = task.url,
        done = task.done;

    var options = {
        url: url
    };

    request(options, function(err, result, body) {
        logger.info(body);
    })
}