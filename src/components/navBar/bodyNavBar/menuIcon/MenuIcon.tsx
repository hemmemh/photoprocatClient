import React, { useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { navbarSlice } from '../../../../store2/reducers/NavBarSlice'

export const MenuIcon = () => {
    const { menu } = useAppSelector((state) => state.reducer.navbar)
    const dispatch = useAppDispatch()
    const menuIcon = useRef<HTMLDivElement>(null)
    const { setMenu } = navbarSlice.actions

    const dispatchMenu = () => {
        dispatch(setMenu(!menu))
    }

    return (
        <div ref={menuIcon} onClick={dispatchMenu} className="Navbar__menu menu">
            <button type="button" className={menu ? 'menu__icon icon-menu active' : 'menu__icon icon-menu'}><span></span></button>
        </div>
    )
}
