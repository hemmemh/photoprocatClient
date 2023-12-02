import React, { useRef } from 'react'
import './myFile.scss'

interface IMyFile {
    children: React.ReactNode
    setValue: (e: any) => void
}

const MyFile = ({ children, setValue }: IMyFile) => {
    const inputRef = useRef<HTMLInputElement>(null)

    const click = () => {
        inputRef.current && inputRef.current.click()
    }

    return (
        <div className="MyFile">
            <input className='MyFile__input' ref={inputRef} type="file" onChange={setValue}/>
            <div onClick={click}>
                {children}
            </div>

        </div>
    )
}

export default MyFile
