import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IinitialState {
    load: boolean
}

const initialState: IinitialState = {
    load: true
}

export const loveSlice = createSlice({
    name: 'love',
    initialState,
    reducers: {
        setLoad (state, action: PayloadAction<boolean>) {
            state.load = action.payload
        }
    }

})

export default loveSlice.reducer
