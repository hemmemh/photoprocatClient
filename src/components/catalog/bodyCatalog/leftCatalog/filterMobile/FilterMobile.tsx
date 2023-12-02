import { useAppSelector } from '../../../../../hooks/reduxHooks'
import AccordionUser from '../../../../UI/accordionUser/AccordionUser'
import AccordionUserItem from '../../../../UI/accordionUser/AccordionUserItem'
import PriceSort from '../../../../priceSort/PriceSort'
import RadioGroup from '../../../../radioGroup/RadioGroup'
import CheckBoxGroup from '../../../../checkBoxGroup/CheckBoxGroup'
import cls from './filterMobile.module.scss'
import Button2 from '../../../../UI/button2/Button2'
import SliderComponent from '../../../../sliderComponent/SliderComponent'

export const FilterMobile = () => {
    const { typeInformation, informations } = useAppSelector((state) => state.reducer.catalog)

    return (
        <div className={cls.filterAccordion}>
            <AccordionUser >
                <AccordionUserItem >
                    <Button2 className={cls.sortButton}>Фильтры</Button2>
                    <AccordionUser accordionClass='filter'>
                        {Object.entries(typeInformation).map((el: any) => {
                            const type = el[1]
                            const typeName = el[0]
                            let arr: any = []
                            arr = [...informations.filter((fil: any) => fil.name === typeName).map((ee: any) => ee.description)]
                            arr = arr.filter((fil: any, pos: any) => arr.indexOf(fil) === pos)

                            if (type === 'radio') {
                                return (

                                    <AccordionUserItem key={typeName}>
                                        <Button2 className={cls.sortButton}>{typeName}</Button2>
                                        <RadioGroup typeName={typeName} arr={arr}/>
                                    </AccordionUserItem>
                                )
                            }

                            if (type === 'check') {
                                return (
                                    <AccordionUserItem key={typeName}>
                                        <Button2 className={cls.sortButton}>{typeName}</Button2>
                                        <CheckBoxGroup typeName={typeName} arr={arr}/>
                                    </AccordionUserItem>
                                )
                            }

                            return (
                                <AccordionUserItem key={typeName}>
                                    <Button2 className={cls.sortButton}>{typeName}</Button2>
                                    <SliderComponent typeName={typeName} arr={arr}/>
                                </AccordionUserItem>
                            )
                        })}
                        <AccordionUserItem >
                            <Button2 className={cls.sortButton}>цена</Button2>
                            <PriceSort/>
                        </AccordionUserItem>
                    </AccordionUser>
                </AccordionUserItem>
            </AccordionUser>
        </div>
    )
}
