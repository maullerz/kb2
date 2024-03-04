import React from 'react'

import { Href } from 'components'

import { Root, LegalContainer, Links, PartnerLogo, Partners, UmgImg } from './styles'

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

      <Partners>
        <div>Partners:</div>
        <a href='https://lighthouse.app?utm_source=kb.evetools.org'>
          <img width={160} height={50} src='/img/lh-logo-white.svg' alt='Lighthouse logo' />
        </a>
        <a href='https://www.umovefree.com?utm_source=kb.evetools.org'>
          <UmgImg
            width={100}
            height={12}
            src='/img/umf-logo-white.png'
            alt='UMoveFree logo'
          />
        </a>
      </Partners>
    </Root>
  )
}

export default Footer
