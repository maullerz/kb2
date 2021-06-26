import React, { useState } from 'react'
import { useMediaQuery } from '@react-hook/media-query'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import useLayout from 'utils/hooks/useLayout'

import { PageRoot, HeadBlock, Center, Content, Stats, Footer, Header, Line } from './styles'

const PageLayout = ({ children }) => {
  const blocks = useLayout(children)
  const [collapsed, setCollapsed] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1301px)')

  function handleToggleCollapsed() {
    setCollapsed(!collapsed)
  }

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

        {(isDesktop || !collapsed) && blocks.stats &&
          <Stats>
            {blocks.stats}
          </Stats>
        }

        {!isDesktop && blocks.stats &&
          <Header onClick={handleToggleCollapsed} collapsed={collapsed}>
            Top Stats (kills, last 7 days)
            <Line />
            &nbsp;
            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </Header>
        }
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
