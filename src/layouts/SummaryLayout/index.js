import React from 'react'

import useLayout from 'utils/hooks/useLayout'
import { PageImgRect } from 'components/primitives'

import { Root, LogosBlock, InfoBlock } from './styles'

const SummaryLayout = ({ children, imgProps }) => {
  const blocks = useLayout(children)

  return (
    <Root>
      <PageImgRect {...(blocks.info ? imgProps : {})} />

      {blocks.logos &&
        <LogosBlock>
          {blocks.logos}
        </LogosBlock>
      }

      {blocks.info &&
        <InfoBlock>
          {blocks.info}
        </InfoBlock>
      }
    </Root>
  )
}

export default SummaryLayout
