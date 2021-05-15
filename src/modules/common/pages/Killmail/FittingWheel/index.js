import React from 'react'

import { getShipAttributes, getStrategicCruiserAttributes, getGroupID } from 'utils/SdeUtils'
import { getRenderUrl } from 'utils/KillmailUtils'
import { Href } from 'components'

import LowSlotsRack from './LowSlotsRack'
import MediumSlotsRack from './MediumSlotsRack'
import HighSlotsRack from './HighSlotsRack'
import SubSystemsRack from './SubSystemsRack'
import RigRack from './RigRack'

import { Root, ZkbLinkCont } from './styles'

function FittingWheel({ kmData }) {
  if (!kmData) return null

  const { vict, fittingItems: items } = kmData
  const { ship } = vict

  const groupID = getGroupID(ship)
  const shipAttributes = groupID === 963
    ? getStrategicCruiserAttributes(ship, items.sub.map(({ type }) => type))
    : getShipAttributes(ship)

  const { lowSlots, medSlots, hiSlots, rigSlots } = shipAttributes

  return (
    <>
      <Root>
        <svg viewBox='0 0 335 335' xmlns='http://www.w3.org/2000/svg'>
          <image xlinkHref={getRenderUrl(ship)} preserveAspectRatio='none' height='205' width='205' x='68.746' y='68.414' strokeWidth='1.249' />
          <g transform='translate(-102.177 -72.666)'>
            {/* Inner Gray Border */}
            <path fill='#a5a5a5' d='M362.917 191.729l4.112-7.122h-16.406c-17.765-25.44-47.241-42.097-80.623-42.097-33.383 0-62.858 16.657-80.623 42.097h-16.354l4.112 7.122 4.031 6.982c-6.057 12.76-9.456 27.026-9.456 42.09a97.799 97.799 0 009.871 42.911h11.143l-2.929 5.074-2.743 4.75c16.119 25.284 43.487 42.701 75.056 45.212l3.78 6.547 4.112 7.122 4.112-7.122 3.78-6.547c31.619-2.515 59.027-19.982 75.136-45.332l-2.673-4.63-2.929-5.074H358.419a97.799 97.799 0 009.871-42.911c0-15.044-3.391-29.292-9.433-42.039zm1.857 49.073c0 13.741-2.886 26.983-8.581 39.396h-14.856l7.565 13.109c-16.037 24.021-42.532 39.648-71.29 41.936l-1.843.147-5.771 9.996-5.768-9.996-1.843-.147c-28.699-2.282-55.162-17.865-71.21-41.822l7.634-13.223h-15.004c-5.695-12.413-8.581-25.655-8.581-39.396 0-14.185 3.067-27.839 9.117-40.581l.79-1.669-6.02-10.429h12.097l1.048-1.504c17.751-25.417 46.812-40.593 77.741-40.593 30.929 0 59.992 15.176 77.743 40.593l1.048 1.504h12.148l-6.047 10.479.79 1.666c6.033 12.734 9.093 26.372 9.093 40.534z' />
            {/* Outer Gray Border */}
            <path fill='#a5a5a5' d='M414.267 162.301l-1-1.833h-8.89l4.347-7.533-1.181-1.808C377.051 104.452 325.634 76.586 270 76.586c-55.268 0-106.497 27.575-137.044 73.765l-1.199 1.813 4.793 8.304h-9.815l-1 1.833c-13.049 23.931-19.948 51.076-19.948 78.501 0 87.661 68.53 159.702 156.015 164.008l2.145.105 6.054-10.488 6.057 10.488 2.143-.105c87.487-4.306 156.017-76.347 156.017-164.008-.003-27.425-6.902-54.57-19.951-78.501zm-136.24 238.997l-3.915-6.781-4.112-7.122-4.112 7.122-3.915 6.781C176.951 397.115 109.3 326.861 109.3 240.801c0-27.825 7.077-53.996 19.522-76.818H142.64l-4.112-7.122-2.639-4.571C164.646 108.802 213.961 80.101 270 80.101c56.362 0 105.913 29.039 134.599 72.947l-2.201 3.813-4.112 7.122h12.893c12.445 22.823 19.522 48.993 19.522 76.818-.001 86.06-67.652 156.314-152.674 160.497z' />
            {/* Dark Blue Background */}
            <path fill='#red' d='M411.178 163.982h-12.893l4.112-7.122 2.201-3.813C375.913 109.139 326.362 80.101 270 80.101c-56.039 0-105.354 28.702-134.112 72.188l2.639 4.571 4.112 7.122H128.821c-12.444 22.823-19.521 48.993-19.521 76.819 0 86.06 67.651 156.314 152.673 160.497l3.915-6.781 4.112-7.122 4.112 7.122 3.915 6.781C363.05 397.115 430.7 326.861 430.7 240.801c0-27.826-7.077-53.996-19.522-76.819zm-52.759 119.73H347.426l2.929 5.074 2.673 4.63c-16.109 25.351-43.516 42.817-75.136 45.332l-3.78 6.547-4.112 7.122-4.112-7.122-3.78-6.547c-31.569-2.511-58.937-19.927-75.056-45.212l2.743-4.75 2.929-5.074h-11.143a97.799 97.799 0 01-9.871-42.911c0-15.064 3.399-29.33 9.456-42.09l-4.031-6.982-4.112-7.122h16.354c17.765-25.44 47.241-42.097 80.623-42.097 33.383 0 62.858 16.657 80.623 42.097h16.406l-4.112 7.122-4.06 7.032c6.042 12.747 9.433 26.995 9.433 42.039a97.8 97.8 0 01-9.871 42.912z' />
          </g>

          {items &&
            <>
              <LowSlotsRack items={items.lowSlots} slotsCount={lowSlots} />
              <MediumSlotsRack items={items.medSlots} slotsCount={medSlots} />
              <HighSlotsRack items={items.highSlots} slotsCount={hiSlots} />
              <RigRack slots={items.rig} slotsCount={rigSlots} />
              <SubSystemsRack slots={items.sub} />
            </>
          }
        </svg>
      </Root>
      <ZkbLinkCont>
        <Href link={`https://zkillboard.com/kill/${kmData._id}/`}>
          zkillboard
        </Href>
      </ZkbLinkCont>
    </>
  )
}

export default FittingWheel
