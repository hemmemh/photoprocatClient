import Button from '../../UI/button/Button'
import { onRegistration } from '../../../store2/actions/RegistrationActions'
import { useAppDispatch } from '../../../hooks/reduxHooks'

const SubmitRegistration = () => {
    const dispatch = useAppDispatch()

    const dispatchRegistration = () => {
        dispatch(onRegistration())
    }

    return (
        <div className="Registration__submit">
            <Button onClick={dispatchRegistration} className='registration g'>Зарегистрироваться</Button>
        </div>
    )
}

export default SubmitRegistration
