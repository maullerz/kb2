import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { formatSumExt } from 'utils/FormatUtils'
import * as SdeUtils from 'utils/SdeUtils'
import OrgIcon from 'components/icons/OrgIcon'
import ItemIcon from 'components/icons/ItemIcon'
import InvolvedCountBadge from 'modules/common/components/InvolvedCountBadge'

import { Sum, Time, EntityName, CharName, ShipName, MultilineCell, SystemName } from './styles'

const stopPropagation = event => {
  event.stopPropagation()
}

const BIL = 1_000_000_000

function getAttackerName(att) {
  if (!att) return null
  const hasAlly = att.ally
  const hasCorp = att.corp
  const shipName = att.ship?.name || ''
  const attackerName = att.char?.name || ''
  const charNode = attackerName
    ? (
      <CharName onClick={stopPropagation}>
        <Link to={`/character/${att.char.id}`}>
          {attackerName}
        </Link>
      </CharName>
    )
    : <EntityName>{shipName}</EntityName>

  if (!hasAlly && !hasCorp) {
    return charNode
  }

  if (!hasAlly) {
    return (
      <MultilineCell>
        {charNode}
        <EntityName nowrap onClick={stopPropagation}>
          <Link to={`/corporation/${att.corp.id}`}>
            {att.corp.name}
          </Link>
        </EntityName>
      </MultilineCell>
    )
  }

  return (
    <MultilineCell>
      {charNode}
      <EntityName nowrap onClick={stopPropagation}>
        <Link to={`/alliance/${att.ally.id}`}>
          {att.ally.name}
        </Link>
      </EntityName>
    </MultilineCell>
  )
}

function getVictimCell(km) {
  const { vict } = km
  if (!vict.char) {
    // console.error('vict:', vict)
  }
  const name = vict.char?.name || ''
  // slice is for such things - Federation of Respect Honor Passion Alliance.
  const orgName = String(vict.ally?.name || vict.corp?.name).slice(0, 40)

  const charNode = name ? (
    <CharName onClick={stopPropagation}>
      <Link to={`/character/${vict.char.id}`}>
        {name}
      </Link>
    </CharName>
  ) : null

  const orgNode = vict.ally?.name ? (
    <Link to={`/alliance/${vict.ally.id}`}>
      {orgName}
    </Link>
  ) : (
    <Link to={`/corporation/${vict.corp?.id}`}>
      {orgName}{/* <ShipName>corp</ShipName> */}
    </Link>
  )

  return (
    <MultilineCell>
      <EntityName nowrap>
        {charNode} <ShipName>({vict.ship.name})</ShipName>
      </EntityName>
      <EntityName nowrap onClick={stopPropagation}>
        {orgNode}
      </EntityName>
    </MultilineCell>
  )
}

const columnsObject = {
  timeAndSum: {
    title: 'Time', align: 'right', minWidth: '56px',
    link: '/kill/{placeholder}', linkKey: '_id',
    render: km => {
      const sum = formatSumExt(km.sumV)
      return (
        <MultilineCell alignRight>
          {km.sumV >= BIL
            ? <Sum><b>{sum}</b></Sum>
            : <Sum>{sum}</Sum>
          }
          <Time>{format(km.time * 1000, 'HH:mm')}</Time>
        </MultilineCell>
      )
    },
  },
  shipIcon: {
    title: 'Ship', link: '/kill/{placeholder}', linkKey: '_id',
    render: km => (
      <ItemIcon id={km.vict.ship.id} tooltip />
    ),
  },
  shipIconMini: {
    title: 'Ship', padLeft: 5, link: '/kill/{placeholder}', linkKey: '_id',
    render: km => (
      <ItemIcon id={km.vict.ship.id} tooltip mini />
    ),
  },
  system: {
    title: 'System', padLeft: 5,
    render: ({ sys }) => {
      // console.log('sys:', sys)
      const ssStyle = { color: SdeUtils.getSSColor(sys.ss) }
      const ssStr = sys.whClassID ? `C${sys.whClassID}` : sys.ss
      return (
        <MultilineCell>
          <SystemName onClick={stopPropagation}>
            <Link to={`/system/${sys.id}`}>
              <span style={ssStyle}>{ssStr}</span> {sys.name}
            </Link>
          </SystemName>
          <SystemName onClick={stopPropagation}>
            <Link to={`/region/${sys.regionId}`}>
              {sys.region}
            </Link>
          </SystemName>
        </MultilineCell>
      )
    },
  },
  victimAllyIcon: {
    title: '',
    render: ({ vict }) => (
      <OrgIcon
        link
        showOrg
        ally={vict.ally && vict.ally.id}
        corp={vict.corp?.id}
        names={null}
        nameObj={vict.ally || vict.corp}
      />
    ),
  },
  victimAllyIconMini: {
    title: '',
    render: ({ vict }) => (
      <OrgIcon
        mini
        link
        showOrg
        ally={vict.ally && vict.ally.id}
        corp={vict.corp.id}
        names={null}
        nameObj={vict.ally || vict.corp}
      />
    ),
  },
  victimCell: {
    title: 'Victim', padLeft: 5,
    render: km => {
      return getVictimCell(km)
    },
  },
  victimCellMobile: {
    title: 'Victim', padLeft: 5,
    render: km => {
      const victim = getVictimCell(km)
      return (
        <>
          {victim}
          <InvolvedCountBadge km={km} />
        </>
      )
    },
  },
  attShipIcon: {
    title: 'Final Blow',
    render: km => {
      const { atts } = km
      const finalBlow = atts.blow
      if (!finalBlow) return null
      if (!atts.blow.ship) {
        if (process.env.NODE_ENV === 'development') {
          console.error('km without finalBlow ship:', km)
        } else {
          // yes those exists
          // console.error('km without finalBlow ship:', km._id)
        }
      }
      return (
        <ItemIcon id={atts.blow.ship?.id} tooltip />
      )
    },
  },
  attAllyIcon: {
    title: null,
    render: ({ atts }) => {
      const finalBlow = atts.blow
      if (!finalBlow) {
        // console.log('no finalBlow:', atts)
        return <OrgIcon />
      }
      return (
        <OrgIcon
          link
          showOrg
          ally={finalBlow.ally?.id}
          corp={finalBlow.corp?.id || finalBlow.fctn?.id}
          isFaction={finalBlow.fctn && !finalBlow.corp}
          names={null}
          nameObj={finalBlow.ally || finalBlow.corp || finalBlow.fctn}
        />
      )
    },
  },
  // TODO: for Desktop - attackers alliances icons
  attName: {
    title: null,
    render: km => {
      const { atts } = km
      return (
        <>
          {getAttackerName(atts.blow)}
          <InvolvedCountBadge km={km} />
        </>
      )
    },
  },
}

const getColumn = (key, width, minWidth) => {
  return {
    ...columnsObject[key],
    key,
    ...(width && { width }),
    ...(minWidth && { minWidth }),
  }
}

export const columns = [
  getColumn('timeAndSum', '56px'),
  getColumn('shipIcon', '50px'),
  // getColumn('system', '130px'),
  getColumn('system', '18%', '130px'),
  getColumn('victimAllyIcon', '50px'),
  getColumn('victimCell', '32%'),
  getColumn('attAllyIcon', '50px'),
  getColumn('attShipIcon', '50px'),
  getColumn('attName', '28%'),
]

export const mobileColumns = [
  getColumn('timeAndSum', '56px', '40px'),
  getColumn('shipIconMini', '46px'),
  getColumn('system', '35%'), // '110px'),
  getColumn('victimAllyIconMini', '40px'),
  getColumn('victimCellMobile', '65%'),
  // getColumn('attAllyIcon', '40px'),
  // getColumn('attShipIcon', '40px'),
  // getColumn('attCount', '50px'),
]
