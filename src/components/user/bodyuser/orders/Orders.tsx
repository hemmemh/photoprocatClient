
import AccordionUser from '../../../UI/accordionUser/AccordionUser'
import AccordionUserItem from '../../../UI/accordionUser/AccordionUserItem'
import Button from '../../../UI/button/Button'
import { API_URL } from '../../../../utils/config'
import { repeat } from '../../../../store2/actions/UserActions'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import './orders.scss'
import { IOrderItem, IOrdersItemProduct } from '../../../../utils/interfaces'
import { useNavigate } from 'react-router-dom'
import { BASKET_ROUTE } from '../../../../app/config/routs'
import OrderComponent from '../../../orderComponent/OrderComponent'
import OrderButton from '../../../orderComponent/OrderButton'
const Orders = () => {
    const {toggle} = useAppSelector((state)=>state.reducer.user)
    const {orders,user} = useAppSelector((state)=>state.reducer.catalog)

  




  return (
    <div className={toggle === 1 ? "User__orders orders-user active" : "User__orders orders-user"}>
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
                {orders.map((order:IOrderItem)=>
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