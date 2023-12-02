import { useCallback } from 'react'
import { adminSlice } from '../store2/reducers/AdminSlice'
import { useAppDispatch } from './reduxHooks'

const useModalActive = () => {
    const { setModal, setModalSection } = adminSlice.actions
    const dispatch = useAppDispatch()

    const setModalActive = useCallback(
        (number: number) => () => {
            dispatch(setModalSection(number))
            dispatch(setModal(true))
        },
        []
    )

    return setModalActive
}

export default useModalActive
