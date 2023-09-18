import React,{useRef, useState,useEffect} from 'react'
import Navbar from '../components/navBar/Navbar'
import Footer from '../components/footer/Footer'
import Button from '../components/UI/button/Button'
import { Modal } from '../components/UI/modal/Modal'
import Input from '../components/UI/input/Input'
import { createType, getAllTypes } from '../https/typesApi'
import RadioGroup from '../components/UI/radioGroup/RadioGroup'
import { createBrand, getAllBrands } from '../https/brandsApi'
import ProductSpoiler from '../components/UI/productSpoiler/ProductSpoiler'
import { createProduct } from '../https/productApi'
import { set } from 'mobx'
import { Navigate, useNavigate } from 'react-router-dom'
import { ADMIN_ROUTE, HOME_ROUTE } from '../utils/routs'



const Admin = () => {
    const [modal, setmodal] = useState(false)
    const [modalSection, setmodalSection] = useState(1)
    const [name, setname] = useState('')
    const [typeInformation, settypeInformation] = useState<any>([])
    const [typeInformationProduct, settypeInformationProduct] = useState<any>([])
    const [infoName, setinfoName] = useState('неважно')
    const [descriptionName, setDescriptionName] = useState('radio')
    const [files, setfiles] = useState<any>([])
    const [file, setfile] = useState<any>(null)
    const [fileImages, setfileImages] = useState<any>([])
    const [fileImage, setfileImage] = useState<any>(null)
    const [fileDiv, setfileDiv] = useState(false)
    const [fileDiv2, setfileDiv2] = useState(false)
    const [description, setdescription] = useState('')
    const [price, setprice] = useState<any>(0)
    const inputRef = useRef<any>()
    const inputRef2 = useRef<any>()
    const [brands, setbrands] = useState([])
    const [types, settypes] = useState([])
    const [brand, setbrand] = useState<any>({name:'бренд'})
    const [type, settype] = useState<any>({name:'тип'})
    const [changeDescriptionLoader, setchangeDescriptionLoader] = useState(false)
    const sliders = useRef<any>([])
    const navigate = useNavigate()
    const senInfo = (name:any)=>{
        setinfoName(name)
    }
    const setDescription = (name:any)=>{
        setDescriptionName(name)
        if (name === 'radio') {
            setinfoName('')
        }
        if (name === 'check') {
            setinfoName('')
        }
        if (name === 'slider') {
            setinfoName('')
        }
    }
    useEffect(() => {
      getAllTypes().then(data=>{
        console.log(data);
        settypes(data)
        
      })
      getAllBrands().then(data=>{
        console.log(data);
        setbrands(data)
        
      })
    }, [])
    
    const  setModalActive = (e:any)=>{
        setmodalSection(e)
        setmodal(true)
    }
    const createTypeFun = ()=>{
        if (typeInformation.length !== 0 && name !=='') {
            createType({name,informations:JSON.stringify(typeInformation)}).then(data=>{
                console.log(data);
                settypeInformation([])
                setname('')
                navigate(HOME_ROUTE)
                window.location.reload()
            })
        }else{
            alert('недостаточно данных')
        }
      
       
    }
    const createBrandFun = ()=>{
        if ( name !=='' && file!== null) {
            const formaData = new FormData()
            formaData.append('name',name)
      
            formaData.append('image',file)
           
            
    
        createBrand(formaData).then(data=>{
        if (name !== '' && file!=null) {
                console.log(data);
        }
    
            setname('')
            setfile(null)
            setfileImage(null)
            navigate(HOME_ROUTE)
            window.location.reload()
        })
        }else{
            alert('недостаточно данных')
        }
      
       
    }
    const createInfo = ()=>{
        settypeInformation((prev:any)=>[...prev,{[infoName]:descriptionName}])
        setinfoName('')
        setDescriptionName('')
    }
    const fileload = (e:any)=>{
        let reader = new FileReader();
       
        reader.readAsDataURL(e.target.files[0]);
        setfiles([...files,e.target.files[0]])
        reader.onloadend = ()=>{
            setfileImages([...fileImages,reader.result])
            setfileDiv(true)
               
        }
console.log(files);

    }
   
     const fileloadType = (e:any)=>{
        let reader = new FileReader();
       
        reader.readAsDataURL(e.target.files[0]);
        setfile(e.target.files[0])
        reader.onloadend = ()=>{
            setfileImage(reader.result)
            setfileDiv2(true)
               
        }

    }
   
     const activateInput=()=>{
        inputRef.current.click()
     }

     const activateInput2=()=>{
        inputRef2.current.click()
     }

     const addtypeInformationProduct = (e:any)=>{
        console.log(e);
        
        let a:any = []
        console.log( JSON.parse(e.informations),'pp');
        
        JSON.parse(e.informations).forEach((el:any)=>{
            if (Object.values(el)[0] ==='radio') {
                a = [...a,{[Object.keys(el)[0]]:''}]
            }
            if (Object.values(el)[0] ==='check') {
                a = [...a,{[Object.keys(el)[0]]:''}]
            }
            if (Object.values(el)[0] ==='slider') {
                sliders.current =[...sliders.current,Object.keys(el)[0]]
                a = [...a,{[Object.keys(el)[0]]:'1'}]
            }
        }
            )
        console.log(a,'pooo');
      
        settypeInformationProduct(a)
        settype(e)

     }
     const setInformationProductf = (e:any,el:any)=>{
        settypeInformationProduct([...typeInformationProduct.map((m:any)=>{
            if (Object.keys(m)[0] == el) {
                if (sliders.current.includes(Object.keys(m)[0])) {
                    if (parseInt(e) == Number(e) || e == '' ) {
                        return {[Object.keys(m)[0]]:e}
                    }else{
                        return m
                    }
                }else{
                    return {[Object.keys(m)[0]]:e}
                }
               
            }
            else{
                return m
            }
        })])
        
      
     }
     const setBrandf = (e:any)=>{

        setbrand(e)
     }
    const setPricef = (f:any)=>{
        if (parseInt(f) == Number(f) || f == '' ) {
            setprice(f)
        }
    }
     const addProduct = ()=>{
        let bool = true

        typeInformationProduct.forEach((el:any) => {
            if (Object.values(el)[0] === '') {
                bool = false
            }
        });
    if (name !== '' && description !== '' && price!== '' && bool === true && '_id' in type && '_id' in brand && files.length > 1) {
        const formaData = new FormData()
        formaData.append('name',name)
        formaData.append('description',description)
        formaData.append('price',price)
        formaData.append('typeId',type._id)
        formaData.append('brandId',brand._id)
        formaData.append('information',JSON.stringify(typeInformationProduct))
        files.forEach((f:any)=> formaData.append('image',f))
       

    createProduct(formaData).then(data=>{
       setname('')
       setdescription('')
       setprice('')
       delete type._id
       delete brand._id
       setfiles([])
       setbrand({name:'бренд'})
       settype({name:'тип'})
       setfileImages([]) 
       navigate(HOME_ROUTE)
       window.location.reload()
    })
    }else{
alert('недостаточно данных')
    }
        
     
     }
   
  return (
  <div className="Admin">
    <Navbar/>
    <div className="Admin__container">
        <div className="Admin__body">
            <Button onClick={()=>setModalActive(1)} className='basket g'>Создать тип</Button>
            <Button onClick={()=>setModalActive(2)} className='basket g'>Создать бренд</Button>
            <Button onClick={()=>setModalActive(3)} className='basket g'>Создать продукт</Button>
        </div>
    </div>
    <Footer/>
    <Modal active={modal} modalClass='admin' setActive={setmodal}>
        {modalSection === 1 ?
        <div className="adminModal">
         
                <div className="adminModal__input">
                    <Input value={name} change={setname} inputClass='registration gv' placeholder='имя типа'/>
                </div>
                <div className="adminModal__informations">
                    <div className="adminModal__informationItems">
                    <Input value={infoName} change={(e:any)=>senInfo(e)} inputClass='registration gv' placeholder='имя характеристики'/>
                    <RadioGroup RadioGroupClass='origin g' items={'radio,check,slider'} name={'тип характеристики'} value={descriptionName} change={(name:any)=>setDescription(name)}  checked={1} nameVisible={true}/>
                    </div>
                    <div className="adminModal__informationSend">
                    <Button onClick={createInfo} className='basket g'>Создать характеристику</Button>
                    </div>
                    
                </div>
                
                <Button onClick={createTypeFun} className='basket g'>Создать</Button>
        
            
        </div>
        : modalSection === 2 ?
        <div className="adminModalType">
         
        <div className="adminModalType__input">
            <Input value={name} change={setname} inputClass='registration gv' placeholder='имя типа'/>
        </div>
        <div className="adminModalType__images">
            <div className="adminModalType__imageAdd">
            <input ref={inputRef}  onChange={(e:any)=>fileloadType(e)} type="file" className="adminModalType__file" />
             <Button onClick={activateInput} className='basket g'>выбрать изображение</Button>
            </div>
            <div className="adminModalType__imagesItems">
              {fileImage !== null &&
               <div className="adminModalType__image">
               <img src={fileImage} alt=""/>
            </div>
            }  
             
                
            </div>
            
      
        </div>
        <Button onClick={createBrandFun} className='basket g'>Создать</Button>

    
         </div>
       : 
       <div className="adminModalProduct">
         
       <div className="adminModalProduct__input">
           <Input value={name} change={setname} inputClass='registration gv' placeholder='имя'/>
           <Input value={description} change={setdescription} inputClass='registration gv' placeholder='описание'/>
           <Input value={price} change={(ff:any)=>setPricef(ff)} inputClass='registration gv' placeholder='цена'/>
       </div>
       <div className="adminModalProduct__spoilers">
        <ProductSpoiler>
            <div className="adminModalProduct__spoilerName">{type.name}</div>
            {types.map((el:any)=><div onClick={()=>addtypeInformationProduct(el)} className="adminModalProduct__spoilerItem">{el.name}</div>)}
        </ProductSpoiler>
        <ProductSpoiler >
            <div className="adminModalProduct__spoilerName">{brand.name}</div>
            {brands.map((el:any)=><div onClick={()=>setBrandf(el)} className="adminModalProduct__spoilerItem">{el.name}</div>)}
        </ProductSpoiler>
       </div>
       <div className="adminModalProduct__typeChoose">
    
        {typeInformationProduct.map((el:any)=>
        
        <div className="adminModalProduct__typeChooseItem">
            <div className="adminModalProduct__text">{Object.keys(el)[0]}</div>
            <Input value={Object.values(el)[0]} change={(e:any)=>setInformationProductf(e,Object.keys(el)[0])} inputClass='registration gv' placeholder='имя типа'/>
        </div>
        )}
       </div>
       
       <div className="adminModalProduct__images">
           <div className="adminModalProduct__imageAdd">
           <input ref={inputRef2}  onChange={(e:any)=>fileload(e)} type="file" className="adminModalType__file" />
            <Button onClick={activateInput2} className='basket g'>выбрать изображение (минимум 2)</Button>
           </div>
           <div className="adminModalProduct__imagesItems">
             {fileImages.length !== 0 &&
             fileImages.map((f:any)=>
             <div className="adminModalProduct__image">
             <img src={f} alt=""/>
          </div>
          ) 
            
           }  
            
               
           </div>
           
     
       </div>
       <Button onClick={addProduct} className='basket g'>Создать</Button>

   
        </div>
        }
    </Modal>
  </div>
  
  )
}

export default Admin