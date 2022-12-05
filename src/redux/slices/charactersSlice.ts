/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createSlice, createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit'
import { Pokemon } from 'pokenode-ts'
import { api } from '../../api'
import { OFFSET_DEFAULT } from '../../constants'
import { ErrorResponse } from '../../types'
import { PaginationRequest } from '../types/pokemonsTypes'

export const getCharactersAsync = createAsyncThunk<
  Pokemon[],
  PaginationRequest | undefined,
  {rejectValue: ErrorResponse}
>(
  'characters/getCharacters',
  async ({ offset, limit } = {}, thunkApi) => {
    try {
      const { results } = await api.characters.getPokemonsList(offset, limit)
      const responses = await api.characters.getPokemonsDetails(results.map(r => r.name))

      return responses
    } catch (error) {
      return thunkApi.rejectWithValue(error as ErrorResponse)
    }
  },
)

type CharactersState = {
  list: Pokemon[];
  filteredList: Pokemon[];
  search: string;
  page: number;
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  list: [],
  filteredList: [],
  search: '',
  page: 1,
  count: 0,
  loading: false,
  error: null,
}

export const characters = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setNewPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload
      // localStorage.setItem('pageNumber', String(action.payload))
    },
    loadCharacters: (state, action: PayloadAction<{newPage: number, search: string}>) => {
      const { newPage, search } = action.payload
      const filteredList = state.list.filter(item => item.name.includes(search))

      state.page = newPage
      state.search = search
      state.filteredList = setPage(newPage, filteredList)
      state.count = filteredList.length
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCharactersAsync.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getCharactersAsync.fulfilled, (state, action) => {
      state.loading = false
      state.list = action.payload
      state.filteredList = setPage(1, action.payload)
      state.count = action.payload.length
    })
    builder.addCase(getCharactersAsync.rejected, (state, action) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message as string
      }
    })
  },
})

export const { setNewPage, loadCharacters } = characters.actions

export default characters.reducer

function setPage(newPage = 1, arr: Pokemon[]) {
  const offset = (newPage - 1) * OFFSET_DEFAULT
  return arr.slice(offset, offset + OFFSET_DEFAULT)
}
