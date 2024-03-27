import React from 'react'

import useLayout from 'utils/hooks/useLayout'
import { PageImgRect } from 'components/primitives'
import { Href } from 'components'

import {
  Root, LogosBlock, Container, FlexRowContainer,
  InfoBlock, LinksBlock, ItemsWrapper,
} from './styles'

const transformToDotlan = str => {
  return str.replace(/\s/g, '_')
}

const SummaryLayout = ({ children, imgProps, links, noImage }) => {
  const blocks = useLayout(children)

  function renderLinks() {
    if (links.type === 'ship') {
      return (
        <Href link={`https://zkillboard.com/ship/${links.id}/`}>
          zKillboard
        </Href>
      )
    }
    if (links.type === 'faction') {
      return (
        <Href link={`https://zkillboard.com/faction/${links.id}/`}>
          zKillboard
        </Href>
      )
    }
    if (links.type === 'group') {
      return (
        <Href link={`https://zkillboard.com/group/${links.id}/`}>
          zKillboard
        </Href>
      )
    }
    if (links.type === 'system') {
      if (links.isWH) {
        return (
          <>
            <Href link={`http://anoik.is/systems/${encodeURIComponent(links.name)}`}>
              Anoik.is
            </Href>
            <Href link={`https://zkillboard.com/system/${links.id}/`}>
              zKillboard
            </Href>
          </>
        )
      }

      return (
        <>
          <Href link={`https://evemaps.dotlan.net/map/${transformToDotlan(links.region)}/${transformToDotlan(links.name)}`}>
            DOTLAN
          </Href>
          <Href link={`https://zkillboard.com/system/${links.id}/`}>
            zKillboard
          </Href>
        </>
      )
    }
    if (links.type === 'constellation') {
      return (
        <>
          <Href link={`https://evemaps.dotlan.net/map/${transformToDotlan(links.region)}/${transformToDotlan(links.name)}`}>
            DOTLAN
          </Href>
          <Href link={`https://zkillboard.com/constellation/${links.id}/`}>
            zKillboard
          </Href>
        </>
      )
    }
    if (links.type === 'region') {
      return (
        <>
          <Href link={`https://evemaps.dotlan.net/map/${transformToDotlan(links.name)}`}>
            DOTLAN
          </Href>
          <Href link={`https://zkillboard.com/region/${links.id}/`}>
            zKillboard
          </Href>
        </>
      )
    }
    if (links.type === 'char') {
      return (
        <>
          <Href link={`https://zkillboard.com/character/${links.id}/`}>
            zKillboard
          </Href>
          <Href link={`https://evewho.com/character/${links.id}`}>
            EVEWho
          </Href>
        </>
      )
    }
    if (links.type === 'corp') {
      return (
        <>
          <Href link={`https://evemaps.dotlan.net/corp/${transformToDotlan(links.name)}`}>
            DOTLAN
          </Href>
          <Href link={`https://zkillboard.com/corporation/${links.id}/`}>
            zKillboard
          </Href>
          <Href link={`https://evewho.com/corporation/${links.id}`}>
            EVEWho
          </Href>
        </>
      )
    }
    if (links.type === 'ally') {
      return (
        <>
          <Href link={`https://evemaps.dotlan.net/alliance/${transformToDotlan(links.name)}`}>
            DOTLAN
          </Href>
          <Href link={`https://zkillboard.com/alliance/${links.id}/`}>
            zKillboard
          </Href>
          <Href link={`https://evewho.com/alliance/${links.id}`}>
            EVEWho
          </Href>
        </>
      )
    }

    return null
  }

  return (
    <Root withItems={!!blocks.items}>
      <Container>
        <FlexRowContainer>
          {!blocks.items && !noImage &&
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
        </FlexRowContainer>

        {links &&
          <LinksBlock>
            {renderLinks()}
          </LinksBlock>
        }
      </Container>

      {blocks.items &&
        <ItemsWrapper>
          {blocks.items}
        </ItemsWrapper>
      }
    </Root>
  )
}

export default SummaryLayout
