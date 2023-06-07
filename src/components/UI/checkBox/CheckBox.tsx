import React, { useCallback, useEffect, useRef, useState,FC,ReactNode } from 'react'
import './checkBox.scss';
interface FooterProps{  
    items:string,
    name:string,
    checked?:any,
    value:string[]
    change:(e:any)=>void,
    CheckBoxClass?:string,
    nameVisible?:boolean
  }
const CheckBox: FC<FooterProps> = ({name,items,value,change,checked=[0], CheckBoxClass='origin',nameVisible=true}) => {
   
    //const [checkBoxItem, setcheckBoxItem] = useState<any>(checked)
  
   
    const setItem = (i:string)=>{
      console.log(value);
      
      if (value.includes(i)) {
        change([...value.filter((e:any)=>e!==i)])
        change([...value.filter((e:any)=>e!==i)])
      }else{
        change([...value, i])
        change([...value, i])
      }
         
     
   
       
    }
  return (
    <div className={`CheckBox ${CheckBoxClass}`}>
      {nameVisible &&  <div className='CheckBox__name'>{name}</div>}

        <div className="CheckBox__body">
        {items?.split(',').map((e,i:any)=>{
            return(
            <div onClick={()=>setItem(e)}  key={e} className={value?.includes(e)  ? `CheckBox__item active` : `CheckBox__item `}> 
                <div className={`CheckBox__check`}></div>
                <div className={`CheckBox__label`}>{e}</div>
            </div>
        )
            
        })} 
        </div>
        
       
    </div>
    
  )
}

export default CheckBox