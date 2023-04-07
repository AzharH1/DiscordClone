import { configureStore } from '@reduxjs/toolkit'
import modalSlice from './modalSlice'
import serverSlice from './serverSlice'
import userSlice from './userSlice'

export const store = configureStore({
  reducer: {
    modals: modalSlice,
    user: userSlice,
    server: serverSlice
  },
})