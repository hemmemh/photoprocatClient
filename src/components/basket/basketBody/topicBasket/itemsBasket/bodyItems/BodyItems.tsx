import { useAppDispatch, useAppSelector } from "../../../../../../hooks/reduxHooks"
import { basketSlice } from "../../../../../../store2/reducers/BasketSlice"
import {useEffect} from 'react'
import BasketProduct from "../../../../../basketProduct/BasketProduct"
import { CSSTransition, TransitionGroup } from "react-transition-group"



const BodyItems = () => {
    const {user} = useAppSelector(state=>state.reducer.catalog)
    const {basket} = useAppSelector(state=>state.reducer.basket)
    const {setSumPrice} = basketSlice.actions
    const dispatch = useAppDispatch()
    useEffect(() => {
      const sum = basket.basketItems.reduce((prev,current)=>current?.product?.price * current.count + prev,0)
      dispatch(setSumPrice(sum))

    }, [])
    

  return (
    <div className="items-basket__body">
       <TransitionGroup className="todo-list">
    {
             
      basket.basketItems.map((e:any)=>
      <CSSTransition
      key={e._id}
      timeout={500}
      classNames="item"
    >
        <BasketProduct 
        e={e} 
        products={basket}
        basketId={user.basket}/>
        </CSSTransition>
      )}
      </TransitionGroup>
    </div>
  )
}

export default BodyItems