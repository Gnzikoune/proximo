(()=>{var e={};e.id=857,e.ids=[857],e.modules={2934:e=>{"use strict";e.exports=require("next/dist/client/components/action-async-storage.external.js")},4580:e=>{"use strict";e.exports=require("next/dist/client/components/request-async-storage.external.js")},5869:e=>{"use strict";e.exports=require("next/dist/client/components/static-generation-async-storage.external.js")},399:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},4770:e=>{"use strict";e.exports=require("crypto")},7522:(e,s,t)=>{"use strict";t.r(s),t.d(s,{GlobalError:()=>n.a,__next_app__:()=>p,originalPathname:()=>m,pages:()=>c,routeModule:()=>x,tree:()=>o}),t(3388),t(9063),t(996);var r=t(170),a=t(5002),i=t(3876),n=t.n(i),d=t(6299),l={};for(let e in d)0>["default","tree","pages","GlobalError","originalPathname","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>d[e]);t.d(s,l);let o=["",{children:["dashboard",{children:["transporter",{children:["manage-deliveries",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,3388)),"/Users/user/Desktop/proximo/app/dashboard/transporter/manage-deliveries/page.tsx"]}]},{}]},{}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,9063)),"/Users/user/Desktop/proximo/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,996,23)),"next/dist/client/components/not-found-error"]}],c=["/Users/user/Desktop/proximo/app/dashboard/transporter/manage-deliveries/page.tsx"],m="/dashboard/transporter/manage-deliveries/page",p={require:t,loadChunk:()=>Promise.resolve()},x=new r.AppPageRouteModule({definition:{kind:a.x.APP_PAGE,page:"/dashboard/transporter/manage-deliveries/page",pathname:"/dashboard/transporter/manage-deliveries",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:o}})},6020:(e,s,t)=>{Promise.resolve().then(t.bind(t,3899))},3899:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>h});var r=t(7247),a=t(8964),i=t(8053),n=t(7757),d=t(2394),l=t(4779),o=t(5995),c=t(1044),m=t(6323);let p=(0,m.Z)("MapPin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]),x=(0,m.Z)("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);var u=t(7441);function h(){let[e,s]=(0,a.useState)([{id:"1",from:"Dakar",to:"Thi\xe8s",status:"en_attente",details:"Colis fragile, 5kg",weight:5,dimensions:"30x20x15",pickupDate:"2023-06-20",deliveryDate:"2023-06-21",senderName:"Alice Diop",recipientName:"Moussa Sow"},{id:"2",from:"Saint-Louis",to:"Louga",status:"en_transit",details:"Documents urgents",weight:1,dimensions:"25x35x5",pickupDate:"2023-06-19",deliveryDate:"2023-06-20",senderName:"Fatou Diallo",recipientName:"Ibrahima Ndiaye"},{id:"3",from:"Ziguinchor",to:"Kolda",status:"livr\xe9",details:"Produits alimentaires",weight:10,dimensions:"40x30x20",pickupDate:"2023-06-18",deliveryDate:"2023-06-19",senderName:"Omar Seck",recipientName:"Aminata Ba"}]),t=(t,r)=>{s(e.map(e=>e.id===t?{...e,status:r}:e)),(0,o.Am)({title:"Statut mis \xe0 jour",description:`La livraison #${t} est maintenant ${"en_attente"===r?"en attente":"en_transit"===r?"en transit":"livr\xe9e"}.`})},m=e=>{(0,o.Am)({title:"Probl\xe8me signal\xe9",description:`Un probl\xe8me a \xe9t\xe9 signal\xe9 pour la livraison #${e}. Notre \xe9quipe va vous contacter rapidement.`,variant:"destructive"})};return(0,r.jsxs)("div",{className:"space-y-6",children:[r.jsx("h1",{className:"text-3xl font-bold",children:"Gestion des livraisons"}),e.map(e=>(0,r.jsxs)(n.Zb,{children:[r.jsx(n.Ol,{children:(0,r.jsxs)(n.ll,{className:"flex items-center",children:[r.jsx(c.Z,{className:"mr-2"}),"Livraison #",e.id,": ",e.from," → ",e.to]})}),(0,r.jsxs)(n.aY,{children:[(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4 mb-4",children:[(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-semibold",children:"D\xe9tails:"}),r.jsx("p",{children:e.details})]}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-semibold",children:"Dimensions:"}),r.jsx("p",{children:e.dimensions})]}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-semibold",children:"Poids:"}),(0,r.jsxs)("p",{children:[e.weight," kg"]})]}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-semibold",children:"Statut:"}),r.jsx("p",{children:e.status})]})]}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4 mb-4",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx(p,{className:"mr-2"}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-semibold",children:"Exp\xe9diteur:"}),r.jsx("p",{children:e.senderName})]})]}),(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx(p,{className:"mr-2"}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-semibold",children:"Destinataire:"}),r.jsx("p",{children:e.recipientName})]})]})]}),(0,r.jsxs)("div",{className:"grid grid-cols-2 gap-4 mb-4",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx(x,{className:"mr-2"}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-semibold",children:"Date de collecte:"}),r.jsx("p",{children:e.pickupDate})]})]}),(0,r.jsxs)("div",{className:"flex items-center",children:[r.jsx(x,{className:"mr-2"}),(0,r.jsxs)("div",{children:[r.jsx("p",{className:"font-semibold",children:"Date de livraison:"}),r.jsx("p",{children:e.deliveryDate})]})]})]}),(0,r.jsxs)("div",{className:"space-y-4",children:[(0,r.jsxs)(l.E,{value:e.status,onValueChange:s=>t(e.id,s),children:[(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[r.jsx(l.m,{value:"en_attente",id:`en_attente-${e.id}`}),r.jsx(d._,{htmlFor:`en_attente-${e.id}`,children:"En attente"})]}),(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[r.jsx(l.m,{value:"en_transit",id:`en_transit-${e.id}`}),r.jsx(d._,{htmlFor:`en_transit-${e.id}`,children:"En transit"})]}),(0,r.jsxs)("div",{className:"flex items-center space-x-2",children:[r.jsx(l.m,{value:"livr\xe9",id:`livr\xe9-${e.id}`}),r.jsx(d._,{htmlFor:`livr\xe9-${e.id}`,children:"Livr\xe9"})]})]}),r.jsx(i.z,{variant:"outline",onClick:()=>m(e.id),children:"Signaler un probl\xe8me"})]}),(0,r.jsxs)("div",{className:"mt-4",children:[r.jsx("h3",{className:"text-lg font-semibold mb-2",children:"QR Code de la livraison"}),r.jsx(u.Z,{deliveryInfo:{id:e.id,weight:e.weight,dimensions:e.dimensions,contentType:"general",sender:{name:e.senderName,contact:"[encrypted]",address:e.from},recipient:{name:e.recipientName,contact:"[encrypted]",address:e.to},pickup:{address:e.from,datetime:e.pickupDate},delivery:{address:e.to,datetime:e.deliveryDate},status:e.status,validationCode:Math.random().toString(36).substr(2,6).toUpperCase(),carrier:{name:"Nom du transporteur",transportType:"V\xe9hicule",vehicleInfo:"Informations du v\xe9hicule"},payment:{amount:5e3,status:"en_attente"},trackingUrl:`https://proximo.com/tracking/${e.id}`}})]})]})]},e.id))]})}},7441:(e,s,t)=>{"use strict";t.d(s,{Z:()=>l});var r=t(7247);t(8964);var a=t(2041),i=t(5800),n=t.n(i);let d=e=>{let s={senderContact:e.sender.contact,recipientContact:e.recipient.contact},t=n().AES.encrypt(JSON.stringify(s),process.env.NEXT_PUBLIC_ENCRYPTION_KEY||"default_key").toString();return JSON.stringify({...e,sender:{...e.sender,contact:"[encrypted]"},recipient:{...e.recipient,contact:"[encrypted]"},encryptedData:t})},l=({deliveryInfo:e})=>{let s=d(e);return r.jsx("div",{className:"flex justify-center items-center p-4 bg-white rounded-lg shadow",children:r.jsx(a.t,{value:s,size:256,level:"H",includeMargin:!0})})}},7757:(e,s,t)=>{"use strict";t.d(s,{Ol:()=>d,SZ:()=>o,Zb:()=>n,aY:()=>c,eW:()=>m,ll:()=>l});var r=t(7247),a=t(8964),i=t(5008);let n=a.forwardRef(({className:e,...s},t)=>r.jsx("div",{ref:t,className:(0,i.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...s}));n.displayName="Card";let d=a.forwardRef(({className:e,...s},t)=>r.jsx("div",{ref:t,className:(0,i.cn)("flex flex-col space-y-1.5 p-6",e),...s}));d.displayName="CardHeader";let l=a.forwardRef(({className:e,...s},t)=>r.jsx("div",{ref:t,className:(0,i.cn)("text-2xl font-semibold leading-none tracking-tight",e),...s}));l.displayName="CardTitle";let o=a.forwardRef(({className:e,...s},t)=>r.jsx("div",{ref:t,className:(0,i.cn)("text-sm text-muted-foreground",e),...s}));o.displayName="CardDescription";let c=a.forwardRef(({className:e,...s},t)=>r.jsx("div",{ref:t,className:(0,i.cn)("p-6 pt-0",e),...s}));c.displayName="CardContent";let m=a.forwardRef(({className:e,...s},t)=>r.jsx("div",{ref:t,className:(0,i.cn)("flex items-center p-6 pt-0",e),...s}));m.displayName="CardFooter"},2394:(e,s,t)=>{"use strict";t.d(s,{_:()=>o});var r=t(7247),a=t(8964),i=t(768),n=t(7972),d=t(5008);let l=(0,n.j)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),o=a.forwardRef(({className:e,...s},t)=>r.jsx(i.f,{ref:t,className:(0,d.cn)(l(),e),...s}));o.displayName=i.f.displayName},4779:(e,s,t)=>{"use strict";t.d(s,{E:()=>l,m:()=>o});var r=t(7247),a=t(8964),i=t(8136),n=t(4161),d=t(5008);let l=a.forwardRef(({className:e,...s},t)=>r.jsx(i.fC,{className:(0,d.cn)("grid gap-2",e),...s,ref:t}));l.displayName=i.fC.displayName;let o=a.forwardRef(({className:e,...s},t)=>r.jsx(i.ck,{ref:t,className:(0,d.cn)("aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",e),...s,children:r.jsx(i.z$,{className:"flex items-center justify-center",children:r.jsx(n.Z,{className:"h-2.5 w-2.5 fill-current text-current"})})}));o.displayName=i.ck.displayName},5995:(e,s,t)=>{"use strict";t.d(s,{Am:()=>c}),t(8964);let r=0,a=new Map,i=e=>{if(a.has(e))return;let s=setTimeout(()=>{a.delete(e),o({type:"REMOVE_TOAST",toastId:e})},1e6);a.set(e,s)},n=(e,s)=>{switch(s.type){case"ADD_TOAST":return{...e,toasts:[s.toast,...e.toasts].slice(0,1)};case"UPDATE_TOAST":return{...e,toasts:e.toasts.map(e=>e.id===s.toast.id?{...e,...s.toast}:e)};case"DISMISS_TOAST":{let{toastId:t}=s;return t?i(t):e.toasts.forEach(e=>{i(e.id)}),{...e,toasts:e.toasts.map(e=>e.id===t||void 0===t?{...e,open:!1}:e)}}case"REMOVE_TOAST":if(void 0===s.toastId)return{...e,toasts:[]};return{...e,toasts:e.toasts.filter(e=>e.id!==s.toastId)}}},d=[],l={toasts:[]};function o(e){l=n(l,e),d.forEach(e=>{e(l)})}function c({...e}){let s=(r=(r+1)%Number.MAX_SAFE_INTEGER).toString(),t=()=>o({type:"DISMISS_TOAST",toastId:s});return o({type:"ADD_TOAST",toast:{...e,id:s,open:!0,onOpenChange:e=>{e||t()}}}),{id:s,dismiss:t,update:e=>o({type:"UPDATE_TOAST",toast:{...e,id:s}})}}},3388:(e,s,t)=>{"use strict";t.r(s),t.d(s,{default:()=>r});let r=(0,t(5347).createProxy)(String.raw`/Users/user/Desktop/proximo/app/dashboard/transporter/manage-deliveries/page.tsx#default`)}};var s=require("../../../../webpack-runtime.js");s.C(e);var t=e=>s(s.s=e),r=s.X(0,[787,968,320,695],()=>t(7522));module.exports=r})();