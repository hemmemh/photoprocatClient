import React, { FC } from 'react'

interface button{
   children?:any
   className?:String
}
const Button2:FC<button> = ({children,className=''}) => {
  return (
    <button className={`Button2 ${className}`}>{children}</button>
  )
}

export default Button2