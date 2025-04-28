import React, { Fragment } from 'react'

import { Href } from 'components'
import OldPageLayout from 'layouts/OldPageLayout'

import { Title, Content, Subheader, Paragraph, DivParagraph, Row, CcpStoreWrapper } from './styles'

const About = () => {
  return (
    <OldPageLayout>
      <Fragment key='content'>
        <Content>
          <Title>
            About
          </Title>
          <Paragraph>
            EveTools Killboard was created as another alternative way to view PvP history and statistics in the awesome game of Eve Online.
            Mobile first in mind, with modern UI and good user experience and all the cool features that i would come up with.
          </Paragraph>
          <Paragraph>
            EveTools and Killmails Database hosted on his own server. While Eve SSO Auth still not implemented, Killmails are feeded from greatest service provided by{' '}
            <Href link='https://github.com/zKillboard/zKillboard/wiki'>
              zKillboard
            </Href>
            . Many thanks to{' '}
            <Href link='https://zkillboard.com/information/about/'>
              @Squizz
            </Href>
            {' '}for that API and all his work.
          </Paragraph>
          <img height='73' src='https://br.evetools.org/img/boosty-logo-full.svg' alt='boosty-logo' />
          <Paragraph style={{ marginTop: 0 }}>
            EveTools is my personal project and completely done in my freetime.
            If you like EveTools and want to help me keep it up, running and develop feel free to make a donation through{' '}
            <Href link='https://boosty.to/evetools/donate'>
              Boosty
            </Href>
            {' '}and provide your feedback and ideas in <b>Discord</b>. I`m happy about every donation and feedback.
            <CcpStoreWrapper>
              <div>Use code <span style={{ color: '#fab400' }}>MAU</span> in <b>CCP Store</b> to support EveTools</div>
              <a href='https://store.eveonline.com' target='_blank' rel='noopener'>
                https://store.eveonline.com
              </a>
              {/* <img src='/img/store-icon-omega.png' alt='' /> */}
              <a href='https://store.eveonline.com' target='_blank' rel='noopener'>
                <svg style={{ position: 'absolute', bottom: 0, right: 0 }} width='57' height='50' viewBox='0 0 57 50' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path opacity='0.7' d='M40.1011 5.15005H16.9077L5.31104 25L16.9077 44.8499H40.1011L51.6978 25L40.1011 5.15005Z' fill='#010101' />
                  <g opacity='0.75'>
                    <path d='M40.1013 5.15007L51.698 25L40.1013 44.8499H16.908L5.31128 25L16.908 5.15007H40.1013ZM40.6348 4.21793H16.3792L16.1101 4.67934L4.51343 24.5293L4.23975 25L4.51343 25.4707L16.1101 45.3206L16.3792 45.7821H40.6348L40.9038 45.3206L52.5005 25.4707L52.7742 25L52.5005 24.5293L40.9038 4.67934L40.6348 4.21793Z' fill='#FFCD05' />
                  </g>
                  <path d='M38.158 34.3634H29.9336V32.0517C33.3569 30.4717 35.0686 27.6193 35.0686 23.4853C35.0686 21.1549 34.4656 19.2394 33.2595 17.734C32.0535 16.2286 30.481 15.4735 28.5513 15.4735C26.6216 15.4735 24.9702 16.2332 23.7781 17.748C22.5859 19.2627 21.9875 21.127 21.9875 23.3455C21.9875 27.5354 23.6899 30.4391 27.0947 32.0563V34.368H18.8564V31.9025H23.4719C20.5496 29.4883 19.0884 26.5427 19.0884 23.0612C19.0884 21.1689 19.4734 19.4724 20.2434 17.9717C21.0134 16.4709 22.0989 15.2825 23.5044 14.4156C24.9099 13.544 26.5937 13.1106 28.5698 13.1106C30.5459 13.1106 32.1509 13.5114 33.4543 14.3084C34.7578 15.1053 35.8293 16.2519 36.6689 17.7433C37.5085 19.2347 37.9307 21.0058 37.9307 23.0612C37.9307 26.538 36.4695 29.4883 33.5471 31.9025H38.1626V34.368L38.158 34.3634Z' fill='#FFCD05' />
                  <g opacity='0.5'>
                    <rect x='15.9756' y='10.2349' width='25.0488' height='26.9575' fill='transparent' />
                  </g>
                </svg>
              </a>
            </CcpStoreWrapper>
          </Paragraph>

          <Subheader>
            Contacts
          </Subheader>
          <DivParagraph>
            <Row>
              <span>In Game:</span>
              <span>
                <Href link='/character/247755210'>
                  Maullerz
                </Href>
              </span>
            </Row>
            <Row>
              <span>Discord:</span>
              <span>
                <Href link='https://discord.gg/HyPnAU7'>
                  EveTools (@maullerz)
                </Href>
              </span>
            </Row>
            <Row>
              <span>Boosty:</span>
              <span>
                <Href link='https://boosty.to/evetools/donate'>
                  EveTools
                </Href>
              </span>
            </Row>
            <Row>
              <span>Slack:</span>
              <span>
                <Href link='https://tweetfleet.slack.com'>
                  Tweetfleet (@maullerz)
                </Href>
              </span>
            </Row>
          </DivParagraph>

          {/* <Subheader>
            TODO: Privacy Policy
          </Subheader> */}

          <Subheader>
            CCP Copyright Notice
          </Subheader>
          <Paragraph>
            EVE Online and the EVE logo are the registered trademarks of CCP hf. All rights are reserved worldwide. All other trademarks are the property of their respective owners. EVE Online, the EVE logo, EVE and all associated logos and designs are the intellectual property of CCP hf. All artwork, screenshots, characters, vehicles, storylines, world facts or other recognizable features of the intellectual property relating to these trademarks are likewise the intellectual property of CCP hf. CCP hf. has granted permission to EveTools.org to use EVE Online and all associated logos and designs for promotional and information purposes on its website but does not endorse, and is not in any way affiliated with, EveTools.org. CCP is in no way responsible for the content on or functioning of this website, nor can it be liable for any damage arising from the use of this website.
          </Paragraph>
        </Content>
      </Fragment>
    </OldPageLayout>
  )
}

export default About
