import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { formatSumExt } from 'utils/FormatUtils'
import * as SdeUtils from 'utils/SdeUtils'
import OrgIcon from 'components/icons/OrgIcon'
import ItemIcon from 'components/icons/ItemIcon'
import InvolvedCountBadge from 'modules/common/components/InvolvedCountBadge'

import { Time, EntityName, MultilineCell } from './styles'

function getAttackerNames(att) {
  const hasAlly = att.ally
  const hasCorp = att.corp
  const shipName = att.ship.name || ''
  const attackerName = att.char.name || ''

  if (!hasAlly && !hasCorp) {
    return attackerName
      ? <EntityName>{attackerName}</EntityName>
      : <EntityName>{shipName}</EntityName>
  }

  if (!hasAlly) {
    return (
      <MultilineCell>
        <EntityName>{attackerName || shipName}</EntityName>
        <EntityName>{att.corp.name}</EntityName>
      </MultilineCell>
    )
  }

  return (
    <MultilineCell>
      <EntityName>{attackerName}</EntityName>
      <EntityName>{att.ally.name}</EntityName>
    </MultilineCell>
  )
}

const columnsObject = {
  timeAndSum: {
    width: '70px', title: 'Time', align: 'right', // highlighted: true,
    render: km => {
      return (
        <Link to={`/kill/${km._id || km.id}`}>
          <MultilineCell alignRight>
            <div>{formatSumExt(km.sumV)}</div>
            <Time>{format(km.time * 1000, 'HH:mm')}</Time>
          </MultilineCell>
        </Link>
      )
    },
  },
  shipIcon: {
    width: '50px', title: 'Ship', link: '/kill/{placeholder}', linkKey: '_id',
    render: km => (
      <ItemIcon id={km.vict.ship.id} tooltip />
    ),
  },
  system: {
    width: '200px', title: 'System',
    render: ({ sys }) => {
      // console.log('sys:', sys)
      const ssStyle = { color: SdeUtils.getSSColor(sys.ss) }
      return (
        <MultilineCell>
          <div><span style={ssStyle}>{sys.ss}</span> {sys.name}</div>
          <div>{sys.region}</div>
        </MultilineCell>
      )
    },
  },
  victimAllyIcon: {
    width: '50px', title: '',
    render: ({ vict }) => (
      <OrgIcon
        ally={vict.ally && vict.ally.id}
        corp={vict.corp.id}
        names={null}
      />
    ),
  },
  victimName: {
    width: '28%', title: 'Victim',
    render: km => {
      const { vict } = km
      // const name = `${vict.char.name || ''} (${vict.ship.name})`
      if (!vict.char) {
        // console.error('vict:', vict)
      }
      const name = `${vict.char?.name || ''}`
      return vict.ally ? (
        <MultilineCell>
          <EntityName>{name}</EntityName>
          <EntityName>{vict.ally.name}</EntityName>
        </MultilineCell>
      ) : (
        <MultilineCell>
          <EntityName>{name}</EntityName>
          <EntityName>{vict.corp.name}</EntityName>
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
        />
      )
    },
  },
  attName: {
    width: '32%', title: null,
    render: km => {
      const { atts } = km
      const finalBlow = atts.find(att => att.blow) || atts[0]
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
  getColumn('shipIcon', '40px'),
  getColumn('system'),
  // getColumn('victimAllyIcon'),
  getColumn('victimName', '50%'),
  getColumn('attAllyIcon', '40px'),
  getColumn('attShipIcon', '40px'),
  // getColumn('attName'),
  getColumn('timeAndSum'),
]
