import { memo, useCallback, useEffect, useState } from 'react'
import ProductSpoiler from '../../../../UI/productSpoiler/ProductSpoiler'
import { type ITypeInformation, type IBrand, type IType } from '../../../../../utils/interfaces'
import Input from '../../../../UI/input/Input'
import { getAllTypes } from '../../../../../https/typesApi'
import { getAllBrands } from '../../../../../https/brandsApi'
import { adminSlice } from '../../../../../store2/reducers/AdminSlice'
import { addtypeInformationProduct, setInformationProductf } from '../../../../../store2/actions/AdminActions'
import { useAppDispatch, useAppSelector } from '../../../../../hooks/reduxHooks'
import Button2 from '../../../../UI/button2/Button2'
import './spoilerProduct.scss'
export const SpoilersProduct = memo(() => {
    const [brands, setbrands] = useState<IBrand[]>([])
    const [types, settypes] = useState<IType[]>([])
    const typeInformationProduct = useAppSelector(state => state.reducer.admin.typeInformationProduct)
    const { setBrand } = adminSlice.actions
    const dispatch = useAppDispatch()

    useEffect(() => {
        getAllTypes().then(types => { settypes(types) })
        getAllTypes().then(data => { settypes(data) })
        getAllBrands().then(data => { setbrands(data) })
    }, [])

    const setBrandf = (el: IBrand) => () => {
        dispatch(setBrand(el))
    }

    const dispatchInformationProduct = useCallback(
        (el: IType) => () => {
            dispatch(addtypeInformationProduct(el))
        },
        []
    )

    const dispatchInformationProductf = (e: string, el: ITypeInformation) => {
        dispatch(setInformationProductf(e, Object.keys(el)[0]))
    }

    return (
        <>
            <div className="adminModalProduct__spoilers">
                <ProductSpoiler>
                    <Button2 className="buttonCart _spoiler">Выбрать тип</Button2>
                    {types.map((el: IType) =>
                        <Button2
                            key={el._id}
                            onClick={dispatchInformationProduct(el)}
                            className="buttonCart _spoiler">{el.name}
                        </Button2>)}
                </ProductSpoiler>
                <ProductSpoiler >
                    <Button2 className="buttonCart _spoiler">Выбрать бренд</Button2>
                    {brands.map((el: IBrand) =>
                        <Button2
                            key={el._id}
                            onClick={setBrandf(el)}
                            className="buttonCart _spoiler">{el.name}</Button2>)}
                </ProductSpoiler>
            </div>
            <div className="adminModalProduct__typeChoose">

                {typeInformationProduct.map((el: ITypeInformation) =>

                    <div key={Object.keys(el)[0]} className="adminModalProduct__typeChooseItem">
                        <div className="adminModalProduct__text">{Object.keys(el)[0]}</div>
                        <Input
                            value={Object.values(el)[0]}
                            change={(e: string) => { dispatchInformationProductf(e, el) }}
                            inputClass='registration gv'
                            placeholder='имя типа'/>
                    </div>
                )}
            </div>
        </>

    )
})
