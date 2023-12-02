import { type FC } from 'react'
import './checkBox.scss'
interface FooterProps {

    children: React.ReactNode
    value: Array<string | number>
    change: (e: any) => void
    className?: string
    id: string | number
}
const CheckBox: FC<FooterProps> = ({ value, change, className = '', id, children }) => {
    const setItem = (i: string | number) => {
        if (value.includes(i)) {
            change([...value.filter((e: any) => e !== i)])
            change([...value.filter((e: any) => e !== i)])
        } else {
            change([...value, i])
            change([...value, i])
        }
    }
    return (
        <div onClick={() => { setItem(id) }} className={value?.includes(id) ? `CheckBox ${className} active` : `CheckBox__item ${className}`}>
            {children}
        </div>
    )
}

export default CheckBox
