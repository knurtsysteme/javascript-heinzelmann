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
  throw("AnchorTagger.js requires prototype.js");

var AnchorTagger = Class.create();
AnchorTagger.prototype = {
	initialize: function(options) {
		options = options || {};
		options.area = options.area || document.body;
		thisthis = this;
		options.area.select('a').each(function(el){
			if(thisthis.isLocalAnchor(el)) {
				thisthis.localAnchors.push(el);
			}
			else {
				thisthis.foreignAnchors.push(el);
			}
		});
	},
	localAnchors : new Array(),
	foreignAnchors : new Array(),
	isLocalAnchor : function(a) {
		var hrefval = a.readAttribute('href');
		return hrefval.indexOf(window.location.hostname) > 0 || hrefval.indexOf('#') == 0 || hrefval.indexOf('http') < 0;
	},
	tagLocal : function(func) {
		this.localAnchors.each(function(el){func(el);});
	},
	tagForeign : function(func) {
		this.foreignAnchors.each(function(el){func(el);});
	}
}