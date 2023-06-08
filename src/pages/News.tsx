import React, { useRef, useState,useEffect,useContext} from 'react'
import Navbar from '../components/navBar/Navbar'
import Navigation from '../components/UI/navigation/Navigation'
import {Rating } from '@mui/material'
import Button from '../components/UI/button/Button'
import Button2 from '../components/UI/button2/Button2'
import Footer from '../components/footer/Footer'
import AccordionOne from '../components/UI/accordionOne/AccordionOne'
import { Modal } from '../components/UI/modal/Modal'
import Input from '../components/UI/input/Input'
import { addComment, addNews, getAllNews } from '../https/newsApi'
import { log } from 'console'
import { API_URL } from '../utils/config'
import Loader from '../components/UI/loader/Loader'
import { Context } from '..'
import { useNavigate } from 'react-router-dom'
import { HOME_ROUTE } from '../utils/routs'

const News = () => {
    const {user} = useContext(Context)
    const [modal, setmodal] = useState(false)
    const [modalCooment, setmodalCooment] = useState(false)
    const [name, setname] = useState(user.user.name)
    const [sername, setsername] = useState(user.user.name)
    const [text, settext] = useState('')
    const [textComment, settextComment] = useState('')
    const [title, settitle] = useState('')
    const [fileImage, setFileImage] = useState<any>(null)
    const [fileName, setFileName] = useState<any>('')
    const [fileDiv, setFileDiv] = useState(false)
    const [file, setfile] = useState<any>(null)
    const [news, setnews] = useState([])
    const [newsId, setnewsId] = useState(null)
    const [loader, setloader] = useState(false)
    const inputRef = useRef<any>()
    const navigate = useNavigate()
    useEffect(() => {
        getAllNews().then(data=>{
            console.log(data);
            setnews(data)
            setloader(true)
        })
    }, [])
    
    const sendNews = ()=>{
        if (title !== '' && text !== '' && file!== null) {
            const formaData = new FormData()
            formaData.append('title',title)
            formaData.append('text',text)
            formaData.append('image',file)
           addNews(formaData).then(data=>{
            settitle('')
            settext('')
            setfile(null)
            setFileImage(null)
            setFileDiv(false)
            navigate(HOME_ROUTE)
            window.location.reload()
            
           })
        }else{
            alert('недостаточно данных')
        }
      
        
    }
    const fileload = (e:any)=>{
        let reader = new FileReader();
       
        reader.readAsDataURL(e.target.files[0]);
        setfile(e.target.files[0])
        reader.onloadend = ()=>{
            setFileImage(reader.result)
            setFileName(e.target.files[0].name)
            setFileDiv(true)
               
        }

    }
    const clearFile = ()=>{
        console.log('6666');
        setFileDiv(false)
        setFileImage(null)
        setFileName(null)
        setfile(null)


     }
     const activateInput=()=>{
        inputRef.current.click()
     }
     const modalCommentId=(id:any)=>{
        setmodalCooment(true)
        setnewsId(id)
     }
     const addCommentToNews = ()=>{
        if (name !== '' && sername !== ''&& textComment !== '' ) {
       addComment({name,sername,text:textComment,news:newsId}).then(data=>{
        navigate(HOME_ROUTE)
        window.location.reload()
       })
     }else{
        alert('недостаточно данных')
    }
}
  return (
    <div className="News">
        <Navbar/>
        <div className="News__container">
            <Navigation navigationClass='news'>Главная / Новости компании</Navigation>
            <div className="News__title"><span>Новости</span> Компании</div>

            <div className="News__button"><Button onClick={()=>setmodal(true)} className='basket news g'>добавить новость</Button></div>
            <div className="News__body">
                <div className="News__main main-news">

                    {loader ? news.map((el:any)=>
                    {
                        const date = new Date(Number(el.date))
                        return(    <div className="main-news__new new-main">
                        <div className="new-main__image">
                        <img src={`${API_URL}/news/${el.image}`} alt=""/>
                        </div>
                        <div className="new-main__date">{date.toUTCString()}</div>
                        <div className="new-main__name">{el.title}</div>
                        <div className="new-main__text">{el.text}</div>
                        <div className="new-main__button">
                        <Button onClick={()=>modalCommentId(el._id)}  className='basket news2 g'>Добавить комментарий </Button>
                        </div>
                        
                        <div className="new-main__cooments comments-main">
                        <AccordionOne accordionClass='news'>
                            <div className="comments-main__value">{el.comments.length} комментариев</div>
                            <div className="comments-main__body">
                             {el.comments.map((com:any)=>
                               <div className="comments-main__item">
                               <div className="comments-main__name">{com.name} {com.sername}</div>
                               <div className="comments-main__text">{com.text}</div>
                           </div>
                           )}
                              
                            
                            </div>
                            </AccordionOne>
                            
                            
                        </div>
                        
                    </div>)
                    }
                   
                   )
                :
                <Loader/>}
                 
              
                </div>
                <div className="News__right right-news">
                    <div className="right-news__title">Популярные товары</div>
                    <div className="right-news__items">
                        <div className="right-news__item item-right">
                            <div className="item-right__image-cover">
                                <div className="item-right__image">
                                    <img src={require("../images/home/slider/1.png")} alt=""/>
                                </div>
                                
                            </div>
                            <div className="item-right__name">PowerShot SX620 HS</div>
                            <div className="item-right__brand">Canon</div>
                            <div className="item-right__price">От 1 850 Р</div>
                            <div className="item-right__rating">
                                <Rating/>
                            </div>
                            <div className="item-right__button">
                                <Button className='news g'>Подробнее</Button>
                            </div>
                            <div className="item-right__actions">
                                <div className="item-right__action _icon-compare"></div>
                                <div className="item-right__action _icon-star"></div>
                            </div>
                            
                        </div>
                        <div className="right-news__item item-right">
                            <div className="item-right__image-cover">
                                <div className="item-right__image">
                                    <img src={require("../images/home/slider/1.png")} alt=""/>
                                </div>
                                
                            </div>
                            <div className="item-right__name">PowerShot SX620 HS</div>
                            <div className="item-right__brand">Canon</div>
                            <div className="item-right__price">От 1 850 Р</div>
                            <div className="item-right__rating">
                                <Rating/>
                            </div>
                            <div className="item-right__button">
                                <Button className='news g'>Подробнее</Button>
                            </div>
                            <div className="item-right__actions">
                                <div className="item-right__action _icon-compare"></div>
                                <div className="item-right__action _icon-star"></div>
                            </div>
                            
                        </div>
                       
                    </div>
                    
                </div>
                
            </div>
            
        </div>
        <Modal active={modal} setActive={setmodal} modalClass='raiting'>
        <div className="RaitingModal">
            <div className="RaitingModal__top">
                <Input value={title} change={settitle} inputClass='registration gv' placeholder='Заголовок   *'/>
              
            </div>
            <div className="RaitingModal__text">
                <textarea value={text} onChange={(e)=>settext(e.target.value)} placeholder='текст' className='RaitingModal__textarea'>{text}</textarea>
            </div>
            <div className="RaitingModal__images">
            <div  className="RaitingModal__label">
                <input ref={inputRef}  onChange={fileload} type="file" className="RaitingModal__file" />
                <div  className="RaitingModal__l">
                <Button onClick={activateInput}  className='basket g'>{fileName ? `${fileName}` : 'Выбрать изображение'} </Button>
                </div>
            </div>
          
            <div className={fileDiv ? "RaitingModal__imageCover active " :"RaitingModal__imageCover "}>
                                 
                                        <div className="RaitingModal__image">
                                        <span onClick={clearFile} className='icon-clear _icon-delete'></span>
                                            <img src={fileImage} alt=""/>
                                        </div>
                                    
                                    
                                </div>    
            </div>
            
            <div className="RaitingModal__button">
            <Button  onClick={sendNews} className='basket g'>Отправить</Button>
            </div>
            
        </div>
        
       </Modal>
       <Modal active={modalCooment} setActive={setmodalCooment} modalClass='raiting'>
        <div className="RaitingModal">
            <div className="RaitingModal__top">
                <Input value={name} change={setname} inputClass='registration gv' placeholder='Имя  *'/>
                <Input value={sername} change={setsername} inputClass='registration gv' placeholder='Фамилия  *'/>
            </div>
            <div className="RaitingModal__text">
                <textarea value={textComment} onChange={(e)=>settextComment(e.target.value)} placeholder='отзыв' className='RaitingModal__textarea'>{text}</textarea>
            </div>
           
            
            <div className="RaitingModal__button">
            <Button  onClick={addCommentToNews} className='basket g'>Отправить</Button>
            </div>
            
        </div>
        
       </Modal>
        <Footer/>
    </div>
    
  )
}

export default News