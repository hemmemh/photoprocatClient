import { type Dispatch, type RefObject, type SetStateAction, useCallback, useEffect } from 'react'

const useItemsClick = ({ actionRef, actionRef2, setitemsView }: { actionRef: RefObject<HTMLDivElement>, actionRef2: RefObject<HTMLDivElement>, setitemsView: Dispatch<SetStateAction<boolean>> }) => {
    useEffect(() => {
        document.addEventListener('click', addClick)
        return () => {
            document.removeEventListener('click', addClick)
        }
    }, [])

    const addClick = useCallback(
        (e: MouseEvent) => {
            if (actionRef.current && actionRef2.current) {
                if (!actionRef2.current.contains(e.target as Node) && e.target !== actionRef.current) {
                    setitemsView(false)
                }
            }
        },
        []
    )
}

export default useItemsClick
