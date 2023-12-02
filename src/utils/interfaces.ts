export interface IProduct {
    brand: IBrand
    date: string
    description: string
    images: string
    information: IInformation[]
    name: string
    price: number
    purchaseNumber?: number
    ratings: IRating[]
    type: IType
    _id: string

}

export interface IBrand {
    image?: string
    name?: string
    products?: []
    _id?: string
}

export interface IOrderItem {
    date: string
    number: number
    orders: string
    ordersItemProduct: IOrdersItemProduct[]
    price: number
    _id: string
}

export interface IOrdersItemProduct {
    amount: number
    orderItem: string
    product: IProduct
    _id: string

}

export interface IProducts {
    count?: number
    responce: IProduct[]
    responceAll: IProduct[]
}

export interface IBasket {
    basketItems: IBasketItem[]
    user?: string
    _id?: string
}

export interface IInformation {
    description: string
    name: string
    _id: string
}

export interface IRating {
    name: string
    rate: number
    sername: string
    text: string
    user: string
    _id: string
}

export interface IType {
    name: string
    informations: string
    products: []
    _id: string
}

export interface IBasketItem {
    basket: string
    count: number
    product: IProduct
    _id: string
}

export interface ICompareItem {
    compare: string
    product: IProduct
    _id: string
}

export interface ILovesItem {
    loves: string
    product: IProduct
    _id: string
}
export type IInfo = 'radio' | 'check' | 'slider'

export type ITypeInformation = Record<string, IInfo>
export type IInfoValues = Array<number | string> | string | number | number[]
export type IInformationValues = Record<string, IInfoValues>

export interface IRate {
    name: string
    sername: string
    rate: number
    text: string
    _id: string
}

export interface INews {
    comments: []
    _id: string
}
