import { Slider } from '@mui/material'
import React,{useState,useEffect} from 'react'
import MyNumber from '../UI/myNumber/MyNumber'
import { catalogSlice } from '../../store2/reducers/CatalogSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks'

const SliderComponent = ({typeName,arr}:{typeName:string,arr:any[]}) => {
    const {informationValues,sliderMouseOn} = useAppSelector((state)=>state.reducer.catalog)
    const dispatch = useAppDispatch()
    const {setInformationValues,setsliderMouseOn} = catalogSlice.actions
    const [valueSlider, setValueSlider] = useState<number | number[]>([])
    
    useEffect(() => {
         setValueSlider(sliderMouseOn[typeName])
    }, [])

    useEffect(() => {
        setValueSlider(informationValues[typeName])
   }, [informationValues])
    

    const changeVal = (val:number,type:string,pos:number)=>{
        if (Array.isArray(valueSlider)) {
            const value =  [...valueSlider]
            value[pos] = val
        
            dispatch(setInformationValues({...informationValues,[type]:value}))
        }

    
  
     }

     const changeValSlider = (val:number[]| number)=>{
           console.log(val,'dd');
           
        setValueSlider(val)
        dispatch(setInformationValues({...informationValues,[typeName]:val}))
     }

  return (
    <div className="right-main-catalog__slider slider-right-main-catalog">
    <Slider 
           valueLabelDisplay="auto"
            value={valueSlider}
            onChange={(event: Event, value: number | number[], activeThumb: number)=>setValueSlider(value)}
            onChangeCommitted={(event: Event | React.SyntheticEvent<Element, Event>, value: number | number[])=>changeValSlider(value)}
            min={Number(arr.sort((a:any,b:any)=>a-b)[0])}
            max={Number(arr.sort((a:any,b:any)=>b-a)[0])}
    />
    <div className="slider-right-main-catalog__sliderInputs">
    <MyNumber 
        min={Number(arr.sort((a:any,b:any)=>a-b)[0])} 
        max={informationValues[typeName][1]} 
        value={Array.isArray(valueSlider) ? valueSlider[0] : 0}
        setValue={(e:any)=>changeVal(e,typeName,0)}
        className="slider-right-main-catalog__sliderInput"
        />
  
    <div className="slider-right-main-catalog__d">-</div>
    
    <MyNumber 
        min={informationValues[typeName][0]} 
        max={Number(arr.sort((a:any,b:any)=>b-a)[0])} 
        value={Array.isArray(valueSlider) ? valueSlider[1] : 0}
        setValue={(e:any)=>changeVal(e,typeName,1)}
        className="slider-right-main-catalog__sliderInput"
        />
    
    </div>
    </div>
  )
}

export default SliderComponent