import  {  useEffect, useState } from 'react'
import BodyCompare from './bodyCompare/BodyCompare'

import Navigation from '../UI/navigation/Navigation'
import { compareSlice } from '../../store2/reducers/CompareSlice'
import { putCompare, updateCompare } from '../../store2/actions/CompareActions'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'
import './compare.scss'
import SpinnerBody from '../UI/spinnerBody/SpinnerBody'
const MainCompare = () => {
    const {compare} = useAppSelector(state=>state.reducer.catalog)
    const {activeType,load} = useAppSelector(state=>state.reducer.compare)
    const {setActiveTypeLoad} = compareSlice.actions
    const dispatch = useAppDispatch()
    const [loadCompare,setloadCompare] = useState<boolean>(false)


    useEffect(() => {
       dispatch(putCompare())
    }, [])


    useEffect(() => {
        dispatch(updateCompare())
    }, [compare])
    
    
    useEffect(() => {
       if (activeType !== 'Типы') {
        dispatch(setActiveTypeLoad(true))
       }
    }, [activeType])
    

  return (
    <div className="Compare">
      <div className="Compare__container">
          <div className="Compare__body">
          <Navigation>Главная / Сравнить товары</Navigation>
      {load ?
      <SpinnerBody/>:
       compare && compare.length !== 0 ?
      <BodyCompare/>
      :
      <div className='Compare__none _icon-compare'>Не выбраны товары</div>
      }
          </div>
      </div>
      </div>
  )
}

export default MainCompare