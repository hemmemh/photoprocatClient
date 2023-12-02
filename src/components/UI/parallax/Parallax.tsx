import React, { type FC, useRef, useEffect, useCallback } from 'react'
interface IParallax {
    children: React.ReactNode
    className?: string
    speed?: number
    refParallax: any
    imagesRef: any
}
const Parallax: FC<IParallax> = ({ children, className = '', refParallax, speed = 5, imagesRef }) => {
    const positionX = useRef(0)
    const positionY = useRef(0)

    useEffect(() => {
        refParallax.onmouseenter = mouseEnter
        refParallax.onmousemove = mouseMove
        refParallax.onmouseleave = mouseLeave
    }, [])

    const mouseMove = useCallback(
        (e: any) => {
            positionX.current = (refParallax.offsetWidth - e.pageX * speed) / 100
            positionY.current = (refParallax.offsetHeight - e.pageY * speed) / 100
            imagesRef.current.style.transform = `translate(${positionX.current}px,${positionY.current}px)`
        },
        []
    )

    const mouseLeave = (e: any) => {
        imagesRef.current.style.transition = 'all 0.3s'
        setTimeout(() => {
            imagesRef.current.style.transform = 'translate(0px,0px)'
        }, 30)
    }

    const mouseEnter = () => {
        imagesRef.current.style.transition = 'all 0s'
    }

    return (

        <div >{children}</div>

    )
}

export default Parallax
