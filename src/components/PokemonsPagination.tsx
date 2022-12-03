import { FC, memo } from 'react'
import { Pagination } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { LIMIT_DEFAULT } from '../constants'

type PokemonsPaginationProps = {
  page: number;
  total: number;
  sx?: SxProps<Theme>;
  onChange: (newPage: number) => void;
}

const PokemonsPagination: FC<PokemonsPaginationProps> = ({
  page,
  total,
  sx = [],
  onChange,
}) => {
  const totalPages = Math.ceil(total / LIMIT_DEFAULT)

  return (
    <Pagination
      count={totalPages}
      page={page}
      onChange={(_, newPage:number) => onChange(newPage)}
      showFirstButton
      showLastButton
      shape="rounded"
      color="primary"
      sx={[
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  )
}

export default memo(PokemonsPagination)
