import React, { useCallback, useEffect, useRef, useState, type FC, cloneElement, memo } from 'react'
import './accordionUser.scss'

interface FooterProps {
    breakpoint?: number
    children?: React.ReactNode
    controll?: boolean
    VisibleAll?: boolean
    accordionClass?: string
    lock?: boolean
}

const AccordionUser: FC<FooterProps> = ({ breakpoint = 7677.98, children, controll = true, VisibleAll, accordionClass = 'origin', lock = false }) => {
    const [active, setactive] = useState(false)
    const [visible, setVisible] = useState<number | null>(null)
    const accordRef = useRef<any>()

    // при нажатии на один аккордион другой закрывается
    const accordion = useCallback(
        (i: number | null) => {
            if (visible === i) {
                setVisible(null)
            } else {
                setVisible(i)
            }
        },
        [visible]
    )

    // закрытие или открытие всех аккордионов при брейкпоинте
    const ff2 = useCallback(
        () => {
            const clientWidth = window.innerWidth
            if (clientWidth <= breakpoint) {
                setactive(false)
            } else {
                setactive(true)
            }
        },
        []
    )

    // определяет открыты или закрыты все аккордионы в начале
    useEffect(() => {
        const clientWidth = window.innerWidth

        if (clientWidth <= breakpoint) {
            setactive(false)
        } else {
            setactive(true)
        }

        window.addEventListener('resize', ff2)
        return () => {
            window.removeEventListener('resize', ff2)
        }
    }, [])

    useEffect(() => {
        if (!VisibleAll) {
            setVisible(null)
            setactive(false)
        }
    }, [VisibleAll])

    return (
        <div ref={accordRef} className={`AccordionUser ${accordionClass}`}>
            {React.Children.map?.(children, (child, i) =>

                cloneElement(
                    child as React.ReactElement<any>,
                    { active, lock, controll, activeItem: visible === i, accordion: (): any => { accordion(i) }, visible, accordRef })
            )}
        </div>
    )
}

export default memo(AccordionUser)
