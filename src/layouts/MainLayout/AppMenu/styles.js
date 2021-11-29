import styled from 'styled-components'
import { Menu, MenuItem } from '@mui/material/'

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper {
    min-width: 200px;
  }

  .MuiList-root {
    padding-top: 10px;
    padding-bottom: 10px;
  }
`

export const StyledMenuItem = styled(MenuItem)`
  text-decoration: none;
`
