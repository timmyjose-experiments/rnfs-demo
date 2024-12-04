import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import largeReducer from './largeSlice'
import smallReducer from './smallSlice'

const reducers = {
  counter: counterReducer,
  large: largeReducer,
  small: smallReducer
}

export const appReducer = combineReducers(reducers)

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
})

export const persistor = persistStore(store)

const tstore = configureStore({
  reducer: reducers
})

export type AppGetState = typeof tstore.getState
export type AppState = ReturnType<AppGetState>
export type AppDispatch = typeof tstore.dispatch
export type AppStore = typeof tstore
export type UseDispatchFunc = () => AppDispatch
export type DispatchFunc<T> = (dispatch: AppDispatch, getState: AppGetState) => T

export const useAppDispatch: UseDispatchFunc = useDispatch
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector
export const useAppStore: () => AppStore = useStore
