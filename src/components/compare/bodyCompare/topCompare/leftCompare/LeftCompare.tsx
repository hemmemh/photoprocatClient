import { useAppDispatch } from '../../../../../hooks/reduxHooks'
import { removeByType } from '../../../../../store2/actions/CompareActions'

const LeftCompare = () => {
    const dispatch = useAppDispatch()

    const dispatchRemoveByType = () => {
        dispatch(removeByType())
    }

    return (
        <div className="main-compare__top-left">
            <div onClick={dispatchRemoveByType} className="main-compare__clear _icon-delete">Очистить</div>
            <div className="main-compare__item">Модель Фотоаппарата</div>
        </div>
    )
}

export default LeftCompare
