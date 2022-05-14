/* eslint no-use-before-define: ["error", { "variables": false }] */
import { getGroupID, getCategoryID, getFitSlotKey, isAmmo, isShip } from 'utils/SdeUtils'
import { implants } from 'utils/SdeData'

const IMG_QUALITY = 64
const CHAR_QUALITY = 256
const RENDER_QUALITY = 256
// const SELFHOST = 'https://images.evetech.net/types'
const SELFHOST = 'https://img.evetools.org/sdeimages/types'

// const BASE = 'https://images.evetech.net'
const BASE = 'https://img.evetools.org/sdeimages'
const TYPES_BASE = `${BASE}/types`
const CHARS_BASE = `${BASE}/characters`
const CORPS_BASE = `${BASE}/corporations`
const ALLYS_BASE = `${BASE}/alliances`
// const imgUrl = `https://img.evetools.org/sdeimages/types/${typeID}/icon?size=${quality}`

const NO_TYPE_ICONS = [
  0, // fallback, also for {weap: 0}
  // 4028, // Invading Precursor Entities
]

const NPC_CORPS = [
  1000287, // Infested Regions Hiveminds 20996
  1000288, // Navka Overminds 20996
  1000289, // Unshackled Overminds 20996
  1000290, // Karybdis Infestation 20996
  1000291, // Scylla Infestation 20996
]

const FACTION_CORPS = [
  // TODO: 1000287, // NPC_CORPS // Rogue Drones 500025
  1000274, // Vigilant Tyrannos // Drifters 500024
  1000298, // The Convocation of Triglav // Triglavian Collective 500026
]

const FACTION_CORPS_ICONS = {
  1000274: 500024,
  1000298: 500026,
}

const SKIN_GROUP = 1950

export const getUnknownItemUrl = () => '/icons/eve-question.png'

export const getCorpUrl = (corpID, quality) => {
  let corp = NPC_CORPS.includes(Number(corpID)) || !corpID ? 1 : corpID
  if (FACTION_CORPS.includes(Number(corp))) {
    corp = FACTION_CORPS_ICONS[corp]
  }
  if (Number(corp) === 500021) {
    corp = 1
  }
  const result = `${CORPS_BASE}/${corp}/logo?size=${quality || IMG_QUALITY}`
  return result
}

export const getAllyUrl = (allyID, quality) => {
  // Legacy? Not valid? const ally = NPC_ALLYS.includes(allyID) || !allyID ? 1 : allyID
  const result = `${ALLYS_BASE}/${allyID}/logo?size=${quality || IMG_QUALITY}`
  return result
}

export const getRenderUrl = (ship, quality = RENDER_QUALITY) => {
  if (!isShip(ship)) {
    return getIconUrl(ship, false, quality)
  }
  const result = `${SELFHOST}/${ship}/render?size=${quality}`
  return result
}

export const getIconUrl = (type, singleton) => {
  if (singleton) {
    return `${SELFHOST}/${type}/bpc?size=${IMG_QUALITY}`
  }
  const groupID = getGroupID(type)
  if (!groupID || groupID === SKIN_GROUP) {
    return getUnknownItemUrl()
  }
  const categoryID = getCategoryID(type)
  // Blueprint Original
  if (categoryID === 9) {
    return `${SELFHOST}/${type}/bp?size=${IMG_QUALITY}`
  }

  if (groupID && NO_TYPE_ICONS.includes(groupID)) {
    console.log('groupID:', groupID)
  }

  const result = groupID && NO_TYPE_ICONS.includes(groupID)
    // ? getRenderUrl(type, 64)
    ? `${SELFHOST}/${type}/render?size=64`
    : `${SELFHOST}/${type}/icon?size=${IMG_QUALITY}`
    // : `${SELFHOST}/${type}_${IMG_QUALITY}.png`
  return result
}

export const getCharUrl = (type, quality) => {
  // https://images.evetech.net/characters/95296935/portrait?size=64
  const result = `${CHARS_BASE}/${type}/portrait?size=${quality || CHAR_QUALITY}`
  return result
}

export const getEsiIconUrl = type => {
  const result = `${TYPES_BASE}/${type}/icon?size=${IMG_QUALITY}`
  return result
}

export const parseItems = km => {
  const { vict } = km
  const { itms } = vict

  if (!itms) return null

  const fit = {
    low: [],
    med: [],
    high: [],
    rig: [],
    sub: [],
    lowSlots: {
      11: {},
      12: {},
      13: {},
      14: {},
      15: {},
      16: {},
      17: {},
      18: {},
    },
    medSlots: {
      19: {},
      20: {},
      21: {},
      22: {},
      23: {},
      24: {},
      25: {},
      26: {},
    },
    highSlots: {
      27: {},
      28: {},
      29: {},
      30: {},
      31: {},
      32: {},
      33: {},
      34: {},
    },
  }

  itms.forEach(arrayValue => {
    // If Implant - override its flag value to High or Med
    if (arrayValue[0] === 89) {
      const impSlot = implants[arrayValue[1]]
      if (impSlot > 5) {
        arrayValue[0] = 11 + impSlot - 6
      } else {
        arrayValue[0] = 27 + impSlot - 1
      }
    }

    const [flag, type, dropped, destroyed, singleton] = arrayValue
    // console.log('arrayValue:', arrayValue)
    const [slotKey] = getFitSlotKey(flag) || []
    // console.log('slotKey:', slotKey)

    if (!fit[slotKey]) {
      fit[slotKey] = []
    }

    const item = { flag, type, dropped, destroyed }

    if (singleton) {
      item.singleton = true
    }

    fit[slotKey].push(item)

    if (['low', 'med', 'high'].includes(slotKey)) {
      const slotObjKey = `${slotKey}Slots`
      fit[slotObjKey][flag] = {
        ...fit[slotObjKey][flag],
        ...(isAmmo(type) ? { ammo: item } : { item }),
      }
    }
  })

  // console.log('fit:', fit)

  return fit
}
