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
  throw("DialogConfirm_YesNo.js requires prototype.js");

var IndicatorClassAttribute = Class.create();
IndicatorClassAttribute.prototype =
{
	initialize: function(options)
	{
		if(options == null)
		{
  			throw("IndicatorClassAttribute needs options");
		}
		else if(options.prefix == null) {
  			throw("IndicatorClassAttribute needs option prefix");
		}
		else if(options.seperator == null) {
  			throw("IndicatorClassAttribute needs option seperator");
		}
		this.prefix = options.prefix;
		this.seperator = options.seperator;
	},
	
	prefix : null,
	seperator : null,
	
	functionToExecuteOnElementForPatternMatch : null, // TODO comment: bekommt das element übergeben
	
	functionToExecuteOnElementForPatternDismatch : null, // TODO comment: bekommt das element übergeben
	
	indicatorPosition : null,
	
	indicatorLength : null,
	
	flagPosition : null,
	
	functionFlagPatternMatches : null, // TODO nimmt das flag pattern entgegen und gibt ein boolean zurück. True, wenn das pattern passt (functionToExecuteOnElementForPatternMatch) wird aufgerufen, sonst false (functionToExecuteOnElementForPatternDismatch)
	
	functionIndicatesFlagSwitching : null, // TODO comment: muss classVal entgegennehmen und ein boolean zurückliefern
	
	privateClassVal : null,
	
	privateIdPattern : null,

	privateIdPatternOfElement : null,
	
	privateFlagPattern : null,
	
	privateGetAndSetIndicatorsAndFlags : function(element) {
		this.privateClassVal = element.getAttributeNode('class').nodeValue;
		this.privateIdPattern = this.privateClassVal.substr(this.privateClassVal.indexOf(this.seperator) + 1); // e.g. 6023487_0000010
		this.privateFlagPattern = this.privateIdPattern.substr(this.privateIdPattern.indexOf(this.seperator)+1); // e.g. 0000010
		this.privateIdPattern = this.privateIdPattern.substr(0, this.privateIdPattern.indexOf(this.seperator)); // e.g. 6023487
		this.privateIdPatternOfElement = this.privateIdPattern.substr(this.indicatorPosition, this.indicatorLength); // e.g. 23
	},
	
	privateUpdatePattern : function() {
		if(this.functionIndicatesFlagSwitching(this.privateIdPatternOfElement)) {
			this.privateFlagPattern = this.privateFlagPattern.substr(0, this.flagPosition) + "1" + this.privateFlagPattern.substr(this.flagPosition+1);
		}
		else {
			this.privateFlagPattern = this.privateFlagPattern.substr(0, this.flagPosition) + "0" + this.privateFlagPattern.substr(this.flagPosition+1);
		}
	},
	privateExecute : function(element) {
		if(this.functionFlagPatternMatches(this.privateFlagPattern)) {
			this.functionToExecuteOnElementForPatternMatch(element);
		}
		else {
			this.functionToExecuteOnElementForPatternDismatch(element);
		}
	},
	execute : function(element) {
		this.privateGetAndSetIndicatorsAndFlags(element);
		this.privateUpdatePattern();
		// update elements class attribute
		element.setAttribute('class', this.prefix + this.seperator + this.privateIdPattern + this.seperator + this.privateFlagPattern);
		this.privateExecute(element);
	}
}