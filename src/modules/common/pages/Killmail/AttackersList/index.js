import React, { useEffect } from 'react'
import numeral from 'numeral'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ReactTooltip from 'react-tooltip'

import { getTypeName, getGroupName } from 'utils/SdeUtils'
import useBooleanToggle from 'utils/hooks/useBooleanToggle'
import { CharIcon, ItemIcon, OrgIcon, Expander } from 'components'
import { CharName, CorpName, AllyName } from 'components/primitives'

import InvolvedGrouped from './InvolvedGrouped'
import {
  Root, List, ListItem, TopChar, Char, IconsGroup,
  Names, CorpAllyIcons,
  DmgCol, DmgDigits, DmgPerc, ExpandBtn,
  SpaceBetween, TopBlock, TopPilotRoot,
} from './styles'

const MAX_ITEMS = 10
const MAX_ITEMS_DELTA = 5

const TopPilot = ({ att, names, isFinalBlow }) => {
  return (
    <TopPilotRoot>
      <div>{isFinalBlow ? 'Final Blow' : 'Top Damage'}</div>
      <TopChar>
        <CharIcon link id={att.char} corp={att.corp || att.fctn} />
        <IconsGroup>
          <ItemIcon id={att.ship} link tooltip border />
          <ItemIcon id={att.weap || att.ship} tooltip border />
        </IconsGroup>
      </TopChar>
      <CharName id={att.char} name={names.chars[att.char]} />
    </TopPilotRoot>
  )
}

const Attacker = ({ att, names, totalDmg, isNPC }) => {
  // TODO: do not show group for NPC
  const groupName = getGroupName(att.ship)
  const shipName = att.ship ? getTypeName(att.ship) || groupName : undefined
  return (
    <ListItem finalBlow={!isNPC && att.blow}>

      <Char>
        <CharIcon link id={att.char} corp={att.corp || att.fctn} />

        <IconsGroup>
          <ItemIcon id={att.ship} link tooltip border />
          <ItemIcon id={att.weap || att.ship} tooltip border />
        </IconsGroup>
      </Char>

      <SpaceBetween>
        <Names>
          {att.char
            ? <CharName id={att.char} name={names.chars[att.char]} ship={shipName} />
            : <div>{att.ship ? getTypeName(att.ship) : 'Unknown'}</div>
          }
          {names.corps[att.corp] || names.fctns[att.fctn]
            ? <CorpName id={att.corp || att.fctn} name={names.corps[att.corp] || names.fctns[att.fctn]} isFaction={att.fctn && !att.corp} />
            : <div>&nbsp;</div>
          }
          {names.allys[att.ally]
            ? <AllyName id={att.ally} name={names.allys[att.ally]} />
            : <div>&nbsp;</div>
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
              ? <OrgIcon link mini ally={att.ally} names={names} />
              : null
            }
            <OrgIcon link mini corp={att.corp || att.fctn} names={names} isFaction={att.fctn && !att.corp} />
          </CorpAllyIcons>
        </DmgCol>
      </SpaceBetween>
    </ListItem>
  )
}

const AttackersList = ({ data }) => {
  const { atts: attackers, vict: { dmg }, names } = data
  const remainingCount = (attackers.length - MAX_ITEMS) > MAX_ITEMS_DELTA
    ? attackers.length - MAX_ITEMS
    : 0
  const [expanded, toggleExpanded] = useBooleanToggle(false)
  const [expandedAll, toggleExpandedAll] = useBooleanToggle(true)

  useEffect(() => {
    if (expanded) {
      ReactTooltip.rebuild()
    }
  }, [expanded])

  function renderRemaining() {
    if (!expanded) {
      return (
        <ExpandBtn onClick={toggleExpanded}>
          <span>Show other {remainingCount} participants</span>
          <ExpandMoreIcon />
        </ExpandBtn>
      )
    }

    return (
      <>
        {attackers.slice(MAX_ITEMS).map(att => (
          <Attacker
            key={att.char || `${att.char}-${att.corp}-${att.ship}`}
            att={att}
            names={names}
            totalDmg={dmg}
          />
        ))}
        <ExpandBtn onClick={toggleExpanded}>
          <span>Shrink list</span>
          <ExpandLessIcon />
        </ExpandBtn>
      </>
    )
  }

  return (
    <Root>
      {attackers.length > 1 &&
        <TopBlock>
          <TopPilot att={attackers[0]} names={names} />
          <TopPilot att={attackers.find(att => att.blow)} names={names} isFinalBlow />
        </TopBlock>
      }

      <List>
        <Expander
          title={`Involved Pilots: ${attackers.length}`}
          // storageKey='collapsed-killmail-involved-pilots'
          onChange={toggleExpandedAll}
          backgroundColor='#222'
          marginBottom='6px'
        />

        {expandedAll && attackers.slice(0, MAX_ITEMS).map(att => (
          <Attacker
            key={att.char || `${att.char}-${att.corp}-${att.ship}`}
            att={att}
            names={names}
            totalDmg={dmg}
          />
        ))}

        {expandedAll && remainingCount > 0 && renderRemaining()}
      </List>

      <InvolvedGrouped attackers={attackers} names={names} />
    </Root>
  )
}

export default AttackersList
