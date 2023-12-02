import Input from '../../UI/input/Input'
import { Modal } from '../../UI/modal/Modal'
import useComment from '../../../hooks/useComment'
import { newsSlice } from '../../../store2/reducers/NewsSlice'
import { useAppDispatch, useAppSelector } from '../../../hooks/reduxHooks'
import Button2 from '../../UI/button2/Button2'
import MyTextArea from '../../UI/myTextArea/MyTextArea'

const CommentModal = () => {
    const { modalCooment } = useAppSelector(state => state.reducer.news)
    const { setModalCooment } = newsSlice.actions
    const dispatch = useAppDispatch()

    const disptachComment = (e: boolean) => {
        dispatch(setModalCooment(e))
    }

    const { addCommentToNews, setname, setsername, settextComment, sername, textComment, name } = useComment()

    return (
        <Modal active={modalCooment} setActive={disptachComment} modalClass='raiting'>
            <div className="RaitingModal">
                <div className="RaitingModal__top">
                    <Input value={name} change={setname} inputClass='registration gv' placeholder='Имя  *'/>
                    <Input value={sername} change={setsername} inputClass='registration gv' placeholder='Фамилия  *'/>
                </div>
                <div className="RaitingModal__text">
                    <MyTextArea value={textComment} setValue={settextComment} placeholder='отзыв' className='RaitingModal__textarea'/>

                </div>
                <div className="RaitingModal__button">
                    <Button2 onClick={addCommentToNews} className='buttonCart'>Отправить</Button2>
                </div>

            </div>

        </Modal>
    )
}

export default CommentModal
