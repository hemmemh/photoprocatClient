import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/navBar/Navbar'
import { Swiper, SwiperSlide, } from 'swiper/react';
import { Navigation } from 'swiper';
import 'swiper/css';
import "swiper/css/navigation";
import Rating from '@mui/material/Rating';
import Button2 from '../components/UI/button2/Button2';
import Button from '../components/UI/button/Button';
import Footer from '../components/footer/Footer';
import { getByPurchase } from '../https/productApi';
import { API_URL } from '../utils/config';
import ProductComponent from '../components/ProductComponent';
import { Context } from '..';
import { getBasket } from '../https/basketApi';
import { getCompare } from '../https/compareApi';
import { getLoves } from '../https/lovesApi';
const Home = () => {
  const [products, setproducts] = useState([])
  const [loader, setloader] = useState(false)
  const {user} = useContext(Context)
  const [basket, setbasket] = useState([])
  const [compare, setcompare] = useState([])
  const [loves, setloves] = useState([])
  const [inBasket, setinBasket] = useState(false)
  useEffect(() => {
    getByPurchase().then(data=>{
      console.log(data,'yyyu');
      setproducts(data)
     
    }).then(()=>{
      getBasket({id:user.user.id}).then(data=>{
        setbasket(data?.basketItems)
        
  })
  getCompare({id:user.user.compare}).then(data=>{
  
    setcompare(data?.compareItems)

})
getLoves({id:user.user.loves}).then(data=>{
 
    
  setloves(data?.lovesItems)

 })

    }).then(()=>{
      setloader(true)
    })
  }, [])
  
  return (
    <div className="Home">
       <Navbar/>
       <div className="Home__header headerHome">

        <div className="headerHome__image">
         <img src={require("../images/home/header.png")} alt=""/>
         </div>
      
        
        
         <div className="headerHome__container">
          <div className="headerHome__texts">
            <div className="headerHome__text"><span className='headerHome__span2'>АРЕНДА</span> ФОТО <span className='headerHome__span'>И видео</span></div>
            <div className="headerHome__text">И видео</div>
            <div className="headerHome__text">Оборудования</div>
            
          </div>
         </div>
       </div>
       <div className="Home__possibile possibileHome">
        <div className="possibileHome__container">
          <div className="possibileHome__body">
            <div className="possibileHome__item">
              <div className="possibileHome__cover">
              <div className="possibileHome__image">
              <img src={require("../images/home/underHeader/1.png")} alt=""/>
              </div>
              <div className="possibileHome__text">Самый большой выбор техники</div>
              </div>
              
              
            </div>
            <div className="possibileHome__item">
            <div className="possibileHome__cover">
            <div className="possibileHome__image">
              <img src={require("../images/home/underHeader/2.png")} alt=""/>
              </div>
              <div className="possibileHome__text">Быстрое оформление заказа</div>
            </div>
            </div>
              
            <div className="possibileHome__item">
            <div className="possibileHome__cover">
            <div className="possibileHome__image">
              <img src={require("../images/home/underHeader/3.png")} alt=""/>
              </div>
              <div className="possibileHome__text">Можно забрать заказ в пункте выдачи</div>
            </div>
            </div>
             
            <div className="possibileHome__item">
            <div className="possibileHome__cover">
            <div className="possibileHome__image">
              <img src={require("../images/home/underHeader/4.png")} alt=""/>
              </div>
              <div className="possibileHome__text">Доставка в любую точку Москвы</div>
            </div>
            </div>
              
            <div className="possibileHome__item">
            <div className="possibileHome__cover">
            <div className="possibileHome__image">
              <img src={require("../images/home/underHeader/5.png")} alt=""/>
              </div>
              <div className="possibileHome__text">Оплата картой и наличными</div>
            </div>
            </div>
             
          </div>
          
        </div>
        
       </div>
       <div className="Home__slides slidesHome">
        <div className="slidesHome__container">
        <div className="slidesHome__header">Популярные товары</div>
        <div className="slidesHome__sliderCover">
            <Swiper
            
            className='HomeSlider'
            modules={[Navigation]}
            navigation={
              {
                prevEl: '.slidesHome__prevButton',
                nextEl: '.slidesHome__nextButton',
              }
            }
  
            breakpoints={{
            
              991.98: {
                slidesPerView: 3,
                spaceBetween: 30,
                
              },
    
            }}     
   
      spaceBetween={10}
      slidesPerView={2}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {loader &&
      products.map((ell:any)=>
      <SwiperSlide>
         <ProductComponent key={ell._id} data={ell} basket={basket} loves={loves} compare={compare} inCompare = {compare?.find((el:any)=>el.product?._id == ell._id) ? true : false} inBasket = {basket?.find((el:any)=>el.product?._id == ell._id)  ? true : false} inLoves = {loves?.find((el:any)=>el.product?._id == ell._id)  ? true : false}/>
   
      
    </SwiperSlide>
    )}
    
    
            </Swiper>
            <div className="slidesHome__navigation">
               <div className="slidesHome__prevButton"></div>
               <div className="slidesHome__nextButton"></div>
            </div>
            <div className="slidesHome__mobile">
                <div className="slidesHome__slide slideHome">
          <div className="slideHome__body">
            <div className="slideHome__image">
              <div className="slideHome__imageCover">
              <img src={require("../images/home/slider/1.png")} alt=""/>
              </div>
            </div>
            <div className="slideHome__name">PowerShot SX620 HS</div>
            <div className="slideHome__brand">Canon</div>
            <div className="slideHome__rating">
            <Rating name="disabled"  disabled />
            </div>
            <div className="slideHome__actions">
              <Button className='slider'>Подробнее</Button>
              <Button2 className='slider _icon-cart'>В корзину</Button2>
            </div>
            <div className="slideHome__business businessHome">
              <div className="businessHome__item _icon-compare"></div>
              <div className="businessHome__item _icon-star"></div>
            </div>
            
          </div>
          
                </div>
                <div className="slidesHome__slide slideHome">
          <div className="slideHome__body">
            <div className="slideHome__image">
              <div className="slideHome__imageCover">
              <img src={require("../images/home/slider/1.png")} alt=""/>
              </div>
            </div>
            <div className="slideHome__name">PowerShot SX620 HS</div>
            <div className="slideHome__brand">Canon</div>
            <div className="slideHome__rating">
            <Rating name="disabled"  disabled />
            </div>
            <div className="slideHome__actions">
              <Button className='slider'>Подробнее</Button>
              <Button2 className='slider _icon-cart'>В корзину</Button2>
            </div>
            <div className="slideHome__business businessHome">
              <div className="businessHome__item _icon-compare"></div>
              <div className="businessHome__item _icon-star"></div>
            </div>
            
          </div>
          
                </div>
                <div className="slidesHome__slide slideHome">
          <div className="slideHome__body">
            <div className="slideHome__image">
              <div className="slideHome__imageCover">
              <img src={require("../images/home/slider/1.png")} alt=""/>
              </div>
            </div>
            <div className="slideHome__name">PowerShot SX620 HS</div>
            <div className="slideHome__brand">Canon</div>
            <div className="slideHome__rating">
            <Rating name="disabled"  disabled />
            </div>
            <div className="slideHome__actions">
              <Button className='slider'>Подробнее</Button>
              <Button2 className='slider _icon-cart'>В корзину</Button2>
            </div>
            <div className="slideHome__business businessHome">
              <div className="businessHome__item _icon-compare"></div>
              <div className="businessHome__item _icon-star"></div>
            </div>
            
          </div>
          
                </div>
            </div>
            
            
        </div>
      </div>
       
        
        
        
       </div>
       <div className="Home__grid gridHome">
        <div className="gridHome__container">
          <div className="gridHome__cover">
          <div className="gridHome__body">
            <div className="gridHome__item itemGridHome">
              <div className="itemGridHome__cover">
                <div className="itemGridHome__image">
                   <img src={require("../images/home/grid/1.png")} alt=""/>
                </div>
                <div className="itemGridHome__texts">
                  <div className="itemGridHome__text">Фотокамеры Canon</div>
                  <div className="itemGridHome__text">от 3000 рублей</div>
                </div>
              </div>
              
            </div>
            <div className="gridHome__item itemGridHome">
              <div className="itemGridHome__cover">
                <div className="itemGridHome__image">
                   <img src={require("../images/home/grid/2.png")} alt=""/>
                </div>
                <div className="itemGridHome__texts">
                  <div className="itemGridHome__text _add">Видеокамеры</div>
                  <div className="itemGridHome__text _add">по 200 рублей в сутки</div>
                </div>
              </div>
              
            </div>
            <div className="gridHome__item itemGridHome">
              <div className="itemGridHome__cover">
                <div className="itemGridHome__image">
                   <img src={require("../images/home/grid/3.png")} alt=""/>
                </div>
                <div className="itemGridHome__texts">
                  <div className="itemGridHome__text">Товар недели</div>
                  <div className="itemGridHome__text">всего за 4000 рублей</div>
                </div>
              </div>
              
            </div>
            <div className="gridHome__item itemGridHome">
              <div className="itemGridHome__cover">
                <div className="itemGridHome__image">
                   <img src={require("../images/home/grid/4.png")} alt=""/>
                </div>
                <div className="itemGridHome__texts">
                  <div className="itemGridHome__text">Лучшие объективы</div>
                  <div className="itemGridHome__text">по 700 рублей</div>
                </div>
              </div>
              
            </div>
            <div className="gridHome__item itemGridHome">
              <div className="itemGridHome__cover">
                <div className="itemGridHome__image">
                   <img src={require("../images/home/grid/5.png")} alt=""/>
                </div>
                <div className="itemGridHome__texts">
                  <div className="itemGridHome__text">Отличные фотокамеры</div>
                  <div className="itemGridHome__text">за 1500 рублей</div>
                </div>
              </div>
              
            </div>
          </div>
          </div>
          
      
          
        </div>
        
       </div>
       <div className="Home__work workHome">
        <div className="workHome__map">
        <img src={require("../images/home/map.png")} alt=""/>
        </div>
        
        <div className="workHome__container">
          <div className="workHome__body">
            <div className="workHome__title">С кем мы работаем</div>
            <div className="workHome__items">
              <div className="workHome__item itemWorkHome">
                  <div className="itemWorkHome__name _icon-mail">Фотопрокат Zoom</div>
                  <div className="itemWorkHome__text">Малая Ордынка, 25</div>
                  <a href="URL" className="itemWorkHome__link">http://zoom-prokat.ru.</a>
              </div>
              <div className="workHome__item itemWorkHome">
                  <div className="itemWorkHome__name _icon-mail">Rental Photo</div>
                  <div className="itemWorkHome__text">Киркорова, 180/1</div>
                  <a href="URL" className="itemWorkHome__link">http://rentalphoto.com</a>
              </div>
              <div className="workHome__item itemWorkHome">
                  <div className="itemWorkHome__name _icon-mail">Panasonic Company</div>
                  <div className="itemWorkHome__text">Малая Ордынка, 25</div>
                  <a href="URL" className="itemWorkHome__link">http://zoom-prokat.ru</a>
              </div>
              <div className="workHome__item itemWorkHome">
                  <div className="itemWorkHome__name _icon-mail">Торговый Центр</div>
                  <div className="itemWorkHome__text">Киркорова, 180/1</div>
                  <a href="URL" className="itemWorkHome__link">http://rentalphoto.com</a>
              </div>
            </div>
            
          </div>
          
        </div>
        
       </div>
       <Footer/>
    </div>
    
  )
}

export default Home