import React, { type FC, useEffect, useRef } from 'react'
import './fold.scss'
interface FooterProps {
    slice?: number
    children?: React.ReactNode
    changeName?: boolean
    lock?: boolean
    navigationClass?: string
    foldClass?: string
    value: boolean
    foldActive?: (a: boolean) => void
    foldChange?: (a: any) => void
}
const Fold: FC<FooterProps> = ({ value, foldActive = () => {}, foldChange = () => {}, children, slice = 1, foldClass = 'origin' }) => {
    const bodyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const sliceChildren: any = [].slice.call(bodyRef?.current?.children)

        if (bodyRef.current && sliceChildren.length > slice && !value) {
            sliceChildren.slice(slice, sliceChildren.length).forEach((el: HTMLElement) => {
                el.style.display = 'none'
            })
            let sliceHeight = 0
            sliceChildren.slice(0, slice).forEach((el: HTMLElement) => {
                sliceHeight += el.offsetHeight
            })
            bodyRef.current.style.height = `${sliceHeight}px`
        } else {
            foldActive(false)
        }
    }, [])

    useEffect(() => {
        const sliceChildren: any = [].slice.call(bodyRef?.current?.children)
        if (bodyRef.current && sliceChildren.length > slice) {
            if (value) {
                let sliceHeight = 0
                console.log(bodyRef.current, 'ty')

                sliceChildren.slice(0, slice).forEach((el: HTMLElement) => {
                    sliceHeight += el.offsetHeight
                })
                bodyRef.current.style.height = `${sliceHeight}px`
                sliceChildren.slice(slice, sliceChildren.length).forEach((el: HTMLElement) => {
                    el.style.display = 'inherit'
                })
                bodyRef.current.style.height = `${bodyRef.current.scrollHeight}px`
                setTimeout(() => {
                    bodyRef.current && (bodyRef.current.style.height = 'auto')
                }, 300)
            } else {
                let sliceHeight = 0
                bodyRef.current.style.height = `${bodyRef.current.scrollHeight}px`
                sliceChildren.slice(0, slice).forEach((el: HTMLElement) => {
                    sliceHeight += el.offsetHeight
                })
                bodyRef.current.style.height = `${sliceHeight}px`

                setTimeout(() => {
                    sliceChildren.slice(slice, sliceChildren.length).forEach((el: HTMLElement) => {
                        el.style.display = 'none'
                    })
                    bodyRef.current && (bodyRef.current.style.height = 'auto')
                }, 300)
            }
        }
    }, [value])

    return (
        <div className={`Fold ${foldClass}`}>
            <div ref={bodyRef} className="Fold__body">{
                Array.isArray(children) && children.slice(0, children.length).map((e: any, id: number) =>
                    <div key={id} className="Fold__item">{e}</div>
                )
            }</div>

        </div>

    )
}

export default Fold
