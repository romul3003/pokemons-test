import {
  ChangeEvent,
  FC, memo, useCallback, useEffect,
} from 'react'
import {
  Box, Grid, Paper, TextField,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectCharacters } from '../redux/selectors/charactersSelectors'
import { getCharactersAsync, loadCharacters } from '../redux/slices/CharactersSlice'
import CharacterCard from './CharacterCard'
import CharacterPagination from './CharacterPagination'
import { LIMIT_DEFAULT } from '../constants'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const PokemonList: FC = () => {
  const dispatch = useAppDispatch()
  const {
    filteredList, search, page, count,
  } = useAppSelector(selectCharacters)

  const searchCharacters = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    dispatch(loadCharacters({ newPage: 1, search: event.target.value }))
  }, [dispatch])

  const changePage = useCallback((newPage: number) => {
    dispatch(loadCharacters({ newPage, search }))
  }, [dispatch, search])

  useEffect(() => {
    dispatch(getCharactersAsync())
  }, [dispatch])

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <TextField
        onChange={searchCharacters}
        label="Search characters..."
        sx={{ mb: '4rem' }}
      />
      {!!filteredList.length && (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          mb="2rem"
        >
          {filteredList.map(character => (
            <Grid
              item
              xs={2}
              sm={4}
              md={4}
              key={character.name}
            >
              <Item>
                <CharacterCard character={character} />
              </Item>
            </Grid>
          ))}
        </Grid>
      )}

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
  )
}

export default memo(PokemonList)
