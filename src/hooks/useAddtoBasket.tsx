import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { navbarSlice } from '../store2/reducers/NavBarSlice'
import { addItemToBasket, removeItemFromBasket } from '../https/basketApi'

interface itemProduct {

    inBasket: boolean
    productId: any
}

const useAddtoBasket = ({ inBasket, productId }: itemProduct) => {
    const [inBasketSnippet, setinBasketSnippet] = useState<boolean>(inBasket)
    const [loader, setloader] = useState<boolean>(true)
    const { user } = useAppSelector(state => state.reducer.catalog)
    const { products } = useAppSelector(state => state.reducer.navbar)
    const navbar = navbarSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        setinBasketSnippet(inBasket)
    }, [inBasket])

    const addToBasket = () => {
        const item = document.querySelector('.actionsMenu__span._product')
        const element = document.querySelector('.Navbar__loader')
        if (!user.id) {
            if (!element?.classList.contains('active')) {
                element?.classList.add('active')
                setTimeout(() => {
                    element?.classList.remove('active')
                }, 1000)
            }
            return
        }
        if (loader) {
            if (!inBasketSnippet) {
                setloader(false)
                dispatch(navbar.setProducts(products + 1))
                addItemToBasket({ basketId: user.basket, product: productId, count: 1 }).then(data => {
                    item?.classList.add('active')
                    setTimeout(() => {
                        item?.classList.remove('active')
                    }, 300)
                    setinBasketSnippet(true)
                }).finally(() => {
                    setloader(true)
                })
            } else {
                setloader(false)
                dispatch(navbar.setProducts(products - 1))
                removeItemFromBasket({ id: productId, basketId: user.basket }).then(data => {
                    item?.classList.add('active')
                    setTimeout(() => {
                        item?.classList.remove('active')
                    }, 300)

                    setinBasketSnippet(false)
                }).finally(() => {
                    setloader(true)
                })
            }
        }
    }

    return { addToBasket, inBasketSnippet, loader }
}

export default useAddtoBasket
