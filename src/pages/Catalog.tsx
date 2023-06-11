import React, { useEffect, useState,useContext, useRef } from 'react'
import { Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import { Navigation } from 'swiper';
import Nav from '../components/UI/navigation/Navigation'
import ProductSpoiler from '../components/UI/productSpoiler/ProductSpoiler';
import { FormControlLabel, Radio, RadioProps, Rating, Skeleton, Slider, ToggleButton, ToggleButtonGroup } from '@mui/material';
import Button from '../components/UI/button/Button';
import Button2 from '../components/UI/button2/Button2';
import styled from '@emotion/styled';
import RadioGroup from '../components/UI/radioGroup/RadioGroup';
import CheckBox from '../components/UI/checkBox/CheckBox';
import Navbar from '../components/navBar/Navbar';
import Footer from '../components/footer/Footer';
import AccordionUser from '../components/UI/accordionUser/AccordionUser';
import AccordionUserItem from '../components/UI/accordionUser/AccordionUserItem';
import AccordionOne from '../components/UI/accordionOne/AccordionOne';
import Toggle from '../components/UI/toggle/Toggle';
import { getAllTypes } from '../https/typesApi';
import { getAllBrands } from '../https/brandsApi';
import { API_URL } from '../utils/config';
import { Context } from '..';
import { getAllproduct } from '../https/productApi';
import ProductComponent from '../components/ProductComponent';
import { getBasket } from '../https/basketApi';
import { getCompare } from '../https/compareApi';
import { getLoves } from '../https/lovesApi';
import { useLocation, useSearchParams } from 'react-router-dom';
import useIntersectionObserver from '../hooks/UseIntersectionObserver';
import { useInView } from 'react-intersection-observer';
import { log } from 'console';

const Catalog = () => {
 
    const [priceValue, setpriceValue] = useState<number[]>([10,20])
    const [VisibleAccordionFiltr, setVisibleAccordionFiltr] = useState(true)
    const [toggle, settoggle] = useState(0)
    const [toggle2, settoggle2] = useState(0)
    const [brands, setbrands] = useState<any>([])
    const [brandsLoad, setbrandsLoad] = useState(false)
    const [checkedBrands, secheckedBrands] = useState<any>([])
    const [products, setproducts] = useState<any>({})
    const [productsLoad, setproductsLoad] = useState(false)
    const [sort, setsort] = useState('purchaseNumber')
    const {brand} = useContext(Context)
    const [sortNumber, setsortNumber] = useState<any>(1)
    const {user} = useContext(Context)
    const [basket, setbasket] = useState([])
    const [compare, setcompare] = useState([])
    const [loves, setloves] = useState([])
    const [typeInformation, settypeInformation] = useState({})
    const [informations, setinformations] = useState<any>([])
    const [informationValues, setinformationValues] = useState<any>({})
    const [sliderMouseOn, setsliderMouseOn] = useState<any>({})
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortLoader, setsortLoader] = useState(false)
    const [sortNumberLoader, setsortNumberLoader] = useState(false)
    const [checkedBrandsLoader, setcheckedBrandsLoader] = useState(0)
    const [informationValuesLoader, setinformationValuesLoasder] = useState(0)
  const [filterCatalog, setfilterCatalog] = useState('')
  const [filterLoader, setfilterLoader] = useState(false)
  const obsRef = useRef<any>()
  const observer = useIntersectionObserver(obsRef,{})
  const [page, setpage] = useState(1)
  const [limit, setlimit] = useState(4)
  const [observerLoader, setobserverLoader] = useState(false)
  const [searchParamsLoader, setsearchParamsLoader] = useState(false)
  const [priceRange, setpriceRange] = useState<any>([0,10])
  const [type, settype] = useState('')
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
    useEffect(() => {
        let typeInformationConst = {}
        let informationValuesConst = {}
        let informationsConst:any = []
        let slideMouseOneConst:any = {}

        getAllproduct(searchParams.get("type"),null,null,null,null,null,null,null,null,null,null).then(data=>{
           if (data.count !== 0) {
            
           }
           setproducts({...data})
           settype(data.responce[0].type.name)
           let price:any = []
           data.responce.forEach((el:any)=>price.push(el.price))
           price = price.sort((a:any,b:any)=>a-b)
           setpriceRange([price[0],price[price.length-1]])
           
           for (const it of JSON.parse(data.responce[0].type.informations)) {
            let val:any = 'неважно'
            if (Object.entries(it)[0][1] == 'check') {
                val = []
            }else if(Object.entries(it)[0][1] == 'slider'){
                val = [0,0]
                slideMouseOneConst = {...slideMouseOneConst,[Object.entries(it)[0][0]]:[0,0]}
            }
            typeInformationConst = {...typeInformationConst,[Object.entries(it)[0][0]]:Object.entries(it)[0][1]}
            informationValuesConst = {...informationValuesConst,[Object.entries(it)[0][0]]:val}
           }

            for (const it of data.responceAll) {
                informationsConst = [...informationsConst,...it.information]
            
           }
       
           
           setinformations(informationsConst)
           Object.entries(typeInformationConst).map((el:any)=>{
            const type = el[1]
            const typeName = el[0]
            let arr:any = []
            arr = [...informationsConst.filter((fil:any)=>fil.name == typeName).map((ee:any)=>ee.description)]
            arr = arr.filter((fil:any,pos:any)=> arr.indexOf(fil) === pos)
  
             
            if (type == 'slider') {
                if(arr.length ===  1){
                    informationValuesConst = {...informationValuesConst,[typeName]:[0,Number(arr.sort((a:any,b:any)=>b-a)[0]) ]}
                    slideMouseOneConst = {...slideMouseOneConst, [typeName]:[0,Number(arr.sort((a:any,b:any)=>b-a)[0]) ]}
                }else{
                    informationValuesConst = {...informationValuesConst,[typeName]:[Number(arr.sort((a:any,b:any)=>a-b)[0]) ,Number(arr.sort((a:any,b:any)=>b-a)[0]) ]}
                    slideMouseOneConst = {...slideMouseOneConst, [typeName]:[Number(arr.sort((a:any,b:any)=>a-b)[0]) ,Number(arr.sort((a:any,b:any)=>b-a)[0]) ]}
                }
              
            }else if (type == 'check'){
            informationValuesConst = {...informationValuesConst,[typeName]:[...arr]}
            }else{
                arr.unshift('неважно')
                console.log(arr,'********');
                
                informationValuesConst = {...informationValuesConst,[typeName]:arr[0]} 
            }
           })
           setsliderMouseOn(slideMouseOneConst)
           setinformationValues(informationValuesConst) 
           settypeInformation(typeInformationConst)

           console.log(informationValuesConst,typeInformationConst,'@@@@@@@@@'); 
           //setproducts({...data})   
            
         
       
            getBasket({id:user.user.id}).then(data=>{
                setbasket(data?.basketItems)
                
          })
          setproductsLoad(true)
        })
       
        
        getAllBrands().then(data=>{
            setbrands(data)
     
            setbrandsLoad(true)
        })
        getCompare({id:user.user.compare}).then(data=>{
            console.log(data);
            setcompare(data?.compareItems)
       
        })
        getLoves({id:user.user.loves}).then(data=>{
            console.log(data);
            
          setloves(data?.lovesItems)
          setproductsLoad(true)
         })
        secheckedBrands(brand.checkedBrands)
    }, [])

   useEffect(() => {

    setsearchParamsLoader(true)
    if (searchParamsLoader) {
        let typeInformationConst = {}
        let informationValuesConst = {}
        let informationsConst:any = []
        let slideMouseOneConst:any = {}
        console.log('111111111');
    
        getAllproduct(searchParams.get("type"),null,null,null,null,null,null,null,null,null,null).then(data=>{
           if (data.count !== 0) {
            
           }
           setproducts({...data})
           settype(data.responce[0].type.name)
           let price:any = []
           data.responce.forEach((el:any)=>price.push(el.price))
           price = price.sort((a:any,b:any)=>a-b)
           setpriceRange([price[0],price[price.length-1]])
           
           for (const it of JSON.parse(data.responce[0].type.informations)) {
            let val:any = 'неважно'
            if (Object.entries(it)[0][1] == 'check') {
                val = []
            }else if(Object.entries(it)[0][1] == 'slider'){
                val = [0,0]
                slideMouseOneConst = {...slideMouseOneConst,[Object.entries(it)[0][0]]:[0,0]}
            }
            typeInformationConst = {...typeInformationConst,[Object.entries(it)[0][0]]:Object.entries(it)[0][1]}
            informationValuesConst = {...informationValuesConst,[Object.entries(it)[0][0]]:val}
           }

            for (const it of data.responceAll) {
                informationsConst = [...informationsConst,...it.information]
            
           }
       
           
           setinformations(informationsConst)
           Object.entries(typeInformationConst).map((el:any)=>{
            const type = el[1]
            const typeName = el[0]
            let arr:any = []
            arr = [...informationsConst.filter((fil:any)=>fil.name == typeName).map((ee:any)=>ee.description)]
            arr = arr.filter((fil:any,pos:any)=> arr.indexOf(fil) === pos)
           
            
            if (type == 'slider') {
                if(arr.length ===  1){
                    informationValuesConst = {...informationValuesConst,[typeName]:[0,Number(arr.sort((a:any,b:any)=>b-a)[0]) ]}
                    slideMouseOneConst = {...slideMouseOneConst, [typeName]:[0,Number(arr.sort((a:any,b:any)=>b-a)[0]) ]}
                }else{
                    informationValuesConst = {...informationValuesConst,[typeName]:[Number(arr.sort((a:any,b:any)=>a-b)[0]) ,Number(arr.sort((a:any,b:any)=>b-a)[0]) ]}
                    slideMouseOneConst = {...slideMouseOneConst, [typeName]:[Number(arr.sort((a:any,b:any)=>a-b)[0]) ,Number(arr.sort((a:any,b:any)=>b-a)[0]) ]}
                }
              
            }else if (type == 'check'){
            informationValuesConst = {...informationValuesConst,[typeName]:[...arr]}
            }else{
                arr.unshift('неважно')
                informationValuesConst = {...informationValuesConst,[typeName]:arr[0]} 
            }
           })
           setsliderMouseOn(slideMouseOneConst)
           setinformationValues(informationValuesConst) 
           settypeInformation(typeInformationConst)

           console.log(informationValuesConst,typeInformationConst,'@@@@@@@@@'); 
           //setproducts({...data})   
            
         
       
            getBasket({id:user.user.id}).then(data=>{
                setbasket(data?.basketItems)
                
          })
          setproductsLoad(true)
        })
       
        
        getAllBrands().then(data=>{
            setbrands(data)
     
            setbrandsLoad(true)
        })
        getCompare({id:user.user.compare}).then(data=>{
            console.log(data);
            setcompare(data?.compareItems)
       
        })
        getLoves({id:user.user.loves}).then(data=>{
            console.log(data);
            
          setloves(data?.lovesItems)
          setproductsLoad(true)
         })
        secheckedBrands(brand.checkedBrands)
    }
   
   }, [searchParams])
   
    useEffect(() => {
 
        console.log(products,((page * limit) - limit ),']iiiiii');
        setobserverLoader(true)
        if (observerLoader) {

   
            if (observerLoader && inView && (page +1) * limit < products.responceAll?.length) {
                //setproductsLoad(false)
                console.log('7777777777777777',inView,(((page + 1) * limit) - limit ) <= products.responceAll?.length);
                console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
                getAllproduct(searchParams.get("type"),page+1,limit,filterCatalog,checkedBrands,sortNumber,null,null,sort,informationValues,typeInformation).then(data=>{
                    console.log(data,'oop5555555555555555555');
                   setproducts({count:products.count,responce:[...products.responce,...data.responce],responceAll:products.responceAll})
                   //setproductsLoad(true)
                   setpage(page+1)
               })
            }
        }
       
       
       
      }, [inView])


    useEffect(() => {

        setsortLoader(true)
        if (sortLoader) {
        setproductsLoad(false)
        console.log('222222222222');
        console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
        getAllproduct(searchParams.get("type"),1,limit,filterCatalog,checkedBrands,sortNumber,null,null,sort,informationValues,typeInformation).then(data=>{
            console.log(sort,'oop5555555555555555555');
            setpage(1)
           setproducts({...data})
           setproductsLoad(true)
       })
        }
      
    }, [sort])
    
       
    useEffect(() => {
      

        setsortNumberLoader(true)
        if (sortNumberLoader) {
            setproductsLoad(false) 
            console.log('333333333333333');
           getAllproduct(searchParams.get("type"),1,limit,filterCatalog,checkedBrands,sortNumber,null,null,sort,informationValues,typeInformation).then(data=>{
                setproducts({...data})
                setproductsLoad(true)
                setpage(1)
            })
        }
      
    }, [sortNumber])

    useEffect(() => {

   
        setcheckedBrandsLoader((prev:any)=>prev+1)
        if(checkedBrandsLoader > 1){
            setproductsLoad(false)
            console.log('444444444444');
            
            getAllproduct(searchParams.get("type"),page,limit,filterCatalog,checkedBrands,sortNumber,null,null,sort,informationValues,typeInformation).then(data=>{
                setproducts({...data})
                setproductsLoad(true)
                setpage(1)
            })
        }
      
    }, [checkedBrands])

    useEffect(() => {
     
        setinformationValuesLoasder((prev:any)=>prev+1)

        
  if (informationValuesLoader > 1) {
    console.log('55555555555555');
    console.log('zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz');
            
    setproductsLoad(false)
    getAllproduct(searchParams.get("type"),1,limit,filterCatalog,checkedBrands,sortNumber,null,null,sort,informationValues,typeInformation).then(data=>{
       setproducts({...data})
       console.log(informationValues,typeInformation,'------uyuyuyuyu-222222');
       setproductsLoad(true)
       setpage(1)
   })
  }
         
         

    }, [informationValues])

    
    useEffect(() => {
     setfilterLoader(true)
     if (filterLoader) {
        setproductsLoad(false)
        console.log('666666666666');
        getAllproduct(searchParams.get("type"),1,limit,filterCatalog,checkedBrands,sortNumber,null,null,sort,informationValues,typeInformation).then(data=>{
            setproducts({...data})
            setproductsLoad(true)
            setpage(1)
        })
     }
    

     
    }, [filterCatalog])
    
      
    const putPriceValue = (event: Event,newValue:number | number[])=>{
        console.log(newValue,'jjk');
        
        setpriceValue(newValue as number[])
    } 

    const chooseBrand = (e:any)=>{
        if (brand.checkedBrands.includes(e)) {
            brand.setCheckedBrands([...brand.checkedBrands.filter((el:any)=>el!==e)])
            secheckedBrands(brand.checkedBrands)
        }else{
            brand.setCheckedBrands([...brand.checkedBrands,e])  
            secheckedBrands(brand.checkedBrands)
        }
     
        console.log(brand.checkedBrands,'hhuu');
        
    }
    const changeVal = (val:any,type:any,pos:any)=>{
        //setsliderMouseOn({...sliderMouseOn,[type]:sliderMouseOn[type].map((e:any,i:any)=>i === pos ? val : e )})

    }
  return (
   <div className="Catalog">
    <Navbar filterCatalog={filterCatalog} setfilterCatalog={setfilterCatalog}/>
    <div className="Catalog__container">
        <Nav>Главная / Каталог</Nav>
        <div className="Catalog__title">{type}</div>
        <div className="Catalog__text">Отложение, основываясь большей частью на сейсмических данных, не входит своими составляющими, что очевидно, в силы нормальных реакций связей, так же как и абразивный блеск. Следует отметить, что инфлюация значительно характеризует астатический батолит.</div>
        <div className="Catalog__brands brandsCatalog">
            <div className="brandsCatalog__title">Можно выбрать несколько брендов</div>
            {brandsLoad &&
             <div className="brandsCatalog__slider slider-brand-catalog">
             <div className="slider-brand-catalog__sliderCover">
                  
             <Swiper
         
         className='slider-brand-catalog__swiper'
         modules={[Navigation]}
         
         breakpoints={{
         
             991.98: {
               slidesPerView: 6,
               spaceBetween: 30,
               
             },
   
           }}  
         navigation={
           {
             prevEl: '.slider-brand-catalog__prevButton',
             nextEl: '.slider-brand-catalog__nextButton',
           }
         }

             

   spaceBetween={20}
   slidesPerView={4}
 
 >
     {brands.map((e:any,i:any)=>
        <SwiperSlide key={e.name}>
        <div onClick={()=>chooseBrand(e._id)} className={brand.checkedBrands.includes(e._id) ? "slider-brand-catalog__item item-slider-brand-catalog active" : "slider-brand-catalog__item item-slider-brand-catalog"}>
         <div className="item-slider-brand-catalog__boxshadow">
         <div className="item-slider-brand-catalog__cover">
             <div className="item-slider-brand-catalog__absolute">
             <div className="item-slider-brand-catalog__image">
             <img src={`${API_URL}/brands/${brands[i].image}`} alt=""/>
             </div>
             <div className="item-slider-brand-catalog__check _icon-check"></div>
             </div>
         </div>
         </div>
         
         
        </div>
       </SwiperSlide>
     )}

   
             </Swiper>
             </div>
            
             <div className="slider-brand-catalog__navigation">
            <div className="slider-brand-catalog__prevButton _icon-arrow-bottom"></div>
            <div className="slider-brand-catalog__nextButton _icon-arrow-bottom"></div>
             </div>
             <div className="slider-brand-catalog__spoiler">
                 <ProductSpoiler changeName={false} spoilerClass='brand'  >
                 <div className="slider-brand-catalog__spoilerName">Бренды</div>
                 {brands.map((e:any,i:any)=>
                   <div key={e.name} onClick={()=>chooseBrand(e._id)}  className={brand.checkedBrands.includes(e._id) ? "slider-brand-catalog__item-mobile mobile-item-slider-brand-catalog active" : "slider-brand-catalog__item-mobile mobile-item-slider-brand-catalog"}>
                   <div className="mobile-item-slider-brand-catalog__image">
                   <img src={`${API_URL}/brands/${brands[i].image}`} alt=""/>
                   </div>
                   <div className="mobile-item-slider-brand-catalog__check _icon-check"></div>
               </div>
                 )}
               
                
                 </ProductSpoiler>
             </div>
             
         </div>
         }
           
            
        </div>
        <div className="mainCatalog__count">Найдено <span>{productsLoad ? products.count : '0'} товаровя</span></div>
        <div className="Catalog__main mainCatalog">
        
            <div className="mainCatalog__left">
                <div className="mainCatalog__sort sort-main-catalog">
                <div className="sort-main-catalog__options">
                <Toggle value={toggle2} change={settoggle2} toggleClass='toogleLeft orig'>
                    <div onClick={()=>setsort('purchaseNumber')} className='mainCatalog__toggleButton'>По популярности</div>
                    <div onClick={()=>setsort('price')} className='mainCatalog__toggleButton'>По цене</div>
                    <div onClick={()=>setsort('rating')} className='mainCatalog__toggleButton'>По рейтингу</div>
                    <div onClick={()=>setsort('date')} className='mainCatalog__toggleButton'>По дате</div>
                </Toggle>
                <ProductSpoiler changeName={false}  spoilerClass='brand sort' >
                    <div>Сортировать по</div>
                   
                    <Toggle value={toggle2} change={settoggle2} toggleClass='toogleLeft'>
                    <div className='mainCatalog__toggleButton'>По популярности</div>
                    <div onClick={()=>setsort('price')} className='mainCatalog__toggleButton'>По цене</div>
                    <div onClick={()=>setsort('rating')} className='mainCatalog__toggleButton'>По рейтингу</div>
                    <div onClick={()=>setsort('date')} className='mainCatalog__toggleButton'>По дате</div>
                    </Toggle>
                  
                  
                </ProductSpoiler>
                </div>
                <div className="sort-main-catalog__rignt right-sort-main-catalog">
                 
                    
                    <Toggle value={toggle} change={settoggle} >
                    <div  onClick={()=>setsortNumber(1)} className= "right-sort-main-catalog__Arrow _top  _icon-arrow-bottom"></div>
                    <div  onClick={()=>setsortNumber(-1)}className="right-sort-main-catalog__Arrow _bottom  _icon-arrow-bottom"></div>
                    </Toggle>
                   
                </div>
                </div>
                <div className="mainCatalog__filterAccordion">
                    <AccordionOne setVisibleAccordion={setVisibleAccordionFiltr}>
                    <div>Фильтры</div>
                    <AccordionUser VisibleAll={VisibleAccordionFiltr}>
                        {Object.entries(typeInformation).map((el:any)=>{
   
                
   const type = el[1]
   const typeName = el[0]
   let arr:any = []
   arr = [...informations.filter((fil:any)=>fil.name == typeName).map((ee:any)=>ee.description)]
   arr = arr.filter((fil:any,pos:any)=> arr.indexOf(fil) === pos)

    if (type == 'radio') {
        return   <AccordionUserItem key={typeName}> 
        <div className='RadioGroup__name'>{typeName}</div>
        <RadioGroup  items={'неважно,' + arr.join(',')} name={typeName} value={informationValues[typeName]} change={(ru)=>setinformationValues((prev:any)=>({...prev,[typeName]:ru}))}  checked={0} nameVisible={false}/>
        </AccordionUserItem>
 
       
    }
    if (type == 'check') {
        return   <AccordionUserItem key={typeName}>
                <div className='RadioGroup__name'>{typeName}</div>
                <CheckBox items={arr.join(',')} name={typeName} value={informationValues[typeName]} change={(ru)=>setinformationValues((prev:any)=>({...prev,[typeName]:[...ru]}))}  checked={[0,1]} nameVisible={false}/>
        </AccordionUserItem>
 
     }
     if (type == 'slider') {
        return     <AccordionUserItem key={typeName}>
                       <div className='RadioGroup__name'>{typeName}</div>
                       <div className="right-main-catalog__slider slider-right-main-catalog">
         <Slider key={typeName}
                  getAriaLabel={() => 'Temperature range'}
                  value={sliderMouseOn[typeName]}
                  defaultValue={sliderMouseOn[typeName]}
                  onChange={(event: Event, value: number | number[], activeThumb: number)=>setsliderMouseOn({...sliderMouseOn,[typeName]:value})}
                  onChangeCommitted={(event: Event | React.SyntheticEvent<Element, Event>, value: number | number[])=>setinformationValues((prev:any)=>({...prev,[typeName]:value}))}
                  valueLabelDisplay="auto"
                  min={Number(arr.sort((a:any,b:any)=>a-b)[0])}
                  max={Number(arr.sort((a:any,b:any)=>b-a)[0])}
           />
         <div className="slider-right-main-catalog__sliderInputs">
             <input type='text' value={`От ${sliderMouseOn[typeName][0]}`} onChange={(e:any)=>changeVal(e.target.value,typeName,0)} className="slider-right-main-catalog__sliderInput"></input>
             <div className="slider-right-main-catalog__d">-</div>
             
             <input type='text' value={`До ${sliderMouseOn[typeName][1]}`} onChange={(e:any)=>changeVal(e.target.value,typeName,1)}  className="slider-right-main-catalog__sliderInput"></input>
             
         </div>
                        </div>
         </AccordionUserItem>
        
        
 }
   
})}
                   
                    </AccordionUser>
                    </AccordionOne>
            
                  
                </div>
                {productsLoad ?
                  <div className="mainCatalog__grid">
                  {products.responce?.map((e:any)=>
                  <ProductComponent key={e._id} data={e} basket={basket} loves={loves} compare={compare} inCompare = {compare?.find((el:any)=>el.product?._id == e._id) ? true : false} inBasket = {basket?.find((el:any)=>el.product?._id == e._id)  ? true : false} inLoves = {loves?.find((el:any)=>el.product?._id == e._id)  ? true : false}/>
                  )}
                    <div  ref={ref} className="mainCatalog__gridEnd"></div>
                    
                  </div>
                 :
                 <div className="mainCatalog__grid">
                    {Array(10).fill(0).map((e:any,i:any)=><Skeleton key={i} variant="rectangular" height={300} animation="wave"/>)}
       
                
                  </div>
                 }
              
            </div>
          
              <div className="mainCatalog__right right-main-catalog">
         
              {Object.entries(typeInformation).map((el:any)=>{
   
                
                  const type = el[1]
                  const typeName = el[0]
                  let arr:any = []
                  arr = [...informations.filter((fil:any)=>fil.name == typeName).map((ee:any)=>ee.description)]
                  arr = arr.filter((fil:any,pos:any)=> arr.indexOf(fil) === pos)
             
                   if (type == 'radio') {
            
                      return   <RadioGroup key={typeName} items={'неважно,' + arr.join(',')} name={typeName} value={informationValues[typeName]} change={(ru)=>setinformationValues((prev:any)=>({...prev,[typeName]:ru}))}  checked={1} nameVisible={true}/>
                   }
                   if (type == 'check') {
                    return   <CheckBox key={typeName}  items={arr.join(',')} name={typeName} value={informationValues[typeName]} change={(ru)=>setinformationValues((prev:any)=>({...prev,[typeName]:[...ru]}))}  checked={[0,1]} nameVisible={true}/>
                    }
                    if (type == 'slider') {
                        console.log();  
                       if (arr.length === 1 ) {
                         arr = [0,arr[0]]
                       }
                        return  <>
                        <div className="right-main-catalog__slider slider-right-main-catalog">
                        <div className="slider-right-main-catalog__name">Оптический Zoom</div>
                        <Slider  key={typeName} 
                                 getAriaLabel={() => 'Temperature range'}
                                 value={sliderMouseOn[typeName]}
                                 defaultValue={sliderMouseOn[typeName]}
                                 onChange={(event: Event, value: number | number[], activeThumb: number)=>setsliderMouseOn({...sliderMouseOn,[typeName]:value})}
                                 onChangeCommitted={(event: Event | React.SyntheticEvent<Element, Event>, value: number | number[])=>setinformationValues((prev:any)=>({...prev,[typeName]:value}))}
                                 valueLabelDisplay="auto"
                                 min={Number(arr.sort((a:any,b:any)=>a-b)[0])}
                                 max={Number(arr.sort((a:any,b:any)=>b-a)[0])}
                          />
                        <div className="slider-right-main-catalog__sliderInputs">
                            <input type='text' value={`От ${priceValue[0]}`} className="slider-right-main-catalog__sliderInput"></input>
                            <div className="slider-right-main-catalog__d">-</div>
                            
                            <input type='text' value={`До ${priceValue[1]}`} className="slider-right-main-catalog__sliderInput"></input>
                            
                        </div>
                        </div>
                        </>
                }
                  
              })}
           
           
            
             
          </div>
            
          
            
            
            
        </div>
        
    </div>
    <Footer/>
   </div>
   
  )
}

export default Catalog