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

const TYPE_COORDS = [
  [122.697, 292.082],
  [90.793, 279.868],
  [61.63, 261.507],
  [37.95, 236.415],
  [21.416, 206.255],
  [12.277, 173.187],
  [10.949, 138.359],
  [17.345, 104.546],
]
const AMMO_COORDS = [
  [131.302, 265.479],
  [105.296, 256.007],
  [83.445, 241.135],
  [64.751, 222.025],
  [51.623, 198.263],
  [43.481, 172.008],
  [42.035, 144.857],
  [47.053, 118.168],
]

const SLOTS_SVG = [
  (
    <g transform='matrix(-.41374 -.09355 .0935 -.41355 151.356 370.478)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='19.99' height='5.002' x='-58.949' y='-140.019' ry='0' transform='rotate(-179.51) skewX(.061)' rx='0' fill='#999' />
      <rect rx='0' transform='rotate(-179.51) skewX(.061)' ry='0' y='-139.829' x='-87.768' height='5.002' width='19.99' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.37936 -.1898 .1897 -.37918 103.517 360.039)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='rotate(-179.51) skewX(.061)' ry='0' y='-140.019' x='-58.949' height='5.002' width='19.99' fill='#999' />
      <rect width='19.99' height='5.002' x='-87.768' y='-139.829' ry='0' transform='rotate(-179.51) skewX(.061)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.32517 -.2724 .27227 -.32501 60.223 338.774)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='19.99' height='5.002' x='-58.949' y='-140.019' ry='0' transform='rotate(-179.51) skewX(.061)' rx='0' fill='#999' />
      <rect rx='0' transform='rotate(-179.51) skewX(.061)' ry='0' y='-139.829' x='-87.768' height='5.002' width='19.99' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.24907 -.34337 .3432 -.24895 22.093 307.182)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='rotate(-179.51) skewX(.061)' ry='0' y='-140.019' x='-58.949' height='5.002' width='19.99' fill='#999' />
      <rect width='19.99' height='5.002' x='-87.768' y='-139.829' ry='0' transform='rotate(-179.51) skewX(.061)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.16091 -.39248 .3923 -.16083 -6.925 267.979)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='19.99' height='5.002' x='-58.949' y='-140.019' ry='0' transform='rotate(-179.51) skewX(.061)' rx='0' fill='#999' />
      <rect rx='0' transform='rotate(-179.51) skewX(.061)' ry='0' y='-139.829' x='-87.768' height='5.002' width='19.99' fill='#999' />
    </g>
  ), (
    <g transform='matrix(-.0658 -.41905 .41885 -.06577 -25.718 223.463)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='rotate(-179.51) skewX(.061)' ry='0' y='-140.019' x='-58.949' height='5.002' width='19.99' fill='#999' />
      <rect width='19.99' height='5.002' x='-87.768' y='-139.829' ry='0' transform='rotate(-179.51) skewX(.061)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(.03472 -.42277 .42256 .0347 -33.664 175.455)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='19.99' height='5.002' x='-58.949' y='-140.019' ry='0' transform='rotate(-179.51) skewX(.061)' rx='0' fill='#999' />
      <rect rx='0' transform='rotate(-179.51) skewX(.061)' ry='0' y='-139.829' x='-87.768' height='5.002' width='19.99' fill='#999' />
    </g>
  ), (
    <g transform='matrix(.13506 -.40211 .40192 .135 -29.945 126.462)' strokeWidth='2.358'>
      <path stroke='#555' d='M21.19 103.616q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='rotate(-179.51) skewX(.061)' ry='0' y='-140.019' x='-58.949' height='5.002' width='19.99' fill='#999' />
      <rect width='19.99' height='5.002' x='-87.768' y='-139.829' ry='0' transform='rotate(-179.51) skewX(.061)' rx='0' fill='#999' />
    </g>
  ),
]

const MediumSlotsRack = ({ items, slotsCount }) => {
  if (isEmpty(items)) return null

  const slots = Object.keys(items).slice(0, slotsCount)
  // that needed to render from top to bottom (but list is constructing from bottom to top)
  // because otherwise slots overlap images
  const svgs = SLOTS_SVG.slice(0, slotsCount)
  const typeCoords = TYPE_COORDS.slice(0, slotsCount)
  const ammoCoords = AMMO_COORDS.slice(0, slotsCount)

  return slots.map((slotFlag, ix) => {
    const { ammo, item } = items[slotFlag]
    const index = slotsCount - ix - 1
    return (
      <Slot
        key={`med-${slotFlag}`}
        svg={svgs[index]}
        type={item && item.type}
        typeCoord={typeCoords[index]}
        ammo={ammo && ammo.type}
        ammoCoord={ammoCoords[index]}
      />
    )
  })
}

export default MediumSlotsRack
