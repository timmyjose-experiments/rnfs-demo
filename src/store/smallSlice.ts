import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './store'

export type SmallData = {
  id: number
  value: string
}

export interface LargeSliceState {
  value: SmallData[]
}

const initialState: LargeSliceState = {
  value: []
}

export const smallSlice = createSlice({
  name: 'large',
  initialState,
  reducers: {
    setSmallData: (state, action: PayloadAction<SmallData[]>) => {
      state.value = action.payload
    }
  }
})

export const getSmallDataSelector = (state: AppState) => state.small.value

export const { setSmallData } = smallSlice.actions
export default smallSlice.reducer