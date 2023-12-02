import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface IinitialState {
    loader: boolean
    successfullReg: boolean
    data: string
    name: string
    secondName: string
    mail: string
    password: string
    tell: string
    validationEmail: boolean
    validationPassword: boolean
}

const initialState: IinitialState = {
    loader: false,
    successfullReg: false,
    data: '2022-04-17',
    name: '',
    secondName: '',
    mail: '',
    password: '',
    tell: '',
    validationEmail: true,
    validationPassword: true

}

export const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setLoader (state, action: PayloadAction<boolean>) {
            state.loader = action.payload
        },
        setSuccessfullReg (state, action: PayloadAction<boolean>) {
            state.successfullReg = action.payload
        },
        setData (state, action: PayloadAction<string>) {
            state.data = action.payload
        },
        setName (state, action: PayloadAction<string>) {
            state.name = action.payload
        },
        setSecondName (state, action: PayloadAction<string>) {
            state.secondName = action.payload
        },
        setMail (state, action: PayloadAction<string>) {
            state.mail = action.payload
        },
        setPassword (state, action: PayloadAction<string>) {
            state.password = action.payload
        },
        setTell (state, action: PayloadAction<string>) {
            state.tell = action.payload
        },
        setValidationEmail (state, action: PayloadAction<boolean>) {
            state.validationEmail = action.payload
        },
        setValidationPassword (state, action: PayloadAction<boolean>) {
            state.validationPassword = action.payload
        }
    }

})

export default registrationSlice.reducer
