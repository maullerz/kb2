import styled from 'styled-components'

import { MenuItem, Menu } from '@material-ui/core'

export const PageNumber = styled.span`
  display: flex;
  align-items: center;
  /* justify-content: flex-end; */
  width: 48px;
  margin-top: 1px;
  padding-left: 10px;
  border-bottom: 1px solid transparent;

  ${({ open }) => (open && `
    border-radius: 4px 4px 0 0;
    background-color: #343640;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  `)}
`

export const StyledMenuItem = styled(MenuItem)`
  width: 48px;
  padding: 4px 10px;
`

export const StyledMenu = styled(Menu)`
  .MuiPaper-root {
    border-radius: 0 0 4px 4px;
    box-shadow: none;
  }
`
