import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppState } from './store'

export interface GeneralSliceState {
  hasMigrated: boolean | null
}

const initialState: GeneralSliceState = {
  hasMigrated: false
}

export const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    setHasMigrated: (state, action: PayloadAction<boolean>) => {
      state.hasMigrated = action.payload
    }
  }
})

export const getHasMigrated = (state: AppState) => state.general.hasMigrated

export const { setHasMigrated } = generalSlice.actions
export default generalSlice.reducer