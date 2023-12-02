import type React from 'react'
import { useEffect, useState } from 'react'

interface Calendar {
    calendarIcon: React.RefObject<HTMLImageElement>
    calendarRef: React.RefObject<HTMLImageElement>
}

const useCalendar = ({ calendarIcon, calendarRef }: Calendar) => {
    const [calendar, setcalendar] = useState<boolean>(false)

    const onCalendarFocus = () => {
        const a = document.querySelector('.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root')
        a?.querySelector('input')?.focus()
    }

    useEffect(() => {
        document.addEventListener('click', onCalendar)
        document.querySelector('.css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root input')?.addEventListener('click', onCalendar)
        return () => { document.removeEventListener('click', onCalendar) }
    }, [])

    const onCalendar = (e: Event) => {
        if (e.target !== calendarIcon.current) {
            if (!calendarRef.current?.contains(e.target as Node)) {
                setcalendar(false)
            }
        }
    }

    return { onCalendarFocus, calendar, setcalendar }
}

export default useCalendar
