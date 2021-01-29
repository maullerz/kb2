import React from 'react'
import { format } from 'date-fns'

import { formatSumExt } from 'utils/FormatUtils'
import { getSystemDescr } from 'utils/SdeUtils'
import OrgIcon from 'components/icons/OrgIcon'
import ItemIcon from 'components/icons/ItemIcon'

import { Time, CharName, MultilineCell } from './styles'

const columnsObject = {
  timeAndSum: {
    width: '70px', title: 'Time', align: 'right', // highlighted: true,
    render: km => {
      return (
        <MultilineCell>
          <Time>{format(km.time * 1000, 'HH:mm')}</Time>
          <div>{formatSumExt(km.sumV)}</div>
        </MultilineCell>
      )
    },
  },
  shipIcon: {
    width: '50px', title: 'Ship',
    render: km => <ItemIcon id={km.vict.ship.id} tooltip />,
  },
  system: {
    width: '100px', title: 'System',
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
    width: '30%', title: 'Victim',
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
    render: ({ atts }) => <ItemIcon id={atts[0].ship.id} tooltip />,
  },
  attAllyIcon: {
    width: '50px', title: null,
    render: ({ atts }) => (
      <OrgIcon
        ally={atts[0].ally && atts[0].ally.id}
        corp={atts[0].corp.id}
        names={null}
      />
    ),
  },
  attName: {
    width: '30%', title: null,
    render: ({ atts }) => {
      // const attackerName = `${atts[0].char.name || ''} (${atts[0].ship.name})`
      const attackerName = `${atts[0].char.name || ''}`
      return atts[0].ally ? (
        <MultilineCell>
          <CharName>{attackerName}</CharName>
          <div>{atts[0].ally.name}</div>
        </MultilineCell>
      ) : (
        <MultilineCell>
          <CharName>{attackerName}</CharName>
          <div>{atts[0].corp.name}</div>
        </MultilineCell>
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
