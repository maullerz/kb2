import React from 'react'
import isEmpty from 'lodash/isEmpty'
import { getIconUrl } from 'utils/KillmailUtils'
import { getTypeName } from 'utils/SdeUtils'

const renderRig = (type, [x, y]) => (
  <image x={x} y={y} width='32' height='32' xlinkHref={getIconUrl(type)} data-tip={getTypeName(type)} />
)

const SubSystemsRack = ({ slots }) => {
  if (isEmpty(slots)) return null

  return (
    <>
      <g className='subSystemRack flag125'>
        <g className='module'>
          <g strokeWidth='1.071' fill='none'>
            <path stroke='gray' d='M190 140q45-8 80 0l-8 70q-30-6-62 0z' transform='matrix(.28 -.27946 .28482 .27528 -2.587 129.949)' strokeWidth='2.526' />
            <g stroke='gray' strokeWidth='.283'>
              <path d='M32.949 80.79l1.2-.907 1.188.92M35.894 81.222l1.19.912-.447 1.423M36.396 84.33l-.442 1.427-1.493-.007M31.886 84.33l.442 1.427 1.494-.007M32.403 81.213l-1.195.906.44 1.426' transform='matrix(2.49985 -2.48517 2.53409 2.45882 -184.659 -6.566)' />
            </g>
          </g>
          {renderRig(slots[0].type, [95.541, 97.567])}
        </g>
      </g>
      <g className='subSystemRack flag126'>
        <g className='module'>
          <g strokeWidth='1.071' fill='none'>
            <path stroke='gray' d='M190 140q45-8 80 0l-8 70q-30-6-62 0z' transform='matrix(.36204 -.16645 .16882 .35514 23.895 72.467)' strokeWidth='2.526' />
            <g stroke='gray' strokeWidth='.283'>
              <path d='M32.949 80.79l1.2-.907 1.188.92M35.894 81.222l1.19.912-.447 1.423M36.396 84.33l-.442 1.427-1.493-.007M31.886 84.33l.442 1.427 1.494-.007M32.403 81.213l-1.195.906.44 1.426' transform='matrix(3.22878 -1.47684 1.49858 3.16874 -98.087 -117.574)' />
            </g>
          </g>
          {renderRig(slots[1].type, [120.383, 80.036])}
        </g>
      </g>
      <g className='subSystemRack flag127'>
        <g className='module'>
          <g strokeWidth='1.071' fill='none'>
            <path d='M190 140q45-8 80 0l-8 70q-30-6-62 0z' stroke='gray' transform='matrix(.3995 .00103 -.00153 .39217 76.15 20.475)' strokeWidth='2.526' />
            <g stroke='gray' strokeWidth='.283'>
              <path d='M32.949 80.79l1.2-.907 1.188.92M35.894 81.222l1.19.912-.447 1.423M36.396 84.33l-.442 1.427-1.493-.007M31.886 84.33l.442 1.427 1.494-.007M32.403 81.213l-1.195.906.44 1.426' transform='matrix(3.55959 .01603 -.02066 3.4959 48.366 -202.639)' />
            </g>
          </g>
          {renderRig(slots[2].type, [152.205, 73.14])}
        </g>
      </g>
      <g className='subSystemRack flag128'>
        <g className='module'>
          <g strokeWidth='1.071' fill='none'>
            <path stroke='gray' d='M190 140q45-8 80 0l-8 70q-30-6-62 0z' transform='matrix(.36232 .16474 -.16823 .35594 144.828 -4.375)' strokeWidth='2.526' />
            <g stroke='gray' strokeWidth='.283'>
              <path d='M32.949 80.79l1.2-.907 1.188.92M35.894 81.222l1.19.912-.447 1.423M36.396 84.33l-.442 1.427-1.493-.007M31.886 84.33l.442 1.427 1.494-.007M32.403 81.213l-1.195.906.44 1.426' transform='matrix(3.22532 1.47405 -1.506 3.17004 214.517 -218.623)' />
            </g>
          </g>
          {renderRig(slots[3].type, [183.943, 79.371])}
        </g>
      </g>
      {/* Deprecated 5th subsystem */}
      {false &&
        <g className='subSystemRack flag129'>
          <g className='module'>
            <g strokeWidth='1.071' fill='none'>
              <path d='M190 140q45-8 80 0l-8 70q-30-6-62 0z' stroke='gray' transform='matrix(.27438 .28388 -.29008 .2709 211.52 .496)' strokeWidth='2.526' />
              <g stroke='gray' strokeWidth='.283'>
                <path d='M32.949 80.79l1.2-.907 1.188.92M35.894 81.222l1.19.912-.447 1.423M36.396 84.33l-.442 1.427-1.493-.007M31.886 84.33l.442 1.427 1.494-.007M32.403 81.213l-1.195.906.44 1.426' transform='matrix(2.4396 2.53415 -2.59066 2.4099 356.817 -173.935)' />
              </g>
            </g>
            {renderRig(slots[0].type, [208.62, 97.235])}
          </g>
        </g>
      }
    </>
  )
}

export default SubSystemsRack
