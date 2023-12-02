import { addOrder, changeAmount, getBasket, removeAll, removeItemFromBasket } from '../../https/basketApi'
import { change } from '../../https/productApi'

import { USER_ROUTE } from '../../app/config/routs'
import { basketSlice } from '../reducers/BasketSlice'

import { navbarSlice } from '../reducers/NavBarSlice'

import { type AppDispatch, store } from '../store'

export const putBasket = () => async (dispatch: AppDispatch) => {
    const currentState = store.getState()
    const { user } = currentState.reducer.catalog
    const { setProducts, setBasket, setLoad } = basketSlice.actions
    try {
        dispatch(setLoad(true))
        const data = await getBasket({ id: user.id })
        dispatch(setBasket(data))
        let arr: any = []

        for (const it of data.basketItems) {
            arr = [...arr, { [it.product._id]: it.count }]
        }

        dispatch(setProducts(arr))
    } catch (error) {
        console.log(error)
    } finally {
        dispatch(setLoad(false))
    }
}

export const buy = () => async (dispatch: AppDispatch) => {
    const currentState = store.getState()
    const { user } = currentState.reducer.catalog
    const { sumPrice, products } = currentState.reducer.basket
    const { setProducts } = navbarSlice.actions
    const { setLoad } = basketSlice.actions

    try {
        dispatch(setLoad(true))

        dispatch(setProducts(0))

        const basket = await getBasket({ id: user.id })
        let arr: any = []
        for (const it of basket.basketItems) {
            arr = [...arr, { [it.product._id]: it.count }]
        }

        await addOrder({ ordersId: user.orders, price: sumPrice, products: JSON.stringify(arr) })

        for (const it of products) {
            await change({ id: Object.keys(it)[0], purchase: 1 })
        }

        await removeAll({ id: user.basket })
        window.location.replace(USER_ROUTE)
        // window.location.reload();
    } catch (error) {
        console.log(error)
    }
}

export const changeAm = (e: any, el: any, amount: any) => async (dispatch: AppDispatch) => {
    const currentState = store.getState()
    const { sumPrice } = currentState.reducer.basket
    const { setSumPrice } = basketSlice.actions
    try {
        dispatch(setSumPrice(sumPrice - (amount * e.product.price) + (el * e.product.price)))
        await changeAmount({ id: e._id, count: el })
    } catch (error) {
        console.log(error)
    }
}

export const remove = (e: any, amount: any, basketId: any) => async (dispatch: AppDispatch) => {
    const currentState = store.getState()
    const { sumPrice } = currentState.reducer.basket
    const navbar = currentState.reducer.navbar
    const { basket } = currentState.reducer.basket
    const { setSumPrice, setBasket } = basketSlice.actions

    const navbarSl = navbarSlice.actions

    try {
        dispatch(setBasket({ ...basket, basketItems: basket.basketItems.filter((fil: any) => fil._id !== e._id) }))
        dispatch(setSumPrice(sumPrice - (e.product.price * amount)))
        dispatch(navbarSl.setProducts(navbar.products - 1))
        await removeItemFromBasket({ id: e.product._id, basketId })
    } catch (error) {
        console.log(error)
    }
}
