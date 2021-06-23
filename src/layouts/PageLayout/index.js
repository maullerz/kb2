import React from 'react'

import useLayout from 'utils/hooks/useLayout'

import { PageRoot, HeadBlock, Center, Content, Stats, Footer } from './styles'

const PageLayout = ({ children }) => {
  const blocks = useLayout(children)

  return (
    <PageRoot>
      {blocks.head &&
        <HeadBlock>
          {blocks.head}
        </HeadBlock>
      }

      <Center>
        <Content>
          {blocks.content}
        </Content>

        <Stats>
          {blocks.stats}
        </Stats>
      </Center>

      {blocks.footer &&
        <Footer>
          {blocks.footer}
        </Footer>
      }
    </PageRoot>
  )
}

export default PageLayout
