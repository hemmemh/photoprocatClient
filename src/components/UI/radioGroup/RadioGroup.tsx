import React, { useCallback, useEffect, useRef, useState,FC,ReactNode } from 'react'
import './radioGroup.scss';
interface FooterProps{  
    items:string,
    value:string,
    change:(e:any)=>void,
    name:string,
    checked?:number,
    nameVisible:boolean
    RadioGroupClass?:string,

  }
const RadioGroup: FC<FooterProps> = ({name,items,value,change,checked=0, RadioGroupClass='origin',nameVisible=true}) => {
   
    //const [radioItem, setradioItem] = useState(value.split(',')[checked])
 
   
    const setItem = (e:any)=>{
    
        change(e)

    }
  return (
    <div className={`RadioGroup ${RadioGroupClass}`}>
        {nameVisible &&  <div className='RadioGroup__name'>{name}</div> }
  
        <div className="RadioGroup__body">
        {items?.split(',').map((e,i)=>{
            return(
            <div onClick={()=>setItem(e)}  key={e} className={value == e ? `RadioGroup__item active` : `RadioGroup__item `}> 
                <div className={`RadioGroup__check`}></div>
                <div className={`RadioGroup__label`}>{e}</div>
            </div>
        )
            
        })} 
        </div>
        
      
    </div>
    
  )
}

export default RadioGroup