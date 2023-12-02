import { Rating } from '@mui/material'
import { type FC, useMemo, memo } from 'react'
import { API_URL } from '../../utils/config'
import { useNavigate } from 'react-router-dom'
import { PRODUCT_ROUTE } from '../../app/config/routs'
import './productItem.scss'
import { ReactComponent as CompareSvg } from '../../images/compare.svg'
import { ReactComponent as StarSvg } from '../../images/star.svg'
import { ReactComponent as CartSvg } from '../../images/cart.svg'
import Loader from '../UI/loader/Loader'
import Button2 from '../UI/button2/Button2'
import useCheckMobileScreen from '../../hooks/DetectMobileHook'
import useAddtoBasket from '../../hooks/useAddtoBasket'
import useAddtoComapre from '../../hooks/useAddtoComapre'
import useAddtoLove from '../../hooks/useAddtoLove'
import { type IProduct, type IRate } from '../../utils/interfaces'

interface button {
    product: IProduct
    inBasket: boolean
    inCompare: boolean
    inLoves: boolean
    className?: string
}

const ProductItem: FC<button> = ({ product, inBasket = false, inCompare = false, inLoves = false, className = '' }) => {
    const navigate = useNavigate()
    const { addToBasket, inBasketSnippet, loader: basketLoader } = useAddtoBasket({ inBasket, productId: product._id })
    const { addToCompare, inCompareSnippet, loader: compareLoader } = useAddtoComapre({ inCompare, productId: product._id })
    const { addToLoves, inLovesSnippet, loader: loveLoader } = useAddtoLove({ inLoves, productId: product._id })
    const mobile = useCheckMobileScreen(767.98, 479.98)
    const mobile2 = useCheckMobileScreen(479.98)

    const ratingSize = useMemo(() => {
        if (!className) {
            return mobile ? 'small' : 'large'
        }
        return mobile2 ? 'small' : 'large'
    }, [mobile, mobile2])

    const rateMemo = useMemo(() => product.ratings.reduce((accumulator: number, currentValue: IRate) => accumulator + currentValue.rate, 0) / product.ratings.length, [])

    return (
        <div className={`mainCatalog__item ${className}`}>
            <div className="slidesHome__slide slideHome">
                <div className="slideHome__body">
                    <div className="slideHome__image">
                        <div className="slideHome__imageCover">
                            <img src={`${API_URL}/${product.name}/${JSON.parse(product.images)[0]}`} alt=""/>
                        </div>
                    </div>
                    <div className="slideHome__name">{product.name}</div>
                    <div className="slideHome__brand">{product.type.name}</div>
                    <div className="slideHome__price"> ${product.price} </div>

                    <div className="slideHome__rating">
                        <Rating size={ratingSize} name="disabled" value={rateMemo} disabled />
                    </div>
                    <div className="slideHome__actions">
                        <Button2 onClick={() => { navigate(`${PRODUCT_ROUTE}/${product._id}`) }} className='productCard'>Подробнее</Button2>
                        <Button2 onClick={addToBasket} className={inBasketSnippet ? 'productCard _cart active' : 'productCard _cart'}>
                            {!basketLoader ? <Loader className={inBasketSnippet ? 'basketLoader _d' : 'basketLoader' } /> : <CartSvg/>}
                        </Button2>
                    </div>
                    <div className="slideHome__business businessHome">
                        {compareLoader
                            ? <CompareSvg onClick={addToCompare} className={inCompareSnippet ? 'businessHome__item active' : 'businessHome__item'}/>
                            : <Loader />}
                        {loveLoader
                            ? <StarSvg onClick={addToLoves} className={inLovesSnippet ? 'businessHome__item active' : 'businessHome__item'}/>
                            : <Loader/>
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}
export default memo(ProductItem)
