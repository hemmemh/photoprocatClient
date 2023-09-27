import  { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navBar/Navbar'
import { Swiper, SwiperSlide } from "swiper/react";

import Nav from '../components/UI/navigation/Navigation'
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";



// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper";
import Button from '../components/UI/button/Button';
import Toggle from '../components/UI/toggle/Toggle';
import Footer from '../components/footer/Footer';
import Fold from '../components/UI/fold/Fold';
import FoldText from '../components/UI/foldText/FoldText';
import { getOneproduct,addRaiting } from '../https/productApi';
import { useParams } from 'react-router-dom';
import { API_URL } from '../utils/config';
import { addItemToBasket, getBasket, removeItemFromBasket } from '../https/basketApi';
import { Context } from '..';
import { addItemToCompare, getCompare, removeItemFromCompare } from '../https/compareApi';
import { addProductInLoves, getLoves, removeProductFromLoves } from '../https/lovesApi';
import { Rating } from '@mui/material';
import { Modal } from '../components/UI/modal/Modal';
import Input from '../components/UI/input/Input';
import { IBasketItem, ICompareItem, ILovesItem, IProduct } from '../utils/interfaces';
const Product = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [toggleDesc, settoggleDesc] = useState<number>(0)
    const [foldDescription, setfoldDescription] = useState<boolean>(false)
    const [foldText, setfoldText] = useState<boolean>(false)
    const {id} = useParams()
    const [product, setproduct] = useState<IProduct | null>(null)
    const [productLoad, setproductLoad] = useState<boolean>(false)
    const {user} = useContext(Context)
    const {navbar} = useContext(Context)
    const [inBasket, setinBasket] = useState<boolean>(false)
    const [inCompare, setinCompare] = useState<boolean>(false)
    const [inLoves, setinLoves] = useState<boolean>(false)
    const [loves, setloves] = useState<Array<ILovesItem>>([])
    const [compare, setcompare] = useState<Array<ICompareItem>>([])
    const [basket, setbasket] = useState<Array<IBasketItem>>([])
    const [raiting, setraiting] = useState<number>(1)
    const [modal, setmodal] = useState<boolean>(false)
    const [name, setname] = useState<string>('')
    const [sername, setsername] = useState<string>('')
    const [text, settext] = useState<string>('')
    const [raitingModal, setraitingModal] = useState<number | null>(1)
    const [loaders, setloaders] = useState({basket:true,compare:true,love:true})
    useEffect(() => {
        getOneproduct({id}).then(data=>{
            setproduct(data)
            setraiting((data.ratings.reduce((accumulator:any, currentValue:any)=>accumulator + currentValue.rate,0))/data.ratings.length)
            getBasket({id:user.user.id}).then(data=>{
                 if (  data?.basketItems.find((e:any)=>e.product?._id === id)) setinBasket(true)
                 setbasket(data.basketItems)
            })
            getCompare({id:user.user.compare}).then(data=>{
                console.log(data);
                if (data?.compareItems.find((e:any)=>e.product?._id === id)) {
                    setinCompare(true)
                    setcompare(data.compareItems)
                }
           
            })
            getLoves({id:user.user.loves}).then(data=>{
                setloves(data.lovesItems)
                if (data?.lovesItems.find((e:any)=>e.product?._id === id)) {
                    setinLoves(true)
                }
             })
        }
     
        
    ).then(()=>{
        setproductLoad(true)   
    })}, [])

    const addToBasket = ()=>{
        if (!user.user.id) {
            if (!navbar.enter.classList.contains('active')) {
                navbar.enter.classList.add('active')
                setTimeout(() => {
                  navbar.enter.classList.remove('active')
                }, 1000);
              }
          }

          if(loaders.basket){
            if (!inBasket) {    
                setloaders({...loaders,basket:false}) 
                addItemToBasket({basketId:user.user.basket,product:product?._id,count:1}).
                then(data=>{
                    navbar.setProducts(navbar.products + 1)
                    setinBasket(true)}).finally(()=>{
                        setloaders({...loaders,basket:true})
                      })
               
            }else{
                setloaders({...loaders,basket:false})
                removeItemFromBasket({id:basket.find((el:any)=>el.product._id === id),basketId:user.user.basket}).
                then(data=>{
                    navbar.setProducts(navbar.products - 1)
                    setinBasket(false)}).finally(()=>{
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
          
          if(loaders.compare){
            if (!inCompare) {
                setloaders({...loaders,compare:false}) 
                addItemToCompare({compareId:user.user.compare,product:id}).
                then(data=>{
                    navbar.setCompares(navbar.compares + 1)
                    setinCompare(true)}).finally(()=>{
                        setloaders({...loaders,compare:true})
                      })
            }else{
                setloaders({...loaders,compare:false}) 
                removeItemFromCompare({id:compare.find((el:any)=>el.product._id=== id)?._id,compareId:user.user.compare}).
                then(data=>{
                    navbar.setCompares(navbar.compares - 1)
                    setinCompare(false)}).finally(()=>{
                        setloaders({...loaders,compare:true})
                      })
            }
          }
       
      
    }


    const addToLoves = ()=>{
        if (!user.user.id) {
            if (!navbar.enter.classList.contains('active')) {
                navbar.enter.classList.add('active')
                setTimeout(() => {
                  navbar.enter.classList.remove('active')
                }, 1000);
              }
          }
          if(loaders.love){
            if (!inLoves) {
                setloaders({...loaders,love:false}) 
            addProductInLoves({lovesId:user.user.loves,product:id}).then(data=>setinLoves(true)).finally(()=>{
                setloaders({...loaders,love:true})
              })
        }else{
            setloaders({...loaders,love:false}) 
            removeProductFromLoves({id:loves.find((el:any)=>el.product._id=== id),lovesId:user.user.loves}).then(data=>setinLoves(false)).finally(()=>{
                setloaders({...loaders,love:true})
              })
        }
          }
       
    }


    const addRaitingToProduct = ()=>{
        addRaiting({user:user.user.id,rate:raitingModal,product:id,name,sername,text}).then(data=>"status" in data === false &&  window.location.reload())
    }
  return (
 
   <div className="Product">
    <Navbar/>
    {productLoad && 
      <div className="Product__container">
      <Nav navigationClass='product _d'>Главная / Фотокамеры / Canon / 5D Mark IV body</Nav>
       <div className="Product__main main-product">
           <div className="main-product__left">
               <div className="main-product__gallery gallery-product">
                   <div className="gallery-product__actions">
                       <div onClick={addToCompare } className={inCompare ?"gallery-product__action active _icon-compare" :"gallery-product__action  _icon-compare"}></div>
                       <div onClick={addToLoves} className={inLoves ? "gallery-product__action active _icon-star" : "gallery-product__action _icon-star"}></div>
                   </div>
                   
                   <div className="gallery-product__slider">
                   <Swiper
       
       spaceBetween={10}
       //navigation={true}
       thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
       modules={[FreeMode, Navigation, Thumbs]}
       className="mySwiper2"
     >
       {JSON.parse(product?.images || '').map((e:any)=>       
       <SwiperSlide>
          <div className="gallery-product__sliderItem">
          <img src={`${API_URL}/${product?.name}/${e}`} alt=""/>
          </div>
       </SwiperSlide>
       ) }

   
     </Swiper>
                    </div>
                   <div className="gallery-product__thumbs">
                   <Swiper
       onSwiper={setThumbsSwiper}
       direction='vertical'
      
       slidesPerView={4}
       freeMode={true}
       watchSlidesProgress={true}
       modules={[FreeMode, Navigation, Thumbs]}
       className="mySwiper"
     >
        {JSON.parse(product?.images || '').map((e:any)=>       
       <SwiperSlide>
           <div className="gallery-product__thumpItem">
           <img src={`${API_URL}/${product?.name}/${e}`} alt=""/>
       </div>
       </SwiperSlide>
       ) }
    
    
     
      
     </Swiper>
                   </div>
               </div>
               <div className="main-product__tags tags-product">
                   <div className="tags-product__tag">Камера</div>
                   <div className="tags-product__tag  tags-product__tag_big">Объектив</div>
                   <div className="tags-product__tag">Фото</div>
                   <div className="tags-product__tag  tags-product__tag_big">Изображение</div>
                   <div className="tags-product__tag">Кэнон</div>
                   <div className="tags-product__tag  tags-product__tag_big">Стекло</div>
                   <div className="tags-product__tag">Аренда</div>
                   <div className="tags-product__tag  tags-product__tag_big">Цифровой</div>
               </div>
               
           </div>
           <div className="main-product__right">
               <Nav navigationClass='product _d2'>Главная / Фотокамеры / Canon / 5D Mark IV body</Nav>
               <div className="main-product__brand">{product?.brand.name}</div>
               <div className="main-product__name">{product?.name}</div>
               <div className="main-product__actions">
               <Button ripple={true} className='product-1 dr'>В наличии</Button>
               <Button onClick={addToBasket} ripple={true} className={inBasket ? 'slider2 _pr active _icon-cart': 'slider2 _pr _icon-cart'}>{inBasket ? 'В корзине' : 'В корзину'}</Button>
               </div>
               <div className="main-product__raiting">
                <Rating value={raiting} readOnly/>
               </div>
               
            
               <div className="main-product__description description-product">
                   <Toggle  ripple={false} value={toggleDesc} change={settoggleDesc} toggleClass='product-toggle'>
                       
                       <div className="description-product__toggleItem">Описание</div>
                       <div className="description-product__toggleItem">Характеристики</div>
                   </Toggle>
                   <div className="description-product__body">
                       
                   <Fold foldClass={toggleDesc ===0 ?'product active': 'product'} slice={2} value={foldDescription} foldChange={setfoldDescription}>
                    {product?.information.map((et:any)=>
                    <div className="description-product__description">{et.name}<span>{et.description}</span></div>
                    )}
                   </Fold>
                   <div className={toggleDesc === 1 ? "description-product__foldText active" : "description-product__foldText"}>
                   <FoldText foldClass={toggleDesc === 1  ?'product active': 'product'} value={foldText} foldChange={setfoldText} >
                       {product?.description}
                   </FoldText>
                   </div>
                   
                   
                   </div>
                   
                   
                   <div  className="Fold__buttonCover">
                       {toggleDesc ===0 ?   
                       <Button onClick={()=>setfoldDescription((prev:any)=>!prev)} ripple={true} className='product-2 d'>{foldDescription === true ? 'Свернуть':'Развернуть' }</Button> 
                       :
                       <Button onClick={()=>setfoldText((prev:any)=>!prev)} ripple={true} className='product-2 d'>{foldDescription === true ? 'Свернуть':'Развернуть' }</Button>
                   }
                       
                
                   
       
   </div>
                   

               </div>
               
           </div>
           
       </div>
       <div className="Product__raitings raitings-product">
        <div className="raitings-product__button">
            <Button onClick={()=>setmodal(true)} className='basket g'>Написать отзыв</Button>
        </div>
        <div className="raitings-product__body">
            <Swiper
            spaceBetween={20}
            slidesPerView={1}
            freeMode={true}
            breakpoints={{
                500: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                    
                  },
                700: {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    
                  },
                991.98: {
                  slidesPerView: 4,
                  spaceBetween: 20,
                  
                },
      
              }}  
            >
                {product?.ratings.map((el:any)=>
                 <SwiperSlide>
                 <div className="raitings-product__item-cover">
                    <div className="raitings-product__item item-raitings">
                         <div className="item-raitings__name">{el.name} {el.sername}</div>
                         <div className="item-raitings__raiting"><Rating readOnly value={el.rate}/></div>
                         <div className="item-raitings__text">{el.text}</div>
                    </div>
                 </div>
             </SwiperSlide>
             )}
               
               
            </Swiper>
           
            
        </div>
        
       </div>
       
   </div>
    }

     <Modal active={modal} setActive={setmodal} modalClass='raiting'>
        <div className="RaitingModal">
            <div className="RaitingModal__top">
                <Input value={name} change={setname} inputClass='registration gv' placeholder='Имя *'/>
                <Input value={sername} change={setsername} inputClass='registration gv' placeholder='Фамилия *'/>
            </div>
            <div className="RaitingModal__raiting"><Rating value={raitingModal}
  onChange={(event, newValue) => {
    setraitingModal(newValue);
  }}/></div>
            
            <div className="RaitingModal__text">
                <textarea value={text} onChange={(e)=>settext(e.target.value)} placeholder='отзыв' className='RaitingModal__textarea'>{text}</textarea>
            </div>
            <div className="RaitingModal__button">
            <Button  onClick={addRaitingToProduct} className='basket g'>Отправить</Button>
            </div>
            
        </div>
        
     </Modal>
 
    <Footer/>
   </div>
   
  )
}

export default Product