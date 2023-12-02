import { useState } from 'react'
import { addComment } from '../https/newsApi'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { newsSlice } from '../store2/reducers/NewsSlice'
import { type INews } from '../utils/interfaces'

const useComment = () => {
    const { user } = useAppSelector(state => state.reducer.catalog)
    const { newsId, news } = useAppSelector(state => state.reducer.news)
    const { setNews, setModalCooment } = newsSlice.actions
    const [name, setname] = useState<string>(user.name)
    const [sername, setsername] = useState<string>(user.sername)
    const [textComment, settextComment] = useState<string>('')
    const dispatch = useAppDispatch()

    const addCommentToNews = () => {
        if (name !== '' && sername !== '' && textComment !== '') {
            addComment({ name, sername, text: textComment, news: newsId }).then(data => {
                let thisNews = [...news]

                thisNews = thisNews.map((el: INews) => {
                    if (el._id === newsId) {
                        const el2 = JSON.parse(JSON.stringify(el))
                        el2.comments.push(data)
                        return el2
                    }
                    return el
                })
                dispatch(setNews(thisNews))
                dispatch(setModalCooment(false))
            })
        } else {
            alert('недостаточно данных')
        }
    }

    return { setname, setsername, settextComment, addCommentToNews, sername, textComment, name }
}

export default useComment
