import React from 'react'

import { Href } from 'components'

import { Root, LegalContainer, Links, PartnerLogo } from './styles'

const isDev = process.env.NODE_ENV === 'development'
// const isDev = false

const Footer = () => {
  return (
    <Root>
      <PartnerLogo>
        <Href link='https://www.eveonline.com/partners'>
          <img src='/img/eve-partner.png' alt='eve online partner' width='320' height='44' />
        </Href>
      </PartnerLogo>
      <LegalContainer>
        <span>All EVE related materials are property of</span>
        <Href link='https://www.ccpgames.com' noWrap>
          CCP Games
        </Href>
      </LegalContainer>

      <Links>
        <Href link='/about'>
          About
        </Href>
        &nbsp;/&nbsp;
        {isDev &&
          <>
            <Href link='https://github.com/maullerz/kb2'>
              GitHub
            </Href>
            &nbsp;/&nbsp;
          </>
        }
        <Href link='https://discord.gg/HyPnAU7'>
          Discord
        </Href>
        &nbsp;/&nbsp;
        <Href link='https://www.patreon.com/bePatron?u=40114286'>
          Become a Patron
        </Href>
      </Links>
    </Root>
  )
}

export default Footer
