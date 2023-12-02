import useBrand from '../../../../hooks/useBrand'
import Input from '../../../UI/input/Input'
import Radio from '../../../UI/radio/Radio'
import '../../../../components/radioGroup/radioGroup.scss'
import './brandModal.scss'
import Button2 from '../../../UI/button2/Button2'
import { type ITypeInformation } from '../../../../utils/interfaces'

const items = ['radio', 'check', 'slider']

export const BrandModal = () => {
    const { setname, infoName, createInfo, senInfo, createTypeFun, descriptionName, setDescription, name, typeInformation } = useBrand()

    return (
        <div className="adminModal">
            <div className="adminModal__input">
                <Input value={name} change={setname} inputClass='registration gv' placeholder='имя типа'/>
            </div>
            <div className="adminModal__informations">
                <div className="adminModal__informationItems">
                    <Input value={infoName} change={senInfo} inputClass='registration gv' placeholder='имя характеристики'/>
                    {items.map((el: string) =>
                        <Radio key={el} id={el} setValue={(name: any) => { setDescription(name) }} value={descriptionName} name="items" className="radioFiltr">
                            <div className={'RadioGroup__check'}></div>
                            <div className={'RadioGroup__label'}>{el}</div>
                        </Radio>
                    )}

                </div>
                <div className="adminModal__informationSend">
                    <Button2 onClick={createInfo} className='buttonCart'>Создать характеристику</Button2>
                </div>
                <div className="adminModal__informationsS">
                    {typeInformation.map((el: ITypeInformation) => {
                        const name = Object.entries(el)[0][0]
                        const typeEl = String(Object.entries(el)[0][1])
                        return (
                            <div key={name} className="adminModal__information information">
                                <div className="information__name">Имя: {name}</div>
                                <div className="information__type">Тип: {typeEl}</div>

                            </div>

                        )
                    }

                    )}

                </div>

            </div>
            <Button2 onClick={createTypeFun} className='buttonCart'>Создать</Button2>
        </div>
    )
}
