import { type IInfoValues } from '../utils/interfaces'

export const guardArrayValue = (value: IInfoValues) => {
    if (typeof value === 'object') {
        return value
    }
    return []
}

export const guardRadioValue = (value: IInfoValues) => {
    if (typeof value === 'string') {
        return value
    }
    return ''
}
