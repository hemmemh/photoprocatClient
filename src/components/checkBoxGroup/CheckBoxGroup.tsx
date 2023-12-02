import CheckBox from '../UI/checkBox/CheckBox'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { catalogSlice } from '../../store2/reducers/CatalogSlice'
import './checkBoxGroup.scss'
import { type IInformationValues } from '../../utils/interfaces'

const CheckBoxGroup = ({ arr, typeName }: { arr: Array<string | number>, typeName: keyof IInformationValues }) => {
    const { informationValues } = useAppSelector((state) => state.reducer.catalog)
    const dispatch = useAppDispatch()
    const { setInformationValues } = catalogSlice.actions
    return (
        <div className="CheckBoxGroup">
            {arr.map((el: string | number) =>
                <CheckBox
                    key={el}
                    value={informationValues[typeName] as Array<string | number>}
                    change={(ru) => dispatch(setInformationValues({ ...informationValues, [typeName]: ru }))}
                    id={el}
                    className="checkBoxFiltr">
                    <div className={'CheckBox__check'}></div>
                    <div className={'CheckBox__label'}>{el}</div>
                </CheckBox>
            )}
        </div>
    )
}

export default CheckBoxGroup
