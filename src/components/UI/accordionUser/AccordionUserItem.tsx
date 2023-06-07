import React, { useCallback, useEffect, useRef, useState,FC,ReactNode } from 'react'
interface FooterItemProps{  
  active?:boolean,
  activeItem?:boolean,
  visible?:boolean,
  children?:any,
  name?:string,
  accordion?:any,
  accordRef?:any,
}

const AccordionUserItem:FC<FooterItemProps> = ({active,visible,name,accordion,children,activeItem,accordRef}) => {
  const itemRef = useRef<any>()
  const childRef = useRef<any>()
  const acc = useRef(activeItem)
  const itemWidthRef = useRef()
 const [counter, setcounter] = useState<any>(null)
 const [counter2, setcounter2] = useState<any>(null)

  useEffect(() => {
    itemRef.current.style.height = '0px'
    itemWidthRef.current = itemRef.current.offsetWidth
    window.addEventListener('resize',gg)
    return () => {
      window.removeEventListener('resize',gg)
    }

  }, [])

  const gg = ()=>{
if (itemRef.current.offsetHeight > 0) {
  itemRef.current.style.height= 'auto'
  setcounter(setTimeout(() => {
    itemRef.current.style.height = `${itemRef.current.scrollHeight}px`
  }, 1))

  if (counter) {
    clearTimeout(counter)
  }
}
    
      
    

  }
  
  useEffect(() => {
    console.log(visible);
    console.log('yyyy');
    
    acc.current = activeItem
    if (activeItem || active) {
    itemRef.current.style.height =`${itemRef.current.scrollHeight}px`
     itemRef.current.style.boxSizing = 'content-box'
    }else{
      itemRef.current.style.height = 0
      
     
    
    }
  
     
   }, [visible,active])

 const buttonClick = ()=>{
  accordion()
  console.log('yyyy2');
 }
  return (
    <div className='AccordionUser__bodyCover'>
       <div onClick={e=>buttonClick()} className={activeItem ? "AccordionUser__button  active _icon-arrow-next active" : "AccordionUser__button _icon-arrow-next"}>{children[0]}</div>
       <div ref={itemRef} className="AccordionUser__body">
       {children.slice(1).map((e:any)=>  <div ref={childRef} className={activeItem ?"AccordionUser__item active":"AccordionUser__item"}>{e}</div>)}

       </div>
    </div>
  )
}

export default AccordionUserItem