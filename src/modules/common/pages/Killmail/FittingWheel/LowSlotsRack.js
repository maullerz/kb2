import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { getIconUrl } from 'utils/KillmailUtils'
import { getTypeName } from 'utils/SdeUtils'

const renderImg = (type, [x, y]) => (
  <image x={x} y={y} width='32' height='32' xlinkHref={getIconUrl(type)} data-tip={getTypeName(type)} />
)

const renderAmmoImg = (type, [x, y]) => (
  <image x={x} y={y} width='26' height='26' strokeWidth='1.231' xlinkHref={getIconUrl(type)} data-tip={getTypeName(type)} />
)

const emptyStyle = { opacity: 0.5 }

const Slot = ({ svg, type, typeCoord, ammo, ammoCoord }) => {
  return (
    <g style={type ? undefined : emptyStyle}>
      <g className='module'>
        {svg}
        {type && renderImg(type, typeCoord)}
      </g>
      {ammo && renderAmmoImg(ammo, ammoCoord)}
    </g>
  )
}

const typeCoords = [
  [287.044, 106.029],
  [294.13, 138.274],
  [293.022, 174.748],
  [284.353, 207.416],
  [267.903, 237.327],
  [244.14, 262.917],
  [212.651, 282.193],
  [180.414, 292.662],
]
const ammoCoords = [
  [262.044, 120],
  [266.965, 147.089],
  [266.716, 173.919],
  [259.918, 199.675],
  [246.541, 223.687],
  [227.681, 244.209],
  [204.002, 259.33],
  [177.83, 268.304],
]

const SLOTS_SVG = [
  (
    <g transform='matrix(.14258 .3995 -.39932 .14251 348.617 76.863)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='20' height='5' x='125.195' y='-64.679' ry='0' transform='rotate(89.873) skewX(.06)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(.0418 .42212 -.42192 .04178 365.619 123.23)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='20' height='5' x='125.195' y='-64.679' ry='0' transform='rotate(89.873) skewX(.06)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.06474 .41922 -.41902 -.0647 370.79 172.858)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='rotate(89.873) skewX(.06)' ry='0' y='-64.679' x='125.195' height='5' width='20' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.16194 .39206 -.39187 -.16186 363.643 221.237)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='20' height='5' x='125.195' y='-64.679' ry='0' transform='rotate(89.873) skewX(.06)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.24773 .34434 -.34417 -.24761 345.61 266.076)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='rotate(89.873) skewX(.06)' ry='0' y='-64.679' x='125.195' height='5' width='20' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.32896 .26781 -.26769 -.3288 315.923 307.575)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='20' height='5' x='125.195' y='-64.679' ry='0' transform='rotate(89.873) skewX(.06)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.38346 .18137 -.18128 -.38328 277.741 339.009)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='rotate(89.873) skewX(.06)' ry='0' y='-64.679' x='125.195' height='5' width='20' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.41514 .08713 -.08709 -.41494 233.75 360.174)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='20' height='5' x='125.195' y='-64.679' ry='0' transform='rotate(89.873) skewX(.06)' rx='0' fill='#999' />
    </g>
  ),
]

// const Slot = ({ svg, type, typeCoord, ammo, ammoCoord }) => (
//   <g className={cx(!type && styles.emptySlot)}>
//     <g className='module'>
//       {svg}
//       {type && renderImg(type, typeCoord)}
//     </g>
//     {ammo && renderAmmoImg(ammo, ammoCoord)}
//   </g>
// )

const LowSlotsRack = ({ items, slotsCount }) => {
  if (isEmpty(items)) return null

  const slots = Object.keys(items).slice(0, slotsCount)

  return slots.map((slotFlag, ix) => {
    const { ammo, item } = items[slotFlag]

    return (
      <Slot
        key={`low-${slotFlag}`}
        svg={SLOTS_SVG[ix]}
        type={item && item.type}
        typeCoord={typeCoords[ix]}
        ammo={ammo && ammo.type}
        ammoCoord={ammoCoords[ix]}
      />
    )
  })
}

export default LowSlotsRack
