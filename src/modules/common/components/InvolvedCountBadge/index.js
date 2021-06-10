import React from 'react'
// import React, { useState } from 'react'

// import { Href } from 'components'

import { Root, InvolvedCountText } from './styles'

// https://docs.esi.evetech.net/docs/id_ranges.html
//   500,000 - 1,000,000 Factions
// 1,000,000 - 2,000,000 NPC corporations
// 3,000,000 - 4,000,000 NPC characters (agents and NPC corporation CEO’s)
// function getIsNPC(atts) {
//   if (atts.length > 1) {
//     return false
//   }
//   if (!atts[0].corp && atts[0].fctn >= 500000 && atts[0].fctn < 1000000) {
//     return true
//   }
//   if (atts[0].corp?.id >= 1000000 && atts[0].corp?.id < 2000000) {
//     return true
//   }
//   return false
// }

function InvolvedCountBadge({ km }) {
  const { atts, zkb } = km
  const isNPC = zkb.npc
  const isSolo = zkb.solo

  function renderCount() {
    if (isSolo) {
      return 'SOLO'
    }
    if (isNPC) {
      return 'npc'
    }
    return atts.count
  }

  return (
    <Root>
      <InvolvedCountText isSolo={isSolo} isNPC={isNPC}>
        {renderCount()}
      </InvolvedCountText>
    </Root>
  )
}

// function InvolvedCountBadgeOld({ km }) {
//   const { atts } = km
//   const isNPC = getIsNPC(atts)
//   const isSolo = !isNPC && atts.length === 1

//   function renderCount() {
//     if (isSolo) {
//       return 'SOLO'
//     }
//     if (isNPC) {
//       return 'npc'
//     }
//     return atts.length
//   }

//   return (
//     <Root>
//       <InvolvedCountText isSolo={isSolo} isNPC={isNPC}>
//         {renderCount()}
//       </InvolvedCountText>
//     </Root>
//   )
// }

export default InvolvedCountBadge
