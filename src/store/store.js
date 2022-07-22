import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth'
import { registerSlice } from './register'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    register: registerSlice.reducer
  },
})