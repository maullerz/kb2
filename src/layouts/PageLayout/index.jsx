import React from 'react'

import useLayout from 'utils/hooks/useLayout'

import { PageRoot, PageTitle, ProjectTitle, Header, Content, Footer } from './styles'

const PageLayout = ({ children }) => {
  const blocks = useLayout(children)

  return (
    <PageRoot>
      <PageTitle>
        {blocks.title}
      </PageTitle>

      {blocks.subTitleText && (
        <ProjectTitle>
          {blocks.subTitleText}
        </ProjectTitle>
      )}

      {blocks.subTitleNode && blocks.subTitleNode}

      {blocks.header && (
        <Header>
          {blocks.header}
        </Header>
      )}

      <Content>
        {blocks.content}
      </Content>

      {blocks.footer && (
        <Footer>
          {blocks.footer}
        </Footer>
      )}
    </PageRoot>
  )
}

export default PageLayout
