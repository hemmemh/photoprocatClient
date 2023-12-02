import Fold from '../../../UI/fold/Fold'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Controller } from 'swiper'
import { compareSlice } from '../../../../store2/reducers/CompareSlice'
import { useAppDispatch, useAppSelector } from '../../../../hooks/reduxHooks'
import { type ICompareItem, type IInformation } from '../../../../utils/interfaces'
import './bottomCompare.scss'
const BottomCompare = ({ setSecondSwiper, firstSwiper }: { setSecondSwiper: (a: typeof firstSwiper) => void, firstSwiper: any }) => {
    const { compare } = useAppSelector(state => state.reducer.catalog)
    const { activeType, fold, informations } = useAppSelector(state => state.reducer.compare)
    const { setFold } = compareSlice.actions
    const dispatch = useAppDispatch()

    const dispatchFold = (bool: boolean) => {
        dispatch(setFold(bool))
    }

    return (
        <div className="main-compare__bottom">
            <div className="main-compare__bottom-left">
                <Fold value={fold} foldChange={dispatchFold} slice={2} >
                    { informations.map((el: IInformation) =>
                        <div key={el._id} className="main-compare__bottom-left__item">{el.name}</div>
                    )}
                </Fold>
            </div>
            <div className="item-swiperCompare__bottom-right">
                <Swiper
                    slidesPerView={2}
                    className="swiperCompare2"
                    spaceBetween={9}
                    modules={[Controller]}
                    onSwiper={(e) => { setSecondSwiper(e) }}
                    controller={{ control: firstSwiper }}
                    breakpoints={{
                        786: {
                            spaceBetween: 55,

                            slidesPerView: 3
                        },
                        982: {

                            spaceBetween: 55,
                            slidesPerView: 4
                        },
                        1213: {
                            slidesPerView: 4,
                            spaceBetween: 120

                        }

                    }}
                >
                    {compare.map((el: ICompareItem) => {
                        if (el.product.type.name === activeType) {
                            return (
                                <SwiperSlide key={el._id}>
                                    <div className="swiperCompare2__item item-swiperCompare2">
                                        <Fold foldClass='ggg' value={fold} foldChange={(e: any) => dispatch(setFold(e))} slice={2} >
                                            {el.product.information.map((m: any) => <div key={m.description} className="item-swiperCompare2__item">{m.description}</div>)}
                                        </Fold>
                                    </div>
                                </SwiperSlide>

                            )
                        }
                    }

                    )}

                </Swiper>

            </div>

        </div>
    )
}

export default BottomCompare
