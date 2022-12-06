import {
  FC, useState, memo, useEffect,
} from 'react'
import {
  Select, SelectChangeEvent, Box, InputLabel, MenuItem, FormControl,
} from '@mui/material'
import { useAppSelector } from '../redux/hooks'
import { selectTypes } from '../redux/selectors/typesSelectors'

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

type TypesSelectProps = {
  changeType: (value: string) => void
}

const TypesSelect: FC<TypesSelectProps> = ({ changeType }) => {
  const [charactersType, setCharactersType] = useState('all')
  const { typesList } = useAppSelector(selectTypes)

  const handleChange = (event: SelectChangeEvent) => {
    setCharactersType(event.target.value as string)
  }

  useEffect(() => {
    changeType(charactersType)
  }, [charactersType, changeType])

  return typesList.length ? (
    <Box sx={{ width: '100%' }}>
      <FormControl fullWidth>
        <InputLabel id="types-label">Type</InputLabel>
        <Select
          labelId="types-label"
          id="types--select"
          value={charactersType}
          label="Type"
          onChange={handleChange}
          MenuProps={MenuProps}
          defaultValue="all"
        >
          {typesList.map(typeName => (
            <MenuItem
              key={typeName}
              value={typeName}
            >
              {typeName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  ) : null
}

export default memo(TypesSelect)
