var yt=Object.defineProperty;var gt=(n,t,e)=>t in n?yt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var N=(n,t,e)=>gt(n,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const O=window,J=O.ShadowRoot&&(O.ShadyCSS===void 0||O.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),X=new WeakMap;let ht=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(J&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=X.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&X.set(e,t))}return t}toString(){return this.cssText}};const At=n=>new ht(typeof n=="string"?n:n+"",void 0,G),wt=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new ht(e,n,G)},bt=(n,t)=>{J?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=O.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)})},Y=J?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return At(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var L;const M=window,tt=M.trustedTypes,Et=tt?tt.emptyScript:"",et=M.reactiveElementPolyfillSupport,K={toAttribute(n,t){switch(t){case Boolean:n=n?Et:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},ct=(n,t)=>t!==n&&(t==t||n==n),I={attribute:!0,type:String,converter:K,reflect:!1,hasChanged:ct},q="finalized";let A=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);s!==void 0&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=I){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||I}static finalize(){if(this.hasOwnProperty(q))return!1;this[q]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(Y(s))}else t!==void 0&&e.push(Y(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return bt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=I){var s;const o=this.constructor._$Ep(t,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:K).toAttribute(e,i.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(o!==void 0&&this._$El!==o){const r=s.getPropertyOptions(o),d=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:K;this._$El=o,this[o]=d.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||ct)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};A[q]=!0,A.elementProperties=new Map,A.elementStyles=[],A.shadowRootOptions={mode:"open"},et==null||et({ReactiveElement:A}),((L=M.reactiveElementVersions)!==null&&L!==void 0?L:M.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var B;const R=window,w=R.trustedTypes,it=w?w.createPolicy("lit-html",{createHTML:n=>n}):void 0,Z="$lit$",v=`lit$${(Math.random()+"").slice(9)}$`,ut="?"+v,St=`<${ut}>`,g=document,k=()=>g.createComment(""),D=n=>n===null||typeof n!="object"&&typeof n!="function",pt=Array.isArray,xt=n=>pt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",j=`[ 	
\f\r]`,S=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,st=/-->/g,nt=/>/g,f=RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),rt=/'/g,ot=/"/g,$t=/^(?:script|style|textarea|title)$/i,Ct=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),_=Ct(1),b=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),at=new WeakMap,y=g.createTreeWalker(g,129,null,!1);function _t(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return it!==void 0?it.createHTML(t):t}const kt=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":"",r=S;for(let d=0;d<e;d++){const a=n[d];let l,c,h=-1,p=0;for(;p<a.length&&(r.lastIndex=p,c=r.exec(a),c!==null);)p=r.lastIndex,r===S?c[1]==="!--"?r=st:c[1]!==void 0?r=nt:c[2]!==void 0?($t.test(c[2])&&(s=RegExp("</"+c[2],"g")),r=f):c[3]!==void 0&&(r=f):r===f?c[0]===">"?(r=s??S,h=-1):c[1]===void 0?h=-2:(h=r.lastIndex-c[2].length,l=c[1],r=c[3]===void 0?f:c[3]==='"'?ot:rt):r===ot||r===rt?r=f:r===st||r===nt?r=S:(r=f,s=void 0);const $=r===f&&n[d+1].startsWith("/>")?" ":"";o+=r===S?a+St:h>=0?(i.push(l),a.slice(0,h)+Z+a.slice(h)+v+$):a+v+(h===-2?(i.push(void 0),d):$)}return[_t(n,o+(n[e]||"<?>")+(t===2?"</svg>":"")),i]};class T{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const d=t.length-1,a=this.parts,[l,c]=kt(t,e);if(this.el=T.createElement(l,i),y.currentNode=this.el.content,e===2){const h=this.el.content,p=h.firstChild;p.remove(),h.append(...p.childNodes)}for(;(s=y.nextNode())!==null&&a.length<d;){if(s.nodeType===1){if(s.hasAttributes()){const h=[];for(const p of s.getAttributeNames())if(p.endsWith(Z)||p.startsWith(v)){const $=c[r++];if(h.push(p),$!==void 0){const mt=s.getAttribute($.toLowerCase()+Z).split(v),H=/([.?@])?(.*)/.exec($);a.push({type:1,index:o,name:H[2],strings:mt,ctor:H[1]==="."?Tt:H[1]==="?"?Ut:H[1]==="@"?Ht:z})}else a.push({type:6,index:o})}for(const p of h)s.removeAttribute(p)}if($t.test(s.tagName)){const h=s.textContent.split(v),p=h.length-1;if(p>0){s.textContent=w?w.emptyScript:"";for(let $=0;$<p;$++)s.append(h[$],k()),y.nextNode(),a.push({type:2,index:++o});s.append(h[p],k())}}}else if(s.nodeType===8)if(s.data===ut)a.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(v,h+1))!==-1;)a.push({type:7,index:o}),h+=v.length-1}o++}}static createElement(t,e){const i=g.createElement("template");return i.innerHTML=t,i}}function E(n,t,e=n,i){var s,o,r,d;if(t===b)return t;let a=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const l=D(t)?void 0:t._$litDirective$;return(a==null?void 0:a.constructor)!==l&&((o=a==null?void 0:a._$AO)===null||o===void 0||o.call(a,!1),l===void 0?a=void 0:(a=new l(n),a._$AT(n,e,i)),i!==void 0?((r=(d=e)._$Co)!==null&&r!==void 0?r:d._$Co=[])[i]=a:e._$Cl=a),a!==void 0&&(t=E(n,a._$AS(n,t.values),a,i)),t}class Dt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:g).importNode(i,!0);y.currentNode=o;let r=y.nextNode(),d=0,a=0,l=s[0];for(;l!==void 0;){if(d===l.index){let c;l.type===2?c=new U(r,r.nextSibling,this,t):l.type===1?c=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(c=new Nt(r,this,t)),this._$AV.push(c),l=s[++a]}d!==(l==null?void 0:l.index)&&(r=y.nextNode(),d++)}return y.currentNode=g,o}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class U{constructor(t,e,i,s){var o;this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=E(this,t,e),D(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==b&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):xt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&D(this._$AH)?this._$AA.nextSibling.data=t:this.$(g.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=T.createElement(_t(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(i);else{const r=new Dt(o,this),d=r.u(this.options);r.v(i),this.$(d),this._$AH=r}}_$AC(t){let e=at.get(t.strings);return e===void 0&&at.set(t.strings,e=new T(t)),e}T(t){pt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new U(this.k(k()),this.k(k()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class z{constructor(t,e,i,s,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=E(this,t,e,0),r=!D(t)||t!==this._$AH&&t!==b,r&&(this._$AH=t);else{const d=t;let a,l;for(t=o[0],a=0;a<o.length-1;a++)l=E(this,d[i+a],e,a),l===b&&(l=this._$AH[a]),r||(r=!D(l)||l!==this._$AH[a]),l===u?t=u:t!==u&&(t+=(l??"")+o[a+1]),this._$AH[a]=l}r&&!s&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class Tt extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}}const Pt=w?w.emptyScript:"";class Ut extends z{constructor(){super(...arguments),this.type=4}j(t){t&&t!==u?this.element.setAttribute(this.name,Pt):this.element.removeAttribute(this.name)}}class Ht extends z{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=E(this,t,e,0))!==null&&i!==void 0?i:u)===b)return;const s=this._$AH,o=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==u&&(s===u||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class Nt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){E(this,t)}}const lt=R.litHtmlPolyfillSupport;lt==null||lt(T,U),((B=R.litHtmlVersions)!==null&&B!==void 0?B:R.litHtmlVersions=[]).push("2.8.0");const Ot=(n,t,e)=>{var i,s;const o=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let r=o._$litPart$;if(r===void 0){const d=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new U(t.insertBefore(k(),d),d,void 0,e??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var V,W;class C extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ot(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return b}}C.finalized=!0,C._$litElement$=!0,(V=globalThis.litElementHydrateSupport)===null||V===void 0||V.call(globalThis,{LitElement:C});const dt=globalThis.litElementPolyfillSupport;dt==null||dt({LitElement:C});((W=globalThis.litElementVersions)!==null&&W!==void 0?W:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Mt=n=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(n,t):((e,i)=>{const{kind:s,elements:o}=i;return{kind:s,elements:o,finisher(r){customElements.define(e,r)}}})(n,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Rt=(n,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,n)}},zt=(n,t,e)=>{t.constructor.createProperty(e,n)};function vt(n){return(t,e)=>e!==void 0?zt(n,t,e):Rt(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Lt(n){return vt({...n,state:!0})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var F;((F=window.HTMLSlotElement)===null||F===void 0?void 0:F.prototype.assignedElements)!=null;const It=Array.from({length:24},(n,t)=>`${t.toString().padStart(2,"0")}:00`);function m(n){return n.toISOString().split("T")[0]}const Bt=(n,t)=>new Intl.DateTimeFormat(n.locale.language,{weekday:"short"}).format(t),jt=(n,t)=>new Intl.DateTimeFormat(n.locale.language,{day:"numeric",month:"short"}).format(t);var ft=Object.defineProperty,Vt=Object.getOwnPropertyDescriptor,Wt=(n,t,e)=>t in n?ft(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,Q=(n,t,e,i)=>{for(var s=i>1?void 0:i?Vt(t,e):t,o=n.length-1,r;o>=0;o--)(r=n[o])&&(s=(i?r(t,e,s):r(s))||s);return i&&s&&ft(t,e,s),s},Ft=(n,t,e)=>Wt(n,t+"",e);const x=[{entity:"calendar.nuesken_family_gmail",name:"Family",color:"#3f51b5"},{entity:"calendar.dennis_nuesken_gmail",name:"Dennis",color:"#9c27b0"},{entity:"calendar.auri_nuesken_gmail_com",name:"Auri",color:"#03a9f4"}];function Kt(n){const t=e=>{const i=new Date(n);return i.setDate(i.getDate()+e),m(i)};return[{title:"Breakfast",start:`${t(0)}T09:00:00`,end:`${t(0)}T10:00:00`,calendar:x[0]},{title:"Meeting",start:`${t(0)}T09:30:00`,end:`${t(0)}T11:00:00`,calendar:x[1]},{title:"Dentist",start:`${t(1)}T13:00:00`,end:`${t(1)}T14:00:00`,calendar:x[2]},{title:"Trip",start:`${t(2)}T00:00:00`,end:`${t(2)}T23:59:59`,calendar:x[0],allDay:!0}]}function qt(n){const t=["mdi:weather-sunny","mdi:weather-partly-cloudy","mdi:weather-cloudy","mdi:weather-rainy","mdi:weather-fog","mdi:weather-snowy","mdi:weather-windy"],e={};return n.forEach((i,s)=>{e[m(i)]={icon:t[s%t.length],high:20+s,low:10-s}}),e}function Zt(n){const t=r=>{const d=new Date(r);return d.setHours(0,0,0,0),d},e=n.filter(r=>r.allDay),i=n.filter(r=>!r.allDay),s=[];for(const r of e)s.push({...r,top:0,height:100,lane:0,lanes:1});const o=[];return i.map(r=>({...r,startDate:new Date(r.start),endDate:new Date(r.end)})).sort((r,d)=>r.startDate.getTime()-d.startDate.getTime()).forEach(r=>{const d=(r.startDate.getTime()-t(r.startDate).getTime())/6e4,a=(r.endDate.getTime()-t(r.startDate).getTime())/6e4;let l=0;for(;o[l]>d;)l++;o[l]=a;const c=Math.max(o.length,1);s.push({...r,top:d/1440*100,height:(a-d)/1440*100,lane:l,lanes:c})}),s}let P=class extends C{constructor(){super(...arguments);N(this,"hass");N(this,"_now",new Date);N(this,"_timer")}connectedCallback(){super.connectedCallback(),this._timer=window.setInterval(()=>{this._now=new Date},6e4)}disconnectedCallback(){super.disconnectedCallback(),this._timer&&window.clearInterval(this._timer)}render(){const t=new Date(this._now);t.setHours(0,0,0,0);const e=Array.from({length:7},(d,a)=>{const l=new Date(t);return l.setDate(l.getDate()+a),l}),i=Kt(t),s=qt(e),o=new Map;e.forEach(d=>{const a=m(d),l=i.filter(c=>m(new Date(c.start))===a);o.set(a,Zt(l))});const r=this.hass??{locale:{language:"en"}};return _`
      <div class="calendar_container">
        <div class="calendar_header">
          ${x.map(d=>_`<button style="--cal-color: ${d.color}">${d.name??d.entity}</button>`)}
        </div>
        <div class="weekday_header">
          <div class="time_axis"></div>
          ${e.map(d=>{const a=m(d),l=s[a];return _`<div class="day_header">
              <div class="label">${Bt(r,d)} ${jt(r,d)}</div>
              ${l?_`<div class="weather">
                    <ha-icon .icon=${l.icon}></ha-icon>
                    <span class="temp high">${l.high}</span>/<span class="temp low"
                      >${l.low}</span
                    >
                  </div>`:""}
            </div>`})}
        </div>
        <div class="all_day_area">
          <div class="time_axis"></div>
          ${e.map(d=>{var c;const a=m(d),l=((c=o.get(a))==null?void 0:c.filter(h=>h.allDay))??[];return _`<div class="all_day_events">
              ${l.map(h=>_`<div class="event_block" style="background: ${h.calendar.color}">
                    ${h.title}
                  </div>`)}
            </div>`})}
        </div>
        <div class="main_grid">
          <div class="time_axis">${It.map(d=>_`<div class="hour">${d}</div>`)}</div>
          ${e.map(d=>{var c;const a=m(d),l=((c=o.get(a))==null?void 0:c.filter(h=>!h.allDay))??[];return _`<div class="day_column">
              ${l.map(h=>_`<div
                    class="event_block"
                    style="
                    top: ${h.top}%;
                    height: ${h.height}%;
                    left: ${h.lane/h.lanes*100}%;
                    width: ${1/h.lanes*100}%;
                    background: ${h.calendar.color};
                  "
                  >
                    ${h.title}
                  </div>`)}
            </div>`})}
        </div>
      </div>
    `}};Ft(P,"styles",wt`
    :host {
      display: block;
      font-family: sans-serif;
    }
    .calendar_header {
      display: flex;
      gap: 4px;
      padding: 4px;
    }
    .calendar_header button {
      border: none;
      background: var(--cal-color);
      color: #fff;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    .weekday_header,
    .all_day_area,
    .main_grid {
      display: flex;
    }
    .weekday_header .time_axis,
    .all_day_area .time_axis,
    .main_grid .time_axis {
      width: 60px;
    }
    .weekday_header .day_header,
    .all_day_area .all_day_events,
    .main_grid .day_column {
      flex: 1;
      border-left: 1px solid #ddd;
      position: relative;
    }
    .weekday_header .day_header {
      text-align: center;
      padding: 4px;
      background: #fff;
    }
    .weather {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
    }
    .weather .high {
      color: red;
    }
    .weather .low {
      color: blue;
    }
    .all_day_area {
      background: #f7f7f7;
    }
    .all_day_area .event_block {
      margin: 2px;
      padding: 2px;
      color: #fff;
      border-radius: 2px;
      font-size: 0.75rem;
    }
    .main_grid {
      height: 600px;
    }
    .main_grid .time_axis {
      display: flex;
      flex-direction: column;
    }
    .main_grid .time_axis .hour {
      flex: 1;
      font-size: 0.75rem;
      color: #666;
      border-bottom: 1px solid #eee;
    }
    .main_grid .day_column {
      background: repeating-linear-gradient(
        to bottom,
        transparent,
        transparent calc(100% / 24 - 1px),
        #eee calc(100% / 24 - 1px),
        #eee calc(100% / 24)
      );
    }
    .main_grid .event_block {
      position: absolute;
      padding: 2px;
      color: #fff;
      border-radius: 4px;
      font-size: 0.75rem;
      overflow: hidden;
    }
  `);Q([vt({attribute:!1})],P.prototype,"hass",2);Q([Lt()],P.prototype,"_now",2);P=Q([Mt("family-grid-calendar")],P);
