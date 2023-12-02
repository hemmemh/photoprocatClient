import type React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createBrand } from '../https/brandsApi'
import { HOME_ROUTE } from '../app/config/routs'

const useType = () => {
    const [name, setname] = useState<string>('')
    const [fileImage, setfileImage] = useState<string | ArrayBuffer | null>(null)

    const [file, setfile] = useState<File | null>(null)

    const navigate = useNavigate()

    const fileloadType = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        if (e.target.files && e.target.files.length > 0) {
            reader.readAsDataURL(e.target.files[0])
            setfile(e.target.files[0])
            reader.onloadend = () => {
                setfileImage(reader.result)
            }
        }
    }

    const createBrandFun = () => {
        if (name !== '' && file !== null) {
            const formaData = new FormData()
            formaData.append('name', name)
            formaData.append('image', file)

            createBrand(formaData).then(data => {
                if (name !== '' && file != null) {
                    console.log(data)
                }

                setname('')
                setfile(null)
                setfileImage(null)
                navigate(HOME_ROUTE)
                window.location.reload()
            })
        } else {
            alert('недостаточно данных')
        }
    }

    return { setname, fileImage, fileloadType, createBrandFun, name }
}

export default useType
