'use client'
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './features/user/userSlice';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
    timeout: 1,
}

const rootReducer = combineReducers({
    user: userSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch