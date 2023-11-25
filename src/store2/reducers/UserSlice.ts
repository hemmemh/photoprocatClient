
import { createSlice,PayloadAction } from '@reduxjs/toolkit'
import {IProduct} from '../../utils/interfaces'
import dayjs, { Dayjs } from 'dayjs'



type initialState = {
toggle:number
name:string,
serName:string,
data:string,
tell:string
loadData:boolean
loaduser:boolean
repeatLoad:boolean
}

const initialState:initialState = {
    toggle:1,
    name:'',
serName:'',
data:'2022-04-17',
tell:'',
loadData:false,
loaduser:true,
repeatLoad:false
}

export const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setToggle(state,action:PayloadAction<number>){
            state.toggle = action.payload
        },
        setName(state,action:PayloadAction<string>){
            state.name = action.payload
        },
        setSerName(state,action:PayloadAction<string>){
            state.serName = action.payload
        },
        setData(state,action:PayloadAction<string>){
            state.data= action.payload
        },
        setTell(state,action:PayloadAction<string>){
            state.tell= action.payload
        },
        setLoadData(state,action:PayloadAction<boolean>){
            state.loadData= action.payload
        },
        setLoaduser(state,action:PayloadAction<boolean>){
            state.loaduser= action.payload
        },
        setRepeatLoad(state,action:PayloadAction<boolean>){
            state.repeatLoad = action.payload
        },


        
    }

})

export default userSlice.reducer