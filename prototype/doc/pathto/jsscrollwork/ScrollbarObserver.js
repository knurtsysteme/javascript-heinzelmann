/*  JavaScript Scrollwork, version 0.20080823
 *  (c) 2006-2008 KNURT Systeme
 *
 * This file is part of JavaScript Scrollwork.
 * For details, see http://www.knurt.de/main/22_2_1/JavaScript+Scrollwork.html
 *
 * JavaScript Scrollwork is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * JavaScript Scrollwork is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JavaScript Scrollwork.  If not, see <http://www.gnu.org/licenses/gpl-3.0.html>.
 */
if(typeof Class == 'undefined')
  throw("ScrollbarObserver.js requires prototype.js");
if(typeof(ScrollingOffset) == 'undefined')
  throw("ScrollbarObserver.js requires ScrollbarOffset.js");


var ScrollbarObserver = Class.create();
ScrollbarObserver.prototype = {
	initialize: function(interval, options) {
		if(options == null) {
			options = {};
		}
		if (options.onXChange == null) {
			options.onXChange = function(x){};
		}
		if (options.onYChange == null) {
			options.onYChange = function(y){};
		}
		if (options.onChange == null) {
			options.onChange = function(x, y){};
		}
		this.interval = interval;
		this.onXChange = options.onXChange;
		this.onYChange = options.onYChange;
		this.onChange = options.onChange;
		this.start();
	},
	interval : null,
	onXChange : null,
	onYChange : null,
	onChange : null,
	windowInterval : null,
	setOnXChange : function(onXChange) {
		this.onXChange = onXChange;
	},
	setOnYChange : function(onYChange) {
		this.onYChange = onYChange;
	},
	setOnChange : function(onChange) {
		this.onChange = onChange;
	},
	start : function() {
			thisthis = this;
			this.windowInterval = window.setInterval(function(){
				var x = ScrollingOffset.getX();
				var y = ScrollingOffset.getY();
				thisthis.onXChange(x);
				thisthis.onYChange(y);
				thisthis.onChange(x, y);
			}, this.interval);
	},
	stop : function() {
		window.clearInterval(this.windowInterval);
	}
}