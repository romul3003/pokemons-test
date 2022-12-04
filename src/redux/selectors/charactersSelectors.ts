import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { OFFSET_DEFAULT } from '../../constants'

export const selectCharacters = (state: RootState) => state.characters

export const selectCharactersPerPage = (newPage = 1) => createSelector(
  [selectCharacters],
  (characters) => {
    const offset = (newPage - 1) * OFFSET_DEFAULT

    return characters.list.slice(offset, offset + OFFSET_DEFAULT)
  },
)
