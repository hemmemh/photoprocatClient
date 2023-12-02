import { useRef, useState } from 'react'
import { changeActiveType, removeByType } from '../../../../store2/actions/CompareActions'
import useItemsClick from '../../../../hooks/useItemsClick'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import './itemsComapre.scss'
import { type ICompareItem } from '../../../../utils/interfaces'
const ItemsCompare = () => {
    const { activeType, compareTypes } = useAppSelector(state => state.reducer.compare)
    const { compare } = useAppSelector(state => state.reducer.catalog)
    const dispatch = useAppDispatch()
    const actionRef = useRef<HTMLDivElement>(null)
    const actionRef2 = useRef<HTMLDivElement>(null)
    const [itemsView, setitemsView] = useState<boolean>(false)

    useItemsClick({ actionRef, actionRef2, setitemsView })

    const onSetItemView = () => {
        setitemsView(prev => !prev)
    }

    const dispatchByType = () => {
        dispatch(removeByType())
    }

    const dispatchChangeActiveType = (string: string) => () => {
        dispatch(changeActiveType(string))
    }
    return (
        <div className="Compare__items items-compare">
            <div ref={actionRef2} className="items-compare__cover" onClick={onSetItemView}>
                <div className={itemsView ? 'items-compare__action active' : 'items-compare__action'}> <span></span></div>
            </div>

            <div onClick={dispatchByType} className="items-compare__delete _icon-delete"></div>

            <div ref={actionRef} className={itemsView ? 'items-compare__body active' : 'items-compare__body'}>
                {compareTypes.map((el: string) =>
                    <div
                        key={el}
                        onClick={dispatchChangeActiveType(el)}
                        className={activeType === el ? 'items-compare__item active' : 'items-compare__item'}>
                        {el} ({compare.filter((ell: ICompareItem) => ell.product.type.name === el).length})
                    </div>)
                }
            </div>

        </div>
    )
}

export default ItemsCompare
