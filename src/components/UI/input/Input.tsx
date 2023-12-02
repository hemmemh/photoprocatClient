import React, { type FC, useEffect, useRef, useState } from 'react'
import './input.scss'
interface button {
    inputClass?: string
    placeholder?: string
    placeholderOn?: boolean
    children?: React.ReactNode
    lock?: boolean
    value: any
    change: (e: any) => void
}
const Input: FC<button> = ({ inputClass = 'origin', placeholder = 'name', children, lock = false, value, change, placeholderOn = true }) => {
    const [active, setactive] = useState<boolean>(false)
    const inputRef = useRef<HTMLDivElement>(null)
    const input2Ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        document.addEventListener('click', addClick)
        if (lock) {
            setactive(true)
        }
        if (value !== '') {
            setactive(true)
        }

        return () => { document.removeEventListener('click', addClick) }
    }, [])

    useEffect(() => {
        if (value !== '') {
            setactive(true)
        }
    }, [value])

    const addClick = (e: MouseEvent) => {
        if (inputRef.current && !lock && !inputRef.current.contains(e.target as Node) && input2Ref?.current?.value === '') {
            setactive(false)
        }
    }
    const onFocus = () => {
        setactive(true)
        input2Ref?.current?.focus()
    }

    const setChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        change(e.target.value)
    }

    return (
        <div ref={inputRef} onClick={() => { onFocus() }} className={active ? `Input ${inputClass} active` : `Input ${inputClass}`} >
            <input ref={input2Ref} value={value} onChange={setChange} className='Input__text' type="text" placeholder={placeholderOn ? '' : placeholder}/>
            {placeholderOn && <div className={ active ? 'Input__placeholder active' : 'Input__placeholder'}>{placeholder}</div>}
            {children}
        </div>
    )
}

export default Input
