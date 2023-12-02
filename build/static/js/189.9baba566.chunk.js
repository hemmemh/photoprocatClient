"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[189],{8299:(e,a,s)=>{s.d(a,{Z:()=>l});var t=s(2791),n=s(184);const l=e=>{let{className:a,value:s,setValue:l,placeholder:i="",min:c=0,lock:r=!1,max:o=100,placeholderOn:d=!0}=e;const[m,u]=(0,t.useState)(s),[h,v]=(0,t.useState)(!1),j=(0,t.useRef)(null),x=(0,t.useRef)(null);(0,t.useEffect)((()=>(document.addEventListener("click",p),r&&v(!0),""!==s&&"0"!==s&&v(!0),()=>{document.removeEventListener("click",p)})),[]),(0,t.useEffect)((()=>{u(s),""!==s&&"0"!==s&&v(!0)}),[s]);const p=e=>{var a;!j.current||r||j.current.contains(e.target)||""!==(null===x||void 0===x||null===(a=x.current)||void 0===a?void 0:a.value)||v(!1)},g=e=>{const a=e.target.value;let s=+a;+a<c&&(s=c),+a>o&&(s=o),u(s.toString()),l(+s)};return(0,n.jsxs)("div",{ref:j,className:"MyNumber ".concat(a," ").concat(h?"active":""),children:[(0,n.jsx)("input",{ref:x,type:"number",onBlur:g,onKeyDown:e=>{"Enter"===e.key&&g(e)},onChange:e=>{u(e.target.value),v(!0)},value:m,placeholder:d?"":i}),d&&(0,n.jsx)("div",{className:h?"Input__placeholder active":"Input__placeholder",children:i})]})}},7788:(e,a,s)=>{s.d(a,{Z:()=>l});var t=s(2791),n=s(184);const l=e=>{let{value:a,setValue:s,placeholder:l="",className:i=""}=e;const c=(0,t.useRef)(null),[r,o]=(0,t.useState)(!1);return(0,n.jsx)("textarea",{ref:c,rows:1,onFocus:()=>{o(!0)},onBlur:()=>{o(!1)},className:"MyTextArea ".concat(i," ").concat(r?"active":""),value:a,onChange:e=>{c.current&&(c.current.style.height="auto"),c.current&&(c.current.style.height="".concat(e.target.scrollHeight,"px")),s(e.target.value)},placeholder:l})}},9092:(e,a,s)=>{s.d(a,{Z:()=>l});var t=s(2791),n=s(184);const l=(0,t.memo)((e=>{let{children:a,changeName:s=!0,className:l="",lock:i=!1}=e;const c=(0,t.useRef)(),r=(0,t.useRef)(Math.random().toString(36).substring(2,7)),o=(0,t.useRef)(null),d=(0,t.useRef)(null),m=(0,t.useRef)(null),[u,h]=(0,t.useState)(!1);(0,t.useEffect)((()=>(c.current=u,document.addEventListener("click",v),i&&h(!0),()=>{document.removeEventListener("click",v)})),[]);const v=(0,t.useCallback)((e=>{o.current&&e.target!==o.current&&!o.current.contains(e.target)&&h(!1)}),[]),j=(0,t.useCallback)((()=>{h((e=>!e))}),[]);return(0,n.jsxs)("div",{ref:o,id:r.current,className:"spoiler ".concat(l," ").concat(u&&"active"),children:[(0,n.jsx)("div",{ref:d,onClick:j,className:"spoiler__header active",children:a[0]}),(0,n.jsx)("div",{ref:m,className:"spoiler__cover",children:(0,n.jsx)("div",{onClick:e=>{const a=e.target;var t,n;s&&((null===d||void 0===d||null===(t=d.current)||void 0===t||null===(n=t.firstElementChild)||void 0===n?void 0:n.textContent)&&(d.current.firstElementChild.textContent=a.textContent))},className:"spoiler__body",children:a[1]})})]})}))},5672:(e,a,s)=>{s.d(a,{Z:()=>n});s(2791);var t=s(184);const n=e=>{let{children:a,className:s="",value:n,name:l,setValue:i,id:c}=e;return(0,t.jsxs)("div",{onClick:()=>{i(c)},className:"MyRadio  ".concat(c===n?"active":""),children:[(0,t.jsx)("input",{type:"radio",name:l,id:String(c),value:c}),(0,t.jsx)("label",{className:"".concat(s," ").concat(c===n?"active":""),htmlFor:String(c),children:a})]})}},4189:(e,a,s)=>{s.r(a),s.d(a,{default:()=>A});var t=s(5338),n=s(2791),l=s(7181),i=s(132),c=s(4122);const r=()=>{const{setModal:e,setModalSection:a}=i.adminSlice.actions,s=(0,c.T)();return(0,n.useCallback)((t=>()=>{s(a(t)),s(e(!0))}),[])};var o=s(184);const d=()=>{const e=r();return(0,o.jsx)("div",{className:"Admin__container",children:(0,o.jsxs)("div",{className:"Admin__body",children:[(0,o.jsx)(l.Z,{onClick:e(1),className:"buttonCart",children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0442\u0438\u043f"}),(0,o.jsx)(l.Z,{onClick:e(2),className:"buttonCart",children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0431\u0440\u0435\u043d\u0434"}),(0,o.jsx)(l.Z,{onClick:e(3),className:"buttonCart",children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u043f\u0440\u043e\u0434\u0443\u043a\u0442"})]})})};var m=s(7689),u=s(4690),h=s(1731);const v=()=>{const[e,a]=(0,n.useState)([]),[s,t]=(0,n.useState)(""),[l,i]=(0,n.useState)("radio"),[c,r]=(0,n.useState)(""),o=(0,m.s0)();return{setname:r,infoName:s,createInfo:()=>{a((e=>[...e,{[s]:l}])),t(""),i("")},senInfo:e=>{t(e)},createTypeFun:()=>{0!==e.length&&""!==c?(0,u.Z)({name:c,informations:JSON.stringify(e)}).then((e=>{a([]),r(""),o(h.ef),window.location.reload()})):alert("\u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0434\u0430\u043d\u043d\u044b\u0445")},descriptionName:l,setDescription:e=>{i(e),t("")},name:c,typeInformation:e}};var j=s(8773),x=s(5672);s(8e3);const p=["radio","check","slider"],g=()=>{const{setname:e,infoName:a,createInfo:s,senInfo:t,createTypeFun:n,descriptionName:i,setDescription:c,name:r,typeInformation:d}=v();return(0,o.jsxs)("div",{className:"adminModal",children:[(0,o.jsx)("div",{className:"adminModal__input",children:(0,o.jsx)(j.Z,{value:r,change:e,inputClass:"registration gv",placeholder:"\u0438\u043c\u044f \u0442\u0438\u043f\u0430"})}),(0,o.jsxs)("div",{className:"adminModal__informations",children:[(0,o.jsxs)("div",{className:"adminModal__informationItems",children:[(0,o.jsx)(j.Z,{value:a,change:t,inputClass:"registration gv",placeholder:"\u0438\u043c\u044f \u0445\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043a\u0438"}),p.map((e=>(0,o.jsxs)(x.Z,{id:e,setValue:e=>{c(e)},value:i,name:"items",className:"radioFiltr",children:[(0,o.jsx)("div",{className:"RadioGroup__check"}),(0,o.jsx)("div",{className:"RadioGroup__label",children:e})]},e)))]}),(0,o.jsx)("div",{className:"adminModal__informationSend",children:(0,o.jsx)(l.Z,{onClick:s,className:"buttonCart",children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0445\u0430\u0440\u0430\u043a\u0442\u0435\u0440\u0438\u0441\u0442\u0438\u043a\u0443"})}),(0,o.jsx)("div",{className:"adminModal__informationsS",children:d.map((e=>{const a=Object.entries(e)[0][0],s=String(Object.entries(e)[0][1]);return(0,o.jsxs)("div",{className:"adminModal__information information",children:[(0,o.jsxs)("div",{className:"information__name",children:["\u0418\u043c\u044f: ",a]}),(0,o.jsxs)("div",{className:"information__type",children:["\u0422\u0438\u043f: ",s]})]},a)}))})]}),(0,o.jsx)(l.Z,{onClick:n,className:"buttonCart",children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"})]})};var f=s(1307);const N=()=>{const[e,a]=(0,n.useState)(""),[s,t]=(0,n.useState)(null),[l,i]=(0,n.useState)(null),c=(0,m.s0)();return{setname:a,fileImage:s,fileloadType:e=>{const a=new FileReader;e.target.files&&e.target.files.length>0&&(a.readAsDataURL(e.target.files[0]),i(e.target.files[0]),a.onloadend=()=>{t(a.result)})},createBrandFun:()=>{if(""!==e&&null!==l){const s=new FormData;s.append("name",e),s.append("image",l),(0,f.e)(s).then((s=>{""!==e&&null!=l&&console.log(s),a(""),i(null),t(null),c(h.ef),window.location.reload()}))}else alert("\u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0434\u0430\u043d\u043d\u044b\u0445")},name:e}},_=e=>{let{children:a,setValue:s}=e;const t=(0,n.useRef)(null);return(0,o.jsxs)("div",{className:"MyFile",children:[(0,o.jsx)("input",{className:"MyFile__input",ref:t,type:"file",onChange:s}),(0,o.jsx)("div",{onClick:()=>{t.current&&t.current.click()},children:a})]})},C=()=>{const{setname:e,fileImage:a,fileloadType:s,createBrandFun:t,name:n}=N();return(0,o.jsxs)("div",{className:"adminModalType",children:[(0,o.jsx)("div",{className:"adminModalType__input",children:(0,o.jsx)(j.Z,{value:n,change:e,inputClass:"registration gv",placeholder:"\u0438\u043c\u044f \u0442\u0438\u043f\u0430"})}),(0,o.jsxs)("div",{className:"adminModalType__images",children:[(0,o.jsx)("div",{className:"adminModalType__imageAdd",children:(0,o.jsx)(_,{setValue:s,children:(0,o.jsx)(l.Z,{className:"buttonCart",children:"\u0432\u044b\u0431\u0440\u0430\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"})})}),(0,o.jsx)("div",{className:"adminModalType__imagesItems",children:null!==a&&(0,o.jsx)("div",{className:"adminModalType__image",children:(0,o.jsx)("img",{src:a.toString(),alt:""})})})]}),(0,o.jsx)(l.Z,{onClick:t,className:"buttonCart",children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"})]})};var y=s(754);const b=(0,n.memo)((e=>{let{addFile:a,fileImages:s}=e;return(0,o.jsxs)("div",{className:"adminModalProduct__images",children:[(0,o.jsx)("div",{className:"adminModalProduct__imageAdd",children:(0,o.jsx)(_,{setValue:a,children:(0,o.jsx)(l.Z,{className:"buttonCart",children:"\u0432\u044b\u0431\u0440\u0430\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435 (\u043c\u0438\u043d\u0438\u043c\u0443\u043c 2)"})})}),(0,o.jsx)("div",{className:"adminModalProduct__imagesItems",children:0!==s.length&&s.map((e=>{if(console.log(e),null!==e)return(0,o.jsx)("div",{className:"adminModalProduct__image",children:(0,o.jsx)("img",{src:e.toString(),alt:""})},e.toString())}))})]})}));var k=s(7788);const S=e=>e.reducer.admin;var M=s(8299);const Z=(0,n.memo)((()=>{const{name:e,description:a,price:s}=(0,c.C)(S),{setName:t,setDescription:n,setPrice:l}=i.adminSlice.actions,r=(0,c.T)();return(0,o.jsxs)("div",{className:"adminModalProduct__input",children:[(0,o.jsxs)("div",{className:"adminModalProduct__flex",children:[(0,o.jsx)(j.Z,{value:e,change:e=>r(t(e)),inputClass:"registration gv",placeholder:"\u0438\u043c\u044f"}),(0,o.jsx)(M.Z,{setValue:e=>{parseInt(e)!==Number(e)&&""!==e||r(l(e))},value:s,min:0,max:1e6,placeholder:"\u0446\u0435\u043d\u0430",className:"registration gv"})]}),(0,o.jsx)(k.Z,{value:a,setValue:e=>r(n(e)),className:"registration",placeholder:"\u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435"})]})}));var I=s(9092),F=s(9179);const T=(0,n.memo)((()=>{const[e,a]=(0,n.useState)([]),[s,t]=(0,n.useState)([]),r=(0,c.C)((e=>e.reducer.admin.typeInformationProduct)),{setBrand:d}=i.adminSlice.actions,m=(0,c.T)();(0,n.useEffect)((()=>{(0,u.n)().then((e=>{t(e)})),(0,u.n)().then((e=>{t(e)})),(0,f.d)().then((e=>{a(e)}))}),[]);const h=e=>()=>{m(d(e))},v=(0,n.useCallback)((e=>()=>{var a;m((a=e,async e=>{const s=F.h.getState(),{sliders:t}=s.reducer.admin,{setTypeInformationProduct:n,setType:l,setSliders:c}=i.adminSlice.actions;let r=[];JSON.parse(a.informations).forEach((a=>{switch(Object.values(a)[0]){case"radio":return void(r=[...r,{[Object.keys(a)[0]]:""}]);case"check":return void(r=[...r,{[Object.keys(a)[0]]:""}]);case"slider":e(c([...t,Object.keys(a)[0]])),r=[...r,{[Object.keys(a)[0]]:"1"}]}})),e(n(r)),e(l(a))}))}),[]),x=(e,a)=>{m(((e,a)=>async s=>{const t=F.h.getState(),{sliders:n,typeInformationProduct:l}=t.reducer.admin,{setTypeInformationProduct:c}=i.adminSlice.actions;s(c([...l.map((s=>Object.keys(s)[0]===a?n.includes(Object.keys(s)[0])?parseInt(e)===Number(e)||""===e?{[Object.keys(s)[0]]:e}:s:{[Object.keys(s)[0]]:e}:s))]))})(e,Object.keys(a)[0]))};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)("div",{className:"adminModalProduct__spoilers",children:[(0,o.jsxs)(I.Z,{children:[(0,o.jsx)(l.Z,{className:"buttonCart _spoiler",children:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0442\u0438\u043f"}),s.map((e=>(0,o.jsx)(l.Z,{onClick:v(e),className:"buttonCart _spoiler",children:e.name},e._id)))]}),(0,o.jsxs)(I.Z,{children:[(0,o.jsx)(l.Z,{className:"buttonCart _spoiler",children:"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0431\u0440\u0435\u043d\u0434"}),e.map((e=>(0,o.jsx)(l.Z,{onClick:h(e),className:"buttonCart _spoiler",children:e.name},e._id)))]})]}),(0,o.jsx)("div",{className:"adminModalProduct__typeChoose",children:r.map((e=>(0,o.jsxs)("div",{className:"adminModalProduct__typeChooseItem",children:[(0,o.jsx)("div",{className:"adminModalProduct__text",children:Object.keys(e)[0]}),(0,o.jsx)(j.Z,{value:Object.values(e)[0],change:a=>{x(a,e)},inputClass:"registration gv",placeholder:"\u0438\u043c\u044f \u0442\u0438\u043f\u0430"})]},Object.keys(e)[0])))})]})})),O=()=>{const[e,a]=n.useState([]),[s,t]=n.useState([]);return{addFile:n=>{const l=new FileReader;if(console.log(),n.target.files&&n.target.files.length>0){const i=n.target.files[0];l.readAsDataURL(i),a([...e,i]),l.onloadend=()=>{t([...s,l.result])}}},fileImages:s,files:e,setFiles:a,setfileImages:t}},P=(0,n.memo)((()=>{const e=(0,c.T)(),{addFile:a,fileImages:s,files:t,setFiles:n,setfileImages:i}=O();return(0,o.jsxs)("div",{className:"adminModalProduct",children:[(0,o.jsx)(Z,{}),(0,o.jsx)(T,{}),(0,o.jsx)(b,{addFile:a,fileImages:s}),(0,o.jsx)(l.Z,{onClick:async()=>{await e((0,y.gK)(t)),n([]),i([])},className:"buttonCart",children:"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"})]})}));var R=s(8657);const w=()=>{const{modal:e,modalSection:a}=(0,c.C)((e=>e.reducer.admin)),{setModal:s}=i.adminSlice.actions,t=(0,c.T)();return(0,o.jsx)(R.u,{active:e,modalClass:"admin",setActive:e=>t(s(e)),children:1===a?(0,o.jsx)(g,{}):2===a?(0,o.jsx)(C,{}):(0,o.jsx)(P,{})})},E=()=>(0,o.jsxs)("div",{className:"Admin",children:[(0,o.jsx)(d,{}),(0,o.jsx)(w,{})]}),A=()=>(0,o.jsx)(t.Z,{children:(0,o.jsx)(E,{})})},8e3:()=>{}}]);
//# sourceMappingURL=189.9baba566.chunk.js.map