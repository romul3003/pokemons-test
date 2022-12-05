import { FC, useState } from 'react'
import {
  Select, SelectChangeEvent, Box, InputLabel, MenuItem, FormControl,
} from '@mui/material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      // eslint-disable-next-line no-magic-numbers
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const TypesSelect: FC = () => {
  const [charactersType, setCharactersType] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    setCharactersType(event.target.value as string)
  }

  return (
    <Box sx={{ minWidth: 120, width: '50%' }}>
      <FormControl fullWidth>
        <InputLabel id="types-label">Age</InputLabel>
        <Select
          labelId="types-label"
          id="types--select"
          value={charactersType}
          label="Type"
          onChange={handleChange}
          MenuProps={MenuProps}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
          <MenuItem value={40}>40</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={60}>60</MenuItem>
          <MenuItem value={70}>70</MenuItem>
          <MenuItem value={80}>80</MenuItem>
          <MenuItem value={90}>90</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
    </Box>
  )
}

export default TypesSelect
