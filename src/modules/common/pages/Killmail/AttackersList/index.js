import React from 'react'
import numeral from 'numeral'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import { getTypeName, getGroupName } from 'utils/SdeUtils'
import useBooleanToggle from 'utils/hooks/useBooleanToggle'
import CharIcon from 'components/icons/CharIcon'
import ItemIcon from 'components/icons/ItemIcon'
import OrgIcon from 'components/icons/OrgIcon'

import {
  Root, ListItem, Char, IconsGroup,
  Names, ShipName, AllyName, CorpAllyIcons,
  DmgCol, DmgDigits, DmgPerc, Expander,
} from './styles'

const MAX_ITEMS = 10

const Attacker = ({ att, names, totalDmg, isNPC }) => {
  // TODO: do not show group for NPC
  const groupName = getGroupName(att.ship)
  const shipName = att.ship ? (
    <>
      {/* <span>{getTypeName(att.ship)}</span> <span>{`(${})`}</span> */}
      <div>{getTypeName(att.ship) || groupName}</div>
    </>
  ) : undefined
  return (
    <ListItem finalBlow={!isNPC && att.blow}>

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
        {false &&
          <ShipName>
            {shipName}
          </ShipName>
        }
        {names.corps[att.corp]
          ? <div>{names.corps[att.corp]}</div>
          : <div>&nbsp;</div>
        }
        {names.allys[att.ally]
          ? <AllyName>{names.allys[att.ally]}</AllyName>
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
          {att.ally
            ? <OrgIcon ally={att.ally} names={names} />
            : null
          }
          <OrgIcon corp={att.corp} names={names} />
        </CorpAllyIcons>
      </DmgCol>
    </ListItem>
  )
}

const AttackersList = ({ data }) => {
  const { atts: attackers, vict: { dmg }, names } = data
  const remainingCount = attackers.length - MAX_ITEMS
  const [expanded, toggleExpanded] = useBooleanToggle(false)

  function renderRemaining() {
    if (!expanded) {
      return (
        <Expander onClick={toggleExpanded}>
          <span>Show other {remainingCount} participants</span>
          <ExpandMoreIcon />
        </Expander>
      )
    }

    return attackers.slice(MAX_ITEMS).map(att => (
      <Attacker
        key={att.char || `${att.char}-${att.corp}-${att.ship}`}
        att={att}
        names={names}
        totalDmg={dmg}
      />
    ))
  }

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

      {remainingCount > 0 && renderRemaining()}
    </Root>
  )
}

export default AttackersList
