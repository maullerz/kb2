import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'

import { StyledBackdrop, SpinnerWrapper } from './styles'

const Spinner = props => {
  const { fullscreen, ...rest } = props
  if (fullscreen) {
    return (
      <StyledBackdrop open>
        <CircularProgress />
      </StyledBackdrop>
    )
  }

  return (
    <SpinnerWrapper {...rest}>
      <CircularProgress />
    </SpinnerWrapper>
  )
}

export default Spinner
