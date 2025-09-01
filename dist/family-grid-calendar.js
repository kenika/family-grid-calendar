var Ct=Object.defineProperty;var Dt=(n,t,e)=>t in n?Ct(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var $=(n,t,e)=>Dt(n,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R=window,et=R.ShadowRoot&&(R.ShadyCSS===void 0||R.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,it=Symbol(),st=new WeakMap;let $t=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==it)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(et&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=st.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&st.set(e,t))}return t}toString(){return this.cssText}};const Tt=n=>new $t(typeof n=="string"?n:n+"",void 0,it),kt=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1],n[0]);return new $t(e,n,it)},Nt=(n,t)=>{et?n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet):t.forEach(e=>{const i=document.createElement("style"),s=R.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)})},nt=et?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Tt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var F;const I=window,rt=I.trustedTypes,Pt=rt?rt.emptyScript:"",ot=I.reactiveElementPolyfillSupport,J={toAttribute(n,t){switch(t){case Boolean:n=n?Pt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},mt=(n,t)=>t!==n&&(t==t||n==n),V={attribute:!0,type:String,converter:J,reflect:!1,hasChanged:mt},Q="finalized";let x=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(t){var e;this.finalize(),((e=this.h)!==null&&e!==void 0?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach((e,i)=>{const s=this._$Ep(i,e);s!==void 0&&(this._$Ev.set(s,i),t.push(s))}),t}static createProperty(t,e=V){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i=typeof t=="symbol"?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);s!==void 0&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const o=this[t];this[e]=s,this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||V}static finalize(){if(this.hasOwnProperty(Q))return!1;this[Q]=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),t.h!==void 0&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const e=this.properties,i=[...Object.getOwnPropertyNames(e),...Object.getOwnPropertySymbols(e)];for(const s of i)this.createProperty(s,e[s])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const s of i)e.unshift(nt(s))}else t!==void 0&&e.push(nt(t));return e}static _$Ep(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}_$Eu(){var t;this._$E_=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(t=this.constructor.h)===null||t===void 0||t.forEach(e=>e(this))}addController(t){var e,i;((e=this._$ES)!==null&&e!==void 0?e:this._$ES=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&((i=t.hostConnected)===null||i===void 0||i.call(t))}removeController(t){var e;(e=this._$ES)===null||e===void 0||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])})}createRenderRoot(){var t;const e=(t=this.shadowRoot)!==null&&t!==void 0?t:this.attachShadow(this.constructor.shadowRootOptions);return Nt(e,this.constructor.elementStyles),e}connectedCallback(){var t;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostConnected)===null||i===void 0?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$ES)===null||t===void 0||t.forEach(e=>{var i;return(i=e.hostDisconnected)===null||i===void 0?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=V){var s;const o=this.constructor._$Ep(t,i);if(o!==void 0&&i.reflect===!0){const r=(((s=i.converter)===null||s===void 0?void 0:s.toAttribute)!==void 0?i.converter:J).toAttribute(e,i.type);this._$El=t,r==null?this.removeAttribute(o):this.setAttribute(o,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,o=s._$Ev.get(t);if(o!==void 0&&this._$El!==o){const r=s.getPropertyOptions(o),a=typeof r.converter=="function"?{fromAttribute:r.converter}:((i=r.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?r.converter:J;this._$El=o,this[o]=a.fromAttribute(e,r.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;t!==void 0&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||mt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$El!==t&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((s,o)=>this[o]=s),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(t=this._$ES)===null||t===void 0||t.forEach(s=>{var o;return(o=s.hostUpdate)===null||o===void 0?void 0:o.call(s)}),this.update(i)):this._$Ek()}catch(s){throw e=!1,this._$Ek(),s}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;(e=this._$ES)===null||e===void 0||e.forEach(i=>{var s;return(s=i.hostUpdated)===null||s===void 0?void 0:s.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){this._$EC!==void 0&&(this._$EC.forEach((e,i)=>this._$EO(i,this[i],e)),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};x[Q]=!0,x.elementProperties=new Map,x.elementStyles=[],x.shadowRootOptions={mode:"open"},ot==null||ot({ReactiveElement:x}),((F=I.reactiveElementVersions)!==null&&F!==void 0?F:I.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var W;const B=window,S=B.trustedTypes,at=S?S.createPolicy("lit-html",{createHTML:n=>n}):void 0,X="$lit$",m=`lit$${(Math.random()+"").slice(9)}$`,yt="?"+m,Ht=`<${yt}>`,w=document,P=()=>w.createComment(""),H=n=>n===null||typeof n!="object"&&typeof n!="function",gt=Array.isArray,Ut=n=>gt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",q=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,lt=/-->/g,dt=/>/g,g=RegExp(`>|${q}(?:([^\\s"'>=/]+)(${q}*=${q}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ct=/'/g,ht=/"/g,At=/^(?:script|style|textarea|title)$/i,Ot=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),v=Ot(1),C=Symbol.for("lit-noChange"),p=Symbol.for("lit-nothing"),ut=new WeakMap,A=w.createTreeWalker(w,129,null,!1);function bt(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return at!==void 0?at.createHTML(t):t}const Mt=(n,t)=>{const e=n.length-1,i=[];let s,o=t===2?"<svg>":"",r=T;for(let a=0;a<e;a++){const l=n[a];let c,u,h=-1,d=0;for(;d<l.length&&(r.lastIndex=d,u=r.exec(l),u!==null);)d=r.lastIndex,r===T?u[1]==="!--"?r=lt:u[1]!==void 0?r=dt:u[2]!==void 0?(At.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=g):u[3]!==void 0&&(r=g):r===g?u[0]===">"?(r=s??T,h=-1):u[1]===void 0?h=-2:(h=r.lastIndex-u[2].length,c=u[1],r=u[3]===void 0?g:u[3]==='"'?ht:ct):r===ht||r===ct?r=g:r===lt||r===dt?r=T:(r=g,s=void 0);const _=r===g&&n[a+1].startsWith("/>")?" ":"";o+=r===T?l+Ht:h>=0?(i.push(c),l.slice(0,h)+X+l.slice(h)+m+_):l+m+(h===-2?(i.push(void 0),a):_)}return[bt(n,o+(n[e]||"<?>")+(t===2?"</svg>":"")),i]};class U{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0;const a=t.length-1,l=this.parts,[c,u]=Mt(t,e);if(this.el=U.createElement(c,i),A.currentNode=this.el.content,e===2){const h=this.el.content,d=h.firstChild;d.remove(),h.append(...d.childNodes)}for(;(s=A.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes()){const h=[];for(const d of s.getAttributeNames())if(d.endsWith(X)||d.startsWith(m)){const _=u[r++];if(h.push(d),_!==void 0){const j=s.getAttribute(_.toLowerCase()+X).split(m),y=/([.?@])?(.*)/.exec(_);l.push({type:1,index:o,name:y[2],strings:j,ctor:y[1]==="."?It:y[1]==="?"?zt:y[1]==="@"?jt:z})}else l.push({type:6,index:o})}for(const d of h)s.removeAttribute(d)}if(At.test(s.tagName)){const h=s.textContent.split(m),d=h.length-1;if(d>0){s.textContent=S?S.emptyScript:"";for(let _=0;_<d;_++)s.append(h[_],P()),A.nextNode(),l.push({type:2,index:++o});s.append(h[d],P())}}}else if(s.nodeType===8)if(s.data===yt)l.push({type:2,index:o});else{let h=-1;for(;(h=s.data.indexOf(m,h+1))!==-1;)l.push({type:7,index:o}),h+=m.length-1}o++}}static createElement(t,e){const i=w.createElement("template");return i.innerHTML=t,i}}function D(n,t,e=n,i){var s,o,r,a;if(t===C)return t;let l=i!==void 0?(s=e._$Co)===null||s===void 0?void 0:s[i]:e._$Cl;const c=H(t)?void 0:t._$litDirective$;return(l==null?void 0:l.constructor)!==c&&((o=l==null?void 0:l._$AO)===null||o===void 0||o.call(l,!1),c===void 0?l=void 0:(l=new c(n),l._$AT(n,e,i)),i!==void 0?((r=(a=e)._$Co)!==null&&r!==void 0?r:a._$Co=[])[i]=l:e._$Cl=l),l!==void 0&&(t=D(n,l._$AS(n,t.values),l,i)),t}class Rt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,o=((e=t==null?void 0:t.creationScope)!==null&&e!==void 0?e:w).importNode(i,!0);A.currentNode=o;let r=A.nextNode(),a=0,l=0,c=s[0];for(;c!==void 0;){if(a===c.index){let u;c.type===2?u=new O(r,r.nextSibling,this,t):c.type===1?u=new c.ctor(r,c.name,c.strings,this,t):c.type===6&&(u=new Lt(r,this,t)),this._$AV.push(u),c=s[++l]}a!==(c==null?void 0:c.index)&&(r=A.nextNode(),a++)}return A.currentNode=w,o}v(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class O{constructor(t,e,i,s){var o;this.type=2,this._$AH=p,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=(o=s==null?void 0:s.isConnected)===null||o===void 0||o}get _$AU(){var t,e;return(e=(t=this._$AM)===null||t===void 0?void 0:t._$AU)!==null&&e!==void 0?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=D(this,t,e),H(t)?t===p||t==null||t===""?(this._$AH!==p&&this._$AR(),this._$AH=p):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):Ut(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==p&&H(this._$AH)?this._$AA.nextSibling.data=t:this.$(w.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,o=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(bt(s.h,s.h[0]),this.options)),s);if(((e=this._$AH)===null||e===void 0?void 0:e._$AD)===o)this._$AH.v(i);else{const r=new Rt(o,this),a=r.u(this.options);r.v(i),this.$(a),this._$AH=r}}_$AC(t){let e=ut.get(t.strings);return e===void 0&&ut.set(t.strings,e=new U(t)),e}T(t){gt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const o of t)s===e.length?e.push(i=new O(this.k(P()),this.k(P()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,e);t&&t!==this._$AB;){const s=t.nextSibling;t.remove(),t=s}}setConnected(t){var e;this._$AM===void 0&&(this._$Cp=t,(e=this._$AP)===null||e===void 0||e.call(this,t))}}class z{constructor(t,e,i,s,o){this.type=1,this._$AH=p,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=p}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const o=this.strings;let r=!1;if(o===void 0)t=D(this,t,e,0),r=!H(t)||t!==this._$AH&&t!==C,r&&(this._$AH=t);else{const a=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=D(this,a[i+l],e,l),c===C&&(c=this._$AH[l]),r||(r=!H(c)||c!==this._$AH[l]),c===p?t=p:t!==p&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}r&&!s&&this.j(t)}j(t){t===p?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class It extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===p?void 0:t}}const Bt=S?S.emptyScript:"";class zt extends z{constructor(){super(...arguments),this.type=4}j(t){t&&t!==p?this.element.setAttribute(this.name,Bt):this.element.removeAttribute(this.name)}}class jt extends z{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){var i;if((t=(i=D(this,t,e,0))!==null&&i!==void 0?i:p)===C)return;const s=this._$AH,o=t===p&&s!==p||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==p&&(s===p||o);o&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;typeof this._$AH=="function"?this._$AH.call((i=(e=this.options)===null||e===void 0?void 0:e.host)!==null&&i!==void 0?i:this.element,t):this._$AH.handleEvent(t)}}class Lt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){D(this,t)}}const pt=B.litHtmlPolyfillSupport;pt==null||pt(U,O),((W=B.litHtmlVersions)!==null&&W!==void 0?W:B.litHtmlVersions=[]).push("2.8.0");const Ft=(n,t,e)=>{var i,s;const o=(i=e==null?void 0:e.renderBefore)!==null&&i!==void 0?i:t;let r=o._$litPart$;if(r===void 0){const a=(s=e==null?void 0:e.renderBefore)!==null&&s!==void 0?s:null;o._$litPart$=r=new O(t.insertBefore(P(),a),a,void 0,e??{})}return r._$AI(n),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var K,G;class k extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return(t=(e=this.renderOptions).renderBefore)!==null&&t!==void 0||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ft(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)===null||t===void 0||t.setConnected(!1)}render(){return C}}k.finalized=!0,k._$litElement$=!0,(K=globalThis.litElementHydrateSupport)===null||K===void 0||K.call(globalThis,{LitElement:k});const _t=globalThis.litElementPolyfillSupport;_t==null||_t({LitElement:k});((G=globalThis.litElementVersions)!==null&&G!==void 0?G:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Vt=n=>t=>typeof t=="function"?((e,i)=>(customElements.define(e,i),i))(n,t):((e,i)=>{const{kind:s,elements:o}=i;return{kind:s,elements:o,finisher(r){customElements.define(e,r)}}})(n,t);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Wt=(n,t)=>t.kind==="method"&&t.descriptor&&!("value"in t.descriptor)?{...t,finisher(e){e.createProperty(t.key,n)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:t.key,initializer(){typeof t.initializer=="function"&&(this[t.key]=t.initializer.call(this))},finisher(e){e.createProperty(t.key,n)}},qt=(n,t,e)=>{t.constructor.createProperty(e,n)};function wt(n){return(t,e)=>e!==void 0?qt(n,t,e):Wt(n,t)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function M(n){return wt({...n,state:!0})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Z;((Z=window.HTMLSlotElement)===null||Z===void 0?void 0:Z.prototype.assignedElements)!=null;const Kt=(n,t)=>new Intl.DateTimeFormat(n.locale.language,{weekday:"short"}).format(t),Gt=(n,t)=>new Intl.DateTimeFormat(n.locale.language,{day:"numeric",month:"short"}).format(t),Zt=Array.from({length:24},(n,t)=>`${t.toString().padStart(2,"0")}:00`);function b(n){return n.toISOString().split("T")[0]}const vt=15,N=n=>{const t=Number(n);return Number.isFinite(t)?t:null},Jt=n=>{let t=null;for(const e of n){const i=N(e);i!=null&&(t=t==null?i:Math.max(t,i))}return t},Qt=n=>{if(!n.length)return null;const t=new Map;for(const e of n)t.set(e,(t.get(e)||0)+1);return[...t.entries()].sort((e,i)=>i[1]-e[1])[0][0]},ft=async(n,t,e)=>{const i={type:"call_service",domain:"weather",service:"get_forecasts",service_data:{entity_id:t,type:e},return_response:!0},s=await n.callWS(i),o=(s==null?void 0:s.response)??s??{},r=o[t]??o,a=(r==null?void 0:r.forecast)??[];return Array.isArray(a)?a:[]},Xt=(n,t)=>{const e=new Map,i=b(new Date);for(const o of n){const r=o.datetime||o.date||o.time||(o.dt?new Date(o.dt*1e3):o.timestamp)||Date.now(),a=new Date(r),l=b(a);l<i||(e.has(l)||e.set(l,[]),e.get(l).push(o))}const s=[];for(const[o,r]of[...e.entries()].sort()){let a=-1/0,l=1/0;for(const h of r){const d=N(h.temperature??h.temp);d!=null&&(d>a&&(a=d),d<l&&(l=d))}Number.isFinite(a)||(a=NaN),Number.isFinite(l)||(l=NaN);const c=Qt(r.map(h=>h.condition??h.condition_description??h.symbol??h.state).filter(Boolean))||"-",u=Jt(r.map(h=>h.precipitation_probability??h.precipitation_chance));if(s.push({datetime:`${o}T12:00:00`,condition:c,temperature:Number.isFinite(a)?a:void 0,templow:Number.isFinite(l)?l:void 0,precipitation_probability:u??void 0}),s.length>=t)break}return s},Yt=async(n,t,e)=>{var o,r;try{const a=await ft(n,t,"daily");if(a&&a.length)return{items:a,kind:"daily"}}catch{}try{const a=await ft(n,t,"hourly");if(a&&a.length)return{items:Xt(a,e),kind:"hourly-aggregated"}}catch{}const i=(o=n.states)==null?void 0:o[t],s=(r=i==null?void 0:i.attributes)==null?void 0:r.forecast;return Array.isArray(s)&&s.length?{items:s,kind:"attributes"}:{items:[],kind:null}},te=async(n,t,e)=>{const{items:i}=await Yt(n,t,e),s=new Map;for(const o of i){const r=new Date(o.datetime||o.date||o.time||Date.now()),a=b(r),l=N(o.temperature??o.temperature_high??o.temp),c=N(o.templow??o.temperature_low),u=String(o.condition??o.condition_description??o.state??"-"),h=N(o.precipitation_probability??o.precipitation_chance)??void 0;s.set(a,{hi:l??null,lo:c??null,cond:u,pp:h})}return s};var Et=Object.defineProperty,ee=Object.getOwnPropertyDescriptor,ie=(n,t,e)=>t in n?Et(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e,E=(n,t,e,i)=>{for(var s=i>1?void 0:i?ee(t,e):t,o=n.length-1,r;o>=0;o--)(r=n[o])&&(s=(i?r(t,e,s):r(s))||s);return i&&s&&Et(t,e,s),s},se=(n,t,e)=>ie(n,t+"",e);const Y=48;let f=class extends k{constructor(){super(...arguments);$(this,"hass");$(this,"_config");$(this,"_eventsByDay",{});$(this,"_allDayEventsByDay",{});$(this,"_weatherByDay",new Map);$(this,"_activeCalendars",new Set);$(this,"_timer")}setConfig(t){if(!t.calendars||t.calendars.length===0)throw new Error("At least one calendar entity is required");this._config={data_refresh_minutes:vt,...t},this._activeCalendars=new Set(t.calendars.map(e=>e.entity)),this._startTimer(),this._fetchData()}connectedCallback(){super.connectedCallback(),this._startTimer()}disconnectedCallback(){super.disconnectedCallback(),this._timer&&(clearInterval(this._timer),this._timer=void 0)}_startTimer(){var e;this._timer&&clearInterval(this._timer);const t=((e=this._config)==null?void 0:e.data_refresh_minutes)??vt;this._timer=window.setInterval(()=>this._fetchData(),t*60*1e3)}async _fetchData(){if(!this.hass||!this._config)return;const t=this.hass,e=new Date;e.setHours(0,0,0,0);const i=new Date(e);i.setDate(e.getDate()+7);const s=e.toISOString(),o=i.toISOString(),r={};await Promise.all(this._config.calendars.map(async c=>{if(this._activeCalendars.has(c.entity))try{const u=`calendars/${c.entity}?start=${s}&end=${o}`,h=t.callApi?await t.callApi("GET",u):await fetch(`/api/${u}`).then(d=>d.json());for(const d of h||[]){const _=typeof d.start=="object"?d.start.dateTime||d.start.date||"":d.start||d.start_time||d.startTime||"",j=typeof d.end=="object"?d.end.dateTime||d.end.date||"":d.end||d.end_time||d.endTime||"",y=new Date(_),xt=new Date(j),L=b(y),St=d.all_day||d.allDay||(typeof d.start=="object"?!!d.start.date&&!d.start.dateTime:_.length===10);(r[L]||(r[L]=[])).push({start:y,end:xt,title:d.summary||d.title||"",calendar:c,allDay:St})}}catch{}}));const a={},l={};Object.entries(r).forEach(([c,u])=>{const h=u.filter(d=>!d.allDay);a[c]=this._positionEvents(h),l[c]=u.filter(d=>d.allDay)}),this._eventsByDay=a,this._allDayEventsByDay=l,this._config.weather_entity&&(this._weatherByDay=await te(this.hass,this._config.weather_entity,7))}_positionEvents(t){const e=[...t].sort((r,a)=>r.start.getTime()-a.start.getTime()),i=[],s=[];for(const r of e){let a=i.findIndex(l=>l<=r.start.getTime());a===-1?(a=i.length,i.push(r.end.getTime())):i[a]=r.end.getTime(),s.push({...r,lane:a,lanes:0})}const o=i.length||1;return s.map(r=>({...r,lanes:o}))}_renderTimeAxis(){return Zt.map(t=>v`<div>${t}</div>`)}_renderEvent(t){const e=t.start.getHours()*60+t.start.getMinutes(),i=t.end.getHours()*60+t.end.getMinutes(),s=e/60*Y,o=(i-e)/60*Y,r=100/t.lanes,a=t.lane*r;return v`<div
      class="event_block"
      style="top:${s}px;height:${o}px;left:${a}%;width:${r}%;background:${t.calendar.color}"
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
          ${e.map(s=>{var a,l;const o=b(s),r=this._weatherByDay.get(o);return v`<div class="weekday_header_day">
              <div>${Kt(t,s)} ${Gt(t,s)}</div>
              ${r?v`<div class="weather">
                    <ha-icon icon="mdi:weather-${r.cond}"></ha-icon>
                    <span class="high">${(a=r.hi)==null?void 0:a.toFixed(0)}</span>
                    <span class="low">${(l=r.lo)==null?void 0:l.toFixed(0)}</span>
                  </div>`:""}
            </div>`})}
        </div>
        <div class="all_day row">
          <div class="time_axis spacer"></div>
          ${e.map(s=>{const o=b(s),r=this._allDayEventsByDay[o]??[];return v`<div class="all_day_area">
              ${r.map(a=>v`<div class="all_day_event" style="background:${a.calendar.color}">
                    ${a.title}
                  </div>`)}
            </div>`})}
        </div>
        <div class="main row">
          <div class="time_axis">${this._renderTimeAxis()}</div>
          ${e.map(s=>{const o=b(s),r=this._eventsByDay[o]??[];return v`<div class="day_columns">
              ${r.map(a=>this._renderEvent(a))}
            </div>`})}
        </div>
      </div>
    `}_toggleCalendar(t){this._activeCalendars.has(t)?this._activeCalendars.delete(t):this._activeCalendars.add(t),this.requestUpdate(),this._fetchData()}};se(f,"styles",kt`
    :host {
      display: block;
      --hour-height: ${Y}px;
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
  `);E([wt({attribute:!1})],f.prototype,"hass",2);E([M()],f.prototype,"_config",2);E([M()],f.prototype,"_eventsByDay",2);E([M()],f.prototype,"_allDayEventsByDay",2);E([M()],f.prototype,"_weatherByDay",2);E([M()],f.prototype,"_activeCalendars",2);f=E([Vt("family-grid-calendar")],f);const tt=window;tt.customCards=tt.customCards||[];tt.customCards.push({type:"family-grid-calendar",name:"Family Grid Calendar",description:"Week-view calendar with optional weather."});
