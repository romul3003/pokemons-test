import { FC, memo } from 'react'
import { Pagination } from '@mui/material'
import { SxProps, Theme } from '@mui/material/styles'
import { OFFSET_DEFAULT } from '../constants'

type CharacterPaginationProps = {
  page: number;
  total: number;
  sx?: SxProps<Theme>;
  onChange: (newPage: number) => void;
}

const CharacterPagination: FC<CharacterPaginationProps> = ({
  page,
  total,
  sx = [],
  onChange,
}) => {
  const totalPages = Math.ceil(total / OFFSET_DEFAULT)

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

export default memo(CharacterPagination)
