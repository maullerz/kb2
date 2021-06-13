import React from 'react'

import { Href } from 'components'

import { Root, LegalContainer, Links } from './styles'

const isDev = process.env.NODE_ENV === 'development'
// const isDev = false

function Footer() {
  return (
    <Root>
      <LegalContainer>
        <span>All EVE related materials are property of</span>
        <Href link='https://www.ccpgames.com' noWrap>
          CCP Games
        </Href>
      </LegalContainer>

      <Links>
        {isDev &&
          <>
            <Href to='/about'>About</Href>
            &nbsp;/&nbsp;
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
          Become a Patron!
        </Href>
      </Links>
    </Root>
  )
}

// TODO: zKillboard brought to you by Squizz Caphinator

export default Footer
