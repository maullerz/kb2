import React from 'react'

import useLayout from 'utils/hooks/useLayout'

import { PageRoot, HeadBlock, Content, Footer } from './styles'

const PageLayout = ({ children }) => {
  const blocks = useLayout(children)

  return (
    <PageRoot>
      {blocks.head &&
        <HeadBlock>
          {blocks.head}
        </HeadBlock>
      }

      <Content>
        {blocks.content}
      </Content>

      {blocks.footer &&
        <Footer>
          {blocks.footer}
        </Footer>
      }
    </PageRoot>
  )
}

export default PageLayout
