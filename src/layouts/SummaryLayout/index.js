import React from 'react'

import useLayout from 'utils/hooks/useLayout'
import { PageImgRect } from 'components/primitives'

import { Root, LogosBlock, InfoBlock, ItemsWrapper } from './styles'

const SummaryLayout = ({ children, imgProps }) => {
  const blocks = useLayout(children)

  return (
    <Root withItems={!!blocks.items}>
      {!blocks.items &&
        <PageImgRect {...(blocks.info ? imgProps : {})} />
      }

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

      {blocks.items &&
        <ItemsWrapper>
          {blocks.items}
        </ItemsWrapper>
      }
    </Root>
  )
}

export default SummaryLayout
