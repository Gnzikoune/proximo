"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[138],{9205:function(e,t,r){r.d(t,{Z:function(){return u}});var n=r(2265);let a=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),o=function(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return t.filter((e,t,r)=>!!e&&""!==e.trim()&&r.indexOf(e)===t).join(" ").trim()};var i={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};let l=(0,n.forwardRef)((e,t)=>{let{color:r="currentColor",size:a=24,strokeWidth:l=2,absoluteStrokeWidth:u,className:c="",children:s,iconNode:d,...f}=e;return(0,n.createElement)("svg",{ref:t,...i,width:a,height:a,stroke:r,strokeWidth:u?24*Number(l)/Number(a):l,className:o("lucide",c),...f},[...d.map(e=>{let[t,r]=e;return(0,n.createElement)(t,r)}),...Array.isArray(s)?s:[s]])}),u=(e,t)=>{let r=(0,n.forwardRef)((r,i)=>{let{className:u,...c}=r;return(0,n.createElement)(l,{ref:i,iconNode:t,className:o("lucide-".concat(a(e)),u),...c})});return r.displayName="".concat(e),r}},1723:function(e,t,r){r.d(t,{Z:function(){return n}});let n=(0,r(9205).Z)("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]])},6595:function(e,t,r){r.d(t,{Z:function(){return n}});let n=(0,r(9205).Z)("Star",[["path",{d:"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",key:"r04s7s"}]])},525:function(e,t,r){r.d(t,{Z:function(){return n}});let n=(0,r(9205).Z)("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]])},340:function(e,t,r){r.d(t,{Z:function(){return n}});let n=(0,r(9205).Z)("Truck",[["path",{d:"M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2",key:"wrbu53"}],["path",{d:"M15 18H9",key:"1lyqi6"}],["path",{d:"M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14",key:"lysw3i"}],["circle",{cx:"17",cy:"18",r:"2",key:"332jqn"}],["circle",{cx:"7",cy:"18",r:"2",key:"19iecd"}]])},4930:function(e,t,r){r.d(t,{Ee:function(){return g},NY:function(){return k},fC:function(){return m}});var n=r(2265),a=r(3966),o=r(6606),i=r(1188),l=r(6840),u=r(7437),c="Avatar",[s,d]=(0,a.b)(c),[f,p]=s(c),v=n.forwardRef((e,t)=>{let{__scopeAvatar:r,...a}=e,[o,i]=n.useState("idle");return(0,u.jsx)(f,{scope:r,imageLoadingStatus:o,onImageLoadingStatusChange:i,children:(0,u.jsx)(l.WV.span,{...a,ref:t})})});v.displayName=c;var h="AvatarImage",b=n.forwardRef((e,t)=>{let{__scopeAvatar:r,src:a,onLoadingStatusChange:c=()=>{},...s}=e,d=p(h,r),f=function(e,t){let[r,a]=n.useState("idle");return(0,i.b)(()=>{if(!e){a("error");return}let r=!0,n=new window.Image,o=e=>()=>{r&&a(e)};return a("loading"),n.onload=o("loaded"),n.onerror=o("error"),n.src=e,t&&(n.referrerPolicy=t),()=>{r=!1}},[e,t]),r}(a,s.referrerPolicy),v=(0,o.W)(e=>{c(e),d.onImageLoadingStatusChange(e)});return(0,i.b)(()=>{"idle"!==f&&v(f)},[f,v]),"loaded"===f?(0,u.jsx)(l.WV.img,{...s,ref:t,src:a}):null});b.displayName=h;var y="AvatarFallback",w=n.forwardRef((e,t)=>{let{__scopeAvatar:r,delayMs:a,...o}=e,i=p(y,r),[c,s]=n.useState(void 0===a);return n.useEffect(()=>{if(void 0!==a){let e=window.setTimeout(()=>s(!0),a);return()=>window.clearTimeout(e)}},[a]),c&&"loaded"!==i.imageLoadingStatus?(0,u.jsx)(l.WV.span,{...o,ref:t}):null});w.displayName=y;var m=v,g=b,k=w},721:function(e,t,r){r.d(t,{bU:function(){return C},fC:function(){return x}});var n=r(2265),a=r(6741),o=r(8575),i=r(3966),l=r(886),u=r(6718),c=r(420),s=r(6840),d=r(7437),f="Switch",[p,v]=(0,i.b)(f),[h,b]=p(f),y=n.forwardRef((e,t)=>{let{__scopeSwitch:r,name:i,checked:u,defaultChecked:c,required:f,disabled:p,value:v="on",onCheckedChange:b,form:y,...w}=e,[m,x]=n.useState(null),C=(0,o.e)(t,e=>x(e)),j=n.useRef(!1),N=!m||y||!!m.closest("form"),[R=!1,S]=(0,l.T)({prop:u,defaultProp:c,onChange:b});return(0,d.jsxs)(h,{scope:r,checked:R,disabled:p,children:[(0,d.jsx)(s.WV.button,{type:"button",role:"switch","aria-checked":R,"aria-required":f,"data-state":k(R),"data-disabled":p?"":void 0,disabled:p,value:v,...w,ref:C,onClick:(0,a.M)(e.onClick,e=>{S(e=>!e),N&&(j.current=e.isPropagationStopped(),j.current||e.stopPropagation())})}),N&&(0,d.jsx)(g,{control:m,bubbles:!j.current,name:i,value:v,checked:R,required:f,disabled:p,form:y,style:{transform:"translateX(-100%)"}})]})});y.displayName=f;var w="SwitchThumb",m=n.forwardRef((e,t)=>{let{__scopeSwitch:r,...n}=e,a=b(w,r);return(0,d.jsx)(s.WV.span,{"data-state":k(a.checked),"data-disabled":a.disabled?"":void 0,...n,ref:t})});m.displayName=w;var g=e=>{let{control:t,checked:r,bubbles:a=!0,...o}=e,i=n.useRef(null),l=(0,u.D)(r),s=(0,c.t)(t);return n.useEffect(()=>{let e=i.current,t=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"checked").set;if(l!==r&&t){let n=new Event("click",{bubbles:a});t.call(e,r),e.dispatchEvent(n)}},[l,r,a]),(0,d.jsx)("input",{type:"checkbox","aria-hidden":!0,defaultChecked:r,...o,tabIndex:-1,ref:i,style:{...e.style,...s,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function k(e){return e?"checked":"unchecked"}var x=y,C=m},271:function(e,t,r){r.d(t,{VY:function(){return M},aV:function(){return A},fC:function(){return V},xz:function(){return E}});var n=r(2265),a=r(6741),o=r(3966),i=r(1353),l=r(1599),u=r(6840),c=r(9114),s=r(886),d=r(9255),f=r(7437),p="Tabs",[v,h]=(0,o.b)(p,[i.Pc]),b=(0,i.Pc)(),[y,w]=v(p),m=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:n,onValueChange:a,defaultValue:o,orientation:i="horizontal",dir:l,activationMode:p="automatic",...v}=e,h=(0,c.gm)(l),[b,w]=(0,s.T)({prop:n,onChange:a,defaultProp:o});return(0,f.jsx)(y,{scope:r,baseId:(0,d.M)(),value:b,onValueChange:w,orientation:i,dir:h,activationMode:p,children:(0,f.jsx)(u.WV.div,{dir:h,"data-orientation":i,...v,ref:t})})});m.displayName=p;var g="TabsList",k=n.forwardRef((e,t)=>{let{__scopeTabs:r,loop:n=!0,...a}=e,o=w(g,r),l=b(r);return(0,f.jsx)(i.fC,{asChild:!0,...l,orientation:o.orientation,dir:o.dir,loop:n,children:(0,f.jsx)(u.WV.div,{role:"tablist","aria-orientation":o.orientation,...a,ref:t})})});k.displayName=g;var x="TabsTrigger",C=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:n,disabled:o=!1,...l}=e,c=w(x,r),s=b(r),d=R(c.baseId,n),p=S(c.baseId,n),v=n===c.value;return(0,f.jsx)(i.ck,{asChild:!0,...s,focusable:!o,active:v,children:(0,f.jsx)(u.WV.button,{type:"button",role:"tab","aria-selected":v,"aria-controls":p,"data-state":v?"active":"inactive","data-disabled":o?"":void 0,disabled:o,id:d,...l,ref:t,onMouseDown:(0,a.M)(e.onMouseDown,e=>{o||0!==e.button||!1!==e.ctrlKey?e.preventDefault():c.onValueChange(n)}),onKeyDown:(0,a.M)(e.onKeyDown,e=>{[" ","Enter"].includes(e.key)&&c.onValueChange(n)}),onFocus:(0,a.M)(e.onFocus,()=>{let e="manual"!==c.activationMode;v||o||!e||c.onValueChange(n)})})})});C.displayName=x;var j="TabsContent",N=n.forwardRef((e,t)=>{let{__scopeTabs:r,value:a,forceMount:o,children:i,...c}=e,s=w(j,r),d=R(s.baseId,a),p=S(s.baseId,a),v=a===s.value,h=n.useRef(v);return n.useEffect(()=>{let e=requestAnimationFrame(()=>h.current=!1);return()=>cancelAnimationFrame(e)},[]),(0,f.jsx)(l.z,{present:o||v,children:r=>{let{present:n}=r;return(0,f.jsx)(u.WV.div,{"data-state":v?"active":"inactive","data-orientation":s.orientation,role:"tabpanel","aria-labelledby":d,hidden:!n,id:p,tabIndex:0,...c,ref:t,style:{...e.style,animationDuration:h.current?"0s":void 0},children:n&&i})}})});function R(e,t){return"".concat(e,"-trigger-").concat(t)}function S(e,t){return"".concat(e,"-content-").concat(t)}N.displayName=j;var V=m,A=k,E=C,M=N},6718:function(e,t,r){r.d(t,{D:function(){return a}});var n=r(2265);function a(e){let t=n.useRef({value:e,previous:e});return n.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}},420:function(e,t,r){r.d(t,{t:function(){return o}});var n=r(2265),a=r(1188);function o(e){let[t,r]=n.useState(void 0);return(0,a.b)(()=>{if(e){r({width:e.offsetWidth,height:e.offsetHeight});let t=new ResizeObserver(t=>{let n,a;if(!Array.isArray(t)||!t.length)return;let o=t[0];if("borderBoxSize"in o){let e=o.borderBoxSize,t=Array.isArray(e)?e[0]:e;n=t.inlineSize,a=t.blockSize}else n=e.offsetWidth,a=e.offsetHeight;r({width:n,height:a})});return t.observe(e,{box:"border-box"}),()=>t.unobserve(e)}r(void 0)},[e]),t}}}]);