import { type FC, useState, useEffect, useCallback, memo } from 'react'
import { useAppDispatch } from '../../hooks/reduxHooks'

import { changeAm, remove } from '../../store2/actions/BasketActions'
import { API_URL } from '../../utils/config'
import Amount from '../UI/amount/Amount'
import { type IBasketItem } from '../../utils/interfaces'

interface IBasketProduct {
    basketItem: IBasketItem
    basketId: any

}

const BasketProduct: FC<IBasketProduct> = ({ basketItem, basketId }) => {
    const [amount, setamount] = useState(0)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setamount(basketItem.count)
    }, [])

    const setAmount = useCallback(
        (value: number) => {
            dispatch(changeAm(basketItem, value, amount))
            setamount(value)
        },
        [amount]
    )

    const onRemove = useCallback(
        () => {
            dispatch(remove(basketItem, amount, basketId))
        },
        [amount]
    )

    return (
        <div className="items-basket__product">
            <div className="items-basket__image-flex">
                <div className="items-basket__image-cover">
                    <div className="items-basket__image">
                        <img src={`${API_URL}/${basketItem.product.name}/${JSON.parse(basketItem.product.images)[0]}`} alt=""/>
                    </div>
                </div>
            </div>

            <div className="items-basket__info">
                <div className="items-basket__name">{basketItem.product.name}</div>
                <div className="items-basket__brand">{basketItem.product.brand.name}</div>
            </div>
            <div className="items-basket__price">{basketItem.product.price} Р</div>
            <div className="items-basket__amount amount-basket">
                <Amount value={amount} change={setAmount} classAmount='basket'/>

            </div>
            <div className="items-basket__total">{basketItem.product.price * amount} Р</div>
            <div onClick={onRemove} className="items-basket__delete _icon-delete"></div>
        </div>
    )
}

export default memo(BasketProduct)
