(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerpolicy&&(o.referrerPolicy=i.referrerpolicy),i.crossorigin==="use-credentials"?o.credentials="include":i.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=t(i);fetch(i.href,o)}})();const v={};function he(e){v.context=e}const de=(e,s)=>e===s,G={equals:de};let J=se;const C=1,L=2,Y={owned:null,cleanups:null,context:null,owner:null};var g=null;let S=null,d=null,w=null,b=null,W=0;function pe(e,s){const t=d,n=g,i=e.length===0,o=i?Y:{owned:null,cleanups:null,context:null,owner:s||n},r=i?e:()=>e(()=>$(()=>q(o)));g=o,d=null;try{return I(r,!0)}finally{d=t,g=n}}function N(e,s){s=s?Object.assign({},G,s):G;const t={value:e,observers:null,observerSlots:null,comparator:s.equals||void 0},n=i=>(typeof i=="function"&&(i=i(t.value)),ee(t,i));return[ye.bind(t),n]}function k(e,s,t){const n=te(e,s,!1,C);R(n)}function z(e,s,t){J=be;const n=te(e,s,!1,C);n.user=!0,b?b.push(n):R(n)}function $(e){const s=d;d=null;try{return e()}finally{d=s}}function ge(e){z(()=>$(e))}function we(e){return g===null||(g.cleanups===null?g.cleanups=[e]:g.cleanups.push(e)),e}function ye(){const e=S;if(this.sources&&(this.state||e))if(this.state===C||e)R(this);else{const s=w;w=null,I(()=>O(this),!1),w=s}if(d){const s=this.observers?this.observers.length:0;d.sources?(d.sources.push(this),d.sourceSlots.push(s)):(d.sources=[this],d.sourceSlots=[s]),this.observers?(this.observers.push(d),this.observerSlots.push(d.sources.length-1)):(this.observers=[d],this.observerSlots=[d.sources.length-1])}return this.value}function ee(e,s,t){let n=e.value;return(!e.comparator||!e.comparator(n,s))&&(e.value=s,e.observers&&e.observers.length&&I(()=>{for(let i=0;i<e.observers.length;i+=1){const o=e.observers[i],r=S&&S.running;r&&S.disposed.has(o),(r&&!o.tState||!r&&!o.state)&&(o.pure?w.push(o):b.push(o),o.observers&&ne(o)),r||(o.state=C)}if(w.length>1e6)throw w=[],new Error},!1)),s}function R(e){if(!e.fn)return;q(e);const s=g,t=d,n=W;d=g=e,ve(e,e.value,n),d=t,g=s}function ve(e,s,t){let n;try{n=e.fn(s)}catch(i){e.pure&&(e.state=C),ie(i)}(!e.updatedAt||e.updatedAt<=t)&&(e.updatedAt!=null&&"observers"in e?ee(e,n):e.value=n,e.updatedAt=t)}function te(e,s,t,n=C,i){const o={fn:e,state:n,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:s,owner:g,context:null,pure:t};return g===null||g!==Y&&(g.owned?g.owned.push(o):g.owned=[o]),o}function M(e){const s=S;if(e.state===0||s)return;if(e.state===L||s)return O(e);if(e.suspense&&$(e.suspense.inFallback))return e.suspense.effects.push(e);const t=[e];for(;(e=e.owner)&&(!e.updatedAt||e.updatedAt<W);)(e.state||s)&&t.push(e);for(let n=t.length-1;n>=0;n--)if(e=t[n],e.state===C||s)R(e);else if(e.state===L||s){const i=w;w=null,I(()=>O(e,t[0]),!1),w=i}}function I(e,s){if(w)return e();let t=!1;s||(w=[]),b?t=!0:b=[],W++;try{const n=e();return me(t),n}catch(n){w||(b=null),ie(n)}}function me(e){if(w&&(se(w),w=null),e)return;const s=b;b=null,s.length&&I(()=>J(s),!1)}function se(e){for(let s=0;s<e.length;s++)M(e[s])}function be(e){let s,t=0;for(s=0;s<e.length;s++){const n=e[s];n.user?e[t++]=n:M(n)}for(v.context&&he(),s=0;s<t;s++)M(e[s])}function O(e,s){const t=S;e.state=0;for(let n=0;n<e.sources.length;n+=1){const i=e.sources[n];i.sources&&(i.state===C||t?i!==s&&M(i):(i.state===L||t)&&O(i,s))}}function ne(e){const s=S;for(let t=0;t<e.observers.length;t+=1){const n=e.observers[t];(!n.state||s)&&(n.state=L,n.pure?w.push(n):b.push(n),n.observers&&ne(n))}}function q(e){let s;if(e.sources)for(;e.sources.length;){const t=e.sources.pop(),n=e.sourceSlots.pop(),i=t.observers;if(i&&i.length){const o=i.pop(),r=t.observerSlots.pop();n<i.length&&(o.sourceSlots[r]=n,i[n]=o,t.observerSlots[n]=r)}}if(e.owned){for(s=0;s<e.owned.length;s++)q(e.owned[s]);e.owned=null}if(e.cleanups){for(s=0;s<e.cleanups.length;s++)e.cleanups[s]();e.cleanups=null}e.state=0,e.context=null}function Ce(e){return e instanceof Error||typeof e=="string"?e:new Error("Unknown error")}function ie(e){throw e=Ce(e),e}function le(e,s){return $(()=>e(s||{}))}function Se(e,s,t){let n=t.length,i=s.length,o=n,r=0,l=0,u=s[i-1].nextSibling,a=null;for(;r<i||l<o;){if(s[r]===t[l]){r++,l++;continue}for(;s[i-1]===t[o-1];)i--,o--;if(i===r){const p=o<n?l?t[l-1].nextSibling:t[o-l]:u;for(;l<o;)e.insertBefore(t[l++],p)}else if(o===l)for(;r<i;)(!a||!a.has(s[r]))&&s[r].remove(),r++;else if(s[r]===t[o-1]&&t[l]===s[i-1]){const p=s[--i].nextSibling;e.insertBefore(t[l++],s[r++].nextSibling),e.insertBefore(t[--o],p),s[i]=t[o]}else{if(!a){a=new Map;let m=l;for(;m<o;)a.set(t[m],m++)}const p=a.get(s[r]);if(p!=null)if(l<p&&p<o){let m=r,T=1,A;for(;++m<i&&m<o&&!((A=a.get(s[m]))==null||A!==p+T);)T++;if(T>p-l){const P=s[r];for(;l<p;)e.insertBefore(t[l++],P)}else e.replaceChild(t[l++],s[r++])}else r++;else s[r++].remove()}}}const V="_$DX_DELEGATE";function Ae(e,s,t,n={}){let i;return pe(o=>{i=o,s===document?e():re(s,e(),s.firstChild?null:void 0,t)},n.owner),()=>{i(),s.textContent=""}}function oe(e,s,t){const n=document.createElement("template");n.innerHTML=e;let i=n.content.firstChild;return t&&(i=i.firstChild),i}function Ee(e,s=window.document){const t=s[V]||(s[V]=new Set);for(let n=0,i=e.length;n<i;n++){const o=e[n];t.has(o)||(t.add(o),s.addEventListener(o,Ne))}}function X(e,s,t){t==null?e.removeAttribute(s):e.setAttribute(s,t)}function xe(e,s,t){return $(()=>e(s,t))}function re(e,s,t,n){if(t!==void 0&&!n&&(n=[]),typeof s!="function")return B(e,s,n,t);k(i=>B(e,s(),i,t),n)}function Ne(e){const s=`$$${e.type}`;let t=e.composedPath&&e.composedPath()[0]||e.target;for(e.target!==t&&Object.defineProperty(e,"target",{configurable:!0,value:t}),Object.defineProperty(e,"currentTarget",{configurable:!0,get(){return t||document}}),v.registry&&!v.done&&(v.done=!0,document.querySelectorAll("[id^=pl-]").forEach(n=>n.remove()));t!==null;){const n=t[s];if(n&&!t.disabled){const i=t[`${s}Data`];if(i!==void 0?n.call(t,i,e):n.call(t,e),e.cancelBubble)return}t=t.host&&t.host!==t&&t.host instanceof Node?t.host:t.parentNode}}function B(e,s,t,n,i){for(v.context&&!t&&(t=[...e.childNodes]);typeof t=="function";)t=t();if(s===t)return t;const o=typeof s,r=n!==void 0;if(e=r&&t[0]&&t[0].parentNode||e,o==="string"||o==="number"){if(v.context)return t;if(o==="number"&&(s=s.toString()),r){let l=t[0];l&&l.nodeType===3?l.data=s:l=document.createTextNode(s),t=x(e,t,n,l)}else t!==""&&typeof t=="string"?t=e.firstChild.data=s:t=e.textContent=s}else if(s==null||o==="boolean"){if(v.context)return t;t=x(e,t,n)}else{if(o==="function")return k(()=>{let l=s();for(;typeof l=="function";)l=l();t=B(e,l,t,n)}),()=>t;if(Array.isArray(s)){const l=[],u=t&&Array.isArray(t);if(H(l,s,t,i))return k(()=>t=B(e,l,t,n,!0)),()=>t;if(v.context){if(!l.length)return t;for(let a=0;a<l.length;a++)if(l[a].parentNode)return t=l}if(l.length===0){if(t=x(e,t,n),r)return t}else u?t.length===0?K(e,l,n):Se(e,t,l):(t&&x(e),K(e,l));t=l}else if(s instanceof Node){if(v.context&&s.parentNode)return t=r?[s]:s;if(Array.isArray(t)){if(r)return t=x(e,t,n,s);x(e,t,null,s)}else t==null||t===""||!e.firstChild?e.appendChild(s):e.replaceChild(s,e.firstChild);t=s}}return t}function H(e,s,t,n){let i=!1;for(let o=0,r=s.length;o<r;o++){let l=s[o],u=t&&t[o];if(l instanceof Node)e.push(l);else if(!(l==null||l===!0||l===!1))if(Array.isArray(l))i=H(e,l,u)||i;else if(typeof l=="function")if(n){for(;typeof l=="function";)l=l();i=H(e,Array.isArray(l)?l:[l],Array.isArray(u)?u:[u])||i}else e.push(l),i=!0;else{const a=String(l);u&&u.nodeType===3&&u.data===a?e.push(u):e.push(document.createTextNode(a))}}return i}function K(e,s,t=null){for(let n=0,i=s.length;n<i;n++)e.insertBefore(s[n],t)}function x(e,s,t,n){if(t===void 0)return e.textContent="";const i=n||document.createTextNode("");if(s.length){let o=!1;for(let r=s.length-1;r>=0;r--){const l=s[r];if(i!==l){const u=l.parentNode===e;!o&&!r?u?e.replaceChild(i,l):e.insertBefore(i,t):u&&l.remove()}else o=!0}}else e.insertBefore(i,t);return[i]}const Te=oe('<div class="canvas-container"><canvas class="canvas" style="border: 1px solid #000"></canvas></div>'),[y,$e]=N(null),[Ie,Fe]=N({width:600,height:400});N("none");const[je,Ue]=N(!0),Q=(e,s,t,n,i)=>{y().fillStyle=i,je()===!0?(y().fillRect(e,s,t,n),y().fill()):(y().strokeStyle=i,y().stroke(),y().rect(e,s,t,n))},Le=()=>{$e(Ie().getContext("2d"))},j=(e,s,t,n,i)=>{y().beginPath(),y().lineWidth=2,y().moveTo(e,s),y().lineTo(t,n),y().strokeStyle=i||"black",y().stroke()},Me=({width:e,height:s})=>(()=>{const t=Te.cloneNode(!0),n=t.firstChild;return xe(Fe,n),X(n,"width",e),X(n,"height",s),t})(),Oe=oe('<div class="app-container"><input type="range" min="1" max="500" class="slider" id="myRange"></div>'),Be=()=>{const[e,s]=N({width:600,height:600});let t=De(),n=Re(t,!0),i=Pe(t,n),o,r,l=10,u=[],a,p,[m,T]=N(1e4),A=[];ge(async()=>{Le(),o=Math.floor(e().width/l),r=Math.floor(e().height/l);for(let c=0;c<r;c++)for(let f=0;f<o;f++){let h=new ue(f,c);u.push(h)}for(let c=0;c<u.length;c++)u[c].show();a=u[Math.floor(Math.random()*u.length)]});const P=async()=>{await fe()};z(()=>{const c=setInterval(P,1e3/m());we(()=>{clearInterval(c)})});const fe=async()=>{let c=e().width/l,f=u.indexOf(a);a.show(),u[f+1]&&u[f+1].show(),u[f-1]&&u[f-1].show(),u[f+c]&&u[f+c].show(),u[f-c]&&u[f-c].show(),a.visited=!0,a.highlight(),p=a.checkNeighbors(),p&&p.show(),p?(p.visited=!0,A.push(a),ce(a,p),a=p):A.length>0&&(a=A.pop())};class ue{visited=!1;walls=[!0,!0,!0,!0];constructor(f,h){this.i=f,this.j=h}show(){let f=this.i*l,h=this.j*l;this.visited&&Q(f,h,l,l,t),this.walls[0]&&j(f,h,f+l,h,i),this.walls[1]&&j(f+l,h,f+l,h+l,i),this.walls[2]&&j(f+l,h+l,f,h+l,i),this.walls[3]&&j(f,h+l,f,h,i)}checkNeighbors(){let f=[],h=u[F(this.i,this.j-1)],E=u[F(this.i+1,this.j)],_=u[F(this.i,this.j+1)],D=u[F(this.i-1,this.j)];if(h&&!h.visited&&f.push(h),E&&!E.visited&&f.push(E),_&&!_.visited&&f.push(_),D&&!D.visited&&f.push(D),f.length>0){let ae=Math.floor(Math.random()*f.length);return f[ae]}else return}highlight(){let f=this.i*l,h=this.j*l;Q(f+1,h+1,l-2,l-2,n)}}function F(c,f){return c<0||f<0||c>o-1||f>r-1?-1:c+f*o}function ce(c,f){let h=c.i-f.i;h===1?(c.walls[3]=!1,f.walls[1]=!1):h===-1&&(c.walls[1]=!1,f.walls[3]=!1);let E=c.j-f.j;E===1?(c.walls[0]=!1,f.walls[2]=!1):E===-1&&(c.walls[2]=!1,f.walls[0]=!1)}return(()=>{const c=Oe.cloneNode(!0),f=c.firstChild;return re(c,le(Me,{get width(){return e().width},get height(){return e().height}}),f),f.$$input=h=>{console.log(h.target.value),T(h.target.value)},c})()};function Re(e,s){if(e.indexOf("#")===0&&(e=e.slice(1)),e.length===3&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),e.length!==6)throw new Error("Invalid HEX color.");let t=parseInt(e.slice(0,2),16),n=parseInt(e.slice(2,4),16),i=parseInt(e.slice(4,6),16);return s?t*.299+n*.587+i*.114>186?"#000000":"#FFFFFF":(t=(255-t).toString(16),n=(255-n).toString(16),i=(255-i).toString(16),"#"+U(t)+U(n)+U(i))}function U(e,s){s=s||2;var t=new Array(s).join("0");return(t+e).slice(-s)}function Pe(e,s){var t=Z(e),n=Z(s),i={r:(t.r+n.r)/2,g:(t.g+n.g)/2,b:(t.b+n.b)/2};return _e(i.r,i.g,i.b)}function Z(e){var s=/^#?([a-f\d])([a-f\d])([a-f\d])$/i;e=e.replace(s,function(n,i,o,r){return i+i+o+o+r+r});var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}function _e(e,s,t){if(e>255||s>255||t>255)throw"Invalid color component";return"#"+(e<<16|s<<8|t).toString(16).padStart(6,"0")}function De(){for(var e="0123456789ABCDEF",s="#",t=0;t<6;t++)s+=e[Math.floor(Math.random()*16)];return s}Ee(["input"]);Ae(()=>le(Be,{}),document.getElementById("root"));
