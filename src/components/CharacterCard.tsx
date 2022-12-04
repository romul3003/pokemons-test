/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  FC, useState, SyntheticEvent,
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

const CharacterCard: FC<CharacterCardProps> = ({ character: { name } }) => {
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

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
          <AccordionDetails>
            Additional info
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  )
}

export default CharacterCard
