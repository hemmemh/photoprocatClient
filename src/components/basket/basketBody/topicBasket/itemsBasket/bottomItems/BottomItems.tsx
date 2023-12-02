import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks'
import { buy } from '../../../../../../store2/actions/BasketActions'
import Button2 from '../../../../../UI/button2/Button2'
import './bottomItems.scss'
import { useCallback } from 'react'
const BottomItems = () => {
    const { sumPrice } = useAppSelector(state => state.reducer.basket)
    const dispatch = useAppDispatch()
    const buyProduct = useCallback(
        () => {
            dispatch(buy())
        },
        []
    )

    return (
        <div className='BottomItems__bottom'>
            <div className='BottomItems__submit'>
                <Button2 onClick={buyProduct} className='BottomItems__buttonCart' >Оформить заказ</Button2>
            </div>
            <div className='BottomItems__totalPriceBasket'>
                <div className='BottomItems__left'>Итого:</div>
                <div className='BottomItems__right'>{sumPrice} Р</div>
            </div>
        </div>
    )
}

export default BottomItems
