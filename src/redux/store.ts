import { configureStore } from '@reduxjs/toolkit'
import charactersReducer from './slices/charactersSlice'
import typesReducer from './slices/typesSlice'

export const store = configureStore({
  reducer: {
    characters: charactersReducer,
    types: typesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
