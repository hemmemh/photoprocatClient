"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[834],{6308:(e,r,s)=>{s.d(r,{Z:()=>a});var c=s(2791),t=(s(4574),s(184));const a=e=>{var r,s;let{breakpoint:a=7677.98,children:o,controll:n=!0,VisibleAll:l,accordionClass:i="origin",lock:d=!1}=e;const[u,m]=(0,c.useState)(!1),[h,v]=(0,c.useState)(null),_=((0,c.useRef)([]),(0,c.useRef)()),x=(0,c.useCallback)((e=>{v(h===e?null:e)}),[h]),g=(0,c.useCallback)((()=>{const e=window.innerWidth;m(!(e<=a))}),[]);return(0,c.useEffect)((()=>{const e=window.innerWidth;return m(!(e<=a)),window.addEventListener("resize",g),()=>{window.removeEventListener("resize",g)}}),[]),(0,c.useEffect)((()=>{l||(v(null),m(!1))}),[l]),(0,t.jsx)("div",{ref:_,className:"AccordionUser ".concat(i),children:null===(r=(s=c.Children).map)||void 0===r?void 0:r.call(s,o,((e,r)=>(0,c.cloneElement)(e,{active:u,lock:d,controll:n,activeItem:h===r,accordion:()=>x(r),visible:h,accordRef:_})))})}},3893:(e,r,s)=>{s.d(r,{Z:()=>a});var c=s(2791),t=(s(4574),s(184));const a=e=>{let{active:r,visible:s,accordion:a,children:o,activeItem:n,controll:l,lock:i}=e;const d=(0,c.useRef)(),u=(0,c.useRef)(),m=(0,c.useRef)(n),h=(0,c.useRef)(),[v,_]=(0,c.useState)(!1);(0,c.useEffect)((()=>{i||(d.current.style.height="0px",h.current=d.current.offsetWidth)}),[]),(0,c.useEffect)((()=>{d.current.style.height=i?"auto":"0px"}),[i]),(0,c.useEffect)((()=>{i||(m.current=n,l?n||r?(d.current.style.height="".concat(d.current.scrollHeight,"px"),d.current.style.boxSizing="content-box",setTimeout((()=>{d.current&&(d.current.style.height="auto")}),300)):(d.current.style.height="".concat(d.current.scrollHeight,"px"),setTimeout((()=>{d.current&&(d.current.style.height=0)}),1)):v?(d.current.style.height="".concat(d.current.scrollHeight,"px"),d.current.style.boxSizing="content-box",setTimeout((()=>{d.current&&(d.current.style.height="auto")}),300)):(d.current.style.height="".concat(d.current.scrollHeight,"px"),setTimeout((()=>{d.current&&(d.current.style.height=0)}),1)))}),[s,r]);return(0,t.jsxs)("div",{className:"AccordionUser__bodyCover",children:[(0,t.jsx)("div",{onClick:e=>{i||(a(),_((e=>!e)))},className:n?"AccordionUser__button  active _icon-arrow-next active":"AccordionUser__button _icon-arrow-next",children:o[0]}),(0,t.jsx)("div",{ref:d,className:"AccordionUser__body",children:o.slice(1).map((e=>(0,t.jsx)("div",{ref:u,className:n?"AccordionUser__item active":"AccordionUser__item",children:e},e)))})]})}},847:(e,r,s)=>{s.d(r,{Z:()=>t});s(2791);var c=s(184);const t=e=>{let{children:r,navigationClass:s="origin"}=e;return(0,c.jsx)("div",{className:"Navigation ".concat(s),children:r})}},5672:(e,r,s)=>{s.d(r,{Z:()=>t});s(2791);var c=s(184);const t=e=>{let{children:r,className:s="",value:t,name:a,setValue:o,id:n}=e;return(0,c.jsxs)("div",{onClick:()=>{o(n)},className:"MyRadio  ".concat(n===t?"active":""),children:[(0,c.jsx)("input",{type:"radio",name:a,id:String(n),value:n}),(0,c.jsx)("label",{className:"".concat(s," ").concat(n===t?"active":""),htmlFor:String(n),children:r})]})}},1834:(e,r,s)=>{s.r(r),s.d(r,{default:()=>F});var c=s(5338),t=s(2791),a=s(6938),o=s(7563),n=s(8927),l=s(1731),i=s(8770),d=s(9934),u=s(9179);var m=s(4122),h=s(5672),v=s(7181),_=s(184);const x=()=>{const{toggle:e}=(0,m.C)((e=>e.reducer.user)),[r,s]=(0,t.useState)("\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u043e\u0432"),{setToggle:c}=a.userSlice.actions,o=(0,m.T)();return(0,_.jsxs)("div",{className:"User__toggle toggle-user",children:[["\u041c\u043e\u0438 \u0434\u0430\u043d\u043d\u044b\u0435","\u0418\u0441\u0442\u043e\u0440\u0438\u044f \u0437\u0430\u043a\u0430\u0437\u043e\u0432"].map(((e,t)=>(0,_.jsx)(h.Z,{id:e,value:r,setValue:s,children:(0,_.jsx)(v.Z,{onClick:()=>o(c(t)),className:"toggle-user__item",children:e})},e))),(0,_.jsx)(v.Z,{onClick:()=>o((async e=>{const{setUser:r}=i.catalogSlice.actions,{setCompare:s,setProducts:c}=d.navbarSlice.actions;try{await(0,n.kS)(),e(r({})),window.location.replace(l.ef),e(s(0)),e(c(0)),localStorage.removeItem("Auth")}catch(t){console.log(t)}})),className:"toggle-user__item",children:"\u0412\u044b\u0439\u0442\u0438"})]})};var g=s(8773),j=s(7892),p=s.n(j),N=s(1652),A=s(938),b=s(8714),f=s(3634);const C=e=>{let{calendarIcon:r,calendarRef:s}=e;const[c,a]=(0,t.useState)(!1);(0,t.useEffect)((()=>{var e;return document.addEventListener("click",o),null===(e=document.querySelector(".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root input"))||void 0===e||e.addEventListener("click",o),()=>document.removeEventListener("click",o)}),[]);const o=e=>{var c;e.target!==r.current&&(null!==(c=s.current)&&void 0!==c&&c.contains(e.target)||a(!1))};return{onCalendarFocus:()=>{var e;const r=document.querySelector(".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root");null===r||void 0===r||null===(e=r.querySelector("input"))||void 0===e||e.focus()},calendar:c,setcalendar:a}},y=()=>{const{toggle:e,name:r,serName:c,tell:o,data:n}=(0,m.C)((e=>e.reducer.user)),{setSerName:l,setName:i,setData:d,setTell:u}=a.userSlice.actions,{user:h}=(0,m.C)((e=>e.reducer.catalog)),[v,x]=(0,t.useState)(h.email),j=(0,m.T)(),y=(0,t.useRef)(null),S=(0,t.useRef)(null),{onCalendarFocus:w,calendar:k,setcalendar:I}=C({calendarRef:y,calendarIcon:S});return(0,t.useEffect)((()=>{j(i(h.name)),j(l(h.sername)),j(u(h.tell)),j(d(h.birthDate))}),[]),(0,_.jsxs)("div",{className:0===e?"User__body body-user active":"User__body body-user",children:[(0,_.jsx)(g.Z,{value:c,change:e=>j(l(e)),placeholder:"\u0424\u0430\u043c\u0438\u043b\u0438\u044f *"}),(0,_.jsx)(g.Z,{value:r,change:e=>j(i(e)),placeholder:"\u0418\u043c\u044f *"}),(0,_.jsx)("div",{onClick:w,className:"body-user__gg",children:(0,_.jsxs)(g.Z,{value:p()(n),change:e=>j(d(e.toString())),lock:!0,inputClass:"origin g",placeholder:"\u0414\u0430\u0442\u0430 \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f",children:[(0,_.jsx)("div",{onClick:()=>I((e=>!e)),className:"body-user__calendar-icon",children:(0,_.jsx)("img",{ref:S,src:s(1320),alt:""})}),(0,_.jsx)("div",{ref:y,className:k?"body-user__calendar active":"body-user__calendar",children:(0,_.jsx)(N._,{dateAdapter:f.y,children:(0,_.jsx)(A.W,{value:p()(n),onChange:e=>j(d(e.toString()))})})}),(0,_.jsx)(N._,{dateAdapter:f.y,children:(0,_.jsx)(b.N,{label:"Controlled field",value:p()(n),onChange:e=>j(d(e.toString()))})})]})}),(0,_.jsx)(g.Z,{value:o,change:e=>j(u(e)),placeholder:"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u044b\u0439 *"}),(0,_.jsx)(g.Z,{value:v,change:x,placeholder:"E-mail *"})]})};var S=s(6308),w=s(3893),k=s(8079);const I=e=>{let{order:r}=e;return(0,_.jsx)("div",{className:"order__product-cover",children:r.ordersItemProduct.map((e=>(0,_.jsxs)("div",{className:"order__product product-order",children:[(0,_.jsxs)("div",{className:"product-order__item",children:[(0,_.jsx)("div",{className:"product-order__image-cover",children:(0,_.jsx)("div",{className:"product-order__image",children:(0,_.jsx)("img",{src:"".concat(k.T5,"/").concat(e.product.name,"/").concat(JSON.parse(e.product.images)[0]),alt:""})})}),(0,_.jsxs)("div",{className:"product-order__info",children:[(0,_.jsx)("div",{className:"product-order__name",children:e.product.name}),(0,_.jsx)("div",{className:"product-order__brand",children:e.product.brand.name})]})]}),(0,_.jsx)("div",{className:"product-order__item",children:(0,_.jsx)("div",{className:"product-order__count",children:e.amount})}),(0,_.jsx)("div",{className:"product-order__item",children:(0,_.jsxs)("div",{className:"product-order__price",children:[e.amount*e.product.price," \u0420"]})}),(0,_.jsx)("div",{className:"product-order__item"}),(0,_.jsx)("div",{className:"product-order__item"})]},e.product._id)))})};var U=s(7689);const E=e=>{let{order:r}=e;const s=(0,m.T)(),c=(0,U.s0)(),{setLoaduser:t}=a.userSlice.actions,n=async e=>{var r;await s((r=e.ordersItemProduct,async e=>{const s=u.h.getState(),{user:c}=s.reducer.catalog,{setProducts:t,setCompare:n,setLoves:l}=(s.reducer.navbar,d.navbarSlice.actions),{setLoaduser:i}=a.userSlice.actions;try{e(i(!0)),await(0,o.xY)({id:c.basket}),e(t(0)),console.log("tt5"),e(t(r.length));for(const e of r)await(0,o.mk)({basketId:c.basket,product:e.product._id,count:e.amount});e(i(!1))}catch(m){console.log(m)}})),c(l.bF)};return(0,_.jsxs)("div",{className:"order__top",children:[(0,_.jsx)("div",{className:"order__number",children:r.number}),(0,_.jsx)("div",{className:"order__date",children:r.date}),(0,_.jsx)("div",{className:"order__date"}),(0,_.jsx)("div",{className:"order__price",children:r.price}),(0,_.jsx)("div",{className:"order__button",children:(0,_.jsx)(v.Z,{onClick:()=>n(r),className:"buttonCart",children:"\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u044c"})}),(0,_.jsx)("div",{className:"order__arrow _icon-arrow-bottom"})]})},Z=()=>{const{toggle:e}=(0,m.C)((e=>e.reducer.user)),{orders:r,user:s}=(0,m.C)((e=>e.reducer.catalog));return(0,_.jsxs)("div",{className:1===e?"User__orders orders-user active":"User__orders orders-user",children:[(0,_.jsxs)("div",{className:"orders-user__top top-orders",children:[(0,_.jsx)("div",{className:"top-orders__item",children:"\u0417\u0430\u043a\u0430\u0437"}),(0,_.jsx)("div",{className:"top-orders__item",children:"\u0414\u0430\u0442\u0430"}),(0,_.jsx)("div",{className:"top-orders__item",children:"\u041a\u043e\u043b-\u0432\u043e"}),(0,_.jsx)("div",{className:"top-orders__item",children:"\u0421\u0443\u043c\u043c\u0430"}),(0,_.jsx)("div",{className:"top-orders__item"}),(0,_.jsx)("div",{className:"top-orders__item"})]}),(0,_.jsx)("div",{className:"orders-user__order order",children:(0,_.jsx)(S.Z,{accordionClass:"user",children:r.map((e=>(0,_.jsxs)(w.Z,{children:[(0,_.jsx)(E,{order:e}),(0,_.jsx)(I,{order:e})]},e._id)))})})]})};var R=s(3286);const B=()=>{const{toggle:e,loadData:r}=(0,m.C)((e=>e.reducer.user)),s=(0,m.T)();return(0,_.jsx)("div",{className:"User__submit",children:(0,_.jsx)(v.Z,{onClick:()=>s((async e=>{const r=u.h.getState(),{user:s}=r.reducer.catalog,{toggle:c,data:t,name:o,serName:i,tell:d}=r.reducer.user,{setLoadData:m}=a.userSlice.actions;try{switch(e(m(!0)),c){case 0:return void await(0,n.AQ)({id:s.id,name:o,serName:i,birthDate:t,tell:d});case 1:return void window.location.replace(l.ef)}}catch(h){console.log(h)}finally{e(m(!1))}})),className:"buttonCart _submit",children:r?(0,_.jsx)(R.Z,{className:"basketLoader"}):0===e?"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c":"\u0413\u043b\u0430\u0432\u043d\u0430\u044f"})})},T=()=>(0,_.jsxs)("div",{className:"User__main ",children:[(0,_.jsx)(x,{}),(0,_.jsx)(y,{}),(0,_.jsx)(Z,{}),(0,_.jsx)(B,{})]});var L=s(847),z=s(77);const D=()=>{const{setOrders:e}=i.catalogSlice.actions,{setLoaduser:r}=a.userSlice.actions,{user:s}=(0,m.C)((e=>e.reducer.catalog)),{loaduser:c}=(0,m.C)((e=>e.reducer.user)),n=(0,m.T)();return(0,t.useEffect)((()=>{c||(0,o.co)({id:s.orders}).then((r=>{n(e(r.ordersItems))}))}),[]),c?(0,_.jsx)(z.Z,{}):(0,_.jsx)("div",{className:"User",children:(0,_.jsxs)("div",{className:"User__container",children:[(0,_.jsx)(L.Z,{navigationClass:"user",children:"\u0413\u043b\u0430\u0432\u043d\u0430\u044f / \u041b\u0438\u0447\u043d\u044b\u0439 \u043a\u0430\u0431\u0438\u043d\u0435\u0442"}),(0,_.jsxs)("div",{className:"User__title",children:[(0,_.jsx)("span",{children:"\u041b\u0438\u0447\u043d\u044b\u0439"})," \u041a\u0430\u0431\u0438\u043d\u0435\u0442"]}),(0,_.jsx)(T,{})]})})},F=()=>(0,_.jsx)(c.Z,{children:(0,_.jsx)(D,{})})},4574:()=>{},1320:e=>{e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFBSURBVHgBzVWLccIwDH3lGKCdoN4ANsBM0G5AukE7AXQDOkHdDcIEoRPACGwAbIBEpDsFTDAQPu/uxbJl6yWSMMA+lsSCOCP+4jjGsreQsxW0ic/Ed7M2J/aJnjgkZqhHh/hFnIqI3Z+36NGtCfKE8zGQ2Ns3tamwKRonBAqIp4jXfTty4AWnIatztnBl6BdwkR2ahSMGFciJH2gWgR83S5HFJ/EN5+GfODomwL37jfKHw+D264udyRgiPo+y9yu4S4oYXWPzVeLF5mthbea7vmSBnjnAQfTTnYyvZm59i1SBH1RroC2cyRhMUPV5PFIN+JrWt+F66GXoZOyZufo4latUgQnK/wUV+BPbS6A84mO7kyrAwadir4ztZIz5EBO4Sw0WKGswNGvFzp7BAd8ECQIjNIibpIgL5bGfhkvBXRU2m1k/ICVzaPwAAAAASUVORK5CYII="}}]);
//# sourceMappingURL=834.ddb0f807.chunk.js.map