import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './reduxHooks'
import { navbarSlice } from '../store2/reducers/NavBarSlice'
import { addItemToCompare, removeItemFromCompare } from '../https/compareApi'


type itemProduct = {


    inCompare:boolean
  
    productId:any
}

const useAddtoComapre = ({inCompare,productId}:itemProduct) => {

    const [inCompareSnippet, setinCompareSnippet] = useState(inCompare)

    const [loader, setloader] = useState(true)
    const {user} = useAppSelector(state=>state.reducer.catalog)
    const {products,compare,loves} = useAppSelector(state=>state.reducer.navbar)
    const navbar = navbarSlice.actions
    const dispatch = useAppDispatch()
    

    
      useEffect(() => {
        setinCompareSnippet(inCompare)
      }, [inCompare])
    
      
 
    

    
    
    const addToCompare = ()=>{
      const item  = document.querySelector('._compare')
        const element = document.querySelector('.Navbar__loader')
      if (!user.id) {
        if (!element?.classList.contains('active')) {
            element?.classList.add('active')
          setTimeout(() => {
            element?.classList.remove('active')
          }, 1000);
        }
        return
      }
    
      if (loader) {
        if (!inCompareSnippet) {
          setloader(false)
            addItemToCompare({compareId:user.compare,product:productId}).then(data=>{
              setinCompareSnippet(true)
              dispatch(navbar.setCompare(compare + 1))
              item?.classList.add('active')
              setTimeout(() => {
                item?.classList.remove('active')
              }, 300);
          
              setinCompareSnippet(true)
            }).catch(e=>{
              console.log(e);
              
            }).finally(()=>{
              setloader(true)
            })
        }else{
          setloader(false)
          removeItemFromCompare({id:productId,compareId:user.compare}).then(data=>{
            dispatch(navbar.setCompare(compare - 1))
            setinCompareSnippet(false)
            item?.classList.add('active')
            setTimeout(() => {
              item?.classList.remove('active')
            }, 300);
          }).finally(()=>{
            setloader(true)
          })
      }
    
      }
    
    
    }
    

    
      return {addToCompare,inCompareSnippet,loader}
    }
    

export default useAddtoComapre