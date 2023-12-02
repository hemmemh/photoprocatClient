import './typeModal.scss'
import Input from '../../../UI/input/Input'
import useType from '../../../../hooks/useType'
import Button2 from '../../../UI/button2/Button2'
import MyFile from '../../../UI/myFile/MyFile'
export const TypeModal = () => {
    const { setname, fileImage, fileloadType, createBrandFun, name } = useType()

    return (
        <div className="adminModalType">

            <div className="adminModalType__input">
                <Input value={name} change={setname} inputClass='registration gv' placeholder='имя типа'/>
            </div>
            <div className="adminModalType__images">
                <div className="adminModalType__imageAdd">
                    <MyFile setValue={fileloadType}><Button2 className='buttonCart'>выбрать изображение</Button2></MyFile>
                </div>
                <div className="adminModalType__imagesItems">
                    {fileImage !== null &&
                    <div className="adminModalType__image">
                        <img src={fileImage.toString()} alt=""/>
                    </div>
                    }

                </div>

            </div>
            <Button2 onClick={createBrandFun} className='buttonCart'>Создать</Button2>

        </div>
    )
}
