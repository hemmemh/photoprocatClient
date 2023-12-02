import { type RootState } from '../../store2/store'

export const admin = (state: RootState) => state.reducer.admin
export const fileImages = (state: RootState) => admin(state).fileImages
