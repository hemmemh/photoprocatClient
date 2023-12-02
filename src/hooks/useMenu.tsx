import type React from 'react'
import { useCallback, useEffect } from 'react'

import { navbarSlice } from '../store2/reducers/NavBarSlice'
import { useAppDispatch } from './reduxHooks'

const useMenu = ({ spoilerRef, menuIcon }: { spoilerRef: React.RefObject<HTMLDivElement>, menuIcon: React.MutableRefObject<Element | null> }) => {
    const dispatch = useAppDispatch()
    const { setMenu } = navbarSlice.actions
    const addClick = useCallback(
        (e: MouseEvent) => {
            if (!spoilerRef.current?.contains(e.target as Node) && e.target !== menuIcon.current) {
                dispatch(setMenu(false))
            }
        },
        []
    )

    useEffect(() => {
        document.addEventListener('click', addClick)
        return () => {
            document.removeEventListener('click', addClick)
        }
    }, [])
}

export default useMenu
