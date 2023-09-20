import  { useState,useEffect,useRef,useContext } from 'react'
import Navbar from '../components/navBar/Navbar'
import Navigation from '../components/UI/navigation/Navigation'
import Toggle from '../components/UI/toggle/Toggle'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar, DateField } from '@mui/x-date-pickers';
import Footer from '../components/footer/Footer';
import Input from '../components/UI/input/Input';
import dayjs, { Dayjs } from 'dayjs';
import Button from '../components/UI/button/Button';
import AccordionUser from '../components/UI/accordionUser/AccordionUser';
import AccordionUserItem from '../components/UI/accordionUser/AccordionUserItem';
import { changeUser, logout } from '../https/userApi';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';
import { BASKET_ROUTE, HOME_ROUTE } from '../utils/routs';
import { addItemToBasket, getOrder, removeAll } from '../https/basketApi';
import { API_URL } from '../utils/config';
import { IOrderItem } from '../utils/interfaces';
const User = () => {
    const {user} = useContext(Context)
    const [toggle, settoggle] = useState<number>(0)
    const [calendar, setcalendar] = useState<boolean>(false)
    const [data, setdata] = useState<Dayjs | null>(dayjs(user.user.birthDate !== "" ? user.user.birthDate : '2022-04-17'))
    const [name, setname] = useState<string>(user.user.name)
    const [secondName, setsecondName] = useState<string>(user.user.sername)
    const [mail, setmail] = useState<string>(user.user.email)
    const [tell, settell] = useState<string>(user.user.tell)
    const [orders, setorders] = useState<Array<IOrderItem>>([])
    const calendarRef = useRef<any>()
    const calendarIcon = useRef<any>()

    const navigate = useNavigate()
    useEffect(() => {
        getOrder({id:user.user.orders}).then(data=>{
            console.log(data.ordersItems,'ee');
            
            setorders(data.ordersItems)})
        document.addEventListener('click',onCalendar)
        document.querySelector('.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root input')?.addEventListener('click',onCalendar)
        return () => document.removeEventListener('click',onCalendar);

    }, [])
    const onCalendar = (e:any)=>{
        if (e.target !== calendarIcon.current) {
            if ( !calendarRef.current?.contains(e.target) ) {
                setcalendar(false)
              
        }
        
        }
    }
    const onCalendarFocus = ()=>{
       const a=  document.querySelector('.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root')
       a?.querySelector('input')?.focus()
    }

    const onLogout = ()=>{
        logout().then(e=>{
            user.setuser({})
            navigate(HOME_ROUTE)
        })
    }
    const onSave = ()=>{
        if (toggle === 0) {
            changeUser({id:user.user.id,name,serName:secondName,birthDate:data,tell}).then(data=>{
                console.log(data,'1111');
            })
        }else if (toggle === 1 ){
            navigate(HOME_ROUTE)
        }
       
    }

    const repeat = (products:any)=>{
        removeAll({id:user.user.basket}).then(data=>{
        }).then(()=>{
            for (const it of products) {
                addItemToBasket({basketId:user.user.basket,product:it.product._id,count:it.amount}).then(data=>{
                    console.log(data);
                })
            }
        }).then(()=>{
            navigate(BASKET_ROUTE)
            window.location.reload()
        })
     
      
    }
  return (
    <div className="User">
        <Navbar/>
        <div className="User__container">
            <Navigation navigationClass='user'>Главная / Личный кабинет</Navigation>
            <div className="User__title"><span>Личный</span> Кабинет</div>
            <div className="User__main ">
                <div className="User__toggle toggle-user">
                    <Toggle value={toggle} change={settoggle} toggleClass='user'>
                        <div className="toggle-user__item">Мои данные</div>
                        <div className="toggle-user__item">История заказов</div>
                        <div onClick={onLogout} className="toggle-user__item">Выйти</div>
                    </Toggle>
                </div>
                <div className={toggle === 0 ? "User__body body-user active" : "User__body body-user"}>
                    <Input value={secondName} change={setsecondName} placeholder='Фамилия *'/>
                    <Input value={name} change={setname}  placeholder='Имя *'/>
                    <div  onClick={onCalendarFocus} className="body-user__gg">
                    <Input value={data} change={setdata}  lock={true} inputClass='origin g' placeholder='Дата рождения'>
                        <div  onClick={()=>setcalendar((prev:any)=>!prev)} className="body-user__calendar-icon">
                        <img ref={calendarIcon} src={require("../images/user/calendar.png")} alt=""/>
                        </div>
                        <div ref={calendarRef} className={calendar ? "body-user__calendar active" : "body-user__calendar"}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                               <DateCalendar   value={data}     onChange={(newValue) => setdata(newValue)} />
                        </LocalizationProvider>
                        </div>
                        
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                             label="Controlled field"
                             value={data}
                             onChange={(newValue) => setdata(newValue)}
                        />
                         </LocalizationProvider>
                    </Input>
                    </div>
                    
                
                    <Input value={tell} change={settell}  placeholder='Мобильный *'/>
                    <Input value={mail} change={setmail}  placeholder='E-mail *'/>
                 
                </div>
                <div className={toggle === 1 ? "User__orders orders-user active" : "User__orders orders-user"}>
                    <div className="orders-user__top top-orders">
                        <div className="top-orders__item">Заказ</div>
                        <div className="top-orders__item">Дата</div>
                        <div className="top-orders__item">Кол-во</div>
                        <div className="top-orders__item">Сумма</div>
                        <div className="top-orders__item"></div>
                        <div className="top-orders__item"></div>
                       
                    </div>
                    <div className="orders-user__order order">
                        <AccordionUser accordionClass='user'>
                            {orders.map((el:any)=>
                            <AccordionUserItem>
                            <div className="order__top">
                        <div className="order__number">{el.number}</div>
                        <div className="order__date">{el.date}</div>
                        <div className="order__date"></div>
                        <div className="order__price">{el.price}</div>
                        <div className="order__button">
                        <Button onClick={()=>repeat(el.ordersItemProduct)} className='user-orders g'>Повторить</Button>
                         </div>
                        <div className="order__arrow _icon-arrow-bottom"></div>
                        
                            </div>
                            <div className="order__product-cover">
                                {el.ordersItemProduct.map((es:any)=>
                                   <div key={es.product._id} className="order__product product-order">
                                   <div className="product-order__item">
                                       <div className="product-order__image-cover">
                                       <div className="product-order__image">
                                       <img src={`${API_URL}/${es.product.name}/${JSON.parse(es.product.images)[0]}`} alt=""/>
                                       </div>
                                       </div>
                                       
                                       
                                       <div className="product-order__info">
                                           <div className="product-order__name">{es.product.name}</div>
                                           <div className="product-order__brand">{es.product.brand.name}</div>
                                           
                                       </div>
                                   </div>
           
                                 
                                   <div className="product-order__item">
                                       <div className="product-order__count">{es.amount}</div>
                                   </div>
                                   <div className="product-order__item">
                                       <div className="product-order__price">{es.amount * es.product.price} Р</div>
                                       
                                   </div>
                                   <div className="product-order__item">
                                   </div>
                                   <div className="product-order__item">
                                   </div>
                                       </div>
                                       )}
                         
                        
                            </div>
                            </AccordionUserItem>
                        )}
                            
                           
                        </AccordionUser>
                      
                        
                    </div>
                    
                </div>
                
                <div className="User__submit">
                    <Button onClick={onSave} className='user g'>{toggle === 0 ? "Сохранить" : "Главная"}</Button>
                </div>
                
            </div>
            
        </div>
        <Footer/>
    </div>
    
  )
}

export default User