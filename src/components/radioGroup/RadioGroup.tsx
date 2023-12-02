import Radio from '../UI/radio/Radio'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import { catalogSlice } from '../../store2/reducers/CatalogSlice'
import './radioGroup.scss'

const RadioGroup = ({ arr, typeName }: { arr: any[], typeName: string }) => {
    const { informationValues } = useAppSelector((state) => state.reducer.catalog)
    const dispatch = useAppDispatch()
    const { setInformationValues } = catalogSlice.actions

    const dispatchInformationValues = (ru: string) => {
        dispatch(setInformationValues({ ...informationValues, [typeName]: ru }))
    }

    return (
        <div className="RadioGroup">
            <Radio className="radioFiltr" id={'неважно'} name={typeName} setValue={dispatchInformationValues} key={'все'} value={informationValues[typeName]} >
                <div className={'RadioGroup__check'}></div>
                <div className={'RadioGroup__label'}>все</div>
            </Radio>
            {arr.map((el: string) =>
                <Radio className="radioFiltr" id={el} name={typeName} setValue={dispatchInformationValues} key={el} value={informationValues[typeName]} >
                    <div className={'RadioGroup__check'}></div>
                    <div className={'RadioGroup__label'}>{el}</div>
                </Radio>
            )}
        </div>
    )
}

export default RadioGroup
