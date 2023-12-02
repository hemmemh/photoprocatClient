import { useAppSelector } from '../../../../../hooks/reduxHooks'

import RadioGroup from '../../../../radioGroup/RadioGroup'
import CheckBoxGroup from '../../../../checkBoxGroup/CheckBoxGroup'
import SliderComponent from '../../../../sliderComponent/SliderComponent'
import { type IInfo, type IInformation } from '../../../../../utils/interfaces'

export const FiltrsCatalog = () => {
    const { typeInformation, informations } = useAppSelector((state) => state.reducer.catalog)

    return (
        <>
            {Object.entries(typeInformation).map((el: [string, IInfo]) => {
                console.log(informations, '12')

                const type = el[1]
                const typeName = el[0]
                let arr: Array<string | number> = []
                arr = [...informations.filter((fil: IInformation) => fil.name === typeName).map((ee: IInformation) => ee.description)]
                arr = arr.filter((fil: string | number, pos: number) => arr.indexOf(fil) === pos)

                if (type === 'radio') {
                    return (
                        <div key={typeName} className="GroupCover">
                            <div className="GroupCover__name">{typeName}</div>
                            <RadioGroup typeName={typeName} arr={arr}/>
                        </div>

                    )
                }
                if (type === 'check') {
                    return (
                        <div key={typeName} className="GroupCover">
                            <div className="GroupCover__name">{typeName}</div>
                            <CheckBoxGroup typeName={typeName} arr={arr}/>

                        </div>

                    )
                }
                if (arr.length === 1) {
                    arr = [0, arr[0]]
                }
                return <>
                    <div key={typeName} className="right-main-catalog__slider  slider-right-main-catalog ">
                        <div className='GroupCover__name'>{typeName}</div>
                        <SliderComponent arr={arr} typeName={typeName}/>
                    </div>
                </>
            })}
        </>
    )
}
