
import React, { useCallback, useEffect, useRef,FC } from 'react'
import  '../../../styles/style.scss'
interface FooterProps{  
  active?:any,
  setActive?:any,
  children?:any,
  modalCover?:any,
  modalClass?:string

}
export const Modal:FC<FooterProps>  = ({active,setActive,children,modalCover,modalClass='origin'}) => {

  const modalRef = useRef<any>()
  const modalCoverRef = useRef<any>(false)
useEffect(() => {
  modalCoverRef.current = modalCover
}, [modalCover])


  const addClick = useCallback(
    (e:any) => {
        if (e.target ===  modalRef.current && !modalCoverRef.current) {
            setActive(false)
        }
    },
    [],
  )
  const keyDown = useCallback(
    () => {
      document.onkeydown = function(e) {
        console.log(e);
        if (e.key === "Escape") {
            console.log('');
            setActive(false)
        }
    }
    },
    [],
  )
  
 



  return (
    <div ref={modalRef} onClick={addClick} className={active ?`modal ${modalClass} active`:`modal ${modalClass}`} >
        <div className={active ?"modal__body active":"modal__body"} >
            {children}
        </div>
    </div>
  ) 
}
