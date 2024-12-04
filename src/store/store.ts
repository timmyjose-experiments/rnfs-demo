import { combineReducers, configureStore } from '@reduxjs/toolkit'
// import FileSystemStorage from 'redux-persist-filesystem-storage'
import { persistReducer, persistStore } from 'redux-persist'
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'
import counterReducer from './counterSlice'
import largeReducer from './largeSlice'
import smallReducer from './smallSlice'
import generalReducer from './generalSlice'
// import AsyncStorage from '@react-native-async-storage/async-storage'
import Store from 'react-native-fs-store'

export const FSStore = new Store('default')

const reducers = {
  counter: counterReducer,
  large: largeReducer,
  small: smallReducer,
  general: generalReducer
}

export const appReducer = combineReducers(reducers)

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'RESET') {
    return appReducer(undefined, action)
  }
  return appReducer(state, action)
}

export const persistConfig = {
  key: 'root',
  // storage: AsyncStorage,
  // storage: FileSystemStorage
  storage: FSStore
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
