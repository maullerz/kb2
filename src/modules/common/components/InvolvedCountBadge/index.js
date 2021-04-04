import React from 'react'
// import React, { useState } from 'react'

// import { Href } from 'components'

import { Root, InvolvedCountText } from './styles'

function InvolvedCountBadge({ km }) {
  const { atts } = km
  return (
    <Root>
      <InvolvedCountText>
        {atts.length}
      </InvolvedCountText>
    </Root>
  )
}

export default InvolvedCountBadge
