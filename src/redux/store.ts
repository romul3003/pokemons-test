import { configureStore } from '@reduxjs/toolkit'
import pokemonsReducer from './slices/CharactersSlice'

export const store = configureStore({
  reducer: {
    characters: pokemonsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
