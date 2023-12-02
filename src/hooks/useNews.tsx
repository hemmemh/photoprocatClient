import type React from 'react'
import { useState } from 'react'
import { addNews } from '../https/newsApi'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { newsSlice } from '../store2/reducers/NewsSlice'

const useNews = () => {
    const [fileImage, setFileImage] = useState<string | ArrayBuffer | null>(null)
    const [fileName, setFileName] = useState<string | null>('')
    const [fileDiv, setFileDiv] = useState<boolean>(false)
    const [file, setfile] = useState<File | null>(null)
    const [text, settext] = useState<string>('')
    const [title, settitle] = useState<string>('')
    const { news } = useAppSelector(state => state.reducer.news)
    const { setNews, setModalNews } = newsSlice.actions
    const dispatch = useAppDispatch()

    const fileload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        if (e.target.files && e.target.files.length > 0) {
            reader.readAsDataURL(e.target.files[0])
            setfile(e.target.files[0])
            reader.onloadend = () => {
                setFileImage(reader.result)
                setFileName(e.target.files && e.target.files[0].name)
                setFileDiv(true)
            }
        }
    }

    const clearFile = () => {
        setFileDiv(false)
        setFileImage(null)
        setFileName(null)
        setfile(null)
    }

    const sendNews = () => {
        if (title !== '' && text !== '' && file !== null) {
            const formaData = new FormData()
            formaData.append('title', title)
            formaData.append('text', text)
            formaData.append('image', file)
            addNews(formaData).then(data => {
                settitle('')
                settext('')
                setfile(null)
                setFileImage(null)
                setFileDiv(false)
                dispatch(setNews([...news, data]))
                dispatch(setModalNews(false))
            })
        } else {
            alert('недостаточно данных')
        }
    }

    return { fileload, clearFile, sendNews, fileImage, fileName, fileDiv, text, title, settext, settitle }
}

export default useNews
