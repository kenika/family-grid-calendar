var wt=Object.defineProperty;var Et=(r,t,e)=>t in r?wt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var m=(r,t,e)=>Et(r,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=window,X=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Y=Symbol(),tt=new WeakMap;let _t=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==Y)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(X&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=tt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&tt.set(e,t))}return t}toString(){return this.cssText}};const St=r=>new _t(typeof r=="string"?r:r+"",void 0,Y),xt=(r,...t)=>{const e=r.length===1?r[0]:t.reduce((i,s,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+r[o+1],r[0]);return new _t(e,r,Y)},Ct=(r,t)=>{X?r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=N.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,r.appendChild(i)})},et=X?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return St(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const M=window,it=M.trustedTypes,Tt=it?it.emptyScript:"",st=M.reactiveElementPolyfillSupport,G={toAttribute(r,t){switch(t){case Boolean:r=r?Tt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},ft=(r,t)=>t!==r&&(t==t||r==r),j={attribute:!0,type:String,converter:G,reflect:!1,hasChanged:ft},Z="finalized";let b=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);s!==void 0&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=j){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||j}static finalize(){if(this.hasOwnProperty(Z))return!1;this[Z]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(et(s))}else t!==void 0&&e.push(et(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Ct(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=j){var s;const o=this.constructor._$Ep(t,i);if(o!==void 0&&i.reflect===!0){const n=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:G).toAttribute(e,i.type);this._$El=t,n==null?this.removeAttribute(o):this.setAttribute(o,n),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(o!==void 0&&this._$El!==o){const n=s.getPropertyOptions(o),l=typeof n.converter=="function"?{fromAttribute:n.converter}:((i=n.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?n.converter:G;this._$El=o,this[o]=l.fromAttribute(e,n.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||ft)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};b[Z]=!0,b.elementProperties=new Map,b.elementStyles=[],b.shadowRootOptions={mode:"open"},st==null||st({ReactiveElement:b}),((B=M.reactiveElementVersions)!==null&&B!==void 0?B:M.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var L;const R=window,w=R.trustedTypes,rt=w?w.createPolicy("lit-html",{createHTML:r=>r}):void 0,J="$lit$",f=`lit$${(Math.random()+"").slice(9)}$`,$t="?"+f,Pt=`<${$t}>`,A=document,k=()=>A.createComment(""),H=r=>r===null||typeof r!="object"&&typeof r!="function",mt=Array.isArray,kt=r=>mt(r)||typeof(r==null?void 0:r[Symbol.iterator])=="function",V=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,ot=/>/g,y=RegExp(`>|${V}(?:([^\\s"'>=/]+)(${V}*=${V}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),at=/'/g,lt=/"/g,yt=/^(?:script|style|textarea|title)$/i,Ht=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),_=Ht(1),E=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),ht=new WeakMap,g=A.createTreeWalker(A,129,null,!1);function gt(r,t){if(!Array.isArray(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return rt!==void 0?rt.createHTML(t):t}const Ut=(r,t)=>{const e=r.length-1,i=[];let s,o=t===2?"<svg>":"",n=T;for(let l=0;l<e;l++){const a=r[l];let h,d,c=-1,p=0;for(;p<a.length&&(n.lastIndex=p,d=n.exec(a),d!==null);)p=n.lastIndex,n===T?d[1]==="!--"?n=nt:d[1]!==void 0?n=ot:d[2]!==void 0?(yt.test(d[2])&&(s=RegExp("</"+d[2],"g")),n=y):d[3]!==void 0&&(n=y):n===y?d[0]===">"?(n=s??T,c=-1):d[1]===void 0?c=-2:(c=n.lastIndex-d[2].length,h=d[1],n=d[3]===void 0?y:d[3]==='"'?lt:at):n===lt||n===at?n=y:n===nt||n===ot?n=T:(n=y,s=void 0);const v=n===y&&r[l+1].startsWith("/>")?" ":"";o+=n===T?a+Pt:c>=0?(i.push(h),a.slice(0,c)+J+a.slice(c)+f+v):a+f+(c===-2?(i.push(void 0),l):v)}return[gt(r,o+(r[e]||"<?>")+(t===2?"</svg>":"")),i]};class U{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,n=0;const l=t.length-1,a=this.parts,[h,d]=Ut(t,e);if(this.el=U.createElement(h,i),g.currentNode=this.el.content,e===2){const c=this.el.content,p=c.firstChild;p.remove(),c.append(...p.childNodes)}for(;(s=g.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes()){const c=[];for(const p of s.getAttributeNames())if(p.endsWith(J)||p.startsWith(f)){const v=d[n++];if(c.push(p),v!==void 0){const C=s.getAttribute(v.toLowerCase()+J).split(f),O=/([.?@])?(.*)/.exec(v);a.push({type:1,index:o,name:O[2],strings:C,ctor:O[1]==="."?Ot:O[1]==="?"?Mt:O[1]==="@"?Rt:I})}else a.push({type:6,index:o})}for(const p of c)s.removeAttribute(p)}if(yt.test(s.tagName)){const c=s.textContent.split(f),p=c.length-1;if(p>0){s.textContent=w?w.emptyScript:"";for(let v=0;v<p;v++)s.append(c[v],k()),g.nextNode(),a.push({type:2,index:++o});s.append(c[p],k())}}}else if(s.nodeType===8)if(s.data===$t)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf(f,c+1))!==-1;)a.push({type:7,index:o}),c+=f.length-1}o++}}static createElement(t,e){const i=A.createElement("template");return i.innerHTML=t,i}}function S(r,t,e=r,i){var s,o,n,l;if(t===E)return t;let a=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const h=H(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==h&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),h===void 0?a=void 0:(a=new h(r),a._$AT(r,e,i)),i!==void 0?((n=(l=e)._$Co)!==null&&n!==void 0?n:l._$Co=[])[i]=a:e._$Cl=a),a!==void 0&&(t=S(r,a._$AS(r,t.values),a,i)),t}class Dt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:A).importNode(i,!0);g.currentNode=o;let n=g.nextNode(),l=0,a=0,h=s[0];for(;h!==void 0;){if(l===h.index){let d;h.type===2?d=new D(n,n.nextSibling,this,t):h.type===1?d=new h.ctor(n,h.name,h.strings,this,t):h.type===6&&(d=new It(n,this,t)),this._$AV.push(d),h=s[++a]}l!==(h==null?void 0:h.index)&&(n=g.nextNode(),l++)}return g.currentNode=A,o}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class D{constructor(t,e,i,s){var o;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),H(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):kt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&H(this._$AH)?this._$AA.nextSibling.data=t:this.$(A.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(gt(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(i);else{const n=new Dt(o,this),l=n.u(this.options);n.v(i),this.$(l),this._$AH=n}}_$AC(t){let e=ht.get(t.strings);return e===void 0&&ht.set(t.strings,e=new U(t)),e}T(t){mt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new D(this.k(k()),this.k(k()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class I{constructor(t,e,i,s,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let n=!1;if(o===void 0)t=S(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==E,n&&(this._$AH=t);else{const l=t;let a,h;for(t=o[0],a=0;a<o.length-1;a++)h=S(this,l[i+a],e,a),h===E&&(h=this._$AH[a]),n||(n=!H(h)||h!==this._$AH[a]),h===u?t=u:t!==u&&(t+=(h??"")+o[a+1]),this._$AH[a]=h}n&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Ot extends I{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const Nt=w?w.emptyScript:"";class Mt extends I{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,Nt):this.element.removeAttribute(this.name)}}class Rt extends I{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=S(this,t,e,0))!==null&&i!==void 0?i:u)===E)return;const s=this._$AH,o=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,n=t!==u&&(s===u||o);o&&this.element.removeEventListener(this.name,this,s),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class It{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}}const ct=R.litHtmlPolyfillSupport;ct==null||ct(U,D),((L=R.litHtmlVersions)!==null&&L!==void 0?L:R.litHtmlVersions=[]).push("2.8.0");const zt=(r,t,e)=>{var i,s;const o=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let n=o._$litPart$;if(n===void 0){const l=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=n=new D(t.insertBefore(k(),l),l,void 0,e??{})}return n._$AI(r),n};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var F,W;class P extends b{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=zt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return E}}P.finalized=!0,P._$litElement$=!0,(F=globalThis.litElementHydrateSupport)===null||F===void 0||F.call(globalThis,{LitElement:P});const dt=globalThis.litElementPolyfillSupport;dt==null||dt({LitElement:P});((W=globalThis.litElementVersions)!==null&&W!==void 0?W:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt=r=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(r,t):((e,i)=>{const{kind:s,elements:o}=i;return{kind:s,elements:o,finisher(n){customElements.define(e,n)}}})(r,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const jt=(r,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,r)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,r)}},Lt=(r,t,e)=>{t.constructor.createProperty(e,r)};function At(r){return(t,e)=>e!==void 0?Lt(r,t,e):jt(r,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function z(r){return At({...r,state:!0})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var q;((q=window.HTMLSlotElement)===null||q===void 0?void 0:q.prototype.assignedElements)!=null;const Vt=(r,t)=>new Intl.DateTimeFormat(r.locale.language,{weekday:"short"}).format(t),Ft=(r,t)=>new Intl.DateTimeFormat(r.locale.language,{day:"numeric",month:"short"}).format(t),Wt=Array.from({length:24},(r,t)=>`${t.toString().padStart(2,"0")}:00`);function K(r){return r.toISOString().split("T")[0]}const pt=15;async function qt(r,t){var s,o,n,l;try{const a=await((s=r.callWS)==null?void 0:s.call(r,{type:"weather/get_forecast",entity_id:t,forecast_type:"daily"})),h=ut(a);if(h.length)return h}catch{}try{const a=await((o=r.callWS)==null?void 0:o.call(r,{type:"weather/get_forecast",entity_id:t,forecast_type:"hourly"})),h=Array.isArray(a==null?void 0:a.forecast)?a.forecast:void 0;if(h){const d=vt(h);if(d.length)return d}}catch{}const e=(l=(n=r.states)==null?void 0:n[t])==null?void 0:l.attributes,i=Array.isArray(e==null?void 0:e.forecast)?e==null?void 0:e.forecast:void 0;if(i&&i.length){const h="temperature"in i[0]?vt(i):ut({forecast:i});if(h.length)return h}return[]}function ut(r){return r&&typeof r=="object"&&"forecast"in r&&Array.isArray(r.forecast)?r.forecast.map(t=>({date:String(t.datetime??t.datetime_iso??t.date),high:typeof t.temperature=="number"?t.temperature:void 0,low:typeof t.templow=="number"?t.templow:void 0,condition:typeof t.condition=="string"?t.condition:void 0,precipitation_probability:typeof t.precipitation_probability=="number"?t.precipitation_probability:void 0})):[]}function vt(r){const t={};for(const e of r){const i=String(e.datetime??e.datetime_iso??e.date).split("T")[0],s=t[i]||(t[i]={date:i,high:void 0,low:void 0,condition:void 0,precipitation_probability:void 0,count:{}}),o=typeof e.temperature=="number"?e.temperature:void 0;o!==void 0&&(s.high=s.high===void 0?o:Math.max(s.high,o),s.low=s.low===void 0?o:Math.min(s.low,o));const n=typeof e.condition=="string"?e.condition:void 0;n&&(s.count[n]=(s.count[n]??0)+1);const l=typeof e.precipitation_probability=="number"?e.precipitation_probability:void 0;l!==void 0&&(s.precipitation_probability=Math.max(s.precipitation_probability??0,l))}return Object.values(t).map(({count:e,...i})=>{var o;const s=(o=Object.entries(e).sort((n,l)=>l[1]-n[1])[0])==null?void 0:o[0];return{...i,condition:s}})}var bt=Object.defineProperty,Kt=Object.getOwnPropertyDescriptor,Gt=(r,t,e)=>t in r?bt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e,x=(r,t,e,i)=>{for(var s=i>1?void 0:i?Kt(t,e):t,o=r.length-1,n;o>=0;o--)(n=r[o])&&(s=(i?n(t,e,s):n(s))||s);return i&&s&&bt(t,e,s),s},Zt=(r,t,e)=>Gt(r,t+"",e);const Q=48;let $=class extends P{constructor(){super(...arguments);m(this,"hass");m(this,"_config");m(this,"_eventsByDay",{});m(this,"_weatherByDay",{});m(this,"_activeCalendars",new Set);m(this,"_timer")}setConfig(t){this._config={data_refresh_minutes:pt,...t},this._activeCalendars=new Set(t.calendars.map(e=>e.entity)),this._startTimer(),this._fetchData()}connectedCallback(){super.connectedCallback(),this._startTimer()}disconnectedCallback(){super.disconnectedCallback(),this._timer&&(clearInterval(this._timer),this._timer=void 0)}_startTimer(){var e;this._timer&&clearInterval(this._timer);const t=((e=this._config)==null?void 0:e.data_refresh_minutes)??pt;this._timer=window.setInterval(()=>this._fetchData(),t*60*1e3)}async _fetchData(){if(!this.hass||!this._config)return;const t=this.hass,e=new Date;e.setHours(0,0,0,0);const i=new Date(e);i.setDate(e.getDate()+7);const s=e.toISOString(),o=i.toISOString(),n={};await Promise.all(this._config.calendars.map(async a=>{if(this._activeCalendars.has(a.entity))try{const h=`calendars/${a.entity}?start=${s}&end=${o}`,d=t.callApi?await t.callApi("GET",h):await fetch(`/api/${h}`).then(c=>c.json());for(const c of d||[]){const p=new Date(c.start||c.start_time||c.startTime||0),v=new Date(c.end||c.end_time||c.endTime||0),C=K(p);(n[C]||(n[C]=[])).push({start:p,end:v,title:c.summary||c.title||"",calendar:a,allDay:c.all_day||c.allDay||!1})}}catch{}}));const l={};if(Object.entries(n).forEach(([a,h])=>{l[a]=this._positionEvents(h)}),this._eventsByDay=l,this._config.weather_entity){const a=await qt(this.hass,this._config.weather_entity),h={};a.forEach(d=>{const c=String(d.date).split("T")[0];h[c]=d}),this._weatherByDay=h}}_positionEvents(t){const e=[...t].sort((n,l)=>n.start.getTime()-l.start.getTime()),i=[],s=[];for(const n of e){let l=i.findIndex(a=>a<=n.start.getTime());l===-1?(l=i.length,i.push(n.end.getTime())):i[l]=n.end.getTime(),s.push({...n,lane:l,lanes:0})}const o=i.length||1;return s.map(n=>({...n,lanes:o}))}_renderTimeAxis(){return Wt.map(t=>_`<div>${t}</div>`)}_renderEvent(t){const e=t.start.getHours()*60+t.start.getMinutes(),i=t.end.getHours()*60+t.end.getMinutes(),s=e/60*Q,o=(i-e)/60*Q,n=100/t.lanes,l=t.lane*n;return _`<div
      class="event_block"
      style="top:${s}px;height:${o}px;left:${l}%;width:${n}%;background:${t.calendar.color}"
    >
      ${t.title}
    </div>`}render(){const t=this.hass??{locale:{language:"en"}};if(!this._config)return _``;const e=[],i=new Date;for(let s=0;s<7;s++){const o=new Date(i);o.setDate(i.getDate()+s),e.push(o)}return _`
      <div class="calendar_container">
        <div class="calendar_header">
          ${this._config.calendars.map(s=>_`<button
                style="color:${s.color}"
                @click=${()=>this._toggleCalendar(s.entity)}
                ?disabled=${!this._activeCalendars.has(s.entity)}
              >
                ${s.name??s.entity}
              </button>`)}
        </div>
        <div class="weekday_header row">
          <div class="time_axis spacer"></div>
          ${e.map(s=>{var l,a;const o=K(s),n=this._weatherByDay[o];return _`<div class="weekday_header">
              <div>${Vt(t,s)} ${Ft(t,s)}</div>
              ${n?_`<div class="weather">
                    <ha-icon icon="mdi:weather-${n.condition}"></ha-icon>
                    <span class="high">${(l=n.high)==null?void 0:l.toFixed(0)}</span>
                    <span class="low">${(a=n.low)==null?void 0:a.toFixed(0)}</span>
                  </div>`:""}
            </div>`})}
        </div>
        <div class="all_day row">
          <div class="time_axis spacer"></div>
          ${e.map(()=>_`<div class="all_day_area"></div>`)}
        </div>
        <div class="main row">
          <div class="time_axis">${this._renderTimeAxis()}</div>
          ${e.map(s=>{const o=K(s),n=this._eventsByDay[o]??[];return _`<div class="day_columns">
              ${n.map(l=>this._renderEvent(l))}
            </div>`})}
        </div>
      </div>
    `}_toggleCalendar(t){this._activeCalendars.has(t)?this._activeCalendars.delete(t):this._activeCalendars.add(t),this.requestUpdate(),this._fetchData()}};Zt($,"styles",xt`
    :host {
      display: block;
      --hour-height: ${Q}px;
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
    .weekday_header {
      flex: 1;
      text-align: center;
      padding: 4px;
      border-bottom: 1px solid var(--divider-color);
    }
    .weekday_header .weather {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 4px;
      font-size: 0.75rem;
    }
    .weekday_header .weather .high {
      color: var(--error-color, #f44336);
    }
    .weekday_header .weather .low {
      color: var(--info-color, #2196f3);
    }
    .all_day_area {
      flex: 1;
      min-height: 24px;
      border-bottom: 1px solid var(--divider-color);
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
  `);x([At({attribute:!1})],$.prototype,"hass",2);x([z()],$.prototype,"_config",2);x([z()],$.prototype,"_eventsByDay",2);x([z()],$.prototype,"_weatherByDay",2);x([z()],$.prototype,"_activeCalendars",2);$=x([Bt("family-grid-calendar")],$);
