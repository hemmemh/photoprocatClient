import { memo } from 'react'
import { useAppDispatch } from '../../../../hooks/reduxHooks'
import { addProduct } from '../../../../store2/actions/ProductActions'
import Button2 from '../../../UI/button2/Button2'
import { ImagesProduct } from './imagesProduct/ImagesProduct'
import { ProductInputs } from './productInputs.tsx/ProductInputs'
import { SpoilersProduct } from './spoilersProduct/SpoilersProduct'
import useFiles from '../../../../hooks/useFiles'

export const ProductModal = memo(() => {
    const dispatch = useAppDispatch()
    const { addFile, fileImages, files, setFiles, setfileImages } = useFiles()

    const dispatchProduct = async () => {
        await dispatch(addProduct(files))
        setFiles([])
        setfileImages([])
    }
    return (
        <div className="adminModalProduct">
            <ProductInputs/>
            <SpoilersProduct/>
            <ImagesProduct addFile={addFile} fileImages={fileImages}/>
            <Button2 onClick={dispatchProduct} className='buttonCart'>Создать</Button2>
        </div>
    )
})
