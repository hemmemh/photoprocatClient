import { catalogSlice } from '../../../../../../store2/reducers/CatalogSlice'
import { useAppDispatch, useAppSelector } from '../../../../../../hooks/reduxHooks'
import cls from './DirectionSort.module.scss'
import Radio from '../../../../../UI/radio/Radio'
import Button2 from '../../../../../UI/button2/Button2'

interface itemsType {
    direct: number
    class: string
}
const items = [{ direct: 1, class: '' }, { direct: -1, class: '_direct' }]
const DirectionSort = () => {
    const dispatch = useAppDispatch()
    const { setSortNumber } = catalogSlice.actions
    const { sortNumber } = useAppSelector((state) => state.reducer.catalog)
    return (
        <div className={cls.directSort}>
            {items.map((item: itemsType) =>
                <Radio id={item.direct} name="adawd" key={item.direct} value={sortNumber} setValue={() => dispatch(setSortNumber(item.direct))} >
                    <Button2 className={` ${cls.sortButton}  ${item.direct === sortNumber && cls.active} ${item.class && cls._direct}  _icon-arrow-bottom `}></Button2>
                </Radio>
            )}

        </div>
    )
}

export default DirectionSort
