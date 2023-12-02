import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createType } from '../https/typesApi'
import { HOME_ROUTE } from '../app/config/routs'
import { type ITypeInformation } from '../utils/interfaces'

const useBrand = () => {
    const [typeInformation, settypeInformation] = useState<ITypeInformation[]>([])
    const [infoName, setinfoName] = useState<string>('')
    const [descriptionName, setDescriptionName] = useState<string>('radio')
    const [name, setname] = useState<string>('')
    const navigate = useNavigate()

    const senInfo = (name: string) => {
        setinfoName(name)
    }

    const createInfo = () => {
        settypeInformation((prev: ITypeInformation[]) => [
            ...prev,
            { [infoName]: descriptionName } as ITypeInformation
        ])
        setinfoName('')
        setDescriptionName('')
    }

    const setDescription = (name: string) => {
        setDescriptionName(name)
        setinfoName('')
    }

    const createTypeFun = () => {
        if (typeInformation.length !== 0 && name !== '') {
            createType({ name, informations: JSON.stringify(typeInformation) }).then(data => {
                settypeInformation([])
                setname('')
                navigate(HOME_ROUTE)
                window.location.reload()
            })
        } else {
            alert('недостаточно данных')
        }
    }

    return { setname, infoName, createInfo, senInfo, createTypeFun, descriptionName, setDescription, name, typeInformation }
}

export default useBrand
