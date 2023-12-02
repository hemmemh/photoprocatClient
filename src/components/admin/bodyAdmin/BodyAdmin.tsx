import Button2 from '../../UI/button2/Button2'
import './bodyAdmin.scss'
import useModalActive from '../../../hooks/useModalActive'

const BodyAdmin = () => {
    const setModalActive = useModalActive()

    return (
        <div className="Admin__container">
            <div className="Admin__body">
                <Button2 onClick={setModalActive(1)} className='buttonCart'>Создать тип</Button2>
                <Button2 onClick={setModalActive(2)} className='buttonCart'>Создать бренд</Button2>
                <Button2 onClick={setModalActive(3)} className='buttonCart'>Создать продукт</Button2>
            </div>
        </div>
    )
}

export default BodyAdmin
