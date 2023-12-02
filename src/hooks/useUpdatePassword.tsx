import { navbarSlice } from '../store2/reducers/NavBarSlice'
import { forgetPassword, forgetPassword2 } from '../https/userApi'
import { useAppDispatch } from './reduxHooks'

interface UpdatePassword {
    email?: string
    password?: string
    code?: string

}
interface returnUpdatePassword {
    updatePassword: () => void
    updatePassword2: () => void
}
const useUpdatePassword = ({ email = '', password = '', code = '' }: UpdatePassword): returnUpdatePassword => {
    const dispatch = useAppDispatch()
    const { setLoginModal, setLoader, setPassSucc, setModalStage } = navbarSlice.actions

    const updatePassword = () => {
        dispatch(setLoader(true))
        forgetPassword({ email }).then(data => {
            dispatch(setModalStage(2))
        }).catch(data => {
            console.log(data)
            dispatch(setLoader(false))
            alert('неверный mail')
        }).finally(() => {
            dispatch(setLoader(false))
        })
    }
    const updatePassword2 = () => {
        dispatch(setLoader(true))

        forgetPassword2({ password, code }).then(data => {
            dispatch(setLoginModal(false))
            dispatch(setPassSucc(true))

            console.log(data)
            setTimeout(() => {
                dispatch(setPassSucc(false))
            }, 3000)
        }).catch(data => {
            console.log(data)
            dispatch(setLoader(false))
            alert('неверен код')
        }).finally(() => {
            dispatch(setLoader(false))
        })
    }

    return { updatePassword, updatePassword2 }
}

export default useUpdatePassword
