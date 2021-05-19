import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { formatSumExt } from 'utils/FormatUtils'
import * as SdeUtils from 'utils/SdeUtils'
import OrgIcon from 'components/icons/OrgIcon'
import ItemIcon from 'components/icons/ItemIcon'
import InvolvedCountBadge from 'modules/common/components/InvolvedCountBadge'

import { Sum, Time, EntityName, CharName, ShipName, MultilineCell, SystemName } from './styles'

function getAttackerNames(att) {
  const hasAlly = att.ally
  const hasCorp = att.corp
  const shipName = att.ship?.name || ''
  const attackerName = att.char?.name || ''
  const charNode = attackerName
    ? <CharName>{attackerName}</CharName>
    : <EntityName>{shipName}</EntityName>

  if (!hasAlly && !hasCorp) {
    return charNode
  }

  if (!hasAlly) {
    return (
      <MultilineCell>
        {charNode}
        <EntityName>{att.corp.name}</EntityName>
      </MultilineCell>
    )
  }

  return (
    <MultilineCell>
      {charNode}
      <EntityName>{att.ally.name}</EntityName>
    </MultilineCell>
  )
}

const stopPropagation = event => {
  event.stopPropagation()
}

const BIL = 1_000_000_000

const columnsObject = {
  timeAndSum: {
    width: '56px', title: 'Time', align: 'right', // highlighted: true,
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
    width: '50px', title: 'Ship', link: '/kill/{placeholder}', linkKey: '_id',
    render: km => (
      <ItemIcon id={km.vict.ship.id} tooltip />
    ),
  },
  shipIconMini: {
    width: '50px', title: 'Ship', link: '/kill/{placeholder}', linkKey: '_id',
    render: km => (
      <ItemIcon id={km.vict.ship.id} tooltip mini />
    ),
  },
  system: {
    width: '150px', title: 'System', padLeft: 5,
    render: ({ sys }) => {
      // console.log('sys:', sys)
      const ssStyle = { color: SdeUtils.getSSColor(sys.ss) }
      return (
        <MultilineCell>
          <SystemName onClick={stopPropagation}>
            <Link to={`/system/${sys.id}`}>
              <span style={ssStyle}>{sys.ss}</span> {sys.name}
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
    width: '50px', title: '',
    render: ({ vict }) => (
      <OrgIcon
        ally={vict.ally && vict.ally.id}
        corp={vict.corp?.id}
        names={null}
        nameObj={vict.ally || vict.corp}
      />
    ),
  },
  victimAllyIconMini: {
    width: '50px', title: '',
    render: ({ vict }) => (
      <OrgIcon
        mini
        ally={vict.ally && vict.ally.id}
        corp={vict.corp.id}
        names={null}
        nameObj={vict.ally || vict.corp}
      />
    ),
  },

  victimName: {
    width: '28%', title: 'Victim', padLeft: 5,
    render: km => {
      const { vict } = km
      if (!vict.char) {
        // console.error('vict:', vict)
      }
      const name = `${vict.char?.name || ''}`
      // slice is for such things - Federation of Respect Honor Passion Alliance.
      const orgName = String(vict.ally?.name || vict.corp?.name).slice(0, 40)

      return (
        <MultilineCell>
          <EntityName nowrap>
            <CharName>{name}</CharName> <ShipName>({vict.ship.name})</ShipName>
          </EntityName>
          <EntityName>{orgName}</EntityName>
        </MultilineCell>
      )
    },
  },
  attShipIcon: {
    width: '50px', title: 'Final Blow',
    render: ({ atts }) => {
      const finalBlow = atts.find(att => att.blow) || atts[0]
      return (
        <ItemIcon id={finalBlow.ship.id} tooltip />
      )
    },
  },
  attAllyIcon: {
    width: '50px', title: null,
    render: ({ atts }) => {
      const finalBlow = atts.find(att => att.blow) || atts[0]
      return (
        <OrgIcon
          ally={finalBlow.ally && finalBlow.ally.id}
          corp={finalBlow.corp.id}
          names={null}
          nameObj={finalBlow.ally || finalBlow.corp}
        />
      )
    },
  },
  attName: {
    width: '32%', title: null,
    render: km => {
      const { atts } = km
      const finalBlow = atts.find(att => att.blow) || atts[0]
      // TODO: for Desktop - attackers alliances icons
      return (
        <>
          {getAttackerNames(finalBlow)}
          <InvolvedCountBadge km={km} />
        </>
      )
    },
  },
}

const getColumn = (key, width) => {
  return {
    ...columnsObject[key],
    key,
    ...(width && { width }),
  }
}

export const columns = [
  getColumn('timeAndSum'),
  getColumn('shipIcon'),
  getColumn('system'),
  getColumn('victimAllyIcon'),
  getColumn('victimName'),
  getColumn('attAllyIcon'),
  getColumn('attShipIcon'),
  getColumn('attName'),
]

export const mobileColumns = [
  getColumn('shipIconMini', '40px'),
  getColumn('system', '40%'), // '110px'),
  getColumn('victimAllyIconMini', '40px'),
  getColumn('victimName', '50%'),
  // getColumn('attAllyIcon', '40px'),
  // getColumn('attShipIcon', '40px'),
  // getColumn('attName'),
  getColumn('timeAndSum', '56px'),
]
