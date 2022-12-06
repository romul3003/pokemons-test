import {
  createSlice, createAsyncThunk, PayloadAction,
} from '@reduxjs/toolkit'
import { Pokemon } from 'pokenode-ts'
import { api } from '../../api'
import { getListWithOffset } from '../../helpers'
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
  characterType: string;
  page: number;
  count: number;
  loading: boolean;
  error: string | null;
}

const initialState: CharactersState = {
  list: [],
  filteredList: [],
  search: '',
  characterType: 'all',
  page: 1,
  count: 0,
  loading: false,
  error: null,
}

export const characters = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    loadCharacters: (state, action: PayloadAction<{
      newPage: number;
      search: string;
      characterType: string;
    }>) => {
      const { newPage, search, characterType } = action.payload

      const filteredByTypeList = characterType !== 'all'
        ? state.list.filter(item => item.types[0].type.name === characterType)
        : state.list

      const filteredByNameList = filteredByTypeList.filter(item => item.name.includes(search))

      state.page = newPage
      state.search = search
      state.filteredList = getListWithOffset(newPage, filteredByNameList)
      state.count = filteredByNameList.length
      state.characterType = characterType
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
      state.filteredList = getListWithOffset(1, action.payload)
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

export const { loadCharacters } = characters.actions

export default characters.reducer
