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
if(typeof(Class) == 'undefined')
  throw("Picswitch.js requires prototype.js");

var Picswitch = {
	init : function(classname) {
		if(classname == null) {
			classname = '.picswitch';
		}
		$$(classname).each(function(pic) {
			var normal = new Image();
			normal.src = pic.src;
			var highlight = new Image();
			highlight.src = Picswitch.getOverName(pic);
			pic.onmouseover = function() {
				pic.src = highlight.src;
			}
			pic.onmouseout = function() {
				pic.src = normal.src;
			}
		});
	},
	getOverName : function(pic) {
		var picsrc = pic.src;
		return picsrc.substr(0, picsrc.lastIndexOf(".")) + '_over' + picsrc.substr(picsrc.lastIndexOf("."));
	}
}