import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type IBasketItem, type IBrand, type ICompareItem, type IInformation, type IInformationValues, type ILovesItem, type IOrderItem, type IProducts, type IType, type ITypeInformation } from '../../utils/interfaces'

interface IinitialState {
    typeInformation: ITypeInformation
    informations: IInformation[]
    informationValues: IInformationValues
    sliderMouseOn: any
    priceRange: any
    priceValue: number | number[]
    minMaxPrice: number[]
    productsLoad: boolean
    products: IProducts
    basket: IBasketItem[]
    loves: ILovesItem[]
    compare: ICompareItem[]
    orders: IOrderItem[]
    gridLoader: boolean
    sortNumber: number
    sort: string
    type: string
    brandsLoad: boolean
    brands: IBrand[]
    checkedBrands: any[]
    page: number
    limit: number
    user: { id: string
        compare: string
        orders: string
        loves: string
        basket: string
        birthDate: string
        name: string
        sername: string
        tell: string
        email: string
    }

    types: IType[]

}
const initialState: IinitialState = {
    typeInformation: {},
    informations: [],
    informationValues: {},
    sliderMouseOn: {},
    priceRange: [0, 10],
    minMaxPrice: [0, 100],
    productsLoad: false,
    products: {
        count: 0,
        responce: [],
        responceAll: []
    },
    basket: [],
    loves: [],
    compare: [],
    gridLoader: false,
    sortNumber: 1,
    sort: 'date',
    priceValue: [10, 20],
    type: '',
    brandsLoad: false,
    brands: [],
    checkedBrands: [],
    page: 1,
    limit: 6,
    user: {
        id: '',
        compare: '',
        orders: '',
        loves: '',
        basket: '',
        birthDate: '',
        name: '',
        sername: '',
        tell: '',
        email: ''
    },

    types: [],
    orders: []

}

export const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {
        setInformationValues (state, action: PayloadAction<IInformationValues>) {
            state.informationValues = action.payload
        },
        setsliderMouseOn (state, action: PayloadAction<unknown>) {
            state.sliderMouseOn = action.payload
        },
        setPriceRange (state, action: PayloadAction<number | number[]>) {
            state.priceRange = action.payload
        },
        setProductsLoad (state, action: PayloadAction<boolean>) {
            state.productsLoad = action.payload
        },
        setBasket (state, action: PayloadAction<IBasketItem[]>) {
            state.basket = action.payload
        },
        setLoves (state, action: PayloadAction<ILovesItem[]>) {
            state.loves = action.payload
        },
        setCompare (state, action: PayloadAction<ICompareItem[]>) {
            state.compare = action.payload
        },
        setGridLoader (state, action: PayloadAction<boolean>) {
            state.gridLoader = action.payload
        },
        setSortNumber (state, action: PayloadAction<number>) {
            state.sortNumber = action.payload
        },
        setSort (state, action: PayloadAction<string>) {
            state.sort = action.payload
        },
        setPriceValue (state, action: PayloadAction<number | number[]>) {
            state.priceValue = action.payload
        },
        setType (state, action: PayloadAction<string>) {
            state.type = action.payload
        },
        setBrandsLoad (state, action: PayloadAction<boolean>) {
            state.brandsLoad = action.payload
        },
        setBrands (state, action: PayloadAction<IBrand[]>) {
            state.brands = action.payload
        },
        setCheckedBrands (state, action: PayloadAction<any[]>) {
            state.checkedBrands = action.payload
        },
        setProducts (state, action: PayloadAction<IProducts>) {
            state.products = action.payload
        },
        setTypeInformation (state, action: PayloadAction<ITypeInformation>) {
            state.typeInformation = action.payload
        },
        setInformations (state, action: PayloadAction<IInformation[]>) {
            state.informations = action.payload
        },
        setPage (state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setMinMaxPrice (state, action: PayloadAction<number[]>) {
            state.minMaxPrice = action.payload
        },
        setUser (state, action: PayloadAction<any>) {
            state.user = action.payload
        },
        setTypes (state, action: PayloadAction<IType[]>) {
            state.types = action.payload
        },
        setOrders (state, action: PayloadAction<IOrderItem[]>) {
            state.orders = action.payload
        }

    }

})

export default catalogSlice.reducer
