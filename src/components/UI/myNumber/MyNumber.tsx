import React, { useEffect, useRef, useState } from 'react'
import './number.scss'
interface NumberType {
    className?: string
    value: string
    placeholderOn?: boolean
    setValue: (e: any) => void
    placeholder?: string | undefined
    min?: number
    max?: number
    lock?: boolean
}

const MyNumber = ({ className, value, setValue, placeholder = '', min = 0, lock = false, max = 100, placeholderOn = true }: NumberType) => {
    const [num, setNum] = useState(value)
    const [active, setactive] = useState<boolean>(false)
    const inputRef = useRef<HTMLDivElement>(null)
    const input2Ref = useRef<HTMLInputElement>(null)

    useEffect(() => {
        document.addEventListener('click', addClick)
        if (lock) {
            setactive(true)
        }
        if (value !== '' && value !== '0') {
            setactive(true)
        }

        return () => { document.removeEventListener('click', addClick) }
    }, [])

    useEffect(() => {
        setNum(value)
        if (value !== '' && value !== '0') {
            setactive(true)
        }
    }, [value])

    const addClick = (e: MouseEvent) => {
        if (inputRef.current && !lock && !inputRef.current.contains(e.target as Node) && input2Ref?.current?.value === '') {
            setactive(false)
        }
    }

    const change = (e: React.FocusEvent<HTMLInputElement> | React.KeyboardEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement
        const val = inputElement.value

        let numRef = +val

        if (+val < min) {
            numRef = min
        }
        if (+val > max) {
            numRef = max
        }

        setNum(numRef.toString())
        setValue(+numRef)
    }

    const keyDone = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            change(e)
        }
    }

    const onNum = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNum(e.target.value)
        setactive(true)
    }

    return (
        <div ref={inputRef} className={`MyNumber ${className} ${active ? 'active' : ''}`}>
            <input ref={input2Ref} type="number" onBlur={change} onKeyDown={keyDone} onChange={onNum} value={num} placeholder={placeholderOn ? '' : placeholder}/>
            {placeholderOn && <div className={ active ? 'Input__placeholder active' : 'Input__placeholder'}>{placeholder}</div>}
        </div>
    )
}

export default MyNumber
