"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[357],{7181:function(e,n,t){t.d(n,{Z:function(){return r}});var a=t(2791),i=t(184),s=function(e){var n=e.onClick,t=void 0===n?function(){}:n,s=e.children,r=e.className,c=void 0===r?"":r,o=e.rippleClass,l=void 0===o?"origin":o,u=e.ripple,d=void 0===u||u,m=(0,a.useRef)();return(0,i.jsx)("button",{ref:m,onClick:t,onMouseDown:function(e){return function(e){if(d){e.stopPropagation();var n=document.createElement("span");e.target.addEventListener("mouseup",(function(){n.style.opacity="0",n.addEventListener("transitionend",(function(){n.remove()}))})),e.target.addEventListener("mouseout",(function(){n.style.opacity="0",n.addEventListener("transitionend",(function(){n.remove()}))})),e.target.appendChild(n);var t=Math.max(e.target.clientWidth,e.target.clientHeight),a=t/2;n.style.width=n.style.height="".concat(t,"px"),n.style.left="".concat(e.clientX-a-m.current.getBoundingClientRect().left,"px"),n.style.top="".concat(e.clientY-a-m.current.getBoundingClientRect().top,"px"),n.classList.add("ripple"),n.classList.add(l)}}(e)},className:"Button2 ".concat(c),children:(0,i.jsx)("span",{className:"content",children:s})})},r=(0,a.memo)(s)},7788:function(e,n,t){t.d(n,{Z:function(){return r}});var a=t(9439),i=t(2791),s=t(184),r=function(e){var n=e.value,t=e.setValue,r=e.placeholder,c=void 0===r?"":r,o=e.className,l=void 0===o?"":o,u=(0,i.useRef)(null),d=(0,i.useState)(!1),m=(0,a.Z)(d,2),f=m[0],v=m[1];return(0,s.jsx)("textarea",{ref:u,rows:1,onFocus:function(){v(!0)},onBlur:function(){v(!1)},className:"MyTextArea ".concat(l," ").concat(f?"active":""),value:n,onChange:function(e){u.current&&(u.current.style.height="auto"),u.current&&(u.current.style.height="".concat(e.target.scrollHeight,"px")),t(e.target.value)},placeholder:c})}},847:function(e,n,t){t.d(n,{Z:function(){return i}});t(2791);var a=t(184),i=function(e){var n=e.children,t=e.navigationClass,i=void 0===t?"origin":t;return(0,a.jsx)("div",{className:"Navigation ".concat(i),children:n})}},3357:function(e,n,t){t.r(n),t.d(n,{default:function(){return T}});var a=t(5338),i=t(2791),s=t(9439),r=t(4165),c=t(5861),o=t(7475),l=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(n){var t,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.y.post("news",n);case 2:return t=e.sent,a=t.data,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),u=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(){var n,t;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.y.post("news/getAll");case 2:return n=e.sent,t=n.data,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),d=function(){var e=(0,c.Z)((0,r.Z)().mark((function e(n){var t,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o.y.post("news/addComment",n);case 2:return t=e.sent,a=t.data,e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),m=t(7204),f=t(8079),v=t(184),h=function(e){var n=e.breakpoint,t=void 0===n?8e3:n,a=e.children,r=(e.oneOpen,e.setVisibleAccordion,e.accordionClass),c=void 0===r?"origin":r,o=(0,i.useState)(!1),l=(0,s.Z)(o,2),u=l[0],d=l[1],m=(0,i.useState)(null),f=(0,s.Z)(m,2),h=(f[0],f[1],(0,i.useRef)()),x=((0,i.useRef)(),(0,i.useRef)(),(0,i.useRef)([]),(0,i.useRef)()),g=(0,i.useCallback)((function(){var e=window.innerWidth;d(!(e<=t))}),[]);(0,i.useEffect)((function(){var e=window.innerWidth;return d(!(e<=t)),window.addEventListener("resize",g),function(){window.removeEventListener("resize",g)}}),[]);var _=(0,i.useState)(null),p=(0,s.Z)(_,2),N=(p[0],p[1],(0,i.useState)(null)),w=(0,s.Z)(N,2);w[0],w[1];(0,i.useEffect)((function(){return h.current.style.height="0px",window.addEventListener("resize",j),function(){window.removeEventListener("resize",j)}}),[]);var j=function(){};(0,i.useEffect)((function(){u?(h.current.style.height="".concat(h.current.scrollHeight,"px"),setTimeout((function(){h.current.style.height="auto"}),300)):(console.log("777777",u),h.current.style.height="".concat(h.current.scrollHeight,"px"),setTimeout((function(){h.current.style.height="0px"}),5))}),[u]);return(0,v.jsx)("div",{ref:x,className:"AccordionOne ".concat(c),children:(0,v.jsxs)("div",{className:"AccordionOne__bodyCover",onTransitionEnd:function(){},children:[(0,v.jsx)("div",{onClick:function(){return d((function(e){return!e}))},className:u?"AccordionOne__button  active _icon-arrow-next active":"AccordionOne__button _icon-arrow-next",children:a[0]}),(0,v.jsx)("div",{onClick:function(){},ref:h,className:"AccordionOne__body",children:(0,v.jsx)("div",{className:"AccordionOne__bodytwo",children:a[1]})})]})})},x=t(3286),g=t(4122),_=t(9846),p=t(1528),N=t(7181),w=function(){var e=(0,i.useState)(!1),n=(0,s.Z)(e,2),t=n[0],a=n[1],r=(0,i.useState)([]),c=(0,s.Z)(r,2),o=c[0],l=c[1],d=m.X.actions,w=d.setNewsId,j=d.setModalCooment,C=(0,g.T)();(0,i.useEffect)((function(){u().then((function(e){l(e),a(!0)}))}),[]);return(0,v.jsx)("div",{className:"News__main main-news",children:t?o.map((function(e){var n=(0,_.Z)(+e.date,"d MMMM yyyy",{locale:p.Z});return(0,v.jsxs)("div",{className:"main-news__new new-main",children:[(0,v.jsx)("div",{className:"new-main__image",children:(0,v.jsx)("img",{src:"".concat(f.T5,"/news/").concat(e.image),alt:""})}),(0,v.jsx)("div",{className:"new-main__date",children:n}),(0,v.jsx)("div",{className:"new-main__name",children:e.title}),(0,v.jsx)("div",{className:"new-main__text",children:e.text}),(0,v.jsx)("div",{className:"new-main__button",children:(0,v.jsx)(N.Z,{onClick:function(){return n=e._id,C(j(!0)),void C(w(n));var n},className:"buttonCart",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439 "})}),(0,v.jsx)("div",{className:"new-main__cooments comments-main",children:(0,v.jsxs)(h,{accordionClass:"news",children:[(0,v.jsxs)("div",{className:"comments-main__value",children:[e.comments.length," \u043a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0435\u0432"]}),(0,v.jsx)("div",{className:"comments-main__body",children:e.comments.map((function(e){return(0,v.jsxs)("div",{className:"comments-main__item",children:[(0,v.jsxs)("div",{className:"comments-main__name",children:[e.name," ",e.sername]}),(0,v.jsx)("div",{className:"comments-main__text",children:e.text})]},e.text)}))})]})})]},e.title)})):(0,v.jsx)(x.Z,{})})},j=function(){return(0,v.jsx)("div",{className:"News__body",children:(0,v.jsx)(w,{})})},C=t(8657),Z=t(8773),y=t(7689),R=t(1731),M=function(){var e=(0,i.useState)(null),n=(0,s.Z)(e,2),t=n[0],a=n[1],r=(0,i.useState)(""),c=(0,s.Z)(r,2),o=c[0],u=c[1],d=(0,i.useState)(!1),m=(0,s.Z)(d,2),f=m[0],v=m[1],h=(0,i.useState)(null),x=(0,s.Z)(h,2),g=x[0],_=x[1],p=(0,i.useState)(""),N=(0,s.Z)(p,2),w=N[0],j=N[1],C=(0,i.useState)(""),Z=(0,s.Z)(C,2),M=Z[0],b=Z[1],k=(0,y.s0)();return{fileload:function(e){var n=new FileReader;n.readAsDataURL(e.target.files[0]),_(e.target.files[0]),n.onloadend=function(){a(n.result),u(e.target.files[0].name),v(!0)}},clearFile:function(){console.log("6666"),v(!1),a(null),u(null),_(null)},sendNews:function(){if(""!==M&&""!==w&&null!==g){var e=new FormData;e.append("title",M),e.append("text",w),e.append("image",g),l(e).then((function(e){b(""),j(""),_(null),a(null),v(!1),k(R.ef),window.location.reload()}))}else alert("\u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0434\u0430\u043d\u043d\u044b\u0445")},fileImage:t,fileName:o,fileDiv:f,text:w,title:M,settext:j,settitle:b}},b=t(7788),k=function(){var e=(0,g.C)((function(e){return e.reducer.news})).modalNews,n=m.X.actions.setModalNews,t=(0,g.T)(),a=(0,i.useRef)(null),s=M(),r=s.title,c=s.text,o=s.fileload,l=s.fileName,u=s.fileDiv,d=s.fileImage,f=s.clearFile,h=s.sendNews,x=s.settext,_=s.settitle;return(0,v.jsx)(C.u,{active:e,setActive:function(e){return t(n(e))},modalClass:"raiting",children:(0,v.jsxs)("div",{className:"RaitingModal",children:[(0,v.jsx)("div",{className:"RaitingModal__top",children:(0,v.jsx)(Z.Z,{value:r,change:_,inputClass:"registration gv",placeholder:"\u0417\u0430\u0433\u043e\u043b\u043e\u0432\u043e\u043a   *"})}),(0,v.jsx)("div",{className:"RaitingModal__text",children:(0,v.jsx)(b.Z,{value:c,setValue:function(e){return x(e)},placeholder:"\u0442\u0435\u043a\u0441\u0442",className:"RaitingModal__textarea"})}),(0,v.jsxs)("div",{className:"RaitingModal__images",children:[(0,v.jsxs)("div",{className:"RaitingModal__label",children:[(0,v.jsx)("input",{ref:a,onChange:o,type:"file",className:"RaitingModal__file"}),(0,v.jsx)("div",{className:"RaitingModal__l",children:(0,v.jsxs)(N.Z,{onClick:function(){var e;null===(e=a.current)||void 0===e||e.click()},className:"buttonCart",children:[l?"".concat(l):"\u0412\u044b\u0431\u0440\u0430\u0442\u044c \u0438\u0437\u043e\u0431\u0440\u0430\u0436\u0435\u043d\u0438\u0435"," "]})})]}),(0,v.jsx)("div",{className:u?"RaitingModal__imageCover active ":"RaitingModal__imageCover ",children:(0,v.jsxs)("div",{className:"RaitingModal__image",children:[(0,v.jsx)("span",{onClick:f,className:"icon-clear _icon-delete"}),(0,v.jsx)("img",{src:d,alt:""})]})})]}),(0,v.jsx)("div",{className:"RaitingModal__button",children:(0,v.jsx)(N.Z,{onClick:h,className:"buttonCart",children:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"})})]})})},S=function(){var e=(0,g.C)((function(e){return e.reducer.catalog})).user,n=(0,g.C)((function(e){return e.reducer.news})).newsId,t=(0,i.useState)(e.name),a=(0,s.Z)(t,2),r=a[0],c=a[1],o=(0,i.useState)(e.sername),l=(0,s.Z)(o,2),u=l[0],m=l[1],f=(0,i.useState)(""),v=(0,s.Z)(f,2),h=v[0],x=v[1],_=(0,y.s0)();return{setname:c,setsername:m,settextComment:x,addCommentToNews:function(){""!==r&&""!==u&&""!==h?d({name:r,sername:u,text:h,news:n}).then((function(e){_(R.ef),window.location.reload()})):alert("\u043d\u0435\u0434\u043e\u0441\u0442\u0430\u0442\u043e\u0447\u043d\u043e \u0434\u0430\u043d\u043d\u044b\u0445")},sername:u,textComment:h,name:r}},E=function(){var e=(0,g.C)((function(e){return e.reducer.news})).modalCooment,n=m.X.actions.setModalCooment,t=(0,g.T)(),a=S(),i=a.addCommentToNews,s=a.setname,r=a.setsername,c=a.settextComment,o=a.sername,l=a.textComment,u=a.name;return(0,v.jsx)(C.u,{active:e,setActive:function(e){return t(n(e))},modalClass:"raiting",children:(0,v.jsxs)("div",{className:"RaitingModal",children:[(0,v.jsxs)("div",{className:"RaitingModal__top",children:[(0,v.jsx)(Z.Z,{value:u,change:s,inputClass:"registration gv",placeholder:"\u0418\u043c\u044f  *"}),(0,v.jsx)(Z.Z,{value:o,change:r,inputClass:"registration gv",placeholder:"\u0424\u0430\u043c\u0438\u043b\u0438\u044f  *"})]}),(0,v.jsx)("div",{className:"RaitingModal__text",children:(0,v.jsx)("textarea",{value:l,onChange:function(e){return c(e.target.value)},placeholder:"\u043e\u0442\u0437\u044b\u0432",className:"RaitingModal__textarea",children:l})}),(0,v.jsx)("div",{className:"RaitingModal__button",children:(0,v.jsx)(N.Z,{onClick:i,className:"buttonCart",children:"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c"})})]})})},A=t(847),L=function(){var e=m.X.actions.setModalNews,n=(0,g.T)();return(0,v.jsxs)("div",{className:"News",children:[(0,v.jsxs)("div",{className:"News__container",children:[(0,v.jsx)(A.Z,{navigationClass:"news",children:"\u0413\u043b\u0430\u0432\u043d\u0430\u044f / \u041d\u043e\u0432\u043e\u0441\u0442\u0438 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438"}),(0,v.jsxs)("div",{className:"News__title",children:[(0,v.jsx)("span",{children:"\u041d\u043e\u0432\u043e\u0441\u0442\u0438"})," \u041a\u043e\u043c\u043f\u0430\u043d\u0438\u0438"]}),(0,v.jsx)("div",{className:"News__button",children:(0,v.jsx)(N.Z,{onClick:function(){return n(e(!0))},className:"buttonCart",children:"\u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043d\u043e\u0432\u043e\u0441\u0442\u044c"})}),(0,v.jsx)(j,{})]}),(0,v.jsx)(k,{}),(0,v.jsx)(E,{})]})},T=function(){return(0,v.jsx)(a.Z,{children:(0,v.jsx)(L,{})})}}}]);
//# sourceMappingURL=357.e896077b.chunk.js.map