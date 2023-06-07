import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navBar/Navbar'
import Navigation from '../components/UI/navigation/Navigation'
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as afea }  from 'swiper';
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Controller, FreeMode } from 'swiper';
import Footer from '../components/footer/Footer';
import Fold from '../components/UI/fold/Fold';
import Button from '../components/UI/button/Button';
import { getCompare, removeItemFromCompare, removeItemFromCompareByType } from '../https/compareApi';
import { Context } from '..';
import { API_URL } from '../utils/config';


const Compare = () => {
    const [firstSwiper, setFirstSwiper] =   useState<afea | null>(null);
    const [secondSwiper, setSecondSwiper] = useState<afea | null>(null);
    const [fold, setfold] = useState(false)
    const {user} = useContext(Context)
    const [itemsView, setitemsView] = useState(false)
    const [compare, setcompare] = useState([])
    const [compareTypes,setcompareTypes] = useState([])
    const [loadCompare,  setloadCompare] = useState(false)
    const [activeType, setactiveType] = useState<any>(null)
    const [activeTypeId, setactiveTypeId] = useState<any>(null)
    const [compareId, setcompareId] = useState(null)
    useEffect(() => {
        getCompare({id:user.user.compare}).then(data=>{
            console.log(data);
            setcompare(data.compareItems)
            setcompareId(data._id)
            const typesArr:any = []
            data.compareItems.forEach((el:any)=>{
                if (!typesArr.includes(el.product.type.name)) {
                    typesArr.push(el.product.type.name)
                }
            })
            console.log(typesArr,'[[[2');
            
            setcompareTypes(typesArr)
            setactiveType(typesArr[0])
            setloadCompare(true)
        })
    }, [])
    useEffect(() => {
        const typesArr:any = []
        compare.forEach((el:any)=>{
            if (!typesArr.includes(el.product.type.name)) {
                typesArr.push(el.product.type.name)
            }
        })
        console.log(typesArr,'[[[2');
        
        setcompareTypes(typesArr)
        if (typesArr.length === 0) {
            setactiveType('Типы')
        }else{
            setactiveType(typesArr[0])
        }
       
    }, [compare])
    
    const removeItem = (id:any,compareId:any)=>{
        setcompare([...compare.filter((el:any)=>el._id !== id)])
        removeItemFromCompare({id,compareId}).then((data:any)=>{
            console.log(data);
            
        })
    }
    const removeByType = ()=>{
        removeItemFromCompareByType({type:activeType,compareId:compareId}).then(data=>{
         setcompare(data.compareItems)
            
        })
    }
  return (
    <div className="Compare">
        <Navbar/>
        <div className="Compare__container">
        <Navigation>Главная / Сравнить товары</Navigation>
        {compare.length !== 0 ?
        <>
         <div className="Compare__title">СРАВНИТЬ <span>5 ТОВАРОВ</span></div>
        <div className="Compare__items items-compare">
            <div onClick={()=>setitemsView(prev=>!prev)} className={itemsView ?"items-compare__action active" : "items-compare__action"}> <span></span></div>
            <div className="items-compare__delete _icon-delete"></div>
            
            <div className={itemsView ? "items-compare__body active" : "items-compare__body"}>
                {compareTypes.map((el:any)=><div onClick={()=>setactiveType(el)} className={activeType === el ? "items-compare__item active" : "items-compare__item"}>{el} (10)</div>)}
            </div>
            
         
        </div>
        <div className="Compare__main main-compare">
            <div className="main-compare__top">
                <div className="main-compare__top-left">
                   <div onClick={removeByType} className="main-compare__clear _icon-delete">Очистить</div>
                   <div className="main-compare__item">Модель Фотоаппарата</div>
                </div>
                <div className="main-compare__top-slider">
                    <div className="main-compare__top-slider-cover">
                              
                <Swiper
           slidesPerView={2}
           spaceBetween={0}
        className="swiperCompare"
        modules={[Controller]}
        onSwiper={setFirstSwiper}
 
        controller={{ control: secondSwiper }}
        breakpoints={{
            786: {
            
            
                spaceBetween: 55,
                slidesPerView:3
              },
            982: {
            
                spaceBetween: 50,
                slidesPerView:4
              },
            1213: {
                slidesPerView:4,
              spaceBetween: 118,
              
            },
  
          }}   
      >
        {compare.map((el:any)=>{
            if(el.product.type.name === activeType){
                return ( <SwiperSlide>
                    <div className="swiperCompare__item item-swiperCompare">
                         <div className="item-swiperCompare__image-cover">
                             <div className="item-swiperCompare__image">
                             <img src={`${API_URL}/${el.product.name}/${JSON.parse(el.product.images)[0]}`} alt=""/>
                             </div>
                         </div>
                         <div onClick={()=>removeItem(el._id,compareId)} className="item-swiperCompare__delete"></div>
                         <div className="item-swiperCompare__name">{el.product.name}</div>
                         <div className="item-swiperCompare__brand">{el.product.brand.name}</div>
                    </div>
                    </SwiperSlide>)
            }
           
        }
          )}

      
        
                </Swiper>
                    </div>
              
                </div>
                
                
            </div>
            <div className="main-compare__bottom">
                <div className="main-compare__bottom-left">
                <Fold value={fold} foldChange={setfold} slice={5} >
                    <div className="main-compare__bottom-left__item">Цена</div>
                    <div className="main-compare__bottom-left__item">Глубина</div>
                    <div className="main-compare__bottom-left__item">Тип</div>
                    <div className="main-compare__bottom-left__item">Матрица</div>
                    <div className="main-compare__bottom-left__item">Разрешение</div>
                    <div className="main-compare__bottom-left__item">Разрешение</div>
                    <div className="main-compare__bottom-left__item">Разрешение</div>
                </Fold>
                </div>
                <div className="item-swiperCompare__bottom-right">
                                     
                <Swiper
           slidesPerView={2}
            
        className="swiperCompare2"
        spaceBetween={9}
        modules={[Controller]}
        onSwiper={setSecondSwiper}
        controller={{ control: firstSwiper }}
        
        breakpoints={{
            786: {
                spaceBetween: 55,
          
                slidesPerView:3
              },
            982: {
            
                spaceBetween: 55,
                slidesPerView:4
              },
            1213: {
                slidesPerView:4,
              spaceBetween: 120,
              
            },
  
          }} 
      >
               {compare.map((el:any)=>{
                       if(el.product.type.name === activeType){
                        return(
                            <SwiperSlide>
                            <div className="swiperCompare2__item item-swiperCompare2">
                             <Fold foldClass='ggg' value={fold} foldChange={setfold} slice={5} >
                             <div className="item-swiperCompare2__item">CMOS</div>
                             <div className="item-swiperCompare2__item">Зеркальная</div>
                             <div className="item-swiperCompare2__item">23.5 x 15.6 мм</div>
                             <div className="item-swiperCompare2__item">45 Мпикс</div>
                             <div className="item-swiperCompare2__item">3К</div>
                             <div className="item-swiperCompare2__item">Nikon F</div>
                             <div className="item-swiperCompare2__item">+/- 5 EV с шагом 1/3 </div>
                             </Fold>
                            </div>
                         </SwiperSlide>

                        )
                       }
               }
                
              )}
      
        
       
                </Swiper>
                
                </div>
               
            </div>
            <div className="main-compare__button">
            <Button onClick={()=>setfold(prev=>!prev)} className='compare g'>{fold ? 'Свернуть' : 'Показать все'}</Button>
            </div>
            
         
        </div></>
        :
        <div>Не выбраны товары</div>
        }
       
        </div>
       
        <Footer/>
    </div>
    
  )
}

export default Compare