import styled from 'styled-components'

import { Menu } from '@material-ui/core'
import { IconButton } from 'components'

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 12px 2px 0;
`

export const StyledIconButton = styled(IconButton)`
  width: 40px;
  height: 40px;
  svg {
    transform: scale(1.5);
  }
`

export const StyledMenu = styled(Menu)`
  .MuiMenu-paper {
    min-width: 193px;
  }
`

export const UserName = styled.div`
  margin-bottom: 2px;
  font-family: Avenir;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  line-height: 22px;
  color: rgba(255, 255, 255, 0.87);
`

export const UserEmail = styled.div`
  font-family: Graphik LC;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  color: rgba(255, 255, 255, 0.6);
`

export const UserInfo = styled.div`
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  padding-left: 24px;
`

export const UserMenuRoot = styled.div`
  display: flex;
`
