import { useEffect, useRef, useState } from 'react'
import Input from '../../UI/input/Input'
import { registrationSlice } from '../../../store2/reducers/RegistrationSlice'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar, DateField, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs, { type Dayjs } from 'dayjs'
import { changePassword, onSetMail } from '../../../store2/actions/RegistrationActions'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'

const BodyRegistration = () => {
    const calendarIcon = useRef<HTMLImageElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)
    const [calendar, setcalendar] = useState<boolean>(false)

    const { secondName, name, mail, data, password, tell, validationEmail, validationPassword } = useAppSelector(state => state.reducer.registration)
    const { setData, setName, setSecondName, setTell } = registrationSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        document.addEventListener('click', onCalendar)
        document.querySelector('.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root input')?.addEventListener('click', onCalendar)
        return () => { document.removeEventListener('click', onCalendar) }
    }, [])

    const onCalendar = (e: any) => {
        if (e.target !== calendarIcon.current && !calendarRef.current?.contains(e.target)) setcalendar(false)
    }

    const dispatchName = (e: string) => {
        dispatch(setName(e))
    }

    const dispatchMail = (e: string) => {
        dispatch(onSetMail(e))
    }

    const dispatchTell = (e: string) => {
        dispatch(setTell(e))
    }

    const dispatchPassWord = (e: string) => {
        dispatch(changePassword(e))
    }

    const dispatchData = (el: Dayjs | null) => {
        el && dispatch(setData(el.toString()))
    }
    const onSetCalendar = () => {
        setcalendar((prev: any) => !prev)
    }

    return (
        <div className="Registration__body">
            <Input value={secondName} change={setSecondName} inputClass='registration' placeholder='Фамилия *'/>
            <Input value={name} change={dispatchName} inputClass='registration' placeholder='Имя *'/>
            <Input value={mail} change={dispatchMail} inputClass={validationEmail ? 'registration' : 'registration act'} placeholder='E-mail *'/>
            <Input value={dayjs(data)} change={dispatchData} inputClass='registration g' lock={true} placeholder='Дата рождения'>
                <div onClick={onSetCalendar} className="Registration__calendar-icon">
                    <img ref={calendarIcon} src={require('../../../images/user/calendar.png')} alt=""/>
                </div>
                <div ref={calendarRef} className={calendar ? 'Registration__calendar active' : 'Registration__calendar'}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar value={dayjs(data)} onChange={dispatchData} />
                    </LocalizationProvider>
                </div>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateField
                        label="Controlled field"
                        value={dayjs(data)}
                        onChange={dispatchData}
                    />
                </LocalizationProvider>
            </Input>
            <Input value={password} change={dispatchPassWord} inputClass={validationPassword ? 'registration' : 'registration act'} placeholder='Пароль'/>
            <Input value={tell} change={dispatchTell} inputClass='registration' placeholder='Мобильный *'/>
        </div>
    )
}

export default BodyRegistration
