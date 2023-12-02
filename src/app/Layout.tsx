import React, { useEffect, type FC } from 'react'
import { Footer } from '../components/footer/Footer'
import Navbar from '../components/navBar/Navbar'

interface ILayout {
    children?: React.ReactNode
}

const Layout: FC<ILayout> = ({ children }) => {
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <>
            <Navbar/>
            {children}
            <Footer/>
        </>
    )
}

export default Layout
