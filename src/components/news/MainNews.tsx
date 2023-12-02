import BodyNews from './bodyNews/BodyNews'
import RaitingModal from './raitingModal/NewsModal'
import CommentModal from './commentModal/CommentModal'
import Navigation from '../UI/navigation/Navigation'
import { newsSlice } from '../../store2/reducers/NewsSlice'
import { useAppDispatch } from '../../hooks/reduxHooks'
import './news.scss'
import Button2 from '../UI/button2/Button2'
const MainNews = () => {
    const { setModalNews } = newsSlice.actions
    const dispatch = useAppDispatch()

    const dispatchModal = () => {
        dispatch(setModalNews(true))
    }
    return (
        <div className="News">
            <div className="News__container">
                <Navigation navigationClass='news'>Главная / Новости компании</Navigation>
                <div className="News__title"><span>Новости</span> Компании</div>
                <div className="News__button"><Button2 onClick={dispatchModal} className='buttonCart'>добавить новость</Button2></div>
                <BodyNews/>
            </div>
            <RaitingModal/>
            <CommentModal/>
        </div>
    )
}

export default MainNews
