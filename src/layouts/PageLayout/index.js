import React, { useState } from 'react'
import { useMediaQuery } from '@react-hook/media-query'

import useLayout from 'utils/hooks/useLayout'
import { Expander } from 'components'

import { PageRoot, HeadBlock, Center, Content, Stats, Footer, EmptyRow } from './styles'

const getStoredValue = () => {
  const result = localStorage.getItem(`collapsed-top-stats-7`)
  return Boolean(result)
}

const PageLayout = ({ children }) => {
  const blocks = useLayout(children)
  const [collapsed, setCollapsed] = useState(getStoredValue())
  const isDesktop = useMediaQuery('(min-width: 1301px)')

  function handleToggleCollapsed() {
    setCollapsed(!collapsed)
  }

  return (
    <>
      {/* <AdsBlock>
        {blocks.ads
          ? <Ads type='list' />
          : <EmptyRow small />
        }
      </AdsBlock> */}

      <PageRoot>
        {blocks.head &&
          <HeadBlock>
            {blocks.head}
          </HeadBlock>
        }

        <Center collapsed={collapsed}>
          <Content>
            {blocks.content}
          </Content>

          {(isDesktop || !collapsed) && blocks.stats &&
            <Stats>
              {blocks.stats}
            </Stats>
          }

          {!isDesktop && blocks.stats &&
            <>
              {collapsed && <EmptyRow />}
              <Expander
                title='Top Stats (kills, last 7 days)'
                storageKey='collapsed-top-stats-7'
                onChange={handleToggleCollapsed}
                backgroundColor='var(--tableHeaderBackground)'
                lineColor='#888'
              />
            </>
          }
        </Center>

        {blocks.footer &&
          <Footer>
            {blocks.footer}
          </Footer>
        }
      </PageRoot>
    </>
  )
}

export default PageLayout
