import React, { useCallback, useEffect, useRef, useState, type FC, type ReactNode, memo } from 'react'
import './productSpoiler.scss'
interface FooterProps {
    children: ReactNode[]
    changeName?: boolean
    lock?: boolean
    className?: string

}

const ProductSpoiler: FC<FooterProps> = memo(({ children, changeName = true, className = '', lock = false }) => {
    const activeRef = useRef<boolean>()
    const stringRef = useRef<string>(Math.random().toString(36).substring(2, 7))
    const spoilerRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const bodyRef = useRef<HTMLDivElement>(null)

    const [active, setactive] = useState<boolean>(false)

    useEffect(() => {
        activeRef.current = active
        document.addEventListener('click', addClick)

        if (lock) {
            setactive(true)
        }
        return () => { document.removeEventListener('click', addClick) }
    }, [])

    const addClick = useCallback((e: MouseEvent) => {
        if (spoilerRef.current && e.target !== spoilerRef.current && !spoilerRef.current.contains(e.target as Node)) {
            setactive(false)
        }
    }, [])

    const click = useCallback(
        () => {
            setactive(prev => !prev)
        },
        []
    )

    const setName = (e: React.MouseEvent<HTMLDivElement>) => {
        const DivElement = e.target as HTMLDivElement
        if (changeName) {
            headerRef?.current?.firstElementChild?.textContent && (headerRef.current.firstElementChild.textContent = DivElement.textContent)
        }
    }

    return (
        <div ref={spoilerRef} id={stringRef.current} className={`spoiler ${className} ${active && 'active'}`}>
            <div ref={headerRef} onClick={click} className={'spoiler__header active'}>{children[0]}</div>

            <div ref={bodyRef} className={'spoiler__cover'}>
                <div onClick={setName} className="spoiler__body">{children[1]}</div>
            </div>

        </div>
    )
})

export default ProductSpoiler
