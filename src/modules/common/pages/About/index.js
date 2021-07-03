import React, { Fragment } from 'react'

import { Href } from 'components'
import OldPageLayout from 'layouts/OldPageLayout'

import { Title, Content, Subheader, Paragraph, Row } from './styles'

const Home = () => {
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
          <Paragraph>
            EveTools is my personal project and completely done in my freetime.
            If you like EveTools and want to help me keep it up, running and develop feel free to make a donation through{' '}
            <Href link='https://www.patreon.com/bePatron?u=40114286'>
              Patreon
            </Href>
            {' '}and provide your feedback and ideas in{' '}
            <Href link='https://discord.gg/HyPnAU7'>
              Discord
            </Href>
            . I`m happy about every donation and feedback.
          </Paragraph>

          <Subheader>
            Contacts
          </Subheader>
          <Paragraph>
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
              <span>Patreon:</span>
              <span>
                <Href link='https://www.patreon.com/maullerz'>
                  Maullerz
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
          </Paragraph>

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

export default Home
