import React from 'react'
import numeral from 'numeral'

import { getTypeName, getGroupName, getSystemDescr } from 'utils/SdeUtils'
import CharIcon from 'components/icons/CharIcon'
import OrgIcon from 'components/icons/OrgIcon'

import { Root, Head, CharName, HeadIcons, CorpAllyGroup, Label, Row } from './styles'

const greyColor = { color: 'grey' }

const Summary = ({ kmData }) => {
  const { atts, vict, names, ...rest } = kmData
  // console.log('rest:', rest)
  // const shipName = `${getTypeName(vict.ship)} (${getGroupName(vict.ship)})`
  const sysDescr = getSystemDescr(rest.sys)
  const datetime = (new Date(rest.time * 1000)).toLocaleString()

  return (
    <Root>
      <Head>
        <CharIcon id={vict.char} />
        <HeadIcons>
          <OrgIcon corp={vict.corp} />
          {!!vict.ally &&
            <OrgIcon ally={vict.ally} />
          }
        </HeadIcons>

        <CorpAllyGroup>
          <CharName>
            {names.chars[vict.char]}
          </CharName>
          <div>{names.corps[vict.corp]}</div>
          {names.allys[vict.ally]
            ? <div>{names.allys[vict.ally]}</div>
            : <div>&nbsp;</div>
          }
        </CorpAllyGroup>
      </Head>

      <Row>
        <Label>Ship:</Label>
        <div>
          <div>{getTypeName(vict.ship)}</div>
          <div style={greyColor}>
            {getGroupName(vict.ship)}
          </div>
        </div>
      </Row>

      {/*
      Ship: Falcon ( Force Recon Ship )
      System: 1-NW2G (0.0) / Cloud Ring
      Location: Stargate (O-ZXUV)
      Time: 2020-08-16 00:54
      Points: 2
      Damage: 21,850
      Fitted: 62,462,701.31 ISK
      Dropped:  9,792,969.44 ISK
      Destroyed:  293,596,892.84 ISK
      Total:
      */}
      <Row>
        <Label>System:</Label>
        <div>
          {sysDescr.system}
          &nbsp;
          <span style={sysDescr.ssStyle}>{sysDescr.ss}</span>
          &nbsp;/&nbsp;
          {sysDescr.region}
        </div>
      </Row>

      {/*
      <Row>
        <Label>Location:</Label>
        <div>TODO:</div>
      </Row>
      <Row>
        <Label>Points:</Label>
        <div>TODO:</div>
      </Row>
      */}

      <Row>
        <Label>Time:</Label>
        <div>{datetime}</div>
      </Row>
      <Row>
        <Label>Damage:</Label>
        <div>{numeral(vict.dmg).format('0,0')}</div>
      </Row>
      {/*
      <Row>
        <Label>Fitted:</Label>
        <div>TODO:</div>
      </Row>
      <Row>
        <Label>Dropped:</Label>
        <div>TODO:</div>
      </Row>
      <Row>
        <Label>Destroyed:</Label>
        <div>TODO:</div>
      </Row>
      */}
      <Row>
        <Label>Total:</Label>
        <div>{numeral(rest.sumV).format('0,0')}</div>
      </Row>
    </Root>
  )
}

export default Summary
