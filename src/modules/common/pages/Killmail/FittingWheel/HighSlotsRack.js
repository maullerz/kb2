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

const Slot = ({ svg, type, typeCoord, ammo, ammoCoord }) => (
  <g style={type ? undefined : emptyStyle}>
    <g className='module'>
      {svg}
      {type && renderImg(type, typeCoord)}
    </g>
    {ammo && renderAmmoImg(ammo, ammoCoord)}
  </g>
)

const typeCoords = [
  [47.422, 54.529],
  [72.929, 33.425],
  [102.591, 18.221],
  [135.576, 10.328],
  [168.573, 11.408],
  [201.308, 19.633],
  [231.468, 34.672],
  [256.145, 55.941],
]
const ammoCoords = [
  [71.231, 74.382],
  [91.92, 58.679],
  [115.433, 46.881],
  [142.358, 40.318],
  [168.358, 40.318],
  [194.945, 46.217],
  [219.289, 59.178],
  [238.648, 76.377],
]

const SLOTS_SVG = [
  (
    <g transform='matrix(.27368 -.29554 .30613 .26522 -35.634 13.633)' strokeWidth='2.476'>
      <path stroke='#555' d='M14.053 240.153q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='19.993' height='5.002' x='98.585' y='264.601' ry='0' transform='matrix(-.86311 .50501 .50375 .86385 0 0)' rx='0' fill='#999' />
      <rect rx='0' transform='matrix(.86745 .49752 .49807 -.86714 0 0)' ry='0' y='-216.61' x='190.789' height='5.002' width='19.993' fill='#999' />
      <rect rx='0' transform='matrix(.00461 .99999 1 -.00357 0 0)' ry='0' y='50.33' x='253.685' height='5' width='20' fill='#999' />
    </g>
  ), (
    <g transform='matrix(.33796 -.22496 .23333 .32717 6.144 -28.522)' strokeWidth='2.476'>
      <path stroke='#555' d='M14.053 240.153q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='matrix(-.86311 .50501 .50375 .86385 0 0)' ry='0' y='264.601' x='98.585' height='5.002' width='19.993' fill='#999' />
      <rect width='19.993' height='5.002' x='190.789' y='-216.61' ry='0' transform='matrix(.86745 .49752 .49807 -.86714 0 0)' rx='0' fill='#999' />
      <rect width='20' height='5' x='253.685' y='50.33' ry='0' transform='matrix(.00461 .99999 1 -.00357 0 0)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(.38466 -.1384 .14395 .37211 57.934 -60.445)' strokeWidth='2.476'>
      <path stroke='#555' d='M14.053 240.153q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='matrix(-.86311 .50501 .50375 .86385 0 0)' ry='0' y='264.601' x='98.585' height='5.002' width='19.993' fill='#999' />
      <rect width='19.993' height='5.002' x='190.789' y='-216.61' ry='0' transform='matrix(.86745 .49752 .49807 -.86714 0 0)' rx='0' fill='#999' />
      <rect width='20' height='5' x='253.685' y='50.33' ry='0' transform='matrix(.00461 .99999 1 -.00357 0 0)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(.40784 -.04619 .0487 .3943 115.482 -79.188)' strokeWidth='2.476'>
      <path stroke='#555' d='M14.053 240.153q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='matrix(-.86311 .50501 .50375 .86385 0 0)' ry='0' y='264.601' x='98.585' height='5.002' width='19.993' fill='#999' />
      <rect width='19.993' height='5.002' x='190.789' y='-216.61' ry='0' transform='matrix(.86745 .49752 .49807 -.86714 0 0)' rx='0' fill='#999' />
      <rect width='20' height='5' x='253.685' y='50.33' ry='0' transform='matrix(.00461 .99999 1 -.00357 0 0)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(.4079 .04751 -.04815 .39414 175.484 -84.151)' strokeWidth='2.476'>
      <path stroke='#555' d='M14.053 240.153q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='19.993' height='5.002' x='98.585' y='264.601' ry='0' transform='matrix(-.86311 .50501 .50375 .86385 0 0)' rx='0' fill='#999' />
      <rect rx='0' transform='matrix(.86745 .49752 .49807 -.86714 0 0)' ry='0' y='-216.61' x='190.789' height='5.002' width='19.993' fill='#999' />
      <rect rx='0' transform='matrix(.00461 .99999 1 -.00357 0 0)' ry='0' y='50.33' x='253.685' height='5' width='20' fill='#999' />
    </g>
  ), (
    <g transform='matrix(.38509 .13904 -.14281 .37187 235.42 -75.403)' strokeWidth='2.476'>
      <path stroke='#555' d='M14.053 240.153q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='matrix(-.86311 .50501 .50375 .86385 0 0)' ry='0' y='264.601' x='98.585' height='5.002' width='19.993' fill='#999' />
      <rect width='19.993' height='5.002' x='190.789' y='-216.61' ry='0' transform='matrix(.86745 .49752 .49807 -.86714 0 0)' rx='0' fill='#999' />
      <rect width='20' height='5' x='253.685' y='50.33' ry='0' transform='matrix(.00461 .99999 1 -.00357 0 0)' rx='0' fill='#999' />
    </g>
  ), (
    <g transform='matrix(.3388 .22532 -.2321 .32693 292.32 -52.633)' strokeWidth='2.476'>
      <path stroke='#555' d='M14.053 240.153q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect width='19.993' height='5.002' x='98.585' y='264.601' ry='0' transform='matrix(-.86311 .50501 .50375 .86385 0 0)' rx='0' fill='#999' />
      <rect rx='0' transform='matrix(.86745 .49752 .49807 -.86714 0 0)' ry='0' y='-216.61' x='190.789' height='5.002' width='19.993' fill='#999' />
      <rect rx='0' transform='matrix(.00461 .99999 1 -.00357 0 0)' ry='0' y='50.33' x='253.685' height='5' width='20' fill='#999' />
    </g>
  ), (
    <g transform='matrix(.27556 .29516 -.30445 .26564 340.881 -18.192)' strokeWidth='2.476'>
      <path stroke='#555' d='M14.053 240.153q45-5 80 0l-5 70q-30-3-70 0z' fill='none' />
      <rect rx='0' transform='matrix(-.86311 .50501 .50375 .86385 0 0)' ry='0' y='264.601' x='98.585' height='5.002' width='19.993' fill='#999' />
      <rect width='19.993' height='5.002' x='190.789' y='-216.61' ry='0' transform='matrix(.86745 .49752 .49807 -.86714 0 0)' rx='0' fill='#999' />
      <rect width='20' height='5' x='253.685' y='50.33' ry='0' transform='matrix(.00461 .99999 1 -.00357 0 0)' rx='0' fill='#999' />
    </g>
  ),
]

const HighSlotsRack = ({ items, slotsCount }) => {
  if (isEmpty(items)) return null

  const slots = Object.keys(items).slice(0, slotsCount)

  return slots.map((slotFlag, ix) => {
    const { ammo, item } = items[slotFlag]
    return (
      <Slot
        key={`high-${slotFlag}`}
        svg={SLOTS_SVG[ix]}
        type={item && item.type}
        typeCoord={typeCoords[ix]}
        ammo={ammo && ammo.type}
        ammoCoord={ammoCoords[ix]}
      />
    )
  })
}

export default HighSlotsRack
