import React,{FC,useState,useEffect} from 'react'
import { API_URL } from '../utils/config'
import Amount from './UI/amount/Amount'
import { changeAmount, removeItemFromBasket } from '../https/basketApi'
interface button{
    e:any
    setProducts:any
    products:any
    basketId:any
    setsumPrice:any
   }
   
   
const BasketProduct:FC<button>  = ({e,setProducts,products,basketId,setsumPrice}) => {
    const [amount, setamount] = useState(0)
    useEffect(() => {
      setamount(e.count)
      setsumPrice((prev:any)=>prev+(e.count * e.product.price))
    }, [])
    const  changeAm = (el:any)=>{   
        setamount(el)
        setsumPrice((prev:any)=>prev - (amount * e.product.price) +(el * e.product.price))
        changeAmount({id:e._id,count:el}).then(data=>{
            console.log(data);
            
        })
    }

    
    const remove = ()=>{
        setProducts((prev:any)=>({...prev,basketItems:products.basketItems.filter((fil:any)=>fil._id !== e._id)}))
        removeItemFromBasket({id:e._id,basketId}).then(data=>{
            console.log(data);
            
           
        })
    }
  return (
    <div className="items-basket__product">
    <div className="items-basket__image-flex">
        <div className="items-basket__image-cover">
            <div className="items-basket__image">
            <img src={`${API_URL}/${e.product.name}/${JSON.parse(e.product.images)[0]}`} alt=""/>
            </div>
        </div>
    </div>
    
    
    
    
    <div className="items-basket__info">
        <div className="items-basket__name">{e.product.name}</div>
        <div className="items-basket__brand">{e.product.brand.name}</div>
    </div>
    <div className="items-basket__price">{e.product.price} Р</div>
    <div className="items-basket__amount amount-basket">
        <Amount value={amount} change={changeAm} classAmount='basket'/>
        
    </div>
    <div className="items-basket__total">{e.product.price * amount} Р</div>
    <div onClick={remove} className="items-basket__delete _icon-delete"></div>
</div>
  )
}

export default BasketProduct