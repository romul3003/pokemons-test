import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../api'
import { ErrorResponse } from '../../types'

export const getTypesAsync = createAsyncThunk<
  string[],
  undefined,
  {rejectValue: ErrorResponse}
>(
  'types/getTypes',
  async (_, thunkApi) => {
    try {
      const { results } = await api.types.getTypesList()

      return results.map(r => r.name)
    } catch (error) {
      return thunkApi.rejectWithValue(error as ErrorResponse)
    }
  },
)

type TypesState = {
  typesList: string[];
  loading: boolean;
  error: string | null;
}

const initialState: TypesState = {
  typesList: [],
  loading: false,
  error: null,
}

export const types = createSlice({
  name: 'types',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTypesAsync.pending, (state) => {
      state.loading = true
      state.error = null
    })
    builder.addCase(getTypesAsync.fulfilled, (state, action) => {
      state.loading = false
      state.typesList = action.payload
    })
    builder.addCase(getTypesAsync.rejected, (state, action) => {
      state.loading = false

      if (action.payload) {
        state.error = action.payload.message
      } else {
        state.error = action.error.message as string
      }
    })
  },
})

export default types.reducer
