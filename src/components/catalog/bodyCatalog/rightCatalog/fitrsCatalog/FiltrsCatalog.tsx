import { Slider } from "@mui/material"
import { useAppDispatch, useAppSelector } from "../../../../../hooks/reduxHooks"
import { catalogSlice } from "../../../../../store2/reducers/CatalogSlice"
import RadioGroup from "../../../../radioGroup/RadioGroup"
import CheckBoxGroup from "../../../../checkBoxGroup/CheckBoxGroup"
import MyNumber from "../../../../UI/myNumber/MyNumber"
import SliderComponent from "../../../../sliderComponent/SliderComponent"




export const FiltrsCatalog = () => {
    const {typeInformation,informations,informationValues,sliderMouseOn} = useAppSelector((state)=>state.reducer.catalog)
    const dispatch = useAppDispatch()
    const {setInformationValues,setsliderMouseOn} = catalogSlice.actions

    const changeVal = (val:number,type:string,pos:number)=>{
      const value = [...sliderMouseOn[type]]

      
      value[pos] = val
    
      dispatch(setsliderMouseOn({...sliderMouseOn,[type]:value}))
      dispatch(setInformationValues({...informationValues,[type]:value}))
  }

  return (
     <>
       {Object.entries(typeInformation).map((el:any)=>{
  
      
  const type = el[1]
  const typeName = el[0]
  let arr:any[] = []
  arr = [...informations.filter((fil:any)=>fil.name == typeName).map((ee:any)=>ee.description)]
  arr = arr.filter((fil:any,pos:any)=> arr.indexOf(fil) === pos)

   if (type == 'radio') {
      return(
        <div key={typeName} className="GroupCover">
          <div className="GroupCover__name">{typeName}</div>
          <RadioGroup typeName={typeName} arr={arr}/>
        </div>
        

      )
    
     
       
    
   }
   if (type == 'check') {
    return (
      <div key={typeName} className="GroupCover">
      <div className="GroupCover__name">{typeName}</div>
      <CheckBoxGroup  typeName={typeName} arr={arr}/>
      
   </div>

    )

    
    
    }
    if (type == 'slider') {
       if (arr.length === 1 ) {
         arr = [0,arr[0]]
       }
        return  <>
        <div key={typeName} className="right-main-catalog__slider  slider-right-main-catalog ">
        <div className='GroupCover__name'>{typeName}</div>
        <SliderComponent arr={arr} typeName={typeName}/>
        </div>
        </>
}
  
})}
     </>
  )
}

