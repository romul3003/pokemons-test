import {
  FC, useCallback, useEffect, ChangeEvent,
} from 'react'
import {
  Box, TextField, Stack, CircularProgress,
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

import { selectCharacters } from '../../redux/selectors/charactersSelectors'
import { getCharactersAsync, loadCharacters } from '../../redux/slices/charactersSlice'
import { getTypesAsync } from '../../redux/slices/typesSlice'
import { LIMIT_DEFAULT } from '../../constants'

import Layout from '../Layout'
import CharacterList from '../CharacterList'
import CharacterPagination from '../CharacterPagination'

import TypesSelect from '../TypesSelect'

const App: FC = () => {
  const dispatch = useAppDispatch()
  const {
    filteredList, search, page, count, characterType, loading,
  } = useAppSelector(selectCharacters)

  const searchCharacters = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(loadCharacters({ newPage: 1, search: event.target.value, characterType }))
  }, [dispatch, characterType])

  const changePage = useCallback((newPage: number) => {
    dispatch(loadCharacters({ newPage, search, characterType }))
  }, [dispatch, search, characterType])

  const changeType = useCallback((value: string) => {
    dispatch(loadCharacters({ newPage: 1, search, characterType: value }))
  }, [dispatch, search])

  useEffect(() => {
    dispatch(getCharactersAsync())
    dispatch(getTypesAsync())
  }, [dispatch])

  const charactersJSX = loading
    ? (<Box textAlign="center"><CircularProgress /></Box>)
    : (<CharacterList list={filteredList} />)

  return (
    <Layout>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="center"
          alignItems="center"
          spacing={2}
          mb="3rem"
        >
          <TextField
            onChange={searchCharacters}
            label="Search characters..."
            sx={{ width: '100%' }}
          />
          <TypesSelect changeType={changeType} />
        </Stack>
        { charactersJSX}
        {count > LIMIT_DEFAULT && (
          <CharacterPagination
            total={count ?? 0}
            page={page}
            onChange={changePage}
            sx={{
              display: 'flex',
              justifyContent: 'end',
              marginTop: 'auto',
            }}
          />
        )}
      </Box>
    </Layout>
  )
}

export default App
