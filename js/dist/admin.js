(()=>{var e={510:()=>{},268:(e,t,r)=>{"use strict";var n,a,o={};r.r(o),r.d(o,{findAndRemoveFirstVdomChild:()=>C,findFirstVdomChild:()=>A}),function(e){e.Attribute="attribute",e.Pseudo="pseudo",e.PseudoElement="pseudo-element",e.Tag="tag",e.Universal="universal",e.Adjacent="adjacent",e.Child="child",e.Descendant="descendant",e.Parent="parent",e.Sibling="sibling",e.ColumnCombinator="column-combinator"}(n||(n={})),function(e){e.Any="any",e.Element="element",e.End="end",e.Equals="equals",e.Exists="exists",e.Hyphen="hyphen",e.Not="not",e.Start="start"}(a||(a={}));var s=/^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,i=/\\([\da-f]{1,6}\s?|(\s)|.)/gi,c=new Map([[126,a.Element],[94,a.Start],[36,a.End],[42,a.Any],[33,a.Not],[124,a.Hyphen]]),u=new Set(["has","not","matches","is","where","host","host-context"]),l=new Set(["contains","icontains"]);function d(e,t,r){var n=parseInt(t,16)-65536;return n!=n||r?t:n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320)}function h(e){return e.replace(i,d)}function f(e){return 39===e||34===e}function p(e){return 32===e||9===e||10===e||12===e||13===e}function v(e){var t=[],r=m(t,""+e,0);if(r<e.length)throw new Error("Unmatched selector: "+e.slice(r));return t}function m(e,t,r){var o=[];function i(e){var n=t.slice(r+e).match(s);if(!n)throw new Error("Expected name, found "+t.slice(r));var a=n[0];return r+=e+a.length,h(a)}function d(e){for(r+=e;r<t.length&&p(t.charCodeAt(r));)r++}function v(){for(var e=r+=1,n=1;n>0&&r<t.length;r++)40!==t.charCodeAt(r)||C(r)?41!==t.charCodeAt(r)||C(r)||n--:n++;if(n)throw new Error("Parenthesis not matched");return h(t.slice(e,r-1))}function C(e){for(var r=0;92===t.charCodeAt(--e);)r++;return 1==(1&r)}function A(){if(o.length>0&&function(e){switch(e.type){case n.Adjacent:case n.Child:case n.Descendant:case n.Parent:case n.Sibling:case n.ColumnCombinator:return!0;default:return!1}}(o[o.length-1]))throw new Error("Did not expect successive traversals.")}function g(e){o.length>0&&o[o.length-1].type===n.Descendant?o[o.length-1].type=e:(A(),o.push({type:e}))}function y(e,t){o.push({type:n.Attribute,name:e,action:t,value:i(1),namespace:null,ignoreCase:"quirks"})}function b(){if(o.length&&o[o.length-1].type===n.Descendant&&o.pop(),0===o.length)throw new Error("Empty sub-selector");e.push(o)}if(d(0),t.length===r)return r;e:for(;r<t.length;){var w=t.charCodeAt(r);switch(w){case 32:case 9:case 10:case 12:case 13:0!==o.length&&o[0].type===n.Descendant||(A(),o.push({type:n.Descendant})),d(1);break;case 62:g(n.Child),d(1);break;case 60:g(n.Parent),d(1);break;case 126:g(n.Sibling),d(1);break;case 43:g(n.Adjacent),d(1);break;case 46:y("class",a.Element);break;case 35:y("id",a.Equals);break;case 91:d(1);var E=void 0,x=null;124===t.charCodeAt(r)?E=i(1):t.startsWith("*|",r)?(x="*",E=i(2)):(E=i(0),124===t.charCodeAt(r)&&61!==t.charCodeAt(r+1)&&(x=E,E=i(1))),d(0);var k=a.Exists,P=c.get(t.charCodeAt(r));if(P){if(k=P,61!==t.charCodeAt(r+1))throw new Error("Expected `=`");d(2)}else 61===t.charCodeAt(r)&&(k=a.Equals,d(1));var S="",j=null;if("exists"!==k){if(f(t.charCodeAt(r))){for(var q=t.charCodeAt(r),D=r+1;D<t.length&&(t.charCodeAt(D)!==q||C(D));)D+=1;if(t.charCodeAt(D)!==q)throw new Error("Attribute value didn't end");S=h(t.slice(r+1,D)),r=D+1}else{for(var O=r;r<t.length&&(!p(t.charCodeAt(r))&&93!==t.charCodeAt(r)||C(r));)r+=1;S=h(t.slice(O,r))}d(0);var F=32|t.charCodeAt(r);115===F?(j=!1,d(1)):105===F&&(j=!0,d(1))}if(93!==t.charCodeAt(r))throw new Error("Attribute selector didn't terminate");r+=1;var W={type:n.Attribute,name:E,action:k,value:S,namespace:x,ignoreCase:j};o.push(W);break;case 58:if(58===t.charCodeAt(r+1)){o.push({type:n.PseudoElement,name:i(2).toLowerCase(),data:40===t.charCodeAt(r)?v():null});continue}var M=i(1).toLowerCase(),L=null;if(40===t.charCodeAt(r))if(u.has(M)){if(f(t.charCodeAt(r+1)))throw new Error("Pseudo-selector "+M+" cannot be quoted");if(r=m(L=[],t,r+1),41!==t.charCodeAt(r))throw new Error("Missing closing parenthesis in :"+M+" ("+t+")");r+=1}else{if(L=v(),l.has(M)){var N=L.charCodeAt(0);N===L.charCodeAt(L.length-1)&&f(N)&&(L=L.slice(1,-1))}L=h(L)}o.push({type:n.Pseudo,name:M,data:L});break;case 44:b(),o=[],d(1);break;default:if(t.startsWith("/*",r)){var T=t.indexOf("*/",r+2);if(T<0)throw new Error("Comment was not terminated");r=T+2,0===o.length&&d(0);break}var U=null,V=void 0;if(42===w)r+=1,V="*";else if(124===w){if(V="",124===t.charCodeAt(r+1)){g(n.ColumnCombinator),d(2);break}}else{if(!s.test(t.slice(r)))break e;V=i(0)}124===t.charCodeAt(r)&&124!==t.charCodeAt(r+1)&&(U=V,42===t.charCodeAt(r+1)?(V="*",r+=2):V=i(1)),o.push("*"===V?{type:n.Universal,namespace:U}:{type:n.Tag,name:V,namespace:U})}}return b(),r}function C(e,t){var r=A(e,t);return void 0!==r&&(r.tag="[",r.attrs={removedViaVdomUtils:!0},r.children=[],!0)}function A(e,t,r){return g(e,v(t),r)}function g(e,t,r){var n;n=Array.isArray(e)?e:[e];var a=void 0;return n.some((function(e){if("boolean"==typeof e||"number"==typeof e||"string"==typeof e||null==e)return!1;if(Array.isArray(e)){var n=g(e,t,r);return!!n&&(a=n,!0)}if(function(e,t){return t.some((function(t){return t.every((function(t){var r,n,a,o;switch(t.type){case"tag":return e.tag===t.name;case"attribute":if(!e.attrs)return!1;"class"===t.name&&(t.name="className");var s=e.attrs[t.name];switch("className"===t.name&&"string"==typeof s&&(s=s.trim()),t.ignoreCase&&"string"==typeof s&&(s=s.toLowerCase(),t.value=t.value.toLowerCase()),t.action){case"exists":return e.attrs.hasOwnProperty(t.name);case"equals":return s===t.value;case"start":return(null==(r=s)||null==r.startsWith?void 0:r.startsWith(t.value))||!1;case"end":return(null==(n=s)||null==n.endsWith?void 0:n.endsWith(t.value))||!1;case"element":return(null==(a=s)||null==a.split||null==(o=a.split(" "))||null==o.includes?void 0:o.includes(t.value))||!1}}return!1}))}))}(e,t))return a=e,!0;if(Array.isArray(e.children)){var o=g(e.children,t);return!!o&&(a=o,!0)}return!1})),r&&a&&r(a),a}}},t={};function r(n){var a=t[n];if(void 0!==a)return a.exports;var o=t[n]={exports:{}};return e[n](o,o.exports,r),o.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var n={};(()=>{"use strict";r.r(n),r(268);var e=r(510),t={};for(const r in e)"default"!==r&&(t[r]=()=>e[r]);r.d(n,t)})(),module.exports=n})();
//# sourceMappingURL=admin.js.map