import React, { useState } from 'react'

import Fold from '../../../../../UI/fold/Fold'
import FoldText from '../../../../../UI/foldText/FoldText'
import Button from '../../../../../UI/button/Button'
import { useAppSelector } from '../../../../../../hooks/reduxHooks'
import './descriptionProduct.scss'
import Radio from '../../../../../UI/radio/Radio'
import Button2 from '../../../../../UI/button2/Button2'
import { type IInformation } from '../../../../../../utils/interfaces'

const items = ['Описание', 'Характеристики']
const DescriptionProduct = () => {
    const { product } = useAppSelector((state) => state.reducer.product)
    const [toggleDesc, settoggleDesc] = useState<string>(items[0])
    const [foldDescription, setfoldDescription] = useState<boolean>(false)
    const [foldText, setfoldText] = useState<boolean>(false)
    const [foldVisible, setFoldVisible] = useState<boolean>(true)
    const [foldTextVisible, setFoldTextVisible] = useState<boolean>(true)

    return (
        <div className="main-product__description description-product">
            <div className="product-toggle">

                {items.map(item =>
                    <Radio id={item} key={item} value={toggleDesc} setValue={settoggleDesc}>
                        <Button2 className="description-product__toggleItem">{item}</Button2>
                    </Radio>
                )}

            </div>

            <div className="description-product__body">
                <Fold foldClass={toggleDesc === 'Описание' ? 'product active' : 'product'} slice={2} value={foldDescription} foldActive={setFoldVisible}>
                    {product?.information.map((et: IInformation) =>
                        <div key={et.description} className="description-product__description">{et.name}<span>{et.description}</span></div>
                    )}
                </Fold>
                <div className={toggleDesc === 'Характеристики' ? 'description-product__foldText active' : 'description-product__foldText'}>
                    <FoldText symbols={200} foldClass={toggleDesc === 'Характеристики' ? 'product active' : 'product'} value={foldText} foldActive={setFoldTextVisible} >
                        {product?.description}
                    </FoldText>
                </div>
            </div>
            <div className="Fold__buttonCover">
                {toggleDesc === 'Описание'
                    ? foldVisible && <Button onClick={() => { setfoldDescription((prev: any) => !prev) }} ripple={true} className='product-2 d'>{foldDescription ? 'Свернуть' : 'Развернуть' }</Button>
                    : foldTextVisible && <Button onClick={() => { setfoldText((prev: any) => !prev) }} ripple={true} className='product-2 d'>{foldText ? 'Свернуть' : 'Развернуть' }</Button>
                }
            </div>
        </div>
    )
}

export default DescriptionProduct
