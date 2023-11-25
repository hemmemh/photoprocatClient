
import { IOrderItem, IOrdersItemProduct } from '../../utils/interfaces'
import { API_URL } from '../../utils/config'
import './orderComponent.scss'

const OrderComponent = ({order}:{order:IOrderItem}) => {

  return (
        <div className="order__product-cover">
            {order.ordersItemProduct.map((es:IOrdersItemProduct)=>
               <div key={es.product._id} className="order__product product-order">
               <div className="product-order__item">
                   <div className="product-order__image-cover">
                   <div className="product-order__image">
                   <img src={`${API_URL}/${es.product.name}/${JSON.parse(es.product.images)[0]}`} alt=""/>
                   </div>
                   </div>
                   <div className="product-order__info">
                       <div className="product-order__name">{es.product.name}</div>
                       <div className="product-order__brand">{es.product.brand.name}</div>
                   </div>
               </div>
               <div className="product-order__item">
                   <div className="product-order__count">{es.amount}</div>
               </div>
               <div className="product-order__item">
                   <div className="product-order__price">{es.amount * es.product.price} Р</div>
               </div>
               <div className="product-order__item">
               </div>
               <div className="product-order__item">
               </div>
                   </div>
                   )}
        </div>

  )
}

export default OrderComponent