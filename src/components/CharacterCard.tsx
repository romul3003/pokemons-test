/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, useState, SyntheticEvent, useMemo,
} from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardMedia,
  Link,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { Pokemon } from 'pokenode-ts'

type CharacterCardProps = {
  character: Pokemon;
}

const ARRAY_LIMIT = 5 // for convenience

const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  const {
    name, sprites, moves, stats, types,
  } = character

  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  const movesList = useMemo(
    () => moves.slice(0, ARRAY_LIMIT).map(m => m.move.name).join(', '),
    [moves],
  )

  const statsList = useMemo(
    () => stats.slice(0, ARRAY_LIMIT).map(s => s.stat.name).join(', '),
    [stats],
  )

  return (
    <Card>
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          component="p"
        >
          {name}
        </Typography>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography
              variant="h6"
              sx={{ color: 'text.secondary', fontSize: '0.75rem' }}
            >
              {expanded ? 'See less..' : 'See more..'}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: 'left' }}>
            <CardMedia
              component="img"
              src={sprites?.front_default || ''}
              alt="Pokemon"
              sx={{ width: '6rem', margin: '0 auto' }}
            />
            <Typography>
              <b>Name: </b>
              {name}
            </Typography>
            <Typography>
              <b>Moves: </b>
              {movesList}
            </Typography>
            <Typography>
              <b>Stats: </b>
              {statsList}
            </Typography>
            <Typography>
              <b>Type: </b>
              {types[0].type.name}
            </Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
