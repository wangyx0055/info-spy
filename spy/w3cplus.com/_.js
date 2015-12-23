/* 
* @Author: boxizen
* @Date:   2015-12-23 23:52:38
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-24 00:08:56
*/

'use strict';

var route = [ 
	// http://www.w3cplus.com/?page=1
	[/w3cplus.com\/?page=\d+/, 'news-list'],
	[/w3cplus.com\/[\w\W]+.html/, 'news-detail'],
    [/w3cplus.com/, 'news-list']
];

module.exports = route;