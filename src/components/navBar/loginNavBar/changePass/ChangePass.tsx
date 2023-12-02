import { useState } from 'react'
import { useAppSelector } from '../../../../hooks/reduxHooks'
import useUpdatePassword from '../../../../hooks/useUpdatePassword'
import Input from '../../../UI/input/Input'
import Button2 from '../../../UI/button2/Button2'

export const ChangePass = () => {
    const [code, setcode] = useState<string>('')
    const [password, setpassword] = useState<string>('')
    const { modalStage } = useAppSelector((state) => state.reducer.navbar)
    const { updatePassword2 } = useUpdatePassword({ password, code })
    return (
        <div className={modalStage === 2 ? 'newPasswordModal active' : 'newPasswordModal'}>
            <div className="newPasswordModal__title">Введите код и новый пароль</div>
            <div className="newPasswordModal__inputs">
                <Input value={code} change={setcode} inputClass='registration' placeholder='код'/>
                <Input value={password} change={setpassword} inputClass='registration' placeholder='пароль'/>
            </div>
            <div className="newPasswordModal__button">
                <Button2 onClick={updatePassword2} className='buttonCart'>изменить пароль</Button2>
            </div>

        </div>
    )
}
