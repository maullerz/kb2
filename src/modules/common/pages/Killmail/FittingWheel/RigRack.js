import React from 'react'
import { getIconUrl } from 'utils/KillmailUtils'
import { getTypeName } from 'utils/SdeUtils'

const renderImg = (x, y, type) => (
  <image x={x} y={y} width='32' height='32' preserveAspectRatio='none' xlinkHref={getIconUrl(type)} data-tip={getTypeName(type)} />
)

const firstRig = type => renderImg(118.721, 215.797, type)

const secondRig = type => renderImg(151.457, 222.777, type)

const thirdRig = type => renderImg(184.525, 216.213, type)

const RigRack = ({ slots, slotsCount }) => {
  if (!slotsCount) return null

  return (
    <>
      <g className='rigRack flag92'>
        <g className='module'>
          <g fill='none'>
            <path stroke='gray' d='M190 140q45-8 80 0l-8 70q-30-6-62 0z' transform='matrix(-.38473 -.17866 .17857 -.38455 192.402 339.231)' strokeWidth='2.358' />
            <g stroke='gray' strokeWidth='.265'>
              <path strokeWidth='1.00157545' d='M125.345 224.863c2.4-5.148 5.864-6.528 11.158-4.056M145.514 234.277c2.405-5.145 1.239-8.687-4.057-11.158M123.513 228.79c-2.405 5.145-1.24 8.687 4.056 11.157M143.681 238.204c-2.4 5.147-5.863 6.528-11.158 4.056' />
            </g>
          </g>
          {slots[0] && firstRig(slots[0].type)}
        </g>
      </g>
      <g className='rigRack flag93'>
        <g className='module'>
          <g fill='none'>
            <path stroke='gray' d='M190 140q45-8 80 0l-8 70q-30-6-62 0z' transform='matrix(-.42419 .0001 -.0001 -.42399 265.406 312.007)' strokeWidth='2.358' />
            <g stroke='gray' strokeWidth='.265'>
              <path strokeWidth='1.00157545' d='M156.4 236.546c.008-5.68 2.567-8.392 8.41-8.38M178.658 236.584c.013-5.68-2.537-8.4-8.38-8.409M156.393 240.879c-.012 5.68 2.537 8.4 8.38 8.41M178.65 240.917c-.007 5.68-2.566 8.392-8.41 8.38' />
            </g>
          </g>
          {slots[1] && secondRig(slots[1].type)}
        </g>
      </g>
      {slotsCount > 2 &&
        <g className='rigRack flag94'>
          <g className='module'>
            <g fill='none'>
              <path stroke='gray' d='M190 140q45-8 80 0l-8 70q-30-6-62 0z' transform='matrix(.38473 -.17866 -.17857 -.38455 142.445 339.231)' strokeWidth='2.358' />
              <g stroke='gray' strokeWidth='.265'>
                <path strokeWidth='1.00157545' d='M209.502 224.863c-2.4-5.148-5.863-6.528-11.158-4.056M189.334 234.277c-2.405-5.145-1.24-8.687 4.056-11.157M211.335 228.79c2.405 5.145 1.239 8.687-4.057 11.157M191.166 238.204c2.4 5.147 5.864 6.528 11.159 4.056' />
              </g>
            </g>
            {slots[2] && thirdRig(slots[2].type)}
          </g>
        </g>
      }
    </>
  )
}

export default RigRack
