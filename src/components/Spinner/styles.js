import styled from 'styled-components'
import Backdrop from '@mui/material/Backdrop'

export const SpinnerWrapper = styled.div`
  margin: 16px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1 0 auto;
`

export const StyledBackdrop = styled(Backdrop)`
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`
