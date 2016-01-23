'use strict';

module.exports = {
	
	/**
	 * 获取时间戳
	 * @param  {String} timeLabel
	 * @return {Long} 时间戳
	 * @api public  	
	 */
	getTimeLabel: function(timeLabel) {
		if(timeLabel.match(/\d+天前/)) {
			var curDate = new Date().valueOf();
			return curDate - timeLabel.match(/\d+/g)[0] * 24 * 60 * 60 * 1000;
		} else if(timeLabel.match(/\d+月\d+日/)) {
			var year = new Date().getFullYear();
			var time = new Date(year+'-'+timeLabel.match(/\d+/g)[0]+'-'+timeLabel.match(/\d+/g)[1]).valueOf()
			return time;
	 	} else if(timeLabel.match(/\d+\-\d+\-\d+/)) {
			return new Date(timeLabel).valueOf();
		}
	}
}