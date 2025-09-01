var At=Object.defineProperty;var Et=(n,t,e)=>t in n?At(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var S=(n,t,e)=>Et(n,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const N=window,Q=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,X=Symbol(),Y=new WeakMap;let ct=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==X)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Q&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Y.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Y.set(e,t))}return t}toString(){return this.cssText}};const bt=n=>new ct(typeof n=="string"?n:n+"",void 0,X),wt=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((s,i,o)=>s+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[o+1],n[0]);return new ct(e,n,X)},St=(n,t)=>{Q?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const s=document.createElement("style"),i=N.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)})},tt=Q?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return bt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var z;const O=window,et=O.trustedTypes,xt=et?et.emptyScript:"",st=O.reactiveElementPolyfillSupport,q={toAttribute(n,t){switch(t){case Boolean:n=n?xt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ut=(n,t)=>t!==n&&(t==t||n==n),I={attribute:!0,type:String,converter:q,reflect:!1,hasChanged:ut},Z="finalized";let g=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,s)=>{const i=this._$Ep(s,e);i!==void 0&&(this._$Ev.set(i,s),t.push(i))}),t}static createProperty(t,e=I){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const s=typeof t=="symbol"?Symbol():"__"+t,i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Object.defineProperty(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){return{get(){return this[e]},set(i){const o=this[t];this[e]=i,this.requestUpdate(t,o,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||I}static finalize(){if(this.hasOwnProperty(Z))return!1;this[Z]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,s=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const i of s)this.createProperty(i,e[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(tt(i))}else t!==void 0&&e.push(tt(t));return e}static _$Ep(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,s;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((s=t.hostConnected)===null||s===void 0||s.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return St(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostConnected)===null||s===void 0?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var s;return(s=e.hostDisconnected)===null||s===void 0?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EO(t,e,s=I){var i;const o=this.constructor._$Ep(t,s);if(o!==void 0&&s.reflect===!0){const r=(((i=s.converter)===null||i===void 0?void 0:i.toAttribute)!==void 0?s.converter:q).toAttribute(e,s.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var s;const i=this.constructor,o=i._$Ev.get(t);if(o!==void 0&&this._$El!==o){const r=i.getPropertyOptions(o),l=typeof r.converter=="function"?{fromAttribute:r.converter}:((s=r.converter)===null||s===void 0?void 0:s.fromAttribute)!==void 0?r.converter:q;this._$El=o,this[o]=l.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,s){let i=!0;t!==void 0&&(((s=s||this.constructor.getPropertyOptions(t)).hasChanged||ut)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,s))):i=!1),!this.isUpdatePending&&i&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((i,o)=>this[o]=i),this._$Ei=void 0);let e=!1;const s=this._$AL;try{e=this.shouldUpdate(s),e?(this.willUpdate(s),(t=this._$ES)===null||t===void 0||t.forEach(i=>{var o;return(o=i.hostUpdate)===null||o===void 0?void 0:o.call(i)}),this.update(s)):this._$Ek()}catch(i){throw e=!1,this._$Ek(),i}e&&this._$AE(s)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(s=>{var i;return(i=s.hostUpdated)===null||i===void 0?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,s)=>this._$EO(s,this[s],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};g[Z]=!0,g.elementProperties=new Map,g.elementStyles=[],g.shadowRootOptions={mode:"open"},st==null||st({ReactiveElement:g}),((z=O.reactiveElementVersions)!==null&&z!==void 0?z:O.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var L;const M=window,A=M.trustedTypes,it=A?A.createPolicy("lit-html",{createHTML:n=>n}):void 0,G="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,pt="?"+$,Ct=`<${pt}>`,m=document,k=()=>m.createComment(""),H=n=>n===null||typeof n!="object"&&typeof n!="function",vt=Array.isArray,kt=n=>vt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",j=`[ 	
\f\r]`,x=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,nt=/-->/g,rt=/>/g,f=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ot=/'/g,at=/"/g,_t=/^(?:script|style|textarea|title)$/i,Ht=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),_=Ht(1),E=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),lt=new WeakMap,y=m.createTreeWalker(m,129,null,!1);function $t(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return it!==void 0?it.createHTML(t):t}const Dt=(n,t)=>{const e=n.length-1,s=[];let i,o=t===2?"<svg>":"",r=x;for(let l=0;l<e;l++){const a=n[l];let d,h,c=-1,u=0;for(;u<a.length&&(r.lastIndex=u,h=r.exec(a),h!==null);)u=r.lastIndex,r===x?h[1]==="!--"?r=nt:h[1]!==void 0?r=rt:h[2]!==void 0?(_t.test(h[2])&&(i=RegExp("</"+h[2],"g")),r=f):h[3]!==void 0&&(r=f):r===f?h[0]===">"?(r=i??x,c=-1):h[1]===void 0?c=-2:(c=r.lastIndex-h[2].length,d=h[1],r=h[3]===void 0?f:h[3]==='"'?at:ot):r===at||r===ot?r=f:r===nt||r===rt?r=x:(r=f,i=void 0);const v=r===f&&n[l+1].startsWith("/>")?" ":"";o+=r===x?a+Ct:c>=0?(s.push(d),a.slice(0,c)+G+a.slice(c)+$+v):a+$+(c===-2?(s.push(void 0),l):v)}return[$t(n,o+(n[e]||"<?>")+(t===2?"</svg>":"")),s]};class D{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,r=0;const l=t.length-1,a=this.parts,[d,h]=Dt(t,e);if(this.el=D.createElement(d,s),y.currentNode=this.el.content,e===2){const c=this.el.content,u=c.firstChild;u.remove(),c.append(...u.childNodes)}for(;(i=y.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes()){const c=[];for(const u of i.getAttributeNames())if(u.endsWith(G)||u.startsWith($)){const v=h[r++];if(c.push(u),v!==void 0){const gt=i.getAttribute(v.toLowerCase()+G).split($),T=/([.?@])?(.*)/.exec(v);a.push({type:1,index:o,name:T[2],strings:gt,ctor:T[1]==="."?Tt:T[1]==="?"?Nt:T[1]==="@"?Ot:R})}else a.push({type:6,index:o})}for(const u of c)i.removeAttribute(u)}if(_t.test(i.tagName)){const c=i.textContent.split($),u=c.length-1;if(u>0){i.textContent=A?A.emptyScript:"";for(let v=0;v<u;v++)i.append(c[v],k()),y.nextNode(),a.push({type:2,index:++o});i.append(c[u],k())}}}else if(i.nodeType===8)if(i.data===pt)a.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf($,c+1))!==-1;)a.push({type:7,index:o}),c+=$.length-1}o++}}static createElement(t,e){const s=m.createElement("template");return s.innerHTML=t,s}}function b(n,t,e=n,s){var i,o,r,l;if(t===E)return t;let a=s!==void 0?(i=e._$Co)===null||i===void 0?void 0:i[s]:e._$Cl;const d=H(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==d&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),d===void 0?a=void 0:(a=new d(n),a._$AT(n,e,s)),s!==void 0?((r=(l=e)._$Co)!==null&&r!==void 0?r:l._$Co=[])[s]=a:e._$Cl=a),a!==void 0&&(t=b(n,a._$AS(n,t.values),a,s)),t}class Pt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:s},parts:i}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:m).importNode(s,!0);y.currentNode=o;let r=y.nextNode(),l=0,a=0,d=i[0];for(;d!==void 0;){if(l===d.index){let h;d.type===2?h=new P(r,r.nextSibling,this,t):d.type===1?h=new d.ctor(r,d.name,d.strings,this,t):d.type===6&&(h=new Mt(r,this,t)),this._$AV.push(h),d=i[++a]}l!==(d==null?void 0:d.index)&&(r=y.nextNode(),l++)}return y.currentNode=m,o}v(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class P{constructor(t,e,s,i){var o;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cp=(o=i==null?void 0:i.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=b(this,t,e),H(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==E&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):kt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==p&&H(this._$AH)?this._$AA.nextSibling.data=t:this.$(m.createTextNode(t)),this._$AH=t}g(t){var e;const{values:s,_$litType$:i}=t,o=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=D.createElement($t(i.h,i.h[0]),this.options)),i);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(s);else{const r=new Pt(o,this),l=r.u(this.options);r.v(s),this.$(l),this._$AH=r}}_$AC(t){let e=lt.get(t.strings);return e===void 0&&lt.set(t.strings,e=new D(t)),e}T(t){vt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const o of t)i===e.length?e.push(s=new P(this.k(k()),this.k(k()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)===null||s===void 0||s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class R{constructor(t,e,s,i,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,s,i){const o=this.strings;let r=!1;if(o===void 0)t=b(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==E,r&&(this._$AH=t);else{const l=t;let a,d;for(t=o[0],a=0;a<o.length-1;a++)d=b(this,l[s+a],e,a),d===E&&(d=this._$AH[a]),r||(r=!H(d)||d!==this._$AH[a]),d===p?t=p:t!==p&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}r&&!i&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Tt extends R{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}const Ut=A?A.emptyScript:"";class Nt extends R{constructor(){super(...arguments),this.type=4}j(t){t&&t!==p?this.element.setAttribute(this.name,Ut):this.element.removeAttribute(this.name)}}class Ot extends R{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){var s;if((t=(s=b(this,t,e,0))!==null&&s!==void 0?s:p)===E)return;const i=this._$AH,o=t===p&&i!==p||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==p&&(i===p||o);o&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,s;typeof this._$AH=="function"?this._$AH.call((s=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&s!==void 0?s:this.element,t):this._$AH.handleEvent(t)}}class Mt{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){b(this,t)}}const dt=M.litHtmlPolyfillSupport;dt==null||dt(D,P),((L=M.litHtmlVersions)!==null&&L!==void 0?L:M.litHtmlVersions=[]).push("2.8.0");const Rt=(n,t,e)=>{var s,i;const o=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:t;let r=o._$litPart$;if(r===void 0){const l=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:null;o._$litPart$=r=new P(t.insertBefore(k(),l),l,void 0,e??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var V,F;class C extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const s=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=s.firstChild),s}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Rt(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return E}}C.finalized=!0,C._$litElement$=!0,(V=globalThis.litElementHydrateSupport)===null||V===void 0||V.call(globalThis,{LitElement:C});const ht=globalThis.litElementPolyfillSupport;ht==null||ht({LitElement:C});((F=globalThis.litElementVersions)!==null&&F!==void 0?F:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt=n=>t=>typeof t=="function"?((e,s)=>(customElements.define(e,s),s))(n,t):((e,s)=>{const{kind:i,elements:o}=s;return{kind:i,elements:o,finisher(r){customElements.define(e,r)}}})(n,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const zt=(n,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,n)}},It=(n,t,e)=>{t.constructor.createProperty(e,n)};function ft(n){return(t,e)=>e!==void 0?It(n,t,e):zt(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function yt(n){return ft({...n,state:!0})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var W;((W=window.HTMLSlotElement)===null||W===void 0?void 0:W.prototype.assignedElements)!=null;const Lt=(n,t)=>new Intl.DateTimeFormat(n.locale.language,{weekday:"short"}).format(t),jt=(n,t)=>new Intl.DateTimeFormat(n.locale.language,{day:"numeric",month:"short"}).format(t),Vt=Array.from({length:24},(n,t)=>`${t.toString().padStart(2,"0")}:00`);function K(n){return n.toISOString().split("T")[0]}const Ft=15;var mt=Object.defineProperty,Wt=Object.getOwnPropertyDescriptor,Kt=(n,t,e)=>t in n?mt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,B=(n,t,e,s)=>{for(var i=s>1?void 0:s?Wt(t,e):t,o=n.length-1,r;o>=0;o--)(r=n[o])&&(i=(s?r(t,e,i):r(i))||i);return s&&i&&mt(t,e,i),i},qt=(n,t,e)=>Kt(n,t+"",e);const J=48,U=[{entity:"calendar.nuesken_family_gmail",name:"Family",color:"#3f51b5"},{entity:"calendar.dennis_nuesken_gmail",name:"Dennis",color:"#9c27b0"},{entity:"calendar.auri_nuesken_gmail_com",name:"Auri",color:"#03a9f4"}];let w=class extends C{constructor(){super(...arguments);S(this,"hass");S(this,"_eventsByDay",{});S(this,"_weatherByDay",{});S(this,"_timer")}connectedCallback(){super.connectedCallback(),this._generateMockData();const t=Ft*60*1e3;this._timer=window.setInterval(()=>this._generateMockData(),t)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&(clearInterval(this._timer),this._timer=void 0)}_generateMockData(){const t=new Date,e={},s={};for(let i=0;i<7;i++){const o=new Date(t);o.setDate(t.getDate()+i);const r=K(o),l=new Date(o);l.setHours(9,0,0,0);const a=new Date(o);a.setHours(10,30,0,0);const d=new Date(o);d.setHours(9,30,0,0);const h=new Date(o);h.setHours(12,0,0,0);const c=new Date(o);c.setHours(13,0,0,0);const u=new Date(o);u.setHours(15,0,0,0);const v=[{start:l,end:a,title:"Breakfast",calendar:U[0]},{start:d,end:h,title:"Team Meeting",calendar:U[1]},{start:c,end:u,title:"Study",calendar:U[2]}];e[r]=this._positionEvents(v),s[r]={date:r,high:25+i,low:15+i,condition:["sunny","cloudy","rainy"][i%3]}}this._eventsByDay=e,this._weatherByDay=s}_positionEvents(t){const e=[...t].sort((r,l)=>r.start.getTime()-l.start.getTime()),s=[],i=[];for(const r of e){let l=s.findIndex(a=>a<=r.start.getTime());l===-1?(l=s.length,s.push(r.end.getTime())):s[l]=r.end.getTime(),i.push({...r,lane:l,lanes:0})}const o=s.length||1;return i.map(r=>({...r,lanes:o}))}_renderTimeAxis(){return Vt.map(t=>_`<div>${t}</div>`)}_renderEvent(t){const e=t.start.getHours()*60+t.start.getMinutes(),s=t.end.getHours()*60+t.end.getMinutes(),i=e/60*J,o=(s-e)/60*J,r=100/t.lanes,l=t.lane*r;return _`<div
      class="event_block"
      style="top:${i}px;height:${o}px;left:${l}%;width:${r}%;background:${t.calendar.color}"
    >
      ${t.title}
    </div>`}render(){const t=this.hass??{locale:{language:"en"}},e=[],s=new Date;for(let i=0;i<7;i++){const o=new Date(s);o.setDate(s.getDate()+i),e.push(o)}return _`
      <div class="calendar_container">
        <div class="calendar_header">
          ${U.map(i=>_`<button style="color:${i.color}">${i.name??i.entity}</button>`)}
        </div>
        <div class="weekday_header row">
          <div class="time_axis spacer"></div>
          ${e.map(i=>{var l,a;const o=K(i),r=this._weatherByDay[o];return _`<div class="weekday_header">
              <div>${Lt(t,i)} ${jt(t,i)}</div>
              ${r?_`<div class="weather">
                    <ha-icon icon="mdi:weather-${r.condition}"></ha-icon>
                    <span class="high">${(l=r.high)==null?void 0:l.toFixed(0)}</span>
                    <span class="low">${(a=r.low)==null?void 0:a.toFixed(0)}</span>
                  </div>`:""}
            </div>`})}
        </div>
        <div class="all_day row">
          <div class="time_axis spacer"></div>
          ${e.map(()=>_`<div class="all_day_area"></div>`)}
        </div>
        <div class="main row">
          <div class="time_axis">${this._renderTimeAxis()}</div>
          ${e.map(i=>{const o=K(i),r=this._eventsByDay[o]??[];return _`<div class="day_columns">
              ${r.map(l=>this._renderEvent(l))}
            </div>`})}
        </div>
      </div>
    `}};qt(w,"styles",wt`
    :host {
      display: block;
      --hour-height: ${J}px;
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
  `);B([ft({attribute:!1})],w.prototype,"hass",2);B([yt()],w.prototype,"_eventsByDay",2);B([yt()],w.prototype,"_weatherByDay",2);w=B([Bt("family-grid-calendar")],w);
