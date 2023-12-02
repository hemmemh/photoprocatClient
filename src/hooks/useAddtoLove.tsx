import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { navbarSlice } from '../store2/reducers/NavBarSlice'
import { addProductInLoves, removeProductFromLoves } from '../https/lovesApi'

interface itemProduct {

    inLoves: boolean
    productId: any
}

const useAddtoLove = ({ inLoves, productId }: itemProduct) => {
    const [inLovesSnippet, setinLovesSnippet] = useState(inLoves)
    const [loader, setloader] = useState(true)
    const { user } = useAppSelector(state => state.reducer.catalog)
    const { loves } = useAppSelector(state => state.reducer.navbar)
    const navbar = navbarSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        setinLovesSnippet(inLoves)
    }, [inLoves])

    const addToLoves = () => {
        const item = document.querySelector('._loves')
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
            if (!inLovesSnippet) {
                setloader(false)
                addProductInLoves({ lovesId: user.loves, product: productId }).then(data => {
                    item?.classList.add('active')
                    setTimeout(() => {
                        item?.classList.remove('active')
                    }, 300)
                    setinLovesSnippet(true)
                    dispatch(navbar.setLoves(loves + 1))
                }).catch(error => {
                    console.log(error.response.data)
                }).finally(() => {
                    setloader(true)
                })
            } else {
                setloader(false)
                removeProductFromLoves({ id: productId, lovesId: user.loves }).then(data => {
                    item?.classList.add('active')
                    setTimeout(() => {
                        item?.classList.remove('active')
                    }, 300)
                    setinLovesSnippet(false)
                    dispatch(navbar.setLoves(loves - 1))
                }).finally(() => {
                    setloader(true)
                })
            }
        }
    }

    return { addToLoves, inLovesSnippet, loader }
}

export default useAddtoLove
