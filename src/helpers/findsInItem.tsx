import { type ILovesItem, type IBasketItem, type ICompareItem } from '../utils/interfaces'

const inCompare = (id: string, compare: ICompareItem[]) => {
    if (compare.find((item: ICompareItem) => item.product._id === id)) {
        return true
    } else {
        return false
    }
}

const inBasket = (id: string, basket: IBasketItem[]) => {
    if (basket.find((item: IBasketItem) => item.product._id === id)) {
        return true
    } else {
        return false
    }
}

const inLoves = (id: string, loves: ILovesItem[]) => {
    if (loves?.find((item: ILovesItem) => item.product._id === id)) {
        return true
    } else {
        return false
    }
}

export { inCompare, inBasket, inLoves }
