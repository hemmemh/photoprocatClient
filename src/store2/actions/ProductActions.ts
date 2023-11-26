import jwtDecode from "jwt-decode";
import { addItemToBasket, getBasket, removeItemFromBasket } from "../../https/basketApi";
import { getAllBrands } from "../../https/brandsApi";
import { addItemToCompare, getCompare, removeItemFromCompare } from "../../https/compareApi";
import { addProductInLoves, getLoves, removeProductFromLoves } from "../../https/lovesApi";
import { addRaiting, createProduct, getAllproduct, getOneproduct } from "../../https/productApi";
import { refresh } from "../../https/userApi";
import { catalogSlice } from "../reducers/CatalogSlice";
import { navbarSlice } from "../reducers/NavBarSlice";
import { productSlice } from "../reducers/ProductSlice";
import { AppDispatch, store } from "../store";
import { adminSlice } from "../reducers/AdminSlice";
import { HOME_ROUTE } from "../../app/config/routs";
import { log } from "console";
import { ILovesItem } from "../../utils/interfaces";
import { userSlice } from "../reducers/UserSlice";



export const getAllInfo = (typeId:any)=> async (dispatch:AppDispatch)=>
{
  const currentState = store.getState();
const {priceValue,checkedBrands,products,sort,sortNumber,typeInformation,informationValues,page,limit,priceRange,minMaxPrice,user} = currentState.reducer.catalog
const {setBrands,setBrandsLoad,setCheckedBrands,setProducts,setProductsLoad,setBasket,setCompare,setLoves,setTypeInformation,setInformations,setInformationValues,setsliderMouseOn,setPage,setPriceRange,setMinMaxPrice,setType,setGridLoader,setPriceValue} = catalogSlice.actions
  try {
    const data =  await getAllproduct(typeId,page,limit,null,null,null,null,null,null,null,null)
    dispatch(setProducts({...data}))
    dispatch(setType(data.responce[0].type.name))
    const {setProductsLoad,setTypeInformation,setInformations,setInformationValues,setsliderMouseOn,setPriceRange,setMinMaxPrice,setPriceValue} = catalogSlice.actions
    let typeInformationConst = {}
    let informationValuesConst = {}
    let informationsConst:any = []
    let slideMouseOneConst:any = {}
    let price:any = []
    data.responceAll.forEach((el:any)=>price.push(Number(el.price)))
    price = price.sort((a:any,b:any)=>a-b)
    dispatch(setMinMaxPrice([price[0],price[price.length-1]]))
    dispatch(setPriceRange([price[0],price[price.length-1]]))
    dispatch(setPriceValue([price[0],price[price.length-1]]))
   
   
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

   dispatch(setInformations(informationsConst))
   
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

   dispatch(setsliderMouseOn(slideMouseOneConst))
   dispatch(setInformationValues(informationValuesConst))
   dispatch(setTypeInformation(typeInformationConst))
     

   

    const brands = await getAllBrands()
        dispatch(setBrands(brands))
        dispatch(setBrandsLoad(true))
  
        
        const basket = await getBasket({id:user.id})
        dispatch(setBasket(basket?.basketItems))  


    const compare = await getCompare({id:user.compare})
        dispatch(setCompare(compare?.compareItems))
        



    const loves = await getLoves({id:user.loves})
        dispatch(setLoves(loves?.lovesItems))
        dispatch( setProductsLoad(true))
    dispatch(setCheckedBrands(checkedBrands))

  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setProductsLoad(true))
  }
}

export const getProducts = (action:any[])=>async (dispatch:AppDispatch) => {
  const currentState = store.getState();

const {setBrands,setBrandsLoad,setCheckedBrands,setProducts,setProductsLoad,setBasket,setCompare,setLoves,setTypeInformation,setInformations,setInformationValues,setsliderMouseOn,setPage,setPriceRange,setMinMaxPrice,setType,setGridLoader,setPriceValue} = catalogSlice.actions
  dispatch(setProductsLoad(false))
  try {

const data = await getAllproduct(...action)
    dispatch(setPage(1))
    dispatch( setProducts({...data}))
 
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setProductsLoad(true))
  }

}

export const updateProducts = (action:any[])=>async (dispatch:AppDispatch) => {
  try {
    const currentState = store.getState();
    const {priceValue,checkedBrands,products,page,limit,priceRange,minMaxPrice,user} = currentState.reducer.catalog
    const {setProducts,setPage,setGridLoader,} = catalogSlice.actions
    dispatch(setGridLoader(true))
    const data = await getAllproduct(...action)
  
        dispatch(setPage(page+1))
        dispatch( setProducts({count:products.count,responce:[...products.responce,...data.responce],responceAll:products.responceAll}))
        dispatch(setGridLoader(false))

  } catch (error) {
    console.log(error);
  }


}
export const chooseBrand = (e:any)=>async (dispatch:AppDispatch) => {
  const currentState = store.getState();
  const {checkedBrands} = currentState.reducer.catalog
  const {setCheckedBrands} = catalogSlice.actions
  if (checkedBrands.includes(e)) {
    dispatch(setCheckedBrands([...checkedBrands.filter((el:any)=>el!==e)]))
}else{
    dispatch(setCheckedBrands([...checkedBrands,e])  )
}


}




export const getProduct = (id:string | undefined)=>async (dispatch:AppDispatch) => {
  const currentState = store.getState();
  const {user} = currentState.reducer.catalog
  const {setBasket,setCompare,setLoves} = catalogSlice.actions
  const {setInCompare,setInLoves,setInBasket,setProduct,setRaiting,setProductLoad} = productSlice.actions
  dispatch(setInBasket(false)) 
  dispatch(setInLoves(false)) 
  dispatch(setInCompare(false)) 
  setProductLoad(false)
try {


  const prod = await getOneproduct({id})
  dispatch(setProduct(prod))
  dispatch( setRaiting((prod.ratings.reduce((accumulator:any, currentValue:any)=>accumulator + currentValue.rate,0))/prod.ratings.length))

  const bask = await getBasket({id:user.id})


  if (  bask?.basketItems.find((e:any)=>e.product?._id === id))  dispatch(setInBasket(true)) 

  dispatch(setBasket(bask.basketItems))
           
  const comp = await getCompare({id:user.compare})

      if (comp?.compareItems.find((e:any)=>e.product?._id === id)) dispatch(setInCompare(true))
          
          dispatch(setCompare(comp.compareItems))
      
 
const love = await getLoves({id:user.loves})

      dispatch(setLoves(love.lovesItems))

      if (love?.lovesItems.find((e:any)=>e.product?._id === id))  dispatch(setInLoves(true))
      
          


} catch (error) {
  console.log(error);
} finally {
  dispatch(setProductLoad(true))
}

}





export const addRaitingToProduct = (id:string | undefined,raitingModal:number | null,sername:string,text:string,name:string)=>async (dispatch:AppDispatch) => {
  const currentState = store.getState();
  const navbar = currentState.reducer.navbar
  const {loaders,inBasket,product} = currentState.reducer.product
  const {user,basket} = currentState.reducer.catalog
  const {setLoaders,setInBasket,setRaiting,setProduct} = productSlice.actions
  const {setProducts} = navbarSlice.actions


  
  try {
    console.log('233');
    const prod = await getOneproduct({id})
    const data = await addRaiting({user:user.id,rate:raitingModal,product:id,name,sername,text})
    dispatch( setRaiting(((prod.ratings.reduce((accumulator:any, currentValue:any)=>accumulator + currentValue.rate,0)) + raitingModal )/(prod.ratings.length + 1)))
    dispatch(setProduct({...prod,ratings:[...prod.ratings,data]}))
  } catch (error) {
    console.log(error);
  }

}


export const refreshUser = ()=>async (dispatch:AppDispatch) => {
  const {setUser} = catalogSlice.actions
  const {setProducts,setCompare,setLoves} = navbarSlice.actions
  const {setLoaduser} = userSlice.actions
  try {
    dispatch(setLoaduser(true))
  const data = await refresh()
  const user:any = jwtDecode(data.refreshToken)
  dispatch(setUser(user))
  const basket = await getBasket({id:user.id})
  dispatch(setProducts(basket.basketItems.length))
  const compare = await getCompare({id:user.compare})
  dispatch(setCompare(compare.compareItems.length) )
  const loves = await getLoves({id:user.loves})
  dispatch(setLoves(loves.lovesItems.length) )
  localStorage.setItem('Auth','true')
 dispatch(setLoaduser(false))
  } catch (error) {
    localStorage.removeItem('Auth')
    console.log(error);
  }

}


export const addProduct = ()=>async (dispatch:AppDispatch) => {
  const currentState = store.getState();
  const {setName,setDescription,setPrice,setFiles,setBrand,setType,setFileImages} = adminSlice.actions
  const {brand,type,typeInformationProduct,name,description,price,files} = currentState.reducer.admin
  try {
    let bool = true

    typeInformationProduct.forEach((el:any) => {
        if (Object.values(el)[0] === '') bool = false
        
    })


if (name !== '' && description !== '' && price!== '' && bool === true && '_id' in type && '_id' in brand && files.length > 1) {
    const formaData = new FormData()
    formaData.append('name',name)
    formaData.append('description',description)
    formaData.append('price',price)
    formaData.append('typeId',type._id)
    formaData.append('brandId',brand._id)
    formaData.append('information',JSON.stringify(typeInformationProduct))
    files.forEach((f:any)=> formaData.append('image',f))
   

await createProduct(formaData)
    dispatch(setName(''))
    dispatch(setDescription(''))
    dispatch(setPrice(''))
   delete type._id
   delete brand._id
   dispatch(setFiles([]))
   dispatch(setBrand({name:'бренд'}))
   dispatch(setType({name:'тип'}))
   dispatch(setFileImages([]))
   window.location.replace(HOME_ROUTE);
   window.location.reload()

}else{
alert('недостаточно данных')
}
   
  } catch (error) {
    console.log(error);
  }

}



















