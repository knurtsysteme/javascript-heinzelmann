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
  throw("WaitingIcon.js requires prototype.js");
if(typeof(ScrollingOffset) == 'undefined')
  throw("WaitingIcon.js requires ScrollingOffset.js");
if(typeof(Browser) == 'undefined')
  throw("WaitingIcon.js requires Browser.js");

var WaitingIcon = {
	waitingElement  : null,
	id : 'knurt_waitingicon',
	init : function(html) {
		insertion = '<div id="' + WaitingIcon.id + '" style="display: none">' + html + '</div>';
		document.body.insert(insertion, {position: 'bottom'});
		WaitingIcon.waitingElement = $(WaitingIcon.id);
		WaitingIcon.waitingElement.setStyle({
			display: 'none', 
			position: 'absolute',
			zIndex : '999999',
			marginLeft : '-' + ($(WaitingIcon.id).getWidth() / 2) + 'px',
			marginTop : '-' + ($(WaitingIcon.id).getHeight() / 2) + 'px'
		});
	},
	setPosition : function() {
		WaitingIcon.waitingElement.style.left = (Browser.getWidth() / 2 + ScrollingOffset.getX()) + 'px';
		WaitingIcon.waitingElement.style.top = (Browser.getHeight() / 2 + ScrollingOffset.getY()) + 'px';
	},
	timestampOnShown : null,
	showMinimumTimeMs : 2000,
	show : function() {
		WaitingIcon.setPosition();
		WaitingIcon.timestampOnShown = new Date().getTime();
		WaitingIcon.waitingElement.show();
	},
	hide : function() {
		var timeSinceShown = new Date().getTime() - WaitingIcon.timestampOnShown;
		if(WaitingIcon.showMinimumTimeMs > timeSinceShown) {
			window.setTimeout(function(){WaitingIcon.waitingElement.hide()}, (WaitingIcon.showMinimumTimeMs - timeSinceShown));
		}
		else {
			WaitingIcon.waitingElement.hide();
		}
	}
}