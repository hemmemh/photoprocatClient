import React, { useCallback, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { catalogSlice } from '../../../../store2/reducers/CatalogSlice'
import { navbarSlice } from '../../../../store2/reducers/NavBarSlice'
import useMenu from '../../../../hooks/useMenu'
import { getAllTypes } from '../../../../https/typesApi'
import { ADMIN_ROUTE, CATALOG_ROUTE, NEWS_ROUTE } from '../../../../app/config/routs'
import { IType } from '../../../../utils/interfaces'


export const MenuCatalog = () => {
    const {menu} = useAppSelector((state)=>state.reducer.navbar)
    const {types,type} = useAppSelector((state)=>state.reducer.catalog)
    const dispatch = useAppDispatch()
    const {setMenu} = navbarSlice.actions
    const {setTypes} = catalogSlice.actions
    const navigate = useNavigate()
    const spoilerRef = useRef<HTMLDivElement>(null)
    const menuIcon = useRef<Element | null>(null)
    useMenu({spoilerRef,menuIcon})


      useEffect(() => {
        getAllTypes().then(data=>{
            dispatch(setTypes(data))
        })
        menuIcon.current = document.querySelector('.Navbar__menu')
    }, [])


    const onNavigate =(el:any) =>{
       window.scrollTo(0,0)
        navigate({pathname:CATALOG_ROUTE,search:`?type=${el._id}`})
        dispatch(setMenu(false))
      }




  return (
    <div ref={spoilerRef} className={menu ? "Navbar__catalog catalogNavbar active" : "Navbar__catalog catalogNavbar"}>
    <div className="catalogNavbar__left">
      <div className="catalogNavbar__name"><span>•</span>Каталог</div>
       <div className="catalogNavbar__items">
           {types.map((el:IType)=><div key={el.name} onClick={() => onNavigate(el)} className={el.name === type ? 'catalogNavbar__item active' : 'catalogNavbar__item'}>{el.name}</div>)}
       </div>
        </div>
       
       <div className="catalogNavbar__right">
           <div onClick={()=>navigate('*')} className="catalogNavbar__item_two">О компании</div>
           <div onClick={()=>navigate('*')} className="catalogNavbar__item_two">Правила</div>
           <div onClick={()=>navigate(NEWS_ROUTE)}   className="catalogNavbar__item_two">Новости</div>
           <div onClick={()=>navigate('*')} className="catalogNavbar__item_two">Контакты</div>
           <div onClick={()=>navigate(ADMIN_ROUTE)} className="catalogNavbar__item_two">Админ</div>
       </div>
       
    </div>
  )
}

