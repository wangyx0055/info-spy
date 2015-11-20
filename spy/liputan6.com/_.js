/* 
* @Author: boxizen
* @Date:   2015-11-19 15:29:44
* @Last Modified by:   boxizen
* @Last Modified time: 2015-11-19 15:42:10
*/

'use strict';

var route =[
	[/liputan6.com\/-\/read\/\d+/,'news-detail'],
	[/liputan6.com\/bisnis\/read\/\d+/,'news-detail'],
    [/liputan6.com\/bisnis/,'news-list'],
    [/liputan6.com\/lifestyle\/read\/\d+/,'news-detail'],
    [/liputan6.com\/lifestyle/,'news-list']    
 ];

module.exports = route;