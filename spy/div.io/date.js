/* 
 * @Author: boxizen
 * @Date:   2015-12-09 20:10:50
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 20:18:08
 */

'use strict';

module.exports = function(pubdateStr) {

    var num = parseInt(pubdateStr.match(/\d+/)[0]),
        now = new Date().getTime(),
        that = new Date().getTime();

    if (pubdateStr.match('周')) {
        that = now - 24 * 3600 * 1000 * 7 * num;
    } else if (pubdateStr.match('天')) {
        that = now - 24 * 3600 * 1000 * num;
    } else if (pubdateStr.match('月')) {
        that = now - 24 * 3600 * 1000 * 31 * num;
    }

    return that;
}