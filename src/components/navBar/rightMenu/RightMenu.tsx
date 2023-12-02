import { memo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import { useLocation, useNavigate } from 'react-router-dom'
import { navbarSlice } from '../../../store2/reducers/NavBarSlice'
import { CATALOG_ROUTE, USER_ROUTE } from '../../../app/config/routs'

export const RightMenu = () => {
    const navigate = useNavigate()
    const { search } = useAppSelector((state) => state.reducer.navbar)
    const { user } = useAppSelector((state) => state.reducer.catalog)
    const { setSearch, setLoginModal } = navbarSlice.actions
    const dispatch = useAppDispatch()
    const location = useLocation()

    const locateToCatalog = () => {
        location.pathname === `${CATALOG_ROUTE}` && dispatch(setSearch(!search))
    }

    const locateToUser = () => {
        !user.id ? dispatch(setLoginModal(true)) : navigate(USER_ROUTE)
    }
    return (
        <div className="menu__right rightMenu">
            <div onClick={locateToCatalog} className="rightMenu__action _icon-search"></div>
            <div onClick={locateToUser} className={user.id ? 'rightMenu__action active _icon-cabinet' : 'rightMenu__action _icon-cabinet'}></div>
        </div>
    )
}

export default memo(RightMenu)
