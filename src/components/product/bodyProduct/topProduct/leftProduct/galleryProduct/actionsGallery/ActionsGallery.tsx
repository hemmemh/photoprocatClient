
import { useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../../../../../../hooks/reduxHooks'
import { catalogSlice } from '../../../../../../../store2/reducers/CatalogSlice'
import {ReactComponent as CompareSvg} from '../../../../../../../images/compare.svg'
import {ReactComponent as StarSvg} from '../../../../../../../images/star.svg'

import Loader from '../../../../../../UI/loader/Loader'
import useAddtoComapre from '../../../../../../../hooks/useAddtoComapre'
import useAddtoLove from '../../../../../../../hooks/useAddtoLove'
const ActionsGallery = () => {

    const {inCompare,inLoves} = useAppSelector((state)=>state.reducer.product)

    const dispatch = useAppDispatch()
    const {id} = useParams()


    const {addToCompare,inCompareSnippet,loader:compareLoader} = useAddtoComapre({inCompare,productId:id})
    const {addToLoves,inLovesSnippet,loader:loveLoader} = useAddtoLove({inLoves,productId:id})

  return (
    <div className="gallery-product__actions">
             {compareLoader ?
                                <CompareSvg onClick={addToCompare} className={inCompareSnippet ? "gallery-product__action active" : "gallery-product__action"}/>:
                                <Loader />}
                             {loveLoader ?
                              <StarSvg onClick={addToLoves} className={inLovesSnippet ? "gallery-product__action active" : "gallery-product__action"}/>
                            :
                            <Loader/>
                            }
       
    </div>
  )
}

export default ActionsGallery