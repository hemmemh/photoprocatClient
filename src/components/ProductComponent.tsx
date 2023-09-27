
import { Rating } from '@mui/material'
import React,{FC,useContext,useState,useEffect, useRef} from 'react'
import Button from './UI/button/Button'
import { API_URL } from '../utils/config'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_ROUTE } from '../utils/routs'
import { addItemToBasket, removeItemFromBasket } from '../https/basketApi'
import { Context } from '..'
import { addItemToCompare, removeItemFromCompare } from '../https/compareApi'
import { addProductInLoves, removeProductFromLoves } from '../https/lovesApi'
import { log } from 'console'
import { observer } from "mobx-react-lite";
interface button{
 data:any
 inBasket:any
 inCompare:any
 inLoves:any
 basket:any
 loves:any
 compare:any
}

const ProductComponent:FC<button>  = ({data,inBasket=false,inCompare=false,inLoves=false,basket,loves,compare }) => {


const {user} = useContext(Context)
const {navbar} = useContext(Context)
const [inBasketSnippet, setinBasketSnippet] = useState(inBasket)
const [inCompareSnippet, setinCompareSnippet] = useState(inCompare)
const [inLovesSnippet, setinLovesSnippet] = useState(inLoves)
const [loaders, setloaders] = useState({basket:true,compare:true,love:true})
  const navigate = useNavigate()
  useEffect(() => {
    setinBasketSnippet(inBasket)
  }, [inBasket])
  useEffect(() => {
    setinCompareSnippet(inCompare)
  }, [inCompare])
  useEffect(() => {
    setinLovesSnippet(inLoves)
  }, [inLoves])


  const addToBasket =  ()=>{
    if (!user.user.id) {
      if (!navbar.enter.classList.contains('active')) {
        navbar.enter.classList.add('active')
        setTimeout(() => {
          navbar.enter.classList.remove('active')
        }, 1000);
      }
    }
    if (loaders.basket) {
      if (!inBasketSnippet) {
        setloaders({...loaders,basket:false})
          addItemToBasket({basketId:user.user.basket,product:data._id,count:1}).then(data=>{
            setinBasketSnippet(true)
            navbar.setProducts(navbar.products + 1)
              console.log(data);
           
          }).finally(()=>{
            setloaders({...loaders,basket:true})
          })
      }else{
        setloaders({...loaders,basket:false})
        removeItemFromBasket({id:data._id,basketId:user.user.basket}).then(data=>{
            navbar.setProducts(navbar.products - 1)
            setinBasketSnippet(false)
           
        }).finally(()=>{
          setloaders({...loaders,basket:true})
        })  
    }
    }
    
  
   
}
const addToCompare = ()=>{
  if (!user.user.id) {
    if (!navbar.enter.classList.contains('active')) {
      navbar.enter.classList.add('active')
      setTimeout(() => {
        navbar.enter.classList.remove('active')
      }, 1000);
    }
  }

  if (loaders.compare) {
    if (!inCompareSnippet) {
      setloaders({...loaders,compare:false})
        addItemToCompare({compareId:user.user.compare,product:data._id}).then(data=>{
          setinCompareSnippet(true)
          navbar.setCompares(navbar.compares + 1)
          setinCompareSnippet(true)
        }).catch(e=>{
          console.log(e);
          
        }).finally(()=>{
          setloaders({...loaders,compare:true})
        })
    }else{
      setloaders({...loaders,compare:false})
      removeItemFromCompare({id:data._id,compareId:user.user.compare}).then(data=>{
        navbar.setCompares(navbar.compares - 1)
        setinCompareSnippet(false)
      }).finally(()=>{
        setloaders({...loaders,compare:true})
      })
  }
  }


}

const addToLoves = ()=>{
  if (!user.user.id) {

          setloaders({...loaders,compare:false})
    if (!navbar.enter.classList.contains('active')) {
      navbar.enter.classList.add('active')
      setTimeout(() => {
        navbar.enter.classList.remove('active')
      }, 1000);
    }
   
  
  }

  if (loaders.love) {
    if (!inLovesSnippet) {
      setloaders({...loaders,love:false})
    addProductInLoves({lovesId:user.user.loves,product:data._id}).then(data=>{
    
      setinLovesSnippet(true)
        
    }).catch(error=>{
      console.log(error.response.data);
      
    }).finally(()=>{
      setloaders({...loaders,love:true})
    })
  }else{
    setloaders({...loaders,love:false})
    removeProductFromLoves({id:data._id,lovesId:user.user.loves}).then(data=>{
  
        setinLovesSnippet(false)
        
    }).finally(()=>{
      setloaders({...loaders,love:true})
    })
  }
  }

}


  return (
    <div className="mainCatalog__item">
                       <div className="slidesHome__slide slideHome">
                        <div className="slideHome__body">
                            <div className="slideHome__image">
                              <div className="slideHome__imageCover">
                              <img src={`${API_URL}/${data.name}/${JSON.parse(data.images)[0]}`} alt=""/>
                           
                              </div>
                            </div>
                            <div className="slideHome__name">{data.name}</div>
                            <div className="slideHome__brand">{data.type.name}</div>
                            <div className="slideHome__price">${data.price}</div>
                            
                            <div className="slideHome__rating">
                            <Rating name="disabled" value={data.ratings.reduce((accumulator:any, currentValue:any) => accumulator + currentValue.rate,0)/data.ratings.length}  disabled />
                            </div>
                            <div className="slideHome__actions">
                              <Button onClick={()=>navigate(`${PRODUCT_ROUTE}/${data._id}`)} className='caatalog h' ripple={true} rippleClass='two'>Подробнее</Button>
                              <Button  onClick={addToBasket} className={inBasketSnippet ?'caatalog2 active  _icon-cart' : 'caatalog2  _icon-cart'}></Button>
                            </div>
                            <div className="slideHome__business businessHome">
                              <div onClick={addToCompare} className={inCompareSnippet ? "businessHome__item active _icon-compare" : "businessHome__item _icon-compare"}></div>
                              <div onClick={addToLoves} className={inLovesSnippet ? "businessHome__item active _icon-star" : "businessHome__item  _icon-star"}></div>
                            </div>
            
                        </div>
                       </div>
                    </div>
  )
}

export default observer(ProductComponent)