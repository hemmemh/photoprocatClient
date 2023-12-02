import TopProduct from './topProduct/TopProduct'
import RaitingsProduct from './raitingsProduct/RaitingsProduct'
import Navigation from '../../UI/navigation/Navigation'
import { useAppSelector } from '../../../hooks/reduxHooks'
import SpinnerBody from '../../UI/spinnerBody/SpinnerBody'

const BodyProduct = () => {
    const { productLoad } = useAppSelector((state) => state.reducer.product)
    const { product } = useAppSelector((state) => state.reducer.product)
    return (
        <>
            {productLoad
                ? <div className="Product__container">
                    <Navigation navigationClass='product _d'>Главная / {product?.type.name} / {product?.brand.name} / {product?.name}</Navigation>
                    <TopProduct/>
                    <RaitingsProduct/>

                </div>
                : <SpinnerBody/>
            }
        </>
    )
}

export default BodyProduct
