import Button from '../../../UI/button/Button'

import { compareSlice } from '../../../../store2/reducers/CompareSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'

const ButtonComapre = () => {
    const { fold } = useAppSelector(state => state.reducer.compare)
    const { setFold } = compareSlice.actions
    const dispatch = useAppDispatch()
    const dispatchFold = () => {
        dispatch(setFold(!fold))
    }
    return (
        <div className="main-compare__button">
            <Button onClick={dispatchFold} className='compare g'>{fold ? 'Свернуть' : 'Показать все'}</Button>
        </div>
    )
}

export default ButtonComapre
