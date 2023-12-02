import { useEffect } from 'react'

import Navigation from '../UI/navigation/Navigation'

import { putLoves } from '../../store2/actions/LovesActions'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import './loves.scss'
import SpinnerBody from '../UI/spinnerBody/SpinnerBody'
import ProductItem from '../productItem/ProductItem'
import { type ILovesItem } from '../../utils/interfaces'
import { inBasket, inCompare, inLoves } from '../../helpers/findsInItem'
const MainLoves = () => {
    const { compare, loves, basket } = useAppSelector(state => state.reducer.catalog)
    const { load } = useAppSelector(state => state.reducer.love)

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(putLoves())
    }, [])

    return (
        <div className="Loves">
            <div className="Loves__container">
                <div className="Loves__body">
                    <Navigation navigationClass='news'>Главная/Избранное</Navigation>
                    {load
                        ? <SpinnerBody/>
                        : loves.length !== 0
                            ? <div className="Loves__grid">
                                {loves?.map((love: ILovesItem) =>
                                    <ProductItem

                                        key={love.product._id}
                                        product={love.product}
                                        inCompare = {inCompare(love.product._id, compare)}
                                        inBasket = {inBasket(love.product._id, basket)}
                                        inLoves = {inLoves(love.product._id, loves)}
                                        className='catalogItem'
                                    />)}
                            </div>
                            : <div className="Loves__none _icon-star">Нет товаров</div>

                    }
                </div>
            </div>
        </div>
    )
}

export default MainLoves
