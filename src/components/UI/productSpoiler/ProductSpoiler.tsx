import React, { useCallback, useEffect, useRef, useState,FC,ReactNode, memo } from 'react'
import './productSpoiler.scss';
interface FooterProps{  
  name?:string,
  children?:ReactNode[] | any
  changeName?:boolean
  lock?:boolean
  spoilerClass?:string
  toggle2?:any
}

const ProductSpoiler: FC<FooterProps> = memo(({name,children,changeName=true,spoilerClass='origin',lock=false,toggle2}) => {
    const activeRef = useRef<boolean>()
    const stringRef = useRef(Math.random().toString(36).substring(2,7))
    const elementRef = useRef<any>()
 
    const spoilerRef = useRef<any>()
    const beforeRef = useRef<any>()
    const bodyRef = useRef<any>()
    const [active, setactive] = useState(false)
    const [activeName, setactiveName] = useState(name)
    activeRef.current = active
  
    
    useEffect(() => {
      document.addEventListener('click',addClick)
     
      if (lock) {
        setactive(true)
      }
      return () => document.removeEventListener('click', addClick);
      
  }, [])
    
    const addClick = useCallback((e:any) => {
          elementRef.current = e.target
          const el = document.getElementById(stringRef.current)
          console.log(el,e.target,'6666');
          
          console.log(e.target.closest(`.ProductSpoiler`) ,'yyyyyy');
          
            if (activeRef.current && !el?.contains(e.target) && !lock) {
                setactive(false)
               
            }
        },[])
       
      
     
    const setName=(name:any)=>{
      if (changeName) {
        setactiveName(name)
      }
    }
     

    const setActiveSpoiler=(bool:any)=>{
      if (!lock) {
        setactive(bool)
      }
    }
    
    
  
   
  return (
    <div ref={spoilerRef} id={stringRef.current}  className={`ProductSpoiler ${spoilerClass}`}>
        <div onClick={()=>setActiveSpoiler(!active)} className={active ? "ProductSpoiler__name active" :"ProductSpoiler__name" }>{children[0]}</div>
        <div  ref={bodyRef} className={active ? "ProductSpoiler__body active" : "ProductSpoiler__body"}>
            {children?.slice(1).map((item:any,i:any)=>
            <div key={i} onClick={()=>setName(item)} className="ProductSpoiler__item">{item}</div>
                )}
        </div>
       
        
    </div>
  ) 
})   

export default ProductSpoiler