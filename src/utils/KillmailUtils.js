import { getGroupID, getCategoryID, getFitSlotKey, isAmmo } from 'utils/SdeUtils'

const IMG_QUALITY = 64
const CHAR_QUALITY = 256
const RENDER_QUALITY = 256
const TYPES_BASE = 'https://images.evetech.net/types'
const CHARS_BASE = 'https://images.evetech.net/characters'
const CORPS_BASE = 'https://images.evetech.net/corporations'
const ALLYS_BASE = 'https://images.evetech.net/alliances'
const SELFHOST = 'https://img.evetools.org/sdeimages/types'
// const imgUrl = `https://img.evetools.org/sdeimages/types/${typeID}/icon?size=${quality}`

const NO_TYPE_ICONS = [
  0, // fallback, also for {weap: 0}
  4028, // Invading Precursor Entities
]

const NPC_CORPS = [
  1000274, // Vigilant Tyrannos
  1000298, // The Convocation of Triglav
]

const NPC_ALLYS = [
  // 1000274, // Vigilant Tyrannos
]

const SKIN_GROUP = 1950

export const getUnknownItemUrl = () => '/icons/eve-question.png'

export const getCorpUrl = corpID => {
  const corp = NPC_CORPS.includes(Number(corpID)) || !corpID ? 1 : corpID
  const result = `${CORPS_BASE}/${corp}/logo?size=${IMG_QUALITY}`
  return result
}

export const getAllyUrl = allyID => {
  const ally = NPC_ALLYS.includes(allyID) || !allyID ? 1 : allyID
  const result = `${ALLYS_BASE}/${ally}/logo?size=${IMG_QUALITY}`
  return result
}

export const getRenderUrl = (ship, quality = RENDER_QUALITY) => {
  const result = `${TYPES_BASE}/${ship}/render?size=${quality}`
  return result
}

export const getIconUrl = (type, singleton) => {
  if (singleton) {
    return `${TYPES_BASE}/${type}/bpc?size=${IMG_QUALITY}`
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
  const result = groupID && NO_TYPE_ICONS.includes(groupID)
    ? getRenderUrl(type, 64)
    : `${SELFHOST}/${type}/icon?size=${IMG_QUALITY}`
    // : `${SELFHOST}/${type}_${IMG_QUALITY}.png`
  return result
}

export const getCharUrl = type => {
  // https://images.evetech.net/characters/95296935/portrait?size=64
  const result = `${CHARS_BASE}/${type}/portrait?size=${CHAR_QUALITY}`
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
