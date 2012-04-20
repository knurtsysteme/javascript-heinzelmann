/*  JavaScript Scrollwork, version 0.20080825
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
var AjaxSeparator = {
	getContent : function(idArray, url, partLength, onPartSuccess, onFinalSuccess) {
		var tmpParam = '';
		var tmpPartLength = partLength;
		while(tmpPartLength > 0 && idArray.length > 0) {
			tmpParam += 'idArray[]=' + idArray.shift() + '&';
			tmpPartLength--;
		}
		var params = tmpParam + Form.serialize(document.body);
		new Ajax.Request(
			url,
			{
				parameters: params,
				onSuccess: function(r) {
					onPartSuccess(r, idArray);
					if(idArray.length > 0) {
						AjaxSeparator.getContent(idArray, url, partLength, onPartSuccess, onFinalSuccess);
					}
					else {
						onFinalSuccess(r, idArray);
					}
				}
			}
		);
	}
}