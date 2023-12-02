import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IBasket, type IProduct } from '../../utils/interfaces'

interface IinitialState {
    load: boolean
    products: IProduct[]
    sumPrice: number
    basket: IBasket

}

const initialState: IinitialState = {
    load: true,
    products: [],
    sumPrice: 0,
    basket: {
        basketItems: [],
        user: '',
        _id: ''
    }

}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setLoad (state, action: PayloadAction<boolean>) {
            state.load = action.payload
        },
        setProducts (state, action: PayloadAction<IProduct[]>) {
            state.products = action.payload
        },
        setSumPrice (state, action: PayloadAction<number>) {
            state.sumPrice = action.payload
        },
        setBasket (state, action: PayloadAction<IBasket>) {
            state.basket = action.payload
        }

    }

})

export default basketSlice.reducer
