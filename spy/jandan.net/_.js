/* 
 * @Author: boxizen
 * @Date:   2015-12-24 15:58:25
 * @Last Modified by:   boxizen
 * @Last Modified time: 2015-12-24 17:19:19
 */

'use strict';

var route = [
    //[/jandan.net\/page\/\d+/, 'news-list'],
    [/jandan.net\/[\w\W]+.html/, 'news-detail'],
    [/jandan.net/, 'news-list']
];

module.exports = route;