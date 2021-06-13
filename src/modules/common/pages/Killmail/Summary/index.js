import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import * as SdeUtils from 'utils/SdeUtils'
import * as FormatUtils from 'utils/FormatUtils'
import { CharIcon, OrgIcon } from 'components'
import { CharName, CorpName, AllyName } from 'components/primitives'

import { Root, Head, HeadIcons, Names, Label, Row } from './styles'

const redColor = { color: 'red' }
const whiteColor = { color: 'white' }
const greenColor = { color: 'var(--colorGreen)' }
const noWrap = { whiteSpace: 'nowrap' }

const Summary = ({ kmData }) => {
  const { atts, vict, names, parsedItems, ...rest } = kmData
  const [datetimeStr] = useState(`${FormatUtils.formatKmTime(rest.time)} ET`)
  // console.log('rest:', rest)
  // const shipName = `${SdeUtils.getTypeName(vict.ship)} (${SdeUtils.getGroupName(vict.ship)})`
  const sysDescr = rest.sys
  const ssStyle = { color: SdeUtils.getSSColor(sysDescr.ss) }

  return (
    <Root>
      <Head>
        <CharIcon id={vict.char} link />
        <HeadIcons>
          <OrgIcon link corp={vict.corp} names={names} />
          {!!vict.ally &&
            <OrgIcon link ally={vict.ally} names={names} />
          }
        </HeadIcons>

        <Names>
          <CharName id={vict.char} name={names.chars[vict.char]} />
          <CorpName id={vict.corp} name={names.corps[vict.corp]} />
          {names.allys[vict.ally]
            ? <AllyName id={vict.ally} name={names.allys[vict.ally]} />
            : <div>&nbsp;</div>
          }
        </Names>
      </Head>

      <Row>
        <Label>Ship:</Label>
        <div>
          <span>
            <Link to={`/ship/${vict.ship}`}>
              {SdeUtils.getTypeName(vict.ship)}
            </Link>
          </span>
          {` / `}
          <span style={noWrap}>
            <Link to={`/group/${SdeUtils.getGroupID(vict.ship)}`}>
              {SdeUtils.getGroupName(vict.ship)}
            </Link>
          </span>
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
          <Link to={`/system/${sysDescr.id}`}>
            {sysDescr.name}
          </Link>
          &nbsp;
          {sysDescr.whClassID
            ? <span style={ssStyle}>{`C${sysDescr.whClassID}`}</span>
            : <span style={ssStyle}>{sysDescr.ss}</span>
          }
          &nbsp;/&nbsp;
          <Link to={`/region/${sysDescr.regionId}`}>
            {sysDescr.region}
          </Link>
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
        <div>{datetimeStr}</div>
      </Row>

      <Row>
        <Label>Damage:</Label>
        <div>{FormatUtils.formatRaw(vict.dmg)}</div>
      </Row>
      {/*
      <Row>
        <Label>Fitted:</Label>
        <div>TODO:</div>
      </Row>
      */}
      <Row>
        <Label>Dropped:</Label>
        <div style={greenColor}>
          {FormatUtils.formatRaw(parsedItems.dropped)} ISK
        </div>
      </Row>
      <Row>
        <Label>Destroyed:</Label>
        <div style={redColor}>
          {FormatUtils.formatRaw(parsedItems.destroyed + parsedItems.ship)} ISK
        </div>
      </Row>
      <Row>
        <Label>Total:</Label>
        <div style={whiteColor}>
          {FormatUtils.formatRaw(parsedItems.total)} ISK
        </div>
      </Row>
    </Root>
  )
}

// <TotalRow>
//   <h4>Destroyed:</h4>
//   <Sum style={colorRed}>
//     {formatRaw(parsedItems.destroyed + parsedItems.ship)}
//   </Sum>
// </TotalRow>
// <TotalRow>
//   <h4>Dropped:</h4>
//   <Sum style={colorGreen}>
//     {formatRaw(parsedItems.dropped)}
//   </Sum>
// </TotalRow>
// <TotalRow>
//   <h4>Total:</h4>
//   <Sum>{formatRaw(parsedItems.total)}</Sum>
// </TotalRow>
export default Summary
