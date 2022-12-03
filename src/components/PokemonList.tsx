import {
  FC, memo, useCallback, useEffect,
} from 'react'
import { Box, Grid, Paper } from '@mui/material'
import { styled } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { selectPokemons } from '../redux/selectors/pokemonsSelectors'
import { getPokemonsAsync, setNewPage } from '../redux/slices/pokemonsSlice'
import PokemonCard from './PokemonCard'
import PokemonsPagination from './PokemonsPagination'
import { OFFSET_DEFAULT } from '../constants'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

const PokemonList: FC = () => {
  const dispatch = useAppDispatch()
  const { list, count, page } = useAppSelector(selectPokemons)

  const changePage = useCallback((newPage: number) => {
    const offset = (newPage - 1) * OFFSET_DEFAULT

    dispatch(setNewPage(newPage))
    dispatch(getPokemonsAsync({ offset }))
  }, [dispatch])

  useEffect(() => {
    if (!list.length) {
      const savedPage = Number(localStorage.getItem('pageNumber')) || 1
      changePage(savedPage)
    }
  }, [changePage, dispatch, list.length])

  console.log('render')

  return list.length ? (
    // <Box sx={{ height: '100%' }}>
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
        mb="2rem"
      >
        {list.map(pokemon => (
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            key={pokemon.name}
          >
            <Item>
              <PokemonCard pokemon={pokemon} />
            </Item>
          </Grid>
        ))}
      </Grid>
      <PokemonsPagination
        total={count ?? 0}
        page={page}
        onChange={changePage}
        sx={{
          display: 'flex',
          justifyContent: 'end',
          marginTop: 'auto',
        }}
      />
    </Box>
    // </Box>
  ) : null
}

export default memo(PokemonList)
