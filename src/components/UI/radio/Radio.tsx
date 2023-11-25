import React,{FC} from 'react'
import './Radio.scss'
type Radio  = {
    children:React.ReactNode,
    className?:string,
    value:string | number
    name?:string
    setValue:(a:any)=>void
    id:string | number
}

const Radio:FC<Radio> = ({children,className='',value,name,setValue,id}) => {

const click = ()=>{
  setValue(id)
}

  return (
    <div onClick={click} className={`MyRadio  ${id === value ? 'active' : ''}`}>
    <input   type="radio" name={name} id={String(id)}  value={id} />
    <label className={`${className} ${id === value ? 'active' : ''}`} htmlFor={String(id)}>
            {children}
    </label>
</div>
  )
  
}

export default Radio