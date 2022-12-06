import { FC, memo } from 'react'
import { Grid, Paper, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'
import { Pokemon } from 'pokenode-ts'

import CharacterCard from './CharacterCard'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}))

type CharacterListProps = {
  list: Pokemon[]
}

const CharacterList: FC<CharacterListProps> = ({ list }) => {
  if (!list.length) {
    return (
      <Typography
        variant="h5"
        textAlign="center"
      >
        There are no characters yet
      </Typography>
    )
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      mb="2rem"
    >
      {list.map(character => (
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
  )
}

export default memo(CharacterList)
