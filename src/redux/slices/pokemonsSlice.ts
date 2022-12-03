/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice, createAsyncThunk, AnyAction, PayloadAction,
} from '@reduxjs/toolkit'
import { NamedAPIResourceList, NamedAPIResource } from 'pokenode-ts'
import { api } from '../../api'
import { ErrorResponse } from '../../types'
import { PaginationRequest } from '../types/pokemonsTypes'

export const getPokemonsAsync = createAsyncThunk<
  NamedAPIResourceList,
  PaginationRequest | undefined,
  {rejectValue: ErrorResponse}
>(
  'pokemons/getPokemons',
  async ({ offset, limit } = {}, thunkApi) => {
    try {
      const response = await api.pokemon.getPokemons(offset, limit)
      return response
    } catch (error) {
      return thunkApi.rejectWithValue(error as ErrorResponse)
    }
  },
)

type PokemonsState = {
  list: NamedAPIResource[];
  page: number;
  count: number;
  next: string | null;
  previous: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: PokemonsState = {
  list: [],
  page: 1,
  count: 0,
  next: null,
  previous: null,
  loading: false,
  error: null,
}

export const pokemons = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setNewPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
      localStorage.setItem('pageNumber', String(action.payload))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getPokemonsAsync.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getPokemonsAsync.fulfilled, (state, action) => {
      const {
        count, next, previous, results,
      } = action.payload

      state.loading = false
      state.list = results
      state.count = count
      state.next = next
      state.previous = previous
    })
    builder.addCase(getPokemonsAsync.rejected, (state, action) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message as string
      }
    })
  },
})

export const { setNewPage } = pokemons.actions

export default pokemons.reducer
