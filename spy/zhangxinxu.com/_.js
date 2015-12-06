/* 
* @Author: boxizen
* @Date:   2015-12-02 15:41:44
* @Last Modified by:   boxizen
* @Last Modified time: 2015-12-02 16:51:34
*/

'use strict';

var route =[
    [/zhangxinxu.com\/wordpress\/page\/\d+/,'info-list'],
    [/zhangxinxu.com\/wordpress\/\d+\/[\w\W]+/,'info-detail'],		
	[/zhangxinxu.com\/wordpress/,'info-list']
 ];

module.exports = route;