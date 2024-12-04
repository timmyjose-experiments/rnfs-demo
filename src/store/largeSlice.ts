import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './store'

export type LargeData = {
  id: number
  value: string
}

export interface LargeSliceState {
  value: LargeData[]
}

const initialState: LargeSliceState = {
  value: []
}

export const largeSlice = createSlice({
  name: 'large',
  initialState,
  reducers: {
    setLargeData: (state, action: PayloadAction<LargeData[]>) => {
      state.value = action.payload
    }
  }
})

export const getLargeDataSelector = (state: AppState) => state.large.value

export const { setLargeData } = largeSlice.actions
export default largeSlice.reducer