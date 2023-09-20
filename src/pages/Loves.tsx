import {useEffect,useContext,useState} from 'react'
import Navbar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'
import { getLoves } from '../https/lovesApi'
import { Context } from '..'
import ProductComponent from '../components/ProductComponent'
import { getCompare } from '../https/compareApi'
import { getBasket } from '../https/basketApi'
import Navigation from '../components/UI/navigation/Navigation'
import { IBasketItem, ICompareItem, ILovesItem } from '../utils/interfaces'


const Loves = () => {
    const {user} = useContext(Context)
    const [loves, setloves] = useState<Array<ILovesItem>>([])
    const [compare, setcompare] = useState<Array<ICompareItem>>([])
    const [basket, setbasket] = useState<Array<IBasketItem>>([])
    const [productsLoad, setproductsLoad] = useState<boolean>(false)
    useEffect(() => {
     getLoves({id:user.user.loves}).then(data=>{
        console.log(data);
        
      setloves(data.lovesItems)
      setproductsLoad(true)
     })
     getCompare({id:user.user.compare}).then(data=>{
        console.log(data);
        setcompare(data.compareItems)
   
    })
    getBasket({id:user.user.id}).then(data=>{
        setbasket(data.basketItems)
        
  })
    }, [])
    
  return (
    <>
     <Navbar/>
     <div className="Loves">
   
   <div className="Loves__container">
       <div className="Loves__body">
       <Navigation navigationClass='news'>Главная/Избранное</Navigation>
       {productsLoad &&
          <div className="Loves__grid">
          {loves.map((e:any)=>
          <ProductComponent basket={basket} loves={loves} compare={compare} key={e.product._id} data={e.product} inCompare = {compare.find((el:any)=>el.product?._id == e.product?._id) ? true : false} inBasket = {basket.find((el:any)=>el.product?._id == e?._id)  ? true : false}  inLoves = {loves.find((el:any)=>el.product?._id == e.product?._id)  ? true : false}/>)}
           
       </div>
       }
       </div>
       
       
    
       
   </div>
   

 </div>
     <Footer/>
    </>
 
  
  )
}

export default Loves