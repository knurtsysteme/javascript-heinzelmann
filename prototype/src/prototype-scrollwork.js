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
 * @version 1.00 (08/08/2010)
 */

if(typeof(Class) == 'undefined')
    throw("prototype-scrollwork.js requires prototype.js");

// every lib must have it's own browser detection!
// hopefuly not yet anymore
var JSSWBrowser =
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

    isIE5x : function()
    {
        return navigator.userAgent.toLowerCase().indexOf('msie 5') > -1;
    },
    isIE6x : function()
    {
        return navigator.userAgent.toLowerCase().indexOf('msie 6') > -1;
    },

    isIE7x : function()
    {
        return navigator.userAgent.toLowerCase().indexOf('msie 7') > -1;
    },

    isIE8x : function()
    {
        return navigator.userAgent.toLowerCase().indexOf('msie 8') > -1;
    },
    isGecko : function() {
        return navigator.userAgent.toLowerCase().indexOf('gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1;
    },
    /**
     * return the version of the gecko engine or
     * null, if it is not a gecko engine.
     */
    getGeckoVersion : function() {
        var result = null;
        if(JSSWBrowser.isGecko()) {
            var ua = navigator.userAgent.toLowerCase();
            ua = ua.substring(ua.indexOf("rv:")+3);
            result = ua.substring(0, ua.indexOf(")"));
        }
        return result;
    },
    /**
     * return true, if it is firefox 1.0
     */
    isFirefox1_0 : function() {
        return navigator.userAgent.toLowerCase().indexOf('firefox/1.0') > -1;
    },
    /**
     * return true, if the version is smaller than the given version.
     * return false, if the version is equal or bigger than the given version.
     * @param version float of the version to check.
     * parse it into float before.
     * that means, check "1.7" if version "1.7.5" is given - even if the result fails on version "1.7.3".
     * @todo string as param is possible
     */
    isGeckoSmallerThan : function(version) {
        var result = false;
        if(JSSWBrowser.isGecko()) {
            result = parseFloat(JSSWBrowser.getGeckoVersion()) < parseFloat(version);
        }
        return result;
    }
};

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
};

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
};

var WaitingIcon = {
    waitingElement  : null,
    id : 'knurt_waitingicon',
    init : function(html) {
        insertion = '<div id="' + WaitingIcon.id + '" style="display: none">' + html + '</div>';
        Element.insert(document.body, insertion);
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
        WaitingIcon.waitingElement.style.left = (JSSWBrowser.getWidth() / 2 + ScrollingOffset.getX()) + 'px';
        WaitingIcon.waitingElement.style.top = (JSSWBrowser.getHeight() / 2 + ScrollingOffset.getY()) + 'px';
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
            window.setTimeout(function(){
                WaitingIcon.waitingElement.hide()
            }, (WaitingIcon.showMinimumTimeMs - timeSinceShown));
        }
        else {
            WaitingIcon.waitingElement.hide();
        }
    }
};

var RegEx = {
    is : {
        nothingOrWhitespace : function(string)
        {
            if(string)
                return string.search(/^(\s)*$/) != -1;
            else
                return true;
        },

        regularEmail : function(string)
        {
            return string.match(/^.+@.+\..+$/) && ! RegEx.contains.whitespace(string);
        },

        date_YYYYMMDD : function(string)
        {
            result = false;
            day = string.substring(6, 8);
            month = string.substring(4, 6);
            year = string.substring(0, 4);

            // months and years
            if(	month.match(/^01$/) ||
                month.match(/^03$/) ||
                month.match(/^05$/) ||
                month.match(/^07$/) ||
                month.match(/^08$/) ||
                month.match(/^10$/) ||
                month.match(/^12$/)) // month with max 31 days
                {
                result = day.match(/^[0-3][0-9]$/) && parseInt(day) > 0 && parseInt(day) < 32;
            }
            else if(	month.match(/^01$/) ||
                month.match(/^04$/) ||
                month.match(/^06$/) ||
                month.match(/^09$/) ||
                month.match(/^11$/)) // month with max 30 days
                {
                result = day.match(/^[0-3][0-9]$/) && parseInt(day) > 0 && parseInt(day) < 31;
            }
            else if(month.match(/^02$/))// february
            {
                if(parseInt(year) % 4 == 0) // 	leap-year
                {
                    result = day.match(/^[0-2][0-9]$/) && parseInt(day) > 0 && parseInt(day) < 30;
                }
                else
                {
                    result = day.match(/^[0-2][0-9]$/) && parseInt(day) > 0 && parseInt(day) < 29;
                }
            }
            else // invalid month
            {
                result = false;
            }

            // check year
            if(result == true)
            {
                result = year.search(/^[0-9][0-9][0-9][0-9]$/) != -1;
            }
            return result;
        }
    },
    contains :
    {
        whitespace : function(string)
        {
            if(string)
                return string != "" && string.search(/(\s)+/) != -1;
            else
                return false;
        }
    }
};

var PasswordStrength = Class.create();
PasswordStrength.prototype = {
    initialize: function(forminput, strengthoutput) {
        this.forminput = forminput;
        this.strengthoutput = strengthoutput;
        Event.observe($(this.forminput), "keyup", this.putStrengthOut.bindAsEventListener(this));
        this.putStrengthOut();
    },
    forminput : null,
    strengthoutput : null,
    putStrengthOut : function() {
        var strengthOut = "";
        switch(this.getStrength(this.forminput.value)) {
            case this.WEAK:
                strengthOut = this.weakhtml;
                break;
            case this.MEDIUM:
                strengthOut = this.mediumhtml;
                break;
            case this.STRONG:
                strengthOut = this.stronghtml;
                break;
        }
        this.strengthoutput.innerHTML = strengthOut;
    },
    WEAK : 0,
    MEDIUM : 1,
    STRONG : 2,
    mediumRegex : /(?=.{8,})(?=.*[a-zA-Z].*[a-zA-Z])(?=.*[^a-zA-Z].*[^a-zA-Z])/g,
    strongRegex : /(?=.{13,})(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])/g,
    setMediumRegex : function(regex) {
        this.mediumRegex = regex;
    },
    setStrongRegex : function(regex) {
        this.strongRegex = regex;
    },
    weakhtml : "weak",
    mediumhtml : "medium",
    stronghtml : "strong",
    setHtml : function(weakhtml, mediumhtml, stronghtml) {
        this.weakhtml = weakhtml;
        this.mediumhtml = mediumhtml;
        this.stronghtml = stronghtml;
        this.putStrengthOut();
    },
    getStrength : function(pass) {
        var result = this.WEAK;
        if(pass && pass.length > 0) {
            if(pass.match(this.strongRegex)) {
                result = this.STRONG;
            }
            else if(pass.match(this.mediumRegex)) {
                result = this.MEDIUM;
            }
        }
        return result;
    }
};

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
            };
            pic.onmouseout = function() {
                pic.src = normal.src;
            };
        });
    },
    getOverName : function(pic) {
        var picsrc = pic.src;
        return picsrc.substr(0, picsrc.lastIndexOf(".")) + '_over' + picsrc.substr(picsrc.lastIndexOf("."));
    }
};

var FunctionOnOverAndOut = Class.create();
FunctionOnOverAndOut.prototype = {
    initialize: function(trigger, object2modify, options) {
        if(options == null) {
            options = [];
        }
        // set unset options
        var width = object2modify.getWidth();
        var height = object2modify.getHeight();
        if (options.effectFunctionOver == null) {
            options.effectFunctionOver = function(){
                new Effect.Morph(object2modify, {
                    style: 'width: '+(width*2)+'px; height: '+(height*2)+'px;',
                    duration: 0.5
                });
            };
        }
        if (options.effectFunctionOut == null) {
            options.effectFunctionOut = function(){
                new Effect.Morph(object2modify, {
                    style: 'width: '+width+'px; height: '+height+'px;',
                    duration: 0.5
                });
            };
        }
        trigger.onmouseover = options.effectFunctionOver;
        trigger.onmouseout = options.effectFunctionOut;
    }
};

var GlassPanel = {
    init: function() {
        if($('glasspanel') == null) {
            document.body.innerHTML += "<div id=\"glasspanel\"></div><div id=\"glasspanelContent\"></div>";
            new ScrollbarObserver(100,{
                onChange: GlassPanel.setPosition
            });
        }
        GlassPanel.setPosition();
        GlassPanel.hide();
    },
    show: function() {
        $('glasspanel').show();
        $('glasspanelContent').show();
    },
    hide: function() {
        $('glasspanel').hide();
        $('glasspanelContent').hide();
    },
    hideOnClick: function() {
        $('glasspanel').onclick = GlassPanel.hide;
        $('glasspanelContent').onclick = GlassPanel.hide;
    },
    setPosition: function() {
        if($('glasspanel') == false) {
            GlassPanel.init();
        }
        $('glasspanel').setStyle({
            position: 'absolute',
            zIndex : '999999',
            marginLeft : '0',
            marginTop : '0',
            left : '0',
            top : '0',
            backgroundColor: 'black',
            opacity: '0.5',
            height: (JSSWBrowser.getHeight() + ScrollingOffset.getY()) + 'px',
            width: (JSSWBrowser.getWidth() + ScrollingOffset.getX()) + 'px'
        });
        $('glasspanelContent').setStyle({
            position: 'absolute',
            zIndex : '1000000',
            left : (JSSWBrowser.getWidth() / 2 + ScrollingOffset.getX() - $('glasspanelContent').getWidth()) + 'px',
            top : (JSSWBrowser.getHeight() / 2 + ScrollingOffset.getY() - $('glasspanelContent').getHeight()) + 'px',
            opacity: '1.0'
        });
    }
};

var FontStyler = Class.create();
FontStyler.prototype = {
    initialize: function() {
    },
    getFontNames: function() {
        return ['Arial', 'Bookman Old Style', 'Comic Sans MS', 'Courier', 'Courier New', 'Futura', 'Garamond', 'Georgia', 'Gill Sans', 'Helvetica', 'Impact', 'Lucida Console', 'Monaco', 'Optima', 'Palatino', 'Palatino Linotype', 'Times', 'Times New Roman', 'Trebuchet MS', 'Verdana', 'Zapfchancery'];
    },
    getFontsAsSelect: function() {
        var res = '<select name="font-family" id="font-family">';
        this.getFontNames().each(function(fn){
            res += '<option style="font-family: ' + fn + '">' + fn + '</option>';
        });
        res += '</select>';
        return res;
    },
    getFontSizesAsSelect: function() {
        var res = '<select name="font-size" id="font-size">';
        var sizes = [6, 8, 9, 10, 11, 12, 14, 16, 18, 20, 24, 28, 32, 36];
        sizes.each(function(size){
            res += '<option style="font-size: ' + size + 'pt">' + size + 'pt</option>';
        });
        res += '</select>';
        return res;
    },
    setcookie4css: function() {
        var exdate = new Date();
        exdate.setYear(exdate.getFullYear() + 1);
        document.cookie = 'FontStyler=font-family: ' + $F('font-family') +'&font-size: ' + $F('font-size') + ';expires=' + exdate.toGMTString() + ';';
    },
    setcookiestyle: function(el) {
        var fontstylevalue = document.cookie.indexOf('FontStyler=');
        if(fontstylevalue > -1) {
            var unparsed = document.cookie.substring(fontstylevalue + 11, fontstylevalue + document.cookie.indexOf(';')).replace(/&/, '; ') + ';';
            el.setStyle(unparsed);
        }
    }
};

var DragFrame = {
    init : function(element, functionOnFinish) {
        element.observe('mousedown',function(event) {
            DragFrame.privateArea.dragflag = true;
            DragFrame.privateArea.init(event, element);
        });
        element.observe('mousemove',function(event) {
            if(DragFrame.privateArea.dragflag) {
                DragFrame.privateArea.resize(event, element);
            }
        });
        document.body.observe('mouseup',function(event) {
            if(DragFrame.privateArea.dragflag) {
                DragFrame.privateArea.endIt(element, functionOnFinish, event);
            }
        });
    },
    privateArea : {
        endIt : function(observedElement, functionOnFinish, event) {
            DragFrame.privateArea.dragflag = false;
            var scrollX = parseInt(ScrollingOffset.getX());
            var scrollY = parseInt(ScrollingOffset.getY());
            var frameLeft = DragFrame.privateArea.firstX - (scrollX);
            var frameTop = DragFrame.privateArea.firstY - (scrollY);
            var frameWidth = event.pointerX() - frameLeft - scrollX;
            var frameHeight = event.pointerY() - frameTop - scrollY;
            functionOnFinish(
                event,
                observedElement,
                DragFrame.privateArea.firstElementDown,
                event.findElement(),
                DragFrame.privateArea.element,
                frameLeft,
                frameTop,
                frameWidth,
                frameHeight
                );
            DragFrame.privateArea.element.remove();
        },
        firstX : null,
        firstY : null,
        firstElementDown : null,
        init : function(event, element) {
            DragFrame.privateArea.firstX = event.pointerX();
            DragFrame.privateArea.firstY = event.pointerY();
            DragFrame.privateArea.element = new Element("div").setStyle({
                position: "absolute",
                left: DragFrame.privateArea.firstX + "px",
                top: DragFrame.privateArea.firstY + "px",
                margin: "0px",
                padding: "0px",
                border: "1px dashed black",
                backgroundColor: "white",
                opacity: "0.5"
            });
            DragFrame.privateArea.firstElementDown = event.findElement();
            document.body.insert(DragFrame.privateArea.element);
        },
        element : null,
        resize : function(event, td) {
            // assert dragging from left top to down right first
            var frameLeft = DragFrame.privateArea.firstX;
            var frameTop = DragFrame.privateArea.firstY;
            var frameWidth = event.pointerX() - frameLeft;
            var frameHeight = event.pointerY() - frameTop;

            // now other direction draggings
            if(frameWidth < 0) {
                frameLeft += frameWidth;
                frameWidth = DragFrame.privateArea.firstX - frameLeft;
            }
            if(frameHeight < 0) {
                frameTop += frameHeight;
                frameHeight = DragFrame.privateArea.firstY - frameTop;
            }
            DragFrame.privateArea.element.setStyle({
                width: frameWidth + "px",
                height: frameHeight + "px",
                left: frameLeft + "px",
                top: frameTop + "px"
            });
        },
        dragflag : false
    }
};

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
        this.localAnchors.each(function(el){
            func(el);
        });
    },
    tagForeign : function(func) {
        this.foreignAnchors.each(function(el){
            func(el);
        });
    }
};

var AjaxSeparator = {
    getContent : function(idArray, url, partLength, onPartSuccess, onFinalSuccess, furtherParams) {
        var tmpParam = '';
        var tmpPartLength = partLength;
        furtherParams = furtherParams ? "&" + furtherParams : "";
        while(tmpPartLength > 0 && idArray.length > 0) {
            tmpParam += 'idArray[]=' + idArray.shift() + '&';
            tmpPartLength--;
        }
        var params = tmpParam + Form.serialize(document.body) + furtherParams;
        new Ajax.Request(
            url, {
                parameters: params,
                onSuccess: function(r) {
                    onPartSuccess(r, idArray);
                    if(idArray.length > 0) {
                        AjaxSeparator.getContent(idArray, url, partLength, onPartSuccess, onFinalSuccess, furtherParams);
                    }
                    else {
                        onFinalSuccess(r, idArray);
                    }
                }
            }
            );
    }
};
