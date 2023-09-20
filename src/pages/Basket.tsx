import { useState,useEffect,useContext } from 'react'
import Navbar from '../components/navBar/Navbar'
import Navigation from '../components/UI/navigation/Navigation'
import Button from '../components/UI/button/Button'
import Footer from '../components/footer/Footer'
import { addOrder, getBasket, removeAll} from '../https/basketApi'
import { Context } from '..'
import BasketProduct from '../components/BasketProduct'
import { useNavigate } from 'react-router-dom'
import { HOME_ROUTE, USER_ROUTE } from '../utils/routs'
import { change } from '../https/productApi'
import { IBasket, IProduct } from '../utils/interfaces'

const Basket = () => {

    const {user} = useContext(Context)
    const [basket, setbasket] = useState<IBasket>()
    const [load, setload] = useState<boolean>(false)
    const [products, setproducts] = useState<Array<IProduct>>([])
    const [sumPrice, setsumPrice] = useState<number>(0)
    const navigate = useNavigate()
    useEffect(() => {
            getBasket({id:user.user.id}).then(data=>{
                setbasket(data)
                setload(true)
                let arr:any = []
        for (const it of data.basketItems) {
            arr = [...arr, {[it.product._id]:it.count}]
        }
        setproducts(arr)
            })
     
      
    }, [])
    const buy = ()=>{
        getBasket({id:user.user.id}).then(data=>{
            let arr:any = []
    for (const it of data.basketItems) {
        arr = [...arr, {[it.product._id]:it.count}]
    }
 
    addOrder({ordersId:user.user.orders,price:sumPrice,products:JSON.stringify(arr)}).then(data=>{
        console.log(data);
        
    })
        }).then(data=>{
            for (const it of products) {
                change({id:Object.keys(it)[0],purchase:1}).then(data=>{
                    console.log(data,'---------------');
                    
                })
            }
        }).then(()=>{
     
            removeAll({id:user.user.basket}).then(data=>{
                console.log(data);
                
            })
            navigate(HOME_ROUTE)
            window.location.reload();
        })
 
      
    }
  return (
    <>
        <Navbar/>
        <div className="Basket">

<div className="Basket__container">
    <div className="Basket__body">
        <Navigation navigationClass='basket'>Главная / Корзина</Navigation>
        <div className="Basket__title">Корзина</div>
        <div className="Basket__items items-basket">
            <div className="items-basket__top top-basket">
                <div className="top-basket__item">Фото</div>
                <div className="top-basket__item">Название</div>
                <div className="top-basket__item">Цена</div>
                <div className="top-basket__item">Количество</div>
                <div className="top-basket__item">Итого</div>
            </div>
            <div className="items-basket__body">
                {load &&
                  basket?.basketItems.map((e:any)=>
                    <BasketProduct key={e._id} e={e} setsumPrice={setsumPrice} setProducts={setbasket} products={basket} basketId={basket._id}/>
                )}
                
              
               
              
            </div>
            <div className="items-basket__bottom">
                 
            <div className="items-basket__submit">
                <Button onClick={buy} className={'basket o'} >Оформить заказ</Button>
            </div>
            <div className="items-basket__totalPrice  totalPrice-basket">
                <div className="totalPrice-basket__left">Итого:</div>
                <div className="totalPrice-basket__right">{sumPrice} Р</div>
                
            </div>
            </div>
           
            
        </div>
        
    </div>
</div>

        </div>
        <Footer/>
    </>

   
  )
}

export default Basket