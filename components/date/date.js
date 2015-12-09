/* 
 * @Author: boxizen
 * @Date:   2015-12-09 11:09:02
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-09 11:31:52
 */

'use strict';

module.exports = function() {

    var logger = console;

    if (arguments.length == 3) {
        var year = arguments[0],
            month = parseInt(arguments[1]) - 1,
            day = arguments[2];
        var myDate = new Date(year, month, day);        
        return myDate.valueOf();
    } else {
        return 0;
    }
}