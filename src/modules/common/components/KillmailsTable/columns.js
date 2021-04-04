import React from 'react'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'

import { formatSumExt } from 'utils/FormatUtils'
import { getSystemDescr } from 'utils/SdeUtils'
import OrgIcon from 'components/icons/OrgIcon'
import ItemIcon from 'components/icons/ItemIcon'
import InvolvedCountBadge from 'modules/common/components/InvolvedCountBadge'

import { Time, CharName, MultilineCell } from './styles'

const columnsObject = {
  timeAndSum: {
    width: '70px', title: 'Time', align: 'right', // highlighted: true,
    render: km => {
      return (
        <Link to={`/kill/${km._id || km.id}`}>
          <MultilineCell>
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
      const sysDescr = getSystemDescr(sys)
      return (
        <MultilineCell>
          <div>{sysDescr.system}</div>
          <div>{sysDescr.region}</div>
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
    render: ({ vict }) => {
      // const name = `${vict.char.name || ''} (${vict.ship.name})`
      const name = `${vict.char.name || ''}`
      return vict.ally ? (
        <MultilineCell>
          <CharName>{name}</CharName>
          <div>{vict.ally.name}</div>
        </MultilineCell>
      ) : (
        <MultilineCell>
          <CharName>{name}</CharName>
          <div>{vict.corp.name}</div>
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
      const attackerName = finalBlow.char.name || ''
      return (
        <>
          {finalBlow.ally ? (
            <MultilineCell>
              <CharName>{attackerName}</CharName>
              <div>{finalBlow.ally.name}</div>
            </MultilineCell>
          ) : (
            <MultilineCell>
              <CharName>{attackerName}</CharName>
              <div>{finalBlow.corp.name}</div>
            </MultilineCell>
          )}
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
