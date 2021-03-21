import React from 'react'
import numeral from 'numeral'

import { getTypeName, getGroupName } from 'utils/SdeUtils'
import CharIcon from 'components/icons/CharIcon'
import ItemIcon from 'components/icons/ItemIcon'
import OrgIcon from 'components/icons/OrgIcon'

import {
  Root,
  ListItem,
  Char,
  IconsGroup,
  Names,
  ShipName,
  CorpAllyIcons,
  DmgCol,
  DmgDigits,
  DmgPerc,
} from './styles'

const MAX_ITEMS = 100

const greyColor = { color: '#ccc' }

const Attacker = ({ att, names, totalDmg }) => {
  // TODO: do not show group for NPC
  const groupName = getGroupName(att.ship)
  const shipName = att.ship ? (
    <>
      {/* <span>{getTypeName(att.ship)}</span> <span>{`(${})`}</span> */}
      <div>{getTypeName(att.ship) || groupName}</div>
    </>
  ) : undefined
  return (
    <ListItem>

      <Char>
        <CharIcon id={att.char} corp={att.corp} />

        <IconsGroup>
          <div>
            <ItemIcon id={att.ship} tooltip />
            <ItemIcon id={att.weap || att.ship} tooltip />
          </div>
        </IconsGroup>
      </Char>

      <Names>
        <div>
          {att.char ? names.chars[att.char] : names.types[att.ship]}
        </div>
        <ShipName>
          {shipName}
        </ShipName>
        {names.corps[att.corp]
          ? <div>{names.corps[att.corp]}</div>
          : <div>&nbsp;</div>
        }
        {names.allys[att.ally]
          ? <div style={greyColor}>{names.allys[att.ally]}</div>
          : null
        }
      </Names>

      <DmgCol>
        <DmgDigits>
          <div>{numeral(att.dmg).format('0,0')}</div>
          <DmgPerc>
            {numeral(att.dmg / totalDmg).format('0,0.0%')}
          </DmgPerc>
        </DmgDigits>

        <CorpAllyIcons>
          {att.ally ? <OrgIcon ally={att.ally} /> : null}
          <OrgIcon corp={att.corp} />
        </CorpAllyIcons>
      </DmgCol>
    </ListItem>
  )
}

const AttackersList = ({ data }) => {
  const { atts: attackers, vict: { dmg }, names } = data

  return (
    <Root>
      <h4>Involved: {attackers.length}</h4>
      {attackers.slice(0, MAX_ITEMS).map(att => (
        <Attacker
          key={att.char || `${att.char}-${att.corp}-${att.ship}`}
          att={att}
          names={names}
          totalDmg={dmg}
        />
      ))}
      {attackers.length > MAX_ITEMS &&
        <div>and {attackers.length - MAX_ITEMS} more involved...</div>
      }
    </Root>
  )
}

export default AttackersList
