import React, { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { navbarSlice } from '../../../../store2/reducers/NavBarSlice'


export const MenuIcon = () => {
    const {menu,menuIconRef} = useAppSelector((state)=>state.reducer.navbar)
    const dispatch = useAppDispatch()
    const menuIcon = useRef(null)
    const {setMenu,setMenuIconRef} = navbarSlice.actions

    
  return (
    <div ref={menuIcon} onClick={()=>dispatch(setMenu(!menu))} className="Navbar__menu menu">
    <button  type="button" className={menu ?"menu__icon icon-menu active" :"menu__icon icon-menu"}><span></span></button>
</div>
  )
}

