import React, { useEffect, useState,useContext, useRef } from 'react'
import { Swiper, SwiperSlide, } from 'swiper/react';
import 'swiper/css';
import "swiper/css/navigation";
import { Navigation } from 'swiper';
import Nav from '../components/UI/navigation/Navigation'
import ProductSpoiler from '../components/UI/productSpoiler/ProductSpoiler';
import { CircularProgress, Skeleton, Slider} from '@mui/material';
import RadioGroup from '../components/UI/radioGroup/RadioGroup';
import CheckBox from '../components/UI/checkBox/CheckBox';
import Navbar from '../components/navBar/Navbar';
import Footer from '../components/footer/Footer';
import AccordionUser from '../components/UI/accordionUser/AccordionUser';
import AccordionUserItem from '../components/UI/accordionUser/AccordionUserItem';
import AccordionOne from '../components/UI/accordionOne/AccordionOne';
import Toggle from '../components/UI/toggle/Toggle';
import { getAllBrands } from '../https/brandsApi';
import { API_URL } from '../utils/config';
import { Context } from '..';
import { getAllproduct } from '../https/productApi';
import ProductComponent from '../components/ProductComponent';
import { getBasket } from '../https/basketApi';
import { getCompare } from '../https/compareApi';
import { getLoves } from '../https/lovesApi';
import { useSearchParams } from 'react-router-dom';
import useIntersectionObserver from '../hooks/UseIntersectionObserver';
import { useInView } from 'react-intersection-observer';
import { IBasketItem, IBrand, ICompareItem, ILovesItem, IProducts } from '../utils/interfaces';

import { observer } from "mobx-react-lite";
import Loader from '../components/UI/loader/Loader';
const Catalog = () => {
 
    const [priceValue, setpriceValue] = useState<number[]>([10,20])
    const [VisibleAccordionFiltr, setVisibleAccordionFiltr] = useState<boolean>(true)
    const [toggle, settoggle] = useState<number>(0)
    const [toggle2, settoggle2] = useState<number>(0)
    const [brands, setbrands] = useState<Array<IBrand>>([])
    const [brandsLoad, setbrandsLoad] = useState<boolean>(false)
    const [checkedBrands, secheckedBrands] = useState<any>([])
    const [products, setproducts] = useState<IProducts>({count:0,responce:[],responceAll:[]})
    const [productsLoad, setproductsLoad] = useState<boolean>(false)
    const [sort, setsort] = useState<string>('purchaseNumber')
    const {brand} = useContext(Context)
    const [sortNumber, setsortNumber] = useState<any>(1)
    const {user} = useContext(Context)
    const [basket, setbasket] = useState<Array<IBasketItem>>([])
    const [compare, setcompare] = useState<Array<ICompareItem>>([])
    const [loves, setloves] = useState<Array<ILovesItem>>([])
    const [typeInformation, settypeInformation] = useState({})
    const [informations, setinformations] = useState<any>([])
    const [informationValues, setinformationValues] = useState<any>({})
    const [sliderMouseOn, setsliderMouseOn] = useState<any>({})
    const [searchParams, setSearchParams] = useSearchParams();
    const [sortLoader, setsortLoader] = useState<boolean>(false)
    const [sortNumberLoader, setsortNumberLoader] = useState<boolean>(false)
    const [checkedBrandsLoader, setcheckedBrandsLoader] = useState<number>(0)
    const [informationValuesLoader, setinformationValuesLoasder] = useState<number>(0)
  const [filterCatalog, setfilterCatalog] = useState<string>('')
  const [filterLoader, setfilterLoader] = useState<boolean>(false)
  const [page, setpage] = useState<number>(1)
  const [limit, setlimit] = useState<number>(3)
  const [observerLoader, setobserverLoader] = useState<boolean>(false)
  const [searchParamsLoader, setsearchParamsLoader] = useState<boolean>(false)
  const [priceRange, setpriceRange] = useState<Array<number>>([0,10])
  const [type, settype] = useState<string>('')
  const [gridLoader, setgridLoader] = useState<boolean>(false)
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  });
    useEffect(() => {
        let typeInformationConst = {}
        let informationValuesConst = {}
        let informationsConst:any = []
        let slideMouseOneConst:any = {}

        getAllproduct(searchParams.get("type"),page,limit,null,null,null,null,null,null,null,null).then(data=>{
        console.log(data);
        
           setproducts({...data})
           settype(data.responce[0].type.name)
           let price:any = []
           data.responce.forEach((el:any)=>price.push(el.price))
           price = price.sort((a:any,b:any)=>a-b)
           setpriceRange([price[0],price[price.length-1]])
           
           for (const it of JSON.parse(data.responce[0].type.informations)) {
            console.log(it,'ss');
            
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
            setcompare(data?.compareItems)
       
        })
        getLoves({id:user.user.loves}).then(data=>{
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
        getAllproduct(searchParams.get("type"),null,null,null,null,null,null,null,null,null,null).then(data=>{
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
            setcompare(data?.compareItems)
       
        })
        getLoves({id:user.user.loves}).then(data=>{
          setloves(data?.lovesItems)
          setproductsLoad(true)
         })
        secheckedBrands(brand.checkedBrands)
    }
   
   }, [searchParams])
   
    useEffect(() => {
        setobserverLoader(true)
        if (observerLoader) {

   
            if (observerLoader && inView &&  products.responce?.length < products.responceAll?.length) {
                setgridLoader(true)
                getAllproduct(searchParams.get("type"),page+1,limit,filterCatalog,checkedBrands,sortNumber,null,null,sort,informationValues,typeInformation).then(data=>{
                   setproducts({count:products.count,responce:[...products.responce,...data.responce],responceAll:products.responceAll})
                   setpage(page+1)
                   setgridLoader(false)
               })
            }
        }
       
       
       
      }, [inView])


    useEffect(() => {

        setsortLoader(true)
        if (sortLoader) {
        setproductsLoad(false)
        getAllproduct(searchParams.get("type"),1,limit,filterCatalog,checkedBrands,sortNumber,null,null,sort,informationValues,typeInformation).then(data=>{
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
    setproductsLoad(false)
    getAllproduct(searchParams.get("type"),1,limit,filterCatalog,checkedBrands,sortNumber,null,null,sort,informationValues,typeInformation).then(data=>{
       setproducts({...data})
       setproductsLoad(true)
       setpage(1)
   })
  }
    }, [informationValues])

    
    useEffect(() => {
     setfilterLoader(true)
     if (filterLoader) {
        setproductsLoad(false)
        getAllproduct(searchParams.get("type"),1,limit,filterCatalog,checkedBrands,sortNumber,null,null,sort,informationValues,typeInformation).then(data=>{
            setproducts({...data})
            setproductsLoad(true)
            setpage(1)
        })
     }
    

     
    }, [filterCatalog])
    
      
 

    const chooseBrand = (e:any)=>{
        if (brand.checkedBrands.includes(e)) {
            brand.setCheckedBrands([...brand.checkedBrands.filter((el:any)=>el!==e)])
            secheckedBrands(brand.checkedBrands)
        }else{
            brand.setCheckedBrands([...brand.checkedBrands,e])  
            secheckedBrands(brand.checkedBrands)
        }
        
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
        <div className="mainCatalog__count">Найдено <span>{productsLoad && products.count ? products.count : '0'} товара(ов)</span></div>
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
                 { gridLoader && <div className="Catalog__gridLoader"><CircularProgress /></div>
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
                        <div className="slider-right-main-catalog__name">{typeName}</div>
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

export default observer(Catalog) 