import React,{useState} from 'react'
import Button2 from '../UI/button2/Button2'
import { IOrderItem, IOrdersItemProduct } from '../../utils/interfaces'
import { API_URL } from '../../utils/config'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { useNavigate } from 'react-router-dom'
import { repeat } from '../../store2/actions/UserActions'
import { BASKET_ROUTE } from '../../app/config/routs'
import { userSlice } from '../../store2/reducers/UserSlice'
import './orderComponent.scss'
const OrderButton= ({order}:{order:IOrderItem}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {setLoaduser} = userSlice.actions
    const onReapeat = async (order:IOrderItem)=>{
      
        
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
    <Button2 onClick={()=>onReapeat(order)} className='buttonCart'>Повторить</Button2>
     </div>
    <div className="order__arrow _icon-arrow-bottom"></div>
    </div>


  )
}

export default OrderButton