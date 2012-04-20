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
  throw("FormCookieSaver.js requires Prototype");
if(typeof Form.Element.SetSerializers == 'undefined')
  throw("FormCookieSaver.js requires prototypeUtils");

var FormCookieSaver = {
	cookiename : null,
	init : function(formitemnames, globalsaving) {
		if(globalsaving == true) {
			FormCookieSaver.cookiename = 'fcs';
		}
		else {
			FormCookieSaver.cookiename = 'fcs' + escape(window.location.pathname);
		}
		var formitems = new Array();
		if(formitemnames == null) {
			// Form.getInputs() requires id-attribute, this is why i do not use it here
			[$$('input:not([type=password])'), $$('select'), $$('textarea')].flatten().each(function(fel){
				formitems.push(fel);
			});
		}
		else {
			formitemnames.each(function(formitemname){
				var fel = $$('[name=' + formitemname + ']');
				if(fel.length == 1) {
					formitems.push(fel[0]);
				}
			});
		}
		if(document.cookie) {
			var cookiestr = FormCookieSaver.getCookieStr();
			if(cookiestr != null) {
				var cookieobj = $H(cookiestr.toQueryParams());
				formitems.each(function(formitem) {
/*					if($$('[name=' + formitemname + ']').length != 1) {
						throw (formitemname + ' is not unique. Copies: ' + $$('[name=' + formitemname + ']').length);
					}*/
					var val = cookieobj.get(formitem.readAttribute('name'));
					if(Object.isUndefined(val) == false) {
						Form.Element.setValue(formitem, val);
					}
				});
			}
		}
	},
	getCookieStr : function() {
		var ix = document.cookie.indexOf(FormCookieSaver.cookiename);
		var res = document.cookie.substr(ix + FormCookieSaver.cookiename.length + 1);
		ix = res.indexOf(";");
		if(ix > 0) {
			res = res.substr(0, ix);
		}
		res = unescape(res);
		return res;
	},
	save : function() {
		if(FormCookieSaver.cookiename == null) {
			throw('Please init first (FormCookieSaver.init())');
		}
		var bestbefore = new Date();
		bestbefore.setTime(bestbefore.getTime() + (3.1536e10)); // 1 year from now
		document.cookie = FormCookieSaver.cookiename + "=" + escape(Form.serialize(document.body)) + '; expires=' + bestbefore.toGMTString();
	}
}