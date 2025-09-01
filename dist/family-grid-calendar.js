var Ct=Object.defineProperty;var Tt=(r,t,e)=>t in r?Ct(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var $=(r,t,e)=>Tt(r,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const M=window,tt=M.ShadowRoot&&(M.ShadyCSS===void 0||M.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,et=Symbol(),it=new WeakMap;let $t=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==et)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(tt&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=it.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&it.set(e,t))}return t}toString(){return this.cssText}};const Dt=r=>new $t(typeof r=="string"?r:r+"",void 0,et),kt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new $t(e,r,et)},Pt=(r,t)=>{tt?r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=M.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)})},st=tt?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Dt(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var L;const R=window,rt=R.trustedTypes,Ht=rt?rt.emptyScript:"",nt=R.reactiveElementPolyfillSupport,Z={toAttribute(r,t){switch(t){case Boolean:r=r?Ht:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},yt=(r,t)=>t!==r&&(t==t||r==r),V={attribute:!0,type:String,converter:Z,reflect:!1,hasChanged:yt},J="finalized";let E=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);s!==void 0&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=V){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||V}static finalize(){if(this.hasOwnProperty(J))return!1;this[J]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(st(s))}else t!==void 0&&e.push(st(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Pt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=V){var s;const o=this.constructor._$Ep(t,i);if(o!==void 0&&i.reflect===!0){const n=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:Z).toAttribute(e,i.type);this._$El=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(o!==void 0&&this._$El!==o){const n=s.getPropertyOptions(o),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:Z;this._$El=o,this[o]=l.fromAttribute(e,n.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||yt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};E[J]=!0,E.elementProperties=new Map,E.elementStyles=[],E.shadowRootOptions={mode:"open"},nt==null||nt({ReactiveElement:E}),((L=R.reactiveElementVersions)!==null&&L!==void 0?L:R.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var F;const I=window,S=I.trustedTypes,ot=S?S.createPolicy("lit-html",{createHTML:r=>r}):void 0,Q="$lit$",y=`lit$${(Math.random()+"").slice(9)}$`,mt="?"+y,Ut=`<${mt}>`,b=document,k=()=>b.createComment(""),P=r=>r===null||typeof r!="object"&&typeof r!="function",gt=Array.isArray,Ot=r=>gt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",W=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,at=/-->/g,lt=/>/g,g=RegExp(`>|${W}(?:([^\\s"'>=/]+)(${W}*=${W}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),dt=/'/g,ct=/"/g,At=/^(?:script|style|textarea|title)$/i,Nt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),v=Nt(1),x=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ht=new WeakMap,A=b.createTreeWalker(b,129,null,!1);function bt(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(t):t}const Mt=(r,t)=>{const e=r.length-1,i=[];let s,o=t===2?"<svg>":"",n=T;for(let l=0;l<e;l++){const a=r[l];let d,h,p=-1,c=0;for(;c<a.length&&(n.lastIndex=c,h=n.exec(a),h!==null);)c=n.lastIndex,n===T?h[1]==="!--"?n=at:h[1]!==void 0?n=lt:h[2]!==void 0?(At.test(h[2])&&(s=RegExp("</"+h[2],"g")),n=g):h[3]!==void 0&&(n=g):n===g?h[0]===">"?(n=s??T,p=-1):h[1]===void 0?p=-2:(p=n.lastIndex-h[2].length,d=h[1],n=h[3]===void 0?g:h[3]==='"'?ct:dt):n===ct||n===dt?n=g:n===at||n===lt?n=T:(n=g,s=void 0);const _=n===g&&r[l+1].startsWith("/>")?" ":"";o+=n===T?a+Ut:p>=0?(i.push(d),a.slice(0,p)+Q+a.slice(p)+y+_):a+y+(p===-2?(i.push(void 0),l):_)}return[bt(r,o+(r[e]||"<?>")+(t===2?"</svg>":"")),i]};class H{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const l=t.length-1,a=this.parts,[d,h]=Mt(t,e);if(this.el=H.createElement(d,i),A.currentNode=this.el.content,e===2){const p=this.el.content,c=p.firstChild;c.remove(),p.append(...c.childNodes)}for(;(s=A.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes()){const p=[];for(const c of s.getAttributeNames())if(c.endsWith(Q)||c.startsWith(y)){const _=h[n++];if(p.push(c),_!==void 0){const j=s.getAttribute(_.toLowerCase()+Q).split(y),m=/([.?@])?(.*)/.exec(_);a.push({type:1,index:o,name:m[2],strings:j,ctor:m[1]==="."?It:m[1]==="?"?jt:m[1]==="@"?zt:B})}else a.push({type:6,index:o})}for(const c of p)s.removeAttribute(c)}if(At.test(s.tagName)){const p=s.textContent.split(y),c=p.length-1;if(c>0){s.textContent=S?S.emptyScript:"";for(let _=0;_<c;_++)s.append(p[_],k()),A.nextNode(),a.push({type:2,index:++o});s.append(p[c],k())}}}else if(s.nodeType===8)if(s.data===mt)a.push({type:2,index:o});else{let p=-1;for(;(p=s.data.indexOf(y,p+1))!==-1;)a.push({type:7,index:o}),p+=y.length-1}o++}}static createElement(t,e){const i=b.createElement("template");return i.innerHTML=t,i}}function C(r,t,e=r,i){var s,o,n,l;if(t===x)return t;let a=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const d=P(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==d&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),d===void 0?a=void 0:(a=new d(r),a._$AT(r,e,i)),i!==void 0?((n=(l=e)._$Co)!==null&&n!==void 0?n:l._$Co=[])[i]=a:e._$Cl=a),a!==void 0&&(t=C(r,a._$AS(r,t.values),a,i)),t}class Rt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:b).importNode(i,!0);A.currentNode=o;let n=A.nextNode(),l=0,a=0,d=s[0];for(;d!==void 0;){if(l===d.index){let h;d.type===2?h=new U(n,n.nextSibling,this,t):d.type===1?h=new d.ctor(n,d.name,d.strings,this,t):d.type===6&&(h=new Lt(n,this,t)),this._$AV.push(h),d=s[++a]}l!==(d==null?void 0:d.index)&&(n=A.nextNode(),l++)}return A.currentNode=b,o}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class U{constructor(t,e,i,s){var o;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=C(this,t,e),P(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==x&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Ot(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&P(this._$AH)?this._$AA.nextSibling.data=t:this.$(b.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=H.createElement(bt(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(i);else{const n=new Rt(o,this),l=n.u(this.options);n.v(i),this.$(l),this._$AH=n}}_$AC(t){let e=ht.get(t.strings);return e===void 0&&ht.set(t.strings,e=new H(t)),e}T(t){gt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new U(this.k(k()),this.k(k()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class B{constructor(t,e,i,s,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(o===void 0)t=C(this,t,e,0),n=!P(t)||t!==this._$AH&&t!==x,n&&(this._$AH=t);else{const l=t;let a,d;for(t=o[0],a=0;a<o.length-1;a++)d=C(this,l[i+a],e,a),d===x&&(d=this._$AH[a]),n||(n=!P(d)||d!==this._$AH[a]),d===u?t=u:t!==u&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class It extends B{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const Bt=S?S.emptyScript:"";class jt extends B{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,Bt):this.element.removeAttribute(this.name)}}class zt extends B{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=C(this,t,e,0))!==null&&i!==void 0?i:u)===x)return;const s=this._$AH,o=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==u&&(s===u||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class Lt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){C(this,t)}}const pt=I.litHtmlPolyfillSupport;pt==null||pt(H,U),((F=I.litHtmlVersions)!==null&&F!==void 0?F:I.litHtmlVersions=[]).push("2.8.0");const Vt=(r,t,e)=>{var i,s;const o=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let n=o._$litPart$;if(n===void 0){const l=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=n=new U(t.insertBefore(k(),l),l,void 0,e??{})}return n._$AI(r),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var q,G;class D extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Vt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return x}}D.finalized=!0,D._$litElement$=!0,(q=globalThis.litElementHydrateSupport)===null||q===void 0||q.call(globalThis,{LitElement:D});const ut=globalThis.litElementPolyfillSupport;ut==null||ut({LitElement:D});((G=globalThis.litElementVersions)!==null&&G!==void 0?G:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ft=r=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(r,t):((e,i)=>{const{kind:s,elements:o}=i;return{kind:s,elements:o,finisher(n){customElements.define(e,n)}}})(r,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=(r,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,r)}},qt=(r,t,e)=>{t.constructor.createProperty(e,r)};function wt(r){return(t,e)=>e!==void 0?qt(r,t,e):Wt(r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function O(r){return wt({...r,state:!0})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var K;((K=window.HTMLSlotElement)===null||K===void 0?void 0:K.prototype.assignedElements)!=null;const Gt=(r,t)=>new Intl.DateTimeFormat(r.locale.language,{weekday:"short"}).format(t),Kt=(r,t)=>new Intl.DateTimeFormat(r.locale.language,{day:"numeric",month:"short"}).format(t),Zt=Array.from({length:24},(r,t)=>`${t.toString().padStart(2,"0")}:00`);function N(r){return r.toISOString().split("T")[0]}const _t=15;async function Jt(r,t){var s,o,n,l;try{const a=await((s=r.callWS)==null?void 0:s.call(r,{type:"weather/get_forecast",entity_id:t,forecast_type:"daily"})),d=vt(a);if(d.length)return d}catch{}try{const a=await((o=r.callWS)==null?void 0:o.call(r,{type:"weather/get_forecast",entity_id:t,forecast_type:"hourly"})),d=Array.isArray(a==null?void 0:a.forecast)?a.forecast:void 0;if(d){const h=ft(d);if(h.length)return h}}catch{}const e=(l=(n=r.states)==null?void 0:n[t])==null?void 0:l.attributes,i=Array.isArray(e==null?void 0:e.forecast)?e==null?void 0:e.forecast:void 0;if(i&&i.length){const d="temperature"in i[0]?ft(i):vt({forecast:i});if(d.length)return d}return[]}function vt(r){return r&&typeof r=="object"&&"forecast"in r&&Array.isArray(r.forecast)?r.forecast.map(t=>({date:String(t.datetime??t.datetime_iso??t.date),high:typeof t.temperature=="number"?t.temperature:void 0,low:typeof t.templow=="number"?t.templow:void 0,condition:typeof t.condition=="string"?t.condition:void 0,precipitation_probability:typeof t.precipitation_probability=="number"?t.precipitation_probability:void 0})):[]}function ft(r){const t={};for(const e of r){const i=String(e.datetime??e.datetime_iso??e.date).split("T")[0],s=t[i]||(t[i]={date:i,high:void 0,low:void 0,condition:void 0,precipitation_probability:void 0,count:{}}),o=typeof e.temperature=="number"?e.temperature:void 0;o!==void 0&&(s.high=s.high===void 0?o:Math.max(s.high,o),s.low=s.low===void 0?o:Math.min(s.low,o));const n=typeof e.condition=="string"?e.condition:void 0;n&&(s.count[n]=(s.count[n]??0)+1);const l=typeof e.precipitation_probability=="number"?e.precipitation_probability:void 0;l!==void 0&&(s.precipitation_probability=Math.max(s.precipitation_probability??0,l))}return Object.values(t).map(({count:e,...i})=>{var o;const s=(o=Object.entries(e).sort((n,l)=>l[1]-n[1])[0])==null?void 0:o[0];return{...i,condition:s}})}var Et=Object.defineProperty,Qt=Object.getOwnPropertyDescriptor,Xt=(r,t,e)=>t in r?Et(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,w=(r,t,e,i)=>{for(var s=i>1?void 0:i?Qt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&Et(t,e,s),s},Yt=(r,t,e)=>Xt(r,t+"",e);const X=48;let f=class extends D{constructor(){super(...arguments);$(this,"hass");$(this,"_config");$(this,"_eventsByDay",{});$(this,"_allDayEventsByDay",{});$(this,"_weatherByDay",{});$(this,"_activeCalendars",new Set);$(this,"_timer")}setConfig(t){if(!t.calendars||t.calendars.length===0)throw new Error("At least one calendar entity is required");this._config={data_refresh_minutes:_t,...t},this._activeCalendars=new Set(t.calendars.map(e=>e.entity)),this._startTimer(),this._fetchData()}connectedCallback(){super.connectedCallback(),this._startTimer()}disconnectedCallback(){super.disconnectedCallback(),this._timer&&(clearInterval(this._timer),this._timer=void 0)}_startTimer(){var e;this._timer&&clearInterval(this._timer);const t=((e=this._config)==null?void 0:e.data_refresh_minutes)??_t;this._timer=window.setInterval(()=>this._fetchData(),t*60*1e3)}async _fetchData(){if(!this.hass||!this._config)return;const t=this.hass,e=new Date;e.setHours(0,0,0,0);const i=new Date(e);i.setDate(e.getDate()+7);const s=e.toISOString(),o=i.toISOString(),n={};await Promise.all(this._config.calendars.map(async d=>{if(this._activeCalendars.has(d.entity))try{const h=`calendars/${d.entity}?start=${s}&end=${o}`,p=t.callApi?await t.callApi("GET",h):await fetch(`/api/${h}`).then(c=>c.json());for(const c of p||[]){const _=typeof c.start=="object"?c.start.dateTime||c.start.date||"":c.start||c.start_time||c.startTime||"",j=typeof c.end=="object"?c.end.dateTime||c.end.date||"":c.end||c.end_time||c.endTime||"",m=new Date(_),St=new Date(j),z=N(m),xt=c.all_day||c.allDay||(typeof c.start=="object"?!!c.start.date&&!c.start.dateTime:_.length===10);(n[z]||(n[z]=[])).push({start:m,end:St,title:c.summary||c.title||"",calendar:d,allDay:xt})}}catch{}}));const l={},a={};if(Object.entries(n).forEach(([d,h])=>{const p=h.filter(c=>!c.allDay);l[d]=this._positionEvents(p),a[d]=h.filter(c=>c.allDay)}),this._eventsByDay=l,this._allDayEventsByDay=a,this._config.weather_entity){const d=await Jt(this.hass,this._config.weather_entity),h={};d.forEach(p=>{const c=String(p.date).split("T")[0];h[c]=p}),this._weatherByDay=h}}_positionEvents(t){const e=[...t].sort((n,l)=>n.start.getTime()-l.start.getTime()),i=[],s=[];for(const n of e){let l=i.findIndex(a=>a<=n.start.getTime());l===-1?(l=i.length,i.push(n.end.getTime())):i[l]=n.end.getTime(),s.push({...n,lane:l,lanes:0})}const o=i.length||1;return s.map(n=>({...n,lanes:o}))}_renderTimeAxis(){return Zt.map(t=>v`<div>${t}</div>`)}_renderEvent(t){const e=t.start.getHours()*60+t.start.getMinutes(),i=t.end.getHours()*60+t.end.getMinutes(),s=e/60*X,o=(i-e)/60*X,n=100/t.lanes,l=t.lane*n;return v`<div
      class="event_block"
      style="top:${s}px;height:${o}px;left:${l}%;width:${n}%;background:${t.calendar.color}"
    >
      ${t.title}
    </div>`}render(){const t=this.hass??{locale:{language:"en"}};if(!this._config)return v``;const e=[],i=new Date;for(let s=0;s<7;s++){const o=new Date(i);o.setDate(i.getDate()+s),e.push(o)}return v`
      <div class="calendar_container">
        <div class="calendar_header">
          ${this._config.calendars.map(s=>v`<button
                style="color:${s.color}"
                @click=${()=>this._toggleCalendar(s.entity)}
                ?disabled=${!this._activeCalendars.has(s.entity)}
              >
                ${s.name??s.entity}
              </button>`)}
        </div>
        <div class="weekday_header row">
          <div class="time_axis spacer"></div>
          ${e.map(s=>{var l,a;const o=N(s),n=this._weatherByDay[o];return v`<div class="weekday_header_day">
              <div>${Gt(t,s)} ${Kt(t,s)}</div>
              ${n?v`<div class="weather">
                    <ha-icon icon="mdi:weather-${n.condition}"></ha-icon>
                    <span class="high">${(l=n.high)==null?void 0:l.toFixed(0)}</span>
                    <span class="low">${(a=n.low)==null?void 0:a.toFixed(0)}</span>
                  </div>`:""}
            </div>`})}
        </div>
        <div class="all_day row">
          <div class="time_axis spacer"></div>
          ${e.map(s=>{const o=N(s),n=this._allDayEventsByDay[o]??[];return v`<div class="all_day_area">
              ${n.map(l=>v`<div class="all_day_event" style="background:${l.calendar.color}">
                    ${l.title}
                  </div>`)}
            </div>`})}
        </div>
        <div class="main row">
          <div class="time_axis">${this._renderTimeAxis()}</div>
          ${e.map(s=>{const o=N(s),n=this._eventsByDay[o]??[];return v`<div class="day_columns">
              ${n.map(l=>this._renderEvent(l))}
            </div>`})}
        </div>
      </div>
    `}_toggleCalendar(t){this._activeCalendars.has(t)?this._activeCalendars.delete(t):this._activeCalendars.add(t),this.requestUpdate(),this._fetchData()}};Yt(f,"styles",kt`
    :host {
      display: block;
      --hour-height: ${X}px;
      font-family: var(--ha-card-font-family, var(--ha-font-family));
    }
    .calendar_container {
      border: 1px solid var(--divider-color);
      background: var(--card-background-color, #fff);
      color: var(--primary-text-color, #000);
    }
    .calendar_header {
      display: flex;
      gap: 4px;
      padding: 4px;
    }
    .calendar_header button {
      background: none;
      border: 1px solid var(--divider-color);
      border-radius: 4px;
      padding: 2px 6px;
      font-size: 0.8rem;
    }
    .row {
      display: flex;
    }
    .weekday_header_day {
      flex: 1;
      padding: 4px;
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
    }
    .weekday_header_day .weather {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.75rem;
      justify-content: flex-end;
    }
    .weekday_header_day .weather .high {
      color: var(--error-color, #f44336);
    }
    .weekday_header_day .weather .low {
      color: var(--info-color, #2196f3);
    }
    .all_day_area {
      flex: 1;
      min-height: 24px;
      border-bottom: 1px solid var(--divider-color);
      display: flex;
      flex-direction: column;
      gap: 2px;
      padding: 2px;
      box-sizing: border-box;
    }
    .all_day_event {
      padding: 2px;
      border-radius: 4px;
      color: #fff;
      font-size: 0.75rem;
    }
    .time_axis {
      display: flex;
      flex-direction: column;
      width: 40px;
      font-size: 0.75rem;
    }
    .time_axis div {
      height: var(--hour-height);
      border-top: 1px solid var(--divider-color);
    }
    .time_axis.spacer {
      border-top: none;
    }
    .main .day_columns {
      position: relative;
      flex: 1;
      height: calc(var(--hour-height) * 24);
      border-left: 1px solid var(--divider-color);
    }
    .event_block {
      position: absolute;
      padding: 2px;
      box-sizing: border-box;
      color: #fff;
      font-size: 0.75rem;
      border-radius: 4px;
      overflow: hidden;
    }
  `);w([wt({attribute:!1})],f.prototype,"hass",2);w([O()],f.prototype,"_config",2);w([O()],f.prototype,"_eventsByDay",2);w([O()],f.prototype,"_allDayEventsByDay",2);w([O()],f.prototype,"_weatherByDay",2);w([O()],f.prototype,"_activeCalendars",2);f=w([Ft("family-grid-calendar")],f);const Y=window;Y.customCards=Y.customCards||[];Y.customCards.push({type:"family-grid-calendar",name:"Family Grid Calendar",description:"Week-view calendar with optional weather."});
