import React,{useState,useRef,useEffect} from 'react'
import Navbar from '../components/navBar/Navbar'
import Navigation from '../components/UI/navigation/Navigation'
import Input from '../components/UI/input/Input'
import Button from '../components/UI/button/Button'
import Footer from '../components/footer/Footer'
import { DateCalendar, DateField, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { registration } from '../https/userApi'
import { EMAIL_REGEXP, PASSWORD_REGEX } from '../utils/config'
import { HOME_ROUTE } from '../utils/routs'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/UI/loader/Loader'


const Registration = () => {
    const [calendar, setcalendar] = useState(false)
    const [data, setdata] = useState<Dayjs | null>(dayjs('2022-04-17'))
    const [name, setname] = useState('')
    const [secondName, setSecondName] = useState('')
    const [mail, setmail] = useState('')
    const [password, setpassword] = useState('')
    const [tell, settell] = useState('')
    const calendarIcon = useRef<any>()
    const calendarRef = useRef<any>()
    const [validationEmail, setvalidationEmail] = useState(true)
    const [validationPassword, setvalidationPassword] = useState(true)
    const [loader, setloader] = useState(false)
    const [successfullReg, setsuccessfullReg] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        document.addEventListener('click',onCalendar)
        document.querySelector('.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root input')?.addEventListener('click',onCalendar)
        return () => document.removeEventListener('click',onCalendar);
    }, [])
    const onCalendar = (e:any)=>{
        console.log(e.target);
        
        if (e.target !== calendarIcon.current) {
            if ( !calendarRef.current?.contains(e.target) ) {
                setcalendar(false)
              
        }
        
        }
    }
    const onRegistration  = ()=>{
        if (validationEmail && validationPassword && mail !=='' && password !=='') {
            setloader(true)
            registration({mail,password}).then(data=>{
                setsuccessfullReg(true)
                setTimeout(() => {
                    setsuccessfullReg(false)
                }, 3000);
            }).finally(()=>{
                setloader(false)
            })
        }else{
            alert('ошибка при регистрации')
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
  return (
  <div className="Registration">
    <Navbar/>
    <div className="Registration__container">
        <Navigation navigationClass='registration'>Главная / Регистрация</Navigation>
        <div className="Registration__title">Регистрация</div>
        <div className="Registration__body">
            <Input value={secondName} change={setSecondName} inputClass='registration' placeholder='Фамилия *'/>
            <Input value={name} change={setname} inputClass='registration' placeholder='Имя *'/>
            <Input value={mail} change={onSetMail} inputClass={validationEmail ?'registration' : 'registration act'} placeholder='E-mail *'/>
            <Input value={data} change={setdata} inputClass='registration g'  lock={true}  placeholder='Дата рождения'>
            <div  onClick={()=>setcalendar((prev:any)=>!prev)} className="Registration__calendar-icon">
                        <img ref={calendarIcon} src={require("../images/user/calendar.png")} alt=""/>
            </div>
                        <div ref={calendarRef} className={calendar ? "Registration__calendar active" : "Registration__calendar"}>
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
            <Input value={password} change={ changePassword} inputClass={validationPassword ?'registration' : 'registration act'}  placeholder='Пароль'/>
            <Input value={tell} change={settell} inputClass='registration'  placeholder='Мобильный *'/>
        </div>
        <div className="Registration__submit">
            <Button onClick={onRegistration} className='registration g'>Зарегистрироваться</Button>
        </div>
        
        
    </div>
    <Footer/>
    {loader &&
    <div className="Registration__loader">
    <Loader/>
</div>
}
{successfullReg &&
    <div className="Registration__successfullReg">Успешная регистрация</div>
    }
    
  </div>
  
  )
}

export default Registration