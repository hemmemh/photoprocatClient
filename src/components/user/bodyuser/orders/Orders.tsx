import AccordionUser from '../../../UI/accordionUser/AccordionUser'
import AccordionUserItem from '../../../UI/accordionUser/AccordionUserItem'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import './orders.scss'
import { type IOrderItem } from '../../../../utils/interfaces'
import OrderComponent from '../../../orderComponent/OrderComponent'
import OrderButton from '../../../orderComponent/OrderButton'
const Orders = () => {
    const { toggle } = useAppSelector((state) => state.reducer.user)
    const { orders } = useAppSelector((state) => state.reducer.catalog)

    return (
        <div className={toggle === 1 ? 'User__orders orders-user active' : 'User__orders orders-user'}>
            <div className="orders-user__top top-orders">
                <div className="top-orders__item">Заказ</div>
                <div className="top-orders__item">Дата</div>
                <div className="top-orders__item">Кол-во</div>
                <div className="top-orders__item">Сумма</div>
                <div className="top-orders__item"></div>
                <div className="top-orders__item"></div>
            </div>
            <div className="orders-user__order order">
                <AccordionUser accordionClass='user'>
                    {orders.map((order: IOrderItem) =>
                        <AccordionUserItem key={order._id}>
                            <OrderButton order={order}/>
                            <OrderComponent order={order}/>
                        </AccordionUserItem>
                    )}
                </AccordionUser>

            </div>

        </div>
    )
}

export default Orders
