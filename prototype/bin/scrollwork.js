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
if(typeof(Class)=='undefined')throw("scrollwork.js requires prototype.js");var JSSWBrowser={getHeight:function(){var y;if(self.innerHeight){y=self.innerHeight}else if(document.documentElement&&document.documentElement.clientHeight){y=document.documentElement.clientHeight}else if(document.body){y=document.body.clientHeight}return y},getWidth:function(){var y;if(self.innerWidth){y=self.innerWidth}else if(document.documentElement&&document.documentElement.clientWidth){y=document.documentElement.clientWidth}else if(document.body){y=document.body.clientWidth}return y},isIE:function(){return navigator.userAgent.toLowerCase().indexOf('msie')>-1},isOpera:function(){return navigator.userAgent.indexOf('Opera')>-1},isIE5x:function(){return navigator.userAgent.toLowerCase().indexOf('msie 5')>-1},isIE6x:function(){return navigator.userAgent.toLowerCase().indexOf('msie 6')>-1},isIE7x:function(){return navigator.userAgent.toLowerCase().indexOf('msie 7')>-1},isIE8x:function(){return navigator.userAgent.toLowerCase().indexOf('msie 8')>-1},isGecko:function(){return navigator.userAgent.toLowerCase().indexOf('gecko')>-1&&navigator.userAgent.indexOf('KHTML')===-1},getGeckoVersion:function(){var a=null;if(JSSWBrowser.isGecko()){var b=navigator.userAgent.toLowerCase();b=b.substring(b.indexOf("rv:")+3);a=b.substring(0,b.indexOf(")"))}return a},isFirefox1_0:function(){return navigator.userAgent.toLowerCase().indexOf('firefox/1.0')>-1},isGeckoSmallerThan:function(a){var b=false;if(JSSWBrowser.isGecko()){b=parseFloat(JSSWBrowser.getGeckoVersion())<parseFloat(a)}return b}};var ScrollingOffset={getX:function(){var x;if(self.pageYOffset){x=self.pageXOffset}else if(document.documentElement&&document.documentElement.scrollTop){x=document.documentElement.scrollLeft}else if(document.body){x=document.body.scrollLeft}return x},getY:function(){var y;if(self.pageYOffset){y=self.pageYOffset}else if(document.documentElement&&document.documentElement.scrollTop){y=document.documentElement.scrollTop}else if(document.body){y=document.body.scrollTop}return y}};var ScrollbarObserver=Class.create();ScrollbarObserver.prototype={initialize:function(a,b){if(b==null){b={}}if(b.onXChange==null){b.onXChange=function(x){}}if(b.onYChange==null){b.onYChange=function(y){}}if(b.onChange==null){b.onChange=function(x,y){}}this.interval=a;this.onXChange=b.onXChange;this.onYChange=b.onYChange;this.onChange=b.onChange;this.start()},interval:null,onXChange:null,onYChange:null,onChange:null,windowInterval:null,setOnXChange:function(a){this.onXChange=a},setOnYChange:function(a){this.onYChange=a},setOnChange:function(a){this.onChange=a},start:function(){thisthis=this;this.windowInterval=window.setInterval(function(){var x=ScrollingOffset.getX();var y=ScrollingOffset.getY();thisthis.onXChange(x);thisthis.onYChange(y);thisthis.onChange(x,y)},this.interval)},stop:function(){window.clearInterval(this.windowInterval)}};var WaitingIcon={waitingElement:null,id:'knurt_waitingicon',init:function(a){insertion='<div id="'+WaitingIcon.id+'" style="display: none">'+a+'</div>';Element.insert(document.body,insertion);WaitingIcon.waitingElement=$(WaitingIcon.id);WaitingIcon.waitingElement.setStyle({display:'none',position:'absolute',zIndex:'999999',marginLeft:'-'+($(WaitingIcon.id).getWidth()/2)+'px',marginTop:'-'+($(WaitingIcon.id).getHeight()/2)+'px'})},setPosition:function(){WaitingIcon.waitingElement.style.left=(JSSWBrowser.getWidth()/2+ScrollingOffset.getX())+'px';WaitingIcon.waitingElement.style.top=(JSSWBrowser.getHeight()/2+ScrollingOffset.getY())+'px'},timestampOnShown:null,showMinimumTimeMs:2000,show:function(){WaitingIcon.setPosition();WaitingIcon.timestampOnShown=new Date().getTime();WaitingIcon.waitingElement.show()},hide:function(){var a=new Date().getTime()-WaitingIcon.timestampOnShown;if(WaitingIcon.showMinimumTimeMs>a){window.setTimeout(function(){WaitingIcon.waitingElement.hide()},(WaitingIcon.showMinimumTimeMs-a))}else{WaitingIcon.waitingElement.hide()}}};var RegEx={is:{nothingOrWhitespace:function(a){if(a)return a.search(/^(\s)*$/)!=-1;else return true},regularEmail:function(a){return a.match(/^.+@.+\..+$/)&&!RegEx.contains.whitespace(a)},date_YYYYMMDD:function(a){result=false;day=a.substring(6,8);month=a.substring(4,6);year=a.substring(0,4);if(month.match(/^01$/)||month.match(/^03$/)||month.match(/^05$/)||month.match(/^07$/)||month.match(/^08$/)||month.match(/^10$/)||month.match(/^12$/)){result=day.match(/^[0-3][0-9]$/)&&parseInt(day)>0&&parseInt(day)<32}else if(month.match(/^01$/)||month.match(/^04$/)||month.match(/^06$/)||month.match(/^09$/)||month.match(/^11$/)){result=day.match(/^[0-3][0-9]$/)&&parseInt(day)>0&&parseInt(day)<31}else if(month.match(/^02$/)){if(parseInt(year)%4==0){result=day.match(/^[0-2][0-9]$/)&&parseInt(day)>0&&parseInt(day)<30}else{result=day.match(/^[0-2][0-9]$/)&&parseInt(day)>0&&parseInt(day)<29}}else{result=false}if(result==true){result=year.search(/^[0-9][0-9][0-9][0-9]$/)!=-1}return result}},contains:{whitespace:function(a){if(a)return a!=""&&a.search(/(\s)+/)!=-1;else return false}}};var PasswordStrength=Class.create();PasswordStrength.prototype={initialize:function(a,b){this.forminput=a;this.strengthoutput=b;Event.observe($(this.forminput),"keyup",this.putStrengthOut.bindAsEventListener(this));this.putStrengthOut()},forminput:null,strengthoutput:null,putStrengthOut:function(){var a="";switch(this.getStrength(this.forminput.value)){case this.WEAK:a=this.weakhtml;break;case this.MEDIUM:a=this.mediumhtml;break;case this.STRONG:a=this.stronghtml;break}this.strengthoutput.innerHTML=a},WEAK:0,MEDIUM:1,STRONG:2,mediumRegex:/(?=.{8,})(?=.*[a-zA-Z].*[a-zA-Z])(?=.*[^a-zA-Z].*[^a-zA-Z])/g,strongRegex:/(?=.{13,})(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*[0-9].*[0-9])(?=.*[^a-zA-Z0-9].*[^a-zA-Z0-9])/g,setMediumRegex:function(a){this.mediumRegex=a},setStrongRegex:function(a){this.strongRegex=a},weakhtml:"weak",mediumhtml:"medium",stronghtml:"strong",setHtml:function(a,b,c){this.weakhtml=a;this.mediumhtml=b;this.stronghtml=c;this.putStrengthOut()},getStrength:function(a){var b=this.WEAK;if(a&&a.length>0){if(a.match(this.strongRegex)){b=this.STRONG}else if(a.match(this.mediumRegex)){b=this.MEDIUM}}return b}};var Picswitch={init:function(d){if(d==null){d='.picswitch'}$$(d).each(function(a){var b=new Image();b.src=a.src;var c=new Image();c.src=Picswitch.getOverName(a);a.onmouseover=function(){a.src=c.src};a.onmouseout=function(){a.src=b.src}})},getOverName:function(a){var b=a.src;return b.substr(0,b.lastIndexOf("."))+'_over'+b.substr(b.lastIndexOf("."))}};var FunctionOnOverAndOut=Class.create();FunctionOnOverAndOut.prototype={initialize:function(a,b,c){if(c==null){c=[]}var d=b.getWidth();var e=b.getHeight();if(c.effectFunctionOver==null){c.effectFunctionOver=function(){new Effect.Morph(b,{style:'width: '+(d*2)+'px; height: '+(e*2)+'px;',duration:0.5})}}if(c.effectFunctionOut==null){c.effectFunctionOut=function(){new Effect.Morph(b,{style:'width: '+d+'px; height: '+e+'px;',duration:0.5})}}a.onmouseover=c.effectFunctionOver;a.onmouseout=c.effectFunctionOut}};var GlassPanel={init:function(){if($('glasspanel')==null){document.body.innerHTML+="<div id=\"glasspanel\"></div><div id=\"glasspanelContent\"></div>";new ScrollbarObserver(100,{onChange:GlassPanel.setPosition})}GlassPanel.setPosition();GlassPanel.hide()},show:function(){$('glasspanel').show();$('glasspanelContent').show()},hide:function(){$('glasspanel').hide();$('glasspanelContent').hide()},hideOnClick:function(){$('glasspanel').onclick=GlassPanel.hide;$('glasspanelContent').onclick=GlassPanel.hide},setPosition:function(){if($('glasspanel')==false){GlassPanel.init()}$('glasspanel').setStyle({position:'absolute',zIndex:'999999',marginLeft:'0',marginTop:'0',left:'0',top:'0',backgroundColor:'black',opacity:'0.5',height:(JSSWBrowser.getHeight()+ScrollingOffset.getY())+'px',width:(JSSWBrowser.getWidth()+ScrollingOffset.getX())+'px'});$('glasspanelContent').setStyle({position:'absolute',zIndex:'1000000',left:(JSSWBrowser.getWidth()/2+ScrollingOffset.getX()-$('glasspanelContent').getWidth())+'px',top:(JSSWBrowser.getHeight()/2+ScrollingOffset.getY()-$('glasspanelContent').getHeight())+'px',opacity:'1.0'})}};var FontStyler=Class.create();FontStyler.prototype={initialize:function(){},getFontNames:function(){return['Arial','Bookman Old Style','Comic Sans MS','Courier','Courier New','Futura','Garamond','Georgia','Gill Sans','Helvetica','Impact','Lucida Console','Monaco','Optima','Palatino','Palatino Linotype','Times','Times New Roman','Trebuchet MS','Verdana','Zapfchancery']},getFontsAsSelect:function(){var b='<select name="font-family" id="font-family">';this.getFontNames().each(function(a){b+='<option style="font-family: '+a+'">'+a+'</option>'});b+='</select>';return b},getFontSizesAsSelect:function(){var b='<select name="font-size" id="font-size">';var c=[6,8,9,10,11,12,14,16,18,20,24,28,32,36];c.each(function(a){b+='<option style="font-size: '+a+'pt">'+a+'pt</option>'});b+='</select>';return b},setcookie4css:function(){var a=new Date();a.setYear(a.getFullYear()+1);document.cookie='FontStyler=font-family: '+$F('font-family')+'&font-size: '+$F('font-size')+';expires='+a.toGMTString()+';'},setcookiestyle:function(a){var b=document.cookie.indexOf('FontStyler=');if(b>-1){var c=document.cookie.substring(b+11,b+document.cookie.indexOf(';')).replace(/&/,'; ')+';';a.setStyle(c)}}};var DragFrame={init:function(b,c){b.observe('mousedown',function(a){DragFrame.privateArea.dragflag=true;DragFrame.privateArea.init(a,b)});b.observe('mousemove',function(a){if(DragFrame.privateArea.dragflag){DragFrame.privateArea.resize(a,b)}});document.body.observe('mouseup',function(a){if(DragFrame.privateArea.dragflag){DragFrame.privateArea.endIt(b,c,a)}})},privateArea:{endIt:function(a,b,c){DragFrame.privateArea.dragflag=false;var d=parseInt(ScrollingOffset.getX());var e=parseInt(ScrollingOffset.getY());var f=DragFrame.privateArea.firstX-(d);var g=DragFrame.privateArea.firstY-(e);var h=c.pointerX()-f-d;var i=c.pointerY()-g-e;b(c,a,DragFrame.privateArea.firstElementDown,c.findElement(),DragFrame.privateArea.element,f,g,h,i);DragFrame.privateArea.element.remove()},firstX:null,firstY:null,firstElementDown:null,init:function(a,b){DragFrame.privateArea.firstX=a.pointerX();DragFrame.privateArea.firstY=a.pointerY();DragFrame.privateArea.element=new Element("div").setStyle({position:"absolute",left:DragFrame.privateArea.firstX+"px",top:DragFrame.privateArea.firstY+"px",margin:"0px",padding:"0px",border:"1px dashed black",backgroundColor:"white",opacity:"0.5"});DragFrame.privateArea.firstElementDown=a.findElement();document.body.insert(DragFrame.privateArea.element)},element:null,resize:function(a,b){var c=DragFrame.privateArea.firstX;var d=DragFrame.privateArea.firstY;var e=a.pointerX()-c;var f=a.pointerY()-d;if(e<0){c+=e;e=DragFrame.privateArea.firstX-c}if(f<0){d+=f;f=DragFrame.privateArea.firstY-d}DragFrame.privateArea.element.setStyle({width:e+"px",height:f+"px",left:c+"px",top:d+"px"})},dragflag:false}};var AnchorTagger=Class.create();AnchorTagger.prototype={initialize:function(b){b=b||{};b.area=b.area||document.body;thisthis=this;b.area.select('a').each(function(a){if(thisthis.isLocalAnchor(a)){thisthis.localAnchors.push(a)}else{thisthis.foreignAnchors.push(a)}})},localAnchors:new Array(),foreignAnchors:new Array(),isLocalAnchor:function(a){var b=a.readAttribute('href');return b.indexOf(window.location.hostname)>0||b.indexOf('#')==0||b.indexOf('http')<0},tagLocal:function(b){this.localAnchors.each(function(a){b(a)})},tagForeign:function(b){this.foreignAnchors.each(function(a){b(a)})}};var AjaxSeparator={getContent:function(a,b,c,d,e,f){var g='';var h=c;f=f?"&"+f:"";while(h>0&&a.length>0){g+='idArray[]='+a.shift()+'&';h--}var i=g+Form.serialize(document.body)+f;new Ajax.Request(b,{parameters:i,onSuccess:function(r){d(r,a);if(a.length>0){AjaxSeparator.getContent(a,b,c,d,e,f)}else{e(r,a)}}})}};