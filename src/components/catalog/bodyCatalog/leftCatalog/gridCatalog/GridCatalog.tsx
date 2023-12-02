import { useInView } from 'react-intersection-observer'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import { CircularProgress, Skeleton } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import { getAllInfo, getProducts, updateProducts } from '../../../../../store2/actions/ProductActions'
import ProductItem from '../../../../productItem/ProductItem'
import { type IProduct } from '../../../../../utils/interfaces'
import { inBasket, inCompare, inLoves } from '../../../../../helpers/findsInItem'
import useCheckMobileScreen from '../../../../../hooks/DetectMobileHook'

export const GridCatalog = () => {
    const { ref, inView } = useInView({
        threshold: 0
    })
    const { priceValue, checkedBrands, sort, sortNumber, typeInformation, informationValues, limit, productsLoad, products, basket, loves, compare, gridLoader, page } = useAppSelector((state) => state.reducer.catalog)
    const { filterCatalog } = useAppSelector((state) => state.reducer.navbar)
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams()
    const mobile = useCheckMobileScreen()
    // const [loader, setLoader] = useState(false)
    useEffect(() => {
        dispatch(getAllInfo(searchParams.get('type')))
    }, [])

    useEffect(() => {
        // setLoader(false)
        if (productsLoad) {
            dispatch(getAllInfo(searchParams.get('type')))
        }
    }, [searchParams])

    useEffect(() => {
        if (productsLoad) {
            // setLoader(true)
            dispatch(getProducts([searchParams.get('type'), 1, limit, filterCatalog, checkedBrands, sortNumber, Array.isArray(priceValue) && priceValue[0], Array.isArray(priceValue) && priceValue[1], sort, informationValues, typeInformation]))
        }
    }, [sort, sortNumber, checkedBrands, informationValues, filterCatalog, priceValue])

    useEffect(() => {
        if (inView && products.responce?.length < products.responceAll?.length) {
            console.log('45')

            dispatch(updateProducts([searchParams.get('type'), page + 1, limit, '', checkedBrands, sortNumber, Array.isArray(priceValue) && priceValue[0], Array.isArray(priceValue) && priceValue[1], sort, informationValues, typeInformation]))
        }
    }, [inView])

    return (
        <>
            {productsLoad
                ? <div className="mainCatalog__grid">
                    {products.responce?.map((product: IProduct) =>
                        <ProductItem
                            key={product._id}
                            product={product}
                            inCompare = {inCompare(product._id, compare)}
                            inBasket = {inBasket(product._id, basket)}
                            inLoves = {inLoves(product._id, loves)}
                            className='catalogItem'
                        />
                    )}
                    <div ref={ref} className="mainCatalog__gridEnd"></div>
                </div>
                : <div className="mainCatalog__grid">
                    {Array(10).fill(0).map((e: any, i: any) =>
                        <Skeleton key={i} variant="rectangular" height={!mobile ? 300 : 200} animation="wave"/>)}
                </div>
            }
            { gridLoader && <div className="Catalog__gridLoader"><CircularProgress /></div>}
        </>

    )
}
