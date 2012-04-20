/*  JavaScript Scrollwork, version 1.00-RC1 (20100413)
 *  (c) 2006-2010 KNURT Systeme
 *
 * This file is part of JavaScript Scrollwork.
 * For details, see http://javascript-scrollwork.origo.ethz.ch
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

/**
 * some more or less useful things.
 * @author Daniel Oltmanns
 * @company KNURT Systeme
 * @since 09/19/2006
 * @version 2.00-PREVIEW (08/08/2010)
 */
/** only tested with select by now */
var InputConnector = {
	connect : function(formElement, action, options) {
        options = options || {};
        options.onlyif = options.onlyif || function() { return true; };
		formElement.onChange = action();
 	}
};
