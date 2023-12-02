import Button2 from '../UI/button2/Button2'
import { type IOrderItem } from '../../utils/interfaces'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { repeat } from '../../store2/actions/UserActions'
import { BASKET_ROUTE } from '../../app/config/routs'

import './orderComponent.scss'
const OrderButton = ({ order }: { order: IOrderItem }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onReapeat = async (order: IOrderItem) => {
        await dispatch(repeat(order.ordersItemProduct))

        navigate(BASKET_ROUTE)
    }

    return (
        <div className="order__top">
            <div className="order__number">{order.number}</div>
            <div className="order__date">{order.date}</div>
            <div className="order__date"></div>
            <div className="order__price">{order.price}</div>
            <div className="order__button">
                <Button2 onClick={async () => { await onReapeat(order) }} className='buttonCart'>Повторить</Button2>
            </div>
            <div className="order__arrow _icon-arrow-bottom"></div>
        </div>

    )
}

export default OrderButton
