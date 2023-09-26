import React, { useCallback, useEffect, useRef, useState,useContext, FC } from 'react'
import useCheckMobileScreen from '../../hooks/DetectMobileHook'
import Button from '../UI/button/Button'
import { Modal } from '../UI/modal/Modal'
import Input from '../UI/input/Input'
import CheckBox from '../UI/checkBox/CheckBox'
import { useLocation, useNavigate, useNavigation } from 'react-router-dom'
import { ADMIN_ROUTE, BASKET_ROUTE, CATALOG_ROUTE, COMPARE_ROUTE, HOME_ROUTE, LOVES_ROUTE, NEWS_ROUTE, REGISTRATION_ROUTE, USER_ROUTE } from '../../utils/routs'
import { forgetPassword, forgetPassword2, login } from '../../https/userApi'
import jwtDecode from 'jwt-decode'
import { Context } from '../..'
import { EMAIL_REGEXP, PASSWORD_REGEX } from '../../utils/config'
import Loader from '../UI/loader/Loader'
import { getAllTypes } from '../../https/typesApi'
import { observer } from "mobx-react-lite";

interface button{
    filterCatalog?:any
    setfilterCatalog?:any
 }

const Navbar:FC<button>  = ({setfilterCatalog}) => {
    const [menu, setmenu] = useState<boolean>(false)
    const [search, setsearch] = useState<boolean>(false)
    const [navBarActive, setnavBarActive] = useState<boolean>(false)
    const isMobile = useCheckMobileScreen()
    const spoilerRef = useRef<HTMLDivElement>(null)
    const navbarRef = useRef<HTMLDivElement>(null)
    const menuIconRef = useRef<HTMLDivElement>(null)
    const [pass, setpass] = useState<string[]>([])
    const [loginModal, setloginModal] = useState<boolean>(false)
    const [modalStage, setmodalStage] = useState<number>(0)
    const [mail, setmail] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const [code, setcode] = useState<string>('')
    const [validationEmail, setvalidationEmail] = useState<boolean>(true)
    const [validationPassword, setvalidationPassword] = useState<boolean>(true)
    const [validationError, setvalidationError] = useState<boolean>(false)
    const [validationErrorText, setValidationErrorText] = useState<string[]>([])
    const [passSucc, setpassSucc] = useState<boolean>(false)
    const [loader, setloader] = useState<boolean>(false)
    const [types, settypes] = useState<string[]>([])
    const [filter, setfilter] = useState<string>('')
    const [filterTime, setfilterTime] = useState<ReturnType<typeof setTimeout>>()
    const {user} = useContext(Context)
    const {navbar} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    

    const addClick = useCallback(

        (e:any) => {
           
            if (!spoilerRef.current?.contains(e.target) && e.target !== menuIconRef.current) {
                setmenu(false)
               
            }
        },
        [],
      )

      useEffect(() => {
        
        document.addEventListener('click',addClick)
        window.addEventListener('scroll', onScroll)
        
        getAllTypes().then(data=>{
            settypes(data)
        })

        return () =>{ 
            document.removeEventListener('click', addClick)
            window.removeEventListener('scroll',onScroll)}

    }, [])

    
   useEffect(() => {
    if (loginModal === false) {
        setmodalStage(0)
        setmail('')
        setpassword('')
        setcode('')
    }else{
        setmail('')
        setpassword('')
        setcode('')
    }
   }, [loginModal])
   
   useEffect(() => {

    
    if (menu && window.innerWidth <= 767.98) {
      document.body.classList.add('hidden')
    }else{
      document.body.classList.remove('hidden')
    }
  }, [menu])

    const onScroll = useCallback(
        () => {
          const scrollTop = window.scrollY;
          const offset = navbarRef.current?.offsetHeight || 0
          if (scrollTop>=offset /6) {
            setnavBarActive(true)
          }else{
            setnavBarActive(false)
          }
        },
        [],)


    const onLogin = ()=>{
        if (validationPassword && validationEmail) {
            login({mail,password}).then(e=>{
                console.log(jwtDecode(e.refreshToken));
                user.setuser(jwtDecode(e.refreshToken))
                setloginModal(false)
            }).catch(e=>{
                alert('неверен логин или пароль')
            })
        }else{
            if (!validationEmail) {
                !validationErrorText.includes('mail') && setValidationErrorText([...validationErrorText,'mail'])
            }
            if (!validationPassword) {
                !validationErrorText.includes('password') && setValidationErrorText([...validationErrorText,'password'])
            }
            setvalidationError(true)
        }
      
    }

    const onSetMail = (e:any)=>{
        setmail(e)
        if (!EMAIL_REGEXP.test(e) && e !=='' ) {
            setvalidationEmail(false)
         
          }else{
          
            setvalidationEmail(true)
        
          }
    }

    const changePassword = (password:any)=>{
        setpassword(password)
       
        if (!PASSWORD_REGEX.test(password) && password !=='' ) {
          setvalidationPassword(false)
         
        }else{
    
          setvalidationPassword(true)
        }
    }
    const updatePassword = ()=>{
        setloader(true)
        forgetPassword({email:mail}).then(data=>{
            setmodalStage(2)
            console.log(data);
            
        }).catch(data=>{
            console.log(data);
            setloader(false)
            alert('неверный mail')
        }).finally(()=>{
            setloader(false)
        })
    }
    const updatePassword2 = ()=>{
        setloader(true)
        forgetPassword2({password,code}).then(data=>{
            setloginModal(false)
            setpassSucc(true)
            console.log(data);
            setTimeout(() => {
                setpassSucc(false)
            }, 3000);
        }).catch(data=>{
            console.log(data);
            setloader(false)
            alert('неверен код')
        }).finally(()=>{
            setloader(false)
        })
    }
    const setfilterTimeOn = (e:any)=>{
        setfilter(e)
        if (filterTime) {
            clearTimeout(filterTime)
        }
        setfilterTime(setTimeout(() => {
            setfilterCatalog(e)
        }, 1000))

       
   
       
      
    }
  return (
    <div ref={navbarRef} className={navBarActive ? "Navbar active" : "Navbar"}>
        <div className="Navbar__cover">
            <div className="Navbar__container">
            <div className="Navbar__body">
                <div ref={menuIconRef} onClick={()=>setmenu(prev=>!prev)} className="Navbar__menu menu">
                    <button  type="button" className={menu ?"menu__icon icon-menu active" :"menu__icon icon-menu"}><span></span></button>
                </div>
                <div  className="Navbar__logo">
                    <div onClick={()=>navigate(HOME_ROUTE)} className="Navbar__image">
                        {isMobile 
                        ?
                        <img src={require("../../images/navbar/logo-mobile.png")} alt=""/>
                        :
                        <img src={require("../../images/navbar/logo.png")} alt=""/>
                    }
                    
                    </div>
                    
                  
                </div>
                <div className="Navbar__navigation navigationNavbar">
                    <div className="navigationNavbar__item">О компании</div>
                    <div   className="navigationNavbar__item">Правила</div>
                    <div onClick={()=>navigate(NEWS_ROUTE)} className="navigationNavbar__item">Новости</div>
                    <div className="navigationNavbar__item">Контакты</div>
                    <div onClick={()=>navigate(ADMIN_ROUTE)} className="navigationNavbar__item">Админ</div>
                    
                </div>
                <div className="menu__shedule">
                    <a className="menu__sheduleTel" href="tel:+74951703918">+7 495 170-39-18</ a>
                    <div className="menu__sheduleText">Круглосуточно</div>
                </div>
                
                
                <div className="menu__actions actionsMenu">
                    <div onClick={()=>navigate(LOVES_ROUTE)} className="actionsMenu__action _icon-star"></div>
                    <div onClick={()=>navigate(COMPARE_ROUTE)} className="actionsMenu__action _icon-compare">{navbar.compares !== 0 && <span className='actionsMenu__span'>{navbar.compares}</span> }</div>
                    <div onClick={()=>navigate(BASKET_ROUTE)} className="actionsMenu__action _icon-cart">{navbar.products !== 0 &&<span className='actionsMenu__span'>{navbar.products}</span>}</div>
                </div>
                <div className="menu__right rightMenu">
                    <div onClick={()=>location.pathname === `${CATALOG_ROUTE}` && setsearch(prev=>!prev)} className="rightMenu__action _icon-search"></div>
                    <div onClick={()=> Object.keys(user.user).length === 0 ? setloginModal(true) : navigate(USER_ROUTE)} className={user.user.id ? "rightMenu__action active _icon-cabinet" : "rightMenu__action _icon-cabinet"}></div>
                </div>
                 <div ref={spoilerRef} className={menu ? "Navbar__catalog catalogNavbar active" : "Navbar__catalog catalogNavbar"}>
                 <div className="catalogNavbar__left">
                   <div className="catalogNavbar__name"><span>•</span>Каталог</div>
                    <div className="catalogNavbar__items">
                        {types.map((el:any)=><div key={el.name} onClick={()=>navigate({pathname:CATALOG_ROUTE,search:`?type=${el._id}`})}className="catalogNavbar__item">{el.name}</div>)}
                    </div>
                     </div>
                    
                    <div className="catalogNavbar__right">
                        <div className="catalogNavbar__item_two">О компании</div>
                        <div className="catalogNavbar__item_two">Правила</div>
                        <div onClick={()=>navigate(NEWS_ROUTE)}   className="catalogNavbar__item_two">Новости</div>
                        <div className="catalogNavbar__item_two">Контакты</div>
                        <div onClick={()=>navigate(ADMIN_ROUTE)} className="catalogNavbar__item_two">Админ</div>
                    </div>
                    
                 </div>
            
                   
            </div>
         
            </div>
            {isMobile 
            ?
            <div className={search ?"Navba__searchBlockMobile searchBlockMobile active" : "Navbar__searchBlockMobile searchBlockMobile"}>
        <div className="searchBlockMobile__container">
            <div className="searchBlockMobile__body">   
            <div className="searchBlockMobile__search">
                <input type="text" value={filter} onChange={(e:any)=>setfilterTimeOn(e.target.value)} className="searchBlockMobile__text" placeholder='Начните поиск'/>
                <div className="searchBlockMobile__icon _icon-search"></div>
            </div>
            <div onClick={()=>setsearch(false)} className="searchBlockMobile__exit"></div>
            
            </div>
        </div>
        
            </div>
            :
            <div className={search ?"Navba__searchBlock searchBlock active" : "Navbar__searchBlock searchBlock"}>
                    <div className="searchBlock__container">
                        <div className="searchBlock__body">   
                            <input value={filter} onChange={(e:any)=>setfilterTimeOn(e.target.value)}  type="text" className="searchBlock__text" placeholder='Начните поиск'/>
                            <Button>Приступить к поиску</Button>
                        </div>
                    </div>
                    
            </div>}
        </div>
 
            <Modal modalClass='login' active={loginModal} setActive={setloginModal}>
                <div className={modalStage===0 ? "login-modal__body active" : "login-modal__body"}>
                    <div className="login-modal__title">Войдите в свой аккаунт</div>
                    <div className="login-modal__google"></div>
                    <div className="login-modal__inputs">  
                        <Input value={mail} change={onSetMail} inputClass={validationEmail ? 'registration tr' : "registration tr act"} placeholder='Логин'/>
                        <Input value={password} change={changePassword} inputClass={validationPassword ? 'registration tr' : "registration tr act"} placeholder='Пароль'/>
                    </div>
             
                    <div onClick={()=>setmodalStage(1)} className="login-modal__pass">Вспомнить пароль?</div>
            
                    <div className="login-modal__buttons">
                        <Button onClick={onLogin} className='login-modal g'>Войти</Button>
                        <Button onClick={()=>navigate(REGISTRATION_ROUTE)} className='reg-modal g' >Регистрация</Button>
                    </div>
                    
     
                    
                </div>
                <div className={modalStage===1 ?"passwordModal active" : "passwordModal"}>
                    <div className="passwordModal__title">Введите email</div>
                    <div className="passwordModal__input">
                    <Input value={mail} change={setmail} inputClass='registration' placeholder='email'/>
                    </div>
                    <div className="passwordModal__button">
                    <Button onClick={updatePassword} className='login-modal g'>Продолжить</Button>
                    </div>
                    
                      
                      
                </div>
                <div className={modalStage===2 ?"newPasswordModal active" : "newPasswordModal"}>
                    <div className="newPasswordModal__title">Введите код и новый пароль</div>
                    <div className="newPasswordModal__inputs">
                        <Input value={code} change={setcode} inputClass='registration' placeholder='код'/>
                        <Input value={password} change={setpassword} inputClass='registration' placeholder='пароль'/>
                    </div>
                    <div className="newPasswordModal__button">
                    <Button onClick={updatePassword2} className='login-modal g'>изменить пароль</Button>
                    </div>
                    
                      
                </div>
                {validationError && <div className="login-modal__error">
                {`Ошибка в написании ${validationErrorText.join(', ')}` }
                </div>}
                
            </Modal>
            
        {passSucc &&<div className="Registration__successfullReg">пароль успешно изменен</div>}
        {loader &&
           <div className="Registration__loader">
           <Loader/>
           </div>
           }
     
    
    </div>
    
  )
}

export default observer(Navbar) 