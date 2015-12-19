/* 
* @Author: boxizen
* @Date:   2015-12-14 20:29:20
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-17 15:43:11
*/

'use strict';

var route =[
	[/ifanr.com\/\d+/,'post-detail'],
	[/ifanr.com\/app\/\d+/,'post-detail'],
	[/ifanr.com/,'post-list'],
 ];

module.exports = route;