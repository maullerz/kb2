import styled from 'styled-components'

import { IconButton } from 'components'

export const StyledHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 74px;
  margin: 0 24px 0 36px;
  padding: 16px 0;
`

export const StyledRightArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 74px;

  > button {
    margin-right: 20px;
  }
`

export const StyledIconButton = styled(IconButton)`
  width: 36px;
  height: 36px;
  background-color: #2A2B33;
  border-radius: 4px;

  svg > path {
    fill: #96CEF6;
  }
`
