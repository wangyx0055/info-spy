/* 
* @Author: boxizen
* @Date:   2015-12-22 21:05:30
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-22 21:21:48
*/

'use strict';

var route =[	
	[/cdc.tencent.com\/\?paged/,'news-list'],
	[/cdc.tencent.com\/\?p=\d+/,'news-detail'],
	[/cdc.tencent.com/,'news-list']
 ];

module.exports = route;