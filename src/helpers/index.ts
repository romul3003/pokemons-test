import { Pokemon } from 'pokenode-ts'

import { OFFSET_DEFAULT } from '../constants'

export const getListWithOffset = (newPage = 1, arr: Pokemon[]) => {
  const offset = (newPage - 1) * OFFSET_DEFAULT
  return arr.slice(offset, offset + OFFSET_DEFAULT)
}
