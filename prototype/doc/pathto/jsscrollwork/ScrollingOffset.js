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
var ScrollingOffset = {
    getX : function() {
        var x;
        if (self.pageYOffset) {
            x = self.pageXOffset;
        }
        else if (document.documentElement && document.documentElement.scrollTop) {
            x = document.documentElement.scrollLeft;
        }
        else if (document.body) {
            x = document.body.scrollLeft;
        }
		return x;
    },
    getY : function() {
        var y;
        if (self.pageYOffset) {
            y = self.pageYOffset;
        }
        else if (document.documentElement && document.documentElement.scrollTop) {
            y = document.documentElement.scrollTop;
        }
        else if (document.body) {
            y = document.body.scrollTop;
        }
		return y;
    }
}