import Input from '../../../../UI/input/Input'

import { adminSlice } from '../../../../../store2/reducers/AdminSlice'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import MyTextArea from '../../../../UI/myTextArea/MyTextArea'
import { memo } from 'react'
import * as adminSelectors from '../../../selectors'
import MyNumber from '../../../../UI/myNumber/MyNumber'

export const ProductInputs = memo(() => {
    const { name, description, price } = useAppSelector(adminSelectors.admin)
    const { setName, setDescription, setPrice } = adminSlice.actions
    const dispatch = useAppDispatch()

    const setPricef = (f: any) => {
        if (parseInt(f) === Number(f) || f === '') dispatch(setPrice(f))
    }

    return (
        <div className="adminModalProduct__input">
            <div className="adminModalProduct__flex">
                <Input value={name} change={(e: any) => dispatch(setName(e))} inputClass='registration gv' placeholder='имя'/>
                <MyNumber setValue={setPricef} value={price} min={0} max={1000000} placeholder='цена' className='registration gv' />
            </div>
            <MyTextArea
                value={description}
                setValue={(e: any) => dispatch(setDescription(e)) }
                className='registration'
                placeholder='описание'/>

        </div>
    )
})
