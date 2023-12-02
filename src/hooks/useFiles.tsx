import React from 'react'

const useFiles = () => {
    const [files, setFiles] = React.useState<File[]>([])
    const [fileImages, setfileImages] = React.useState<Array<string | ArrayBuffer | null>>([])

    const addFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader()
        console.log()

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0]
            reader.readAsDataURL(file)

            setFiles([...files, file])
            reader.onloadend = () => {
                setfileImages([...fileImages, reader.result])
            }
        }
    }

    return { addFile, fileImages, files, setFiles, setfileImages }
}

export default useFiles
