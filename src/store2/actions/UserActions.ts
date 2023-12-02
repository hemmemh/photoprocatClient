import { addItemToBasket, removeAll } from '../../https/basketApi'
import { changeUser, logout } from '../../https/userApi'
import { HOME_ROUTE } from '../../app/config/routs'
import { catalogSlice } from '../reducers/CatalogSlice'
import { navbarSlice } from '../reducers/NavBarSlice'
import { type AppDispatch, store } from '../store'
import { userSlice } from '../reducers/UserSlice'

export const repeat = (products: any) => async (dispatch: AppDispatch) => {
    const currentState = store.getState()
    const { user } = currentState.reducer.catalog

    const { setProducts } = navbarSlice.actions
    const { setLoaduser } = userSlice.actions

    try {
        dispatch(setLoaduser(true))
        await removeAll({ id: user.basket })

        dispatch(setProducts(0))

        dispatch(setProducts(products.length))
        for (const it of products) {
            await addItemToBasket({ basketId: user.basket, product: it.product._id, count: it.amount })
        }
        dispatch(setLoaduser(false))
    } catch (error) {
        console.log(error)
    }
}

export const onSave = () => async (dispatch: AppDispatch) => {
    const currentState = store.getState()
    const { user } = currentState.reducer.catalog
    const { toggle, data, name, serName, tell } = currentState.reducer.user
    const { setLoadData } = userSlice.actions
    try {
        dispatch(setLoadData(true))
        switch (toggle) {
            case 0:await changeUser({ id: user.id, name, serName, birthDate: data, tell })
                return
            case 1: window.location.replace(HOME_ROUTE)
        }
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setLoadData(false))
    }
}

export const onLogout = () => async (dispatch: AppDispatch) => {
    const { setUser } = catalogSlice.actions
    const { setCompare, setProducts } = navbarSlice.actions
    try {
        await logout()
        dispatch(setUser({}))
        window.location.replace(HOME_ROUTE)
        dispatch(setCompare(0))
        dispatch(setProducts(0))
        localStorage.removeItem('Auth')
    } catch (error) {
        console.log(error)
    }
}
