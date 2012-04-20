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
var Browser =
{
	getHeight : function()
	{
		var y;
		if (self.innerHeight) // all except Explorer
		{
			y = self.innerHeight;
		}
		else if (document.documentElement && document.documentElement.clientHeight) // Explorer 6 Strict Mode
		{
			y = document.documentElement.clientHeight;
		}
		else if (document.body) // other Explorers
		{
			y = document.body.clientHeight;
		}
		return y;
	},

	getWidth : function()
	{
		var y;
		if (self.innerWidth) // all except Explorer
		{
			y = self.innerWidth;
		}
		else if (document.documentElement && document.documentElement.clientWidth) // Explorer 6 Strict Mode
		{
			y = document.documentElement.clientWidth;
		}
		else if (document.body) // other Explorers
		{
			y = document.body.clientWidth;
		}
		return y;
	},

	isIE : function()
    {
        return navigator.userAgent.toLowerCase().indexOf('msie') > -1;
    },
	
	isOpera : function()
	{
		return navigator.userAgent.indexOf('Opera') > -1;
	},
	
	isIE6x : function()
    {
        return navigator.userAgent.toLowerCase().indexOf('msie 6') > -1;
    },

	isIE7x : function()
    {
        return navigator.userAgent.toLowerCase().indexOf('msie 7') > -1;
    }

}