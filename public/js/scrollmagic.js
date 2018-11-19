!function(e,t){"function"==typeof define&&define.amd?define(t):"object"==typeof exports?module.exports=t():e.ScrollMagic=t()}(this,function(){"use strict";var P=function(){};P.version="2.0.5",window.addEventListener("mousewheel",function(){});var D="data-scrollmagic-pin-spacer";P.Controller=function(e){var n,r,i="REVERSE",t="PAUSED",o=z.defaults,s=this,a=k.extend({},o,e),l=[],c=!1,f=0,u=t,d=!0,h=0,p=!0,g=function(){0<a.refreshInterval&&(r=window.setTimeout(E,a.refreshInterval))},v=function(){return a.vertical?k.get.scrollTop(a.container):k.get.scrollLeft(a.container)},m=function(){return a.vertical?k.get.height(a.container):k.get.width(a.container)},w=this._setScrollPos=function(e){a.vertical?d?window.scrollTo(k.get.scrollLeft(),e):a.container.scrollTop=e:d?window.scrollTo(e,k.get.scrollTop()):a.container.scrollLeft=e},y=function(){if(p&&c){var e=k.type.Array(c)?c:l.slice(0);c=!1;var t=f,n=(f=s.scrollPos())-t;0!==n&&(u=0<n?"FORWARD":i),u===i&&e.reverse(),e.forEach(function(e){e.update(!0)})}},S=function(){n=k.rAF(y)},b=function(e){"resize"==e.type&&(h=m(),u=t),!0!==c&&(c=!0,S())},E=function(){if(!d&&h!=m()){var t;try{t=new Event("resize",{bubbles:!1,cancelable:!1})}catch(e){(t=document.createEvent("Event")).initEvent("resize",!1,!1)}a.container.dispatchEvent(t)}l.forEach(function(e){e.refresh()}),g()};this._options=a;var x=function(e){if(e.length<=1)return e;var t=e.slice(0);return t.sort(function(e,t){return e.scrollOffset()>t.scrollOffset()?1:-1}),t};return this.addScene=function(e){if(k.type.Array(e))e.forEach(function(e){s.addScene(e)});else if(e instanceof P.Scene)if(e.controller()!==s)e.addTo(s);else if(l.indexOf(e)<0)for(var t in l.push(e),l=x(l),e.on("shift.controller_sort",function(){l=x(l)}),a.globalSceneOptions)e[t]&&e[t].call(e,a.globalSceneOptions[t]);return s},this.removeScene=function(e){if(k.type.Array(e))e.forEach(function(e){s.removeScene(e)});else{var t=l.indexOf(e);-1<t&&(e.off("shift.controller_sort"),l.splice(t,1),e.remove())}return s},this.updateScene=function(e,t){return k.type.Array(e)?e.forEach(function(e){s.updateScene(e,t)}):t?e.update(!0):!0!==c&&e instanceof P.Scene&&(-1==(c=c||[]).indexOf(e)&&c.push(e),c=x(c),S()),s},this.update=function(e){return b({type:"resize"}),e&&y(),s},this.scrollTo=function(e,t){if(k.type.Number(e))w.call(a.container,e,t);else if(e instanceof P.Scene)e.controller()===s&&s.scrollTo(e.scrollOffset(),t);else if(k.type.Function(e))w=e;else{var n=k.get.elements(e)[0];if(n){for(;n.parentNode.hasAttribute(D);)n=n.parentNode;var r=a.vertical?"top":"left",i=k.get.offset(a.container),o=k.get.offset(n);d||(i[r]-=s.scrollPos()),s.scrollTo(o[r]-i[r],t)}}return s},this.scrollPos=function(e){return arguments.length?(k.type.Function(e)&&(v=e),s):v.call(s)},this.info=function(e){var t={size:h,vertical:a.vertical,scrollPos:f,scrollDirection:u,container:a.container,isDocument:d};return arguments.length?void 0!==t[e]?t[e]:void 0:t},this.loglevel=function(){return s},this.enabled=function(e){return arguments.length?(p!=e&&(p=!!e,s.updateScene(l,!0)),s):p},this.destroy=function(e){window.clearTimeout(r);for(var t=l.length;t--;)l[t].destroy(e);return a.container.removeEventListener("resize",b),a.container.removeEventListener("scroll",b),k.cAF(n),null},function(){for(var e in a)o.hasOwnProperty(e)||delete a[e];if(a.container=k.get.elements(a.container)[0],!a.container)throw"ScrollMagic.Controller init failed.";(d=a.container===window||a.container===document.body||!document.body.contains(a.container))&&(a.container=window),h=m(),a.container.addEventListener("resize",b),a.container.addEventListener("scroll",b),a.refreshInterval=parseInt(a.refreshInterval)||o.refreshInterval,g()}(),s};var z={defaults:{container:window,vertical:!0,globalSceneOptions:{},loglevel:2,refreshInterval:100}};P.Controller.addOption=function(e,t){z.defaults[e]=t},P.Controller.extend=function(e){var t=this;P.Controller=function(){return t.apply(this,arguments),this.$super=k.extend({},this),e.apply(this,arguments)||this},k.extend(P.Controller,t),P.Controller.prototype=t.prototype,P.Controller.prototype.constructor=P.Controller},P.Scene=function(e){var n,l,c="BEFORE",f="DURING",u="AFTER",r=N.defaults,d=this,h=k.extend({},r,e),p=c,g=0,a={start:0,end:0},v=0,i=!0,s={};this.on=function(e,i){return k.type.Function(i)&&(e=e.trim().split(" ")).forEach(function(e){var t=e.split("."),n=t[0],r=t[1];"*"!=n&&(s[n]||(s[n]=[]),s[n].push({namespace:r||"",callback:i}))}),d},this.off=function(e,o){return e&&(e=e.trim().split(" ")).forEach(function(e){var t=e.split("."),n=t[0],i=t[1]||"";("*"===n?Object.keys(s):[n]).forEach(function(e){for(var t=s[e]||[],n=t.length;n--;){var r=t[n];!r||i!==r.namespace&&"*"!==i||o&&o!=r.callback||t.splice(n,1)}t.length||delete s[e]})}),d},this.trigger=function(e,t){if(e){var n=e.trim().split("."),r=n[0],i=n[1],o=s[r];o&&o.forEach(function(e){i&&i!==e.namespace||e.callback.call(d,new P.Event(r,e.namespace,d,t))})}return d},d.on("change.internal",function(e){"loglevel"!==e.what&&"tweenChanges"!==e.what&&("triggerElement"===e.what?y():"reverse"===e.what&&d.update())}).on("shift.internal",function(){t(),d.update()}),this.addTo=function(e){return e instanceof P.Controller&&l!=e&&(l&&l.removeScene(d),l=e,E(),o(!0),y(!0),t(),l.info("container").addEventListener("resize",S),e.addScene(d),d.trigger("add",{controller:l}),d.update()),d},this.enabled=function(e){return arguments.length?(i!=e&&(i=!!e,d.update(!0)),d):i},this.remove=function(){if(l){l.info("container").removeEventListener("resize",S);var e=l;l=void 0,e.removeScene(d),d.trigger("remove")}return d},this.destroy=function(e){return d.trigger("destroy",{reset:e}),d.remove(),d.off("*.*"),null},this.update=function(e){if(l)if(e)if(l.enabled()&&i){var t,n=l.info("scrollPos");t=0<h.duration?(n-a.start)/(a.end-a.start):n>=a.start?1:0,d.trigger("update",{startPos:a.start,endPos:a.end,scrollPos:n}),d.progress(t)}else m&&p===f&&C(!0);else l.updateScene(d,!1);return d},this.refresh=function(){return o(),y(),d},this.progress=function(e){if(arguments.length){var t=!1,n=p,r=l?l.info("scrollDirection"):"PAUSED",i=h.reverse||g<=e;if(0===h.duration?(t=g!=e,p=0===(g=e<1&&i?0:1)?c:f):e<0&&p!==c&&i?(p=c,t=!(g=0)):0<=e&&e<1&&i?(g=e,p=f,t=!0):1<=e&&p!==u?(g=1,p=u,t=!0):p!==f||i||C(),t){var o={progress:g,state:p,scrollDirection:r},s=p!=n,a=function(e){d.trigger(e,o)};s&&n!==f&&(a("enter"),a(n===c?"start":"end")),a("progress"),s&&p!==f&&(a(p===c?"start":"end"),a("leave"))}return d}return g};var m,w,t=function(){a={start:v+h.offset},l&&h.triggerElement&&(a.start-=l.info("size")*h.triggerHook),a.end=a.start+h.duration},o=function(e){if(n){var t="duration";x(t,n.call(d))&&!e&&(d.trigger("change",{what:t,newval:h[t]}),d.trigger("shift",{reason:t}))}},y=function(e){var t=0,n=h.triggerElement;if(l&&n){for(var r=l.info(),i=k.get.offset(r.container),o=r.vertical?"top":"left";n.parentNode.hasAttribute(D);)n=n.parentNode;var s=k.get.offset(n);r.isDocument||(i[o]-=l.scrollPos()),t=s[o]-i[o]}var a=t!=v;v=t,a&&!e&&d.trigger("shift",{reason:"triggerElementPosition"})},S=function(){0<h.triggerHook&&d.trigger("shift",{reason:"containerResize"})},b=k.extend(N.validate,{duration:function(t){if(k.type.String(t)&&t.match(/^(\.|\d)*\d+%$/)){var e=parseFloat(t)/100;t=function(){return l?l.info("size")*e:0}}if(k.type.Function(t)){n=t;try{t=parseFloat(n())}catch(e){t=-1}}if(t=parseFloat(t),!k.type.Number(t)||t<0)throw n&&(n=void 0),0;return t}}),E=function(e){(e=arguments.length?[e]:Object.keys(b)).forEach(function(t){var n;if(b[t])try{n=b[t](h[t])}catch(e){n=r[t]}finally{h[t]=n}})},x=function(e,t){var n=!1,r=h[e];return h[e]!=t&&(h[e]=t,E(e),n=r!=h[e]),n},z=function(t){d[t]||(d[t]=function(e){return arguments.length?("duration"===t&&(n=void 0),x(t,e)&&(d.trigger("change",{what:t,newval:h[t]}),-1<N.shifts.indexOf(t)&&d.trigger("shift",{reason:t})),d):h[t]})};this.controller=function(){return l},this.state=function(){return p},this.scrollOffset=function(){return a.start},this.triggerPosition=function(){var e=h.offset;return l&&(e+=h.triggerElement?v:l.info("size")*d.triggerHook()),e},d.on("shift.internal",function(e){var t="duration"===e.reason;(p===u&&t||p===f&&0===h.duration)&&C(),t&&F()}).on("progress.internal",function(){C()}).on("add.internal",function(){F()}).on("destroy.internal",function(e){d.removePin(e.reset)});var C=function(e){if(m&&l){var t=l.info(),n=w.spacer.firstChild;if(e||p!==f){var r={position:w.inFlow?"relative":"absolute",top:0,left:0},i=k.css(n,"position")!=r.position;w.pushFollowers?0<h.duration&&(p===u&&0===parseFloat(k.css(w.spacer,"padding-top"))?i=!0:p===c&&0===parseFloat(k.css(w.spacer,"padding-bottom"))&&(i=!0)):r[t.vertical?"top":"left"]=h.duration*g,k.css(n,r),i&&F()}else{"fixed"!=k.css(n,"position")&&(k.css(n,{position:"fixed"}),F());var o=k.get.offset(w.spacer,!0),s=h.reverse||0===h.duration?t.scrollPos-a.start:Math.round(g*h.duration*10)/10;o[t.vertical?"top":"left"]+=s,k.css(w.spacer.firstChild,{top:o.top,left:o.left})}}},F=function(){if(m&&l&&w.inFlow){var e=p===f,t=l.info("vertical"),n=w.spacer.firstChild,r=k.isMarginCollapseType(k.css(w.spacer,"display")),i={};w.relSize.width||w.relSize.autoFullWidth?e?k.css(m,{width:k.get.width(w.spacer)}):k.css(m,{width:"100%"}):(i["min-width"]=k.get.width(t?m:n,!0,!0),i.width=e?i["min-width"]:"auto"),w.relSize.height?e?k.css(m,{height:k.get.height(w.spacer)-(w.pushFollowers?h.duration:0)}):k.css(m,{height:"100%"}):(i["min-height"]=k.get.height(t?n:m,!0,!r),i.height=e?i["min-height"]:"auto"),w.pushFollowers&&(i["padding"+(t?"Top":"Left")]=h.duration*g,i["padding"+(t?"Bottom":"Right")]=h.duration*(1-g)),k.css(w.spacer,i)}},L=function(){l&&m&&p===f&&!l.info("isDocument")&&C()},T=function(){l&&m&&p===f&&((w.relSize.width||w.relSize.autoFullWidth)&&k.get.width(window)!=k.get.width(w.spacer.parentNode)||w.relSize.height&&k.get.height(window)!=k.get.height(w.spacer.parentNode))&&F()},A=function(e){l&&m&&p===f&&!l.info("isDocument")&&(e.preventDefault(),l._setScrollPos(l.info("scrollPos")-((e.wheelDelta||e[l.info("vertical")?"wheelDeltaY":"wheelDeltaX"])/3||30*-e.detail)))};this.setPin=function(e,t){if(t=k.extend({},{pushFollowers:!0,spacerClass:"scrollmagic-pin-spacer"},t),!(e=k.get.elements(e)[0]))return d;if("fixed"===k.css(e,"position"))return d;if(m){if(m===e)return d;d.removePin()}var n=(m=e).parentNode.style.display,r=["top","left","bottom","right","margin","marginLeft","marginRight","marginTop","marginBottom"];m.parentNode.style.display="none";var i="absolute"!=k.css(m,"position"),o=k.css(m,r.concat(["display"])),s=k.css(m,["width","height"]);m.parentNode.style.display=n,!i&&t.pushFollowers&&(t.pushFollowers=!1);var a=m.parentNode.insertBefore(document.createElement("div"),m),l=k.extend(o,{position:i?"relative":"absolute",boxSizing:"content-box",mozBoxSizing:"content-box",webkitBoxSizing:"content-box"});if(i||k.extend(l,k.css(m,["width","height"])),k.css(a,l),a.setAttribute(D,""),k.addClass(a,t.spacerClass),w={spacer:a,relSize:{width:"%"===s.width.slice(-1),height:"%"===s.height.slice(-1),autoFullWidth:"auto"===s.width&&i&&k.isMarginCollapseType(o.display)},pushFollowers:t.pushFollowers,inFlow:i},!m.___origStyle){m.___origStyle={};var c=m.style;r.concat(["width","height","position","boxSizing","mozBoxSizing","webkitBoxSizing"]).forEach(function(e){m.___origStyle[e]=c[e]||""})}return w.relSize.width&&k.css(a,{width:s.width}),w.relSize.height&&k.css(a,{height:s.height}),a.appendChild(m),k.css(m,{position:i?"relative":"absolute",margin:"auto",top:"auto",left:"auto",bottom:"auto",right:"auto"}),(w.relSize.width||w.relSize.autoFullWidth)&&k.css(m,{boxSizing:"border-box",mozBoxSizing:"border-box",webkitBoxSizing:"border-box"}),window.addEventListener("scroll",L),window.addEventListener("resize",L),window.addEventListener("resize",T),m.addEventListener("mousewheel",A),m.addEventListener("DOMMouseScroll",A),C(),d},this.removePin=function(e){if(m){if(p===f&&C(!0),e||!l){var t=w.spacer.firstChild;if(t.hasAttribute(D)){var n=w.spacer.style;margins={},["margin","marginLeft","marginRight","marginTop","marginBottom"].forEach(function(e){margins[e]=n[e]||""}),k.css(t,margins)}w.spacer.parentNode.insertBefore(t,w.spacer),w.spacer.parentNode.removeChild(w.spacer),m.parentNode.hasAttribute(D)||(k.css(m,m.___origStyle),delete m.___origStyle)}window.removeEventListener("scroll",L),window.removeEventListener("resize",L),window.removeEventListener("resize",T),m.removeEventListener("mousewheel",A),m.removeEventListener("DOMMouseScroll",A),m=void 0}return d};var O,_=[];return d.on("destroy.internal",function(e){d.removeClassToggle(e.reset)}),this.setClassToggle=function(e,t){var n=k.get.elements(e);return 0!==n.length&&k.type.String(t)&&(0<_.length&&d.removeClassToggle(),O=t,_=n,d.on("enter.internal_class leave.internal_class",function(e){var t="enter"===e.type?k.addClass:k.removeClass;_.forEach(function(e){t(e,O)})})),d},this.removeClassToggle=function(e){return e&&_.forEach(function(e){k.removeClass(e,O)}),d.off("start.internal_class end.internal_class"),O=void 0,_=[],d},function(){for(var e in h)r.hasOwnProperty(e)||delete h[e];for(var t in r)z(t);E()}(),d};var N={defaults:{duration:0,offset:0,triggerElement:void 0,triggerHook:.5,reverse:!0,loglevel:2},validate:{offset:function(e){if(e=parseFloat(e),!k.type.Number(e))throw 0;return e},triggerElement:function(e){if(e=e||void 0){var t=k.get.elements(e)[0];if(!t)throw 0;e=t}return e},triggerHook:function(e){var t={onCenter:.5,onEnter:1,onLeave:0};if(k.type.Number(e))e=Math.max(0,Math.min(parseFloat(e),1));else{if(!(e in t))throw 0;e=t[e]}return e},reverse:function(e){return!!e}},shifts:["duration","offset","triggerHook"]};P.Scene.addOption=function(e,t,n,r){e in N.defaults||(N.defaults[e]=t,N.validate[e]=n,r&&N.shifts.push(e))},P.Scene.extend=function(e){var t=this;P.Scene=function(){return t.apply(this,arguments),this.$super=k.extend({},this),e.apply(this,arguments)||this},k.extend(P.Scene,t),P.Scene.prototype=t.prototype,P.Scene.prototype.constructor=P.Scene},P.Event=function(e,t,n,r){for(var i in r=r||{})this[i]=r[i];return this.type=e,this.target=this.currentTarget=n,this.namespace=t||"",this.timeStamp=this.timestamp=Date.now(),this};var k=P._util=function(s){var n,e={},a=function(e){return parseFloat(e)||0},l=function(e){return e.currentStyle?e.currentStyle:s.getComputedStyle(e)},r=function(e,t,n,r){if((t=t===document?s:t)===s)r=!1;else if(!u.DomElement(t))return 0;e=e.charAt(0).toUpperCase()+e.substr(1).toLowerCase();var i=(n?t["offset"+e]||t["outer"+e]:t["client"+e]||t["inner"+e])||0;if(n&&r){var o=l(t);i+="Height"===e?a(o.marginTop)+a(o.marginBottom):a(o.marginLeft)+a(o.marginRight)}return i},c=function(e){return e.replace(/^[^a-z]+([a-z])/g,"$1").replace(/-([a-z])/g,function(e){return e[1].toUpperCase()})};e.extend=function(e){for(e=e||{},n=1;n<arguments.length;n++)if(arguments[n])for(var t in arguments[n])arguments[n].hasOwnProperty(t)&&(e[t]=arguments[n][t]);return e},e.isMarginCollapseType=function(e){return-1<["block","flex","list-item","table","-webkit-box"].indexOf(e)};var i=0,t=["ms","moz","webkit","o"],o=s.requestAnimationFrame,f=s.cancelAnimationFrame;for(n=0;!o&&n<t.length;++n)o=s[t[n]+"RequestAnimationFrame"],f=s[t[n]+"CancelAnimationFrame"]||s[t[n]+"CancelRequestAnimationFrame"];o||(o=function(e){var t=(new Date).getTime(),n=Math.max(0,16-(t-i)),r=s.setTimeout(function(){e(t+n)},n);return i=t+n,r}),f||(f=function(e){s.clearTimeout(e)}),e.rAF=o.bind(s),e.cAF=f.bind(s);var u=e.type=function(e){return Object.prototype.toString.call(e).replace(/^\[object (.+)\]$/,"$1").toLowerCase()};u.String=function(e){return"string"===u(e)},u.Function=function(e){return"function"===u(e)},u.Array=function(e){return Array.isArray(e)},u.Number=function(e){return!u.Array(e)&&0<=e-parseFloat(e)+1},u.DomElement=function(e){return"object"==typeof HTMLElement?e instanceof HTMLElement:e&&"object"==typeof e&&null!==e&&1===e.nodeType&&"string"==typeof e.nodeName};var d=e.get={};return d.elements=function(e){var t=[];if(u.String(e))try{e=document.querySelectorAll(e)}catch(e){return t}if("nodelist"===u(e)||u.Array(e))for(var n=0,r=t.length=e.length;n<r;n++){var i=e[n];t[n]=u.DomElement(i)?i:d.elements(i)}else(u.DomElement(e)||e===document||e===s)&&(t=[e]);return t},d.scrollTop=function(e){return e&&"number"==typeof e.scrollTop?e.scrollTop:s.pageYOffset||0},d.scrollLeft=function(e){return e&&"number"==typeof e.scrollLeft?e.scrollLeft:s.pageXOffset||0},d.width=function(e,t,n){return r("width",e,t,n)},d.height=function(e,t,n){return r("height",e,t,n)},d.offset=function(e,t){var n={top:0,left:0};if(e&&e.getBoundingClientRect){var r=e.getBoundingClientRect();n.top=r.top,n.left=r.left,t||(n.top+=d.scrollTop(),n.left+=d.scrollLeft())}return n},e.addClass=function(e,t){t&&(e.classList?e.classList.add(t):e.className+=" "+t)},e.removeClass=function(e,t){t&&(e.classList?e.classList.remove(t):e.className=e.className.replace(RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," "))},e.css=function(e,t){if(u.String(t))return l(e)[c(t)];if(u.Array(t)){var n={},r=l(e);return t.forEach(function(e){n[e]=r[c(e)]}),n}for(var i in t){var o=t[i];o==parseFloat(o)&&(o+="px"),e.style[c(i)]=o}},e}(window||{});return P});