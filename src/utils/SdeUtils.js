import { SYSTEMS_DATA } from 'data/constants'
// const startsWith = require('lodash/startsWith')
// const types = require('./sde/typeIDs.json')
const types = require('./sde/rawTypes.json')
const groups = require('./sde/groupIDs.json')
const cats = require('./sde/categoryIDs.json')
// const attributes = require('./sde/typeAttributesShips.json')
const shipAttributes = require('./sde/typeDogmaParsedShips.json')
const flags = require('./sde/flags.json')

// TODO: fetch from esi.evetech.net
const additionalTypes = require('./sde/additionalTypes.json')

export const getSystemDescr = systemID => {
  const relSystemID = systemID - 30000000
  const system = SYSTEMS_DATA.systems.find(sys => sys[1] === relSystemID)
  const region = system && SYSTEMS_DATA.regions[system[2]]
  // TODO: triglavian
  // if (!system) {
  //   console.error('triglavian system:', km)
  //   return 'WTF'
  // }
  return {
    system: system ? system[0] : relSystemID,
    region,
  }
}

export const getTypeInfo = typeID => types[typeID] || additionalTypes[typeID]

export const getTypeName = typeID => {
  const typeInfo = getTypeInfo(typeID)
  if (!typeInfo) {
    console.error('not found typeID:', typeID)
    return 'Unknown'
  }
  return typeInfo.name
}

export const getGroupID = typeID => {
  const typeInfo = getTypeInfo(typeID)
  if (!typeInfo) {
    console.error('not found typeID:', typeID)
    return false
  }
  return typeInfo.groupID
}

export const getGroupName = typeID => {
  const info = getTypeInfo(typeID)
  if (!info) {
    console.error('not found typeID:', typeID)
    return 'Unknown'
  }
  const group = groups[info.groupID]
  return group.name
}

export const getCategory = typeID => {
  const info = getTypeInfo(typeID)
  const group = groups[info.groupID]
  return {
    id: Number(group.categoryID),
    name: cats[group.categoryID].name.en,
  }
}

export const getCategoryID = typeID => {
  const group = groups[getGroupID(typeID)]
  return Number(group.categoryID)
}

const CAT_AMMO = 8

export const isAmmo = typeID => {
  const category = getCategory(typeID)
  return category.id === CAT_AMMO
}

const ATTR_LOW_SLOTS = 12
const ATTR_MED_SLOTS = 13
const ATTR_HI_SLOTS = 14
const ATTR_RIG_SLOTS = 1137

export const getShipAttributes = shipTypeID => {
  // const groupID = getGroupID(shipTypeID)
  // TODO: no slots for Category - 18:Drone - Excavators
  const shipAttr = shipAttributes[shipTypeID]?.dogmaAttributes
  if (!shipAttr) {
    console.error('Not found attributes for shipTypeID:', shipTypeID)
    return {
      lowSlots: 0,
      medSlots: 0,
      hiSlots: 0,
      rigSlots: 0,
    }
  }

  const result = {
    lowSlots: shipAttr[ATTR_LOW_SLOTS],
    medSlots: shipAttr[ATTR_MED_SLOTS],
    hiSlots: shipAttr[ATTR_HI_SLOTS],
    rigSlots: shipAttr[ATTR_RIG_SLOTS],
  }

  return result
}

// 45601 - Tengu Offensive - Accelerated Ejection Bay
// "hiSlotModifier": {
//   "id": 1374,
//   "value": 7
// },
// "medSlotModifier": {
//   "id": 1375,
//   "value": 0
// },
// "lowSlotModifier": {
//   "id": 1376,
//   "value": 0
// },

const ATTR_LOW_SLOTS_MOD = 1376
const ATTR_MED_SLOTS_MOD = 1375
const ATTR_HI_SLOTS_MOD = 1374

export const getStrategicCruiserAttributes = (shipTypeID, subs) => {
  const shipAttr = shipAttributes[shipTypeID]?.dogmaAttributes
  if (!shipAttr) {
    console.error('Not found attributes for shipTypeID:', shipTypeID)
    return null
  }

  const result = {
    lowSlots: 0,
    medSlots: 0,
    hiSlots: 0,
    rigSlots: shipAttr[ATTR_RIG_SLOTS],
  }

  // console.log('subs:', subs)
  subs.forEach(subTypeID => {
    const attrs = shipAttributes[subTypeID]?.dogmaAttributes
    if (!attrs) {
      console.error('sub attributes not found:', subTypeID)
    } else {
      result.lowSlots += attrs[ATTR_LOW_SLOTS_MOD]
      result.medSlots += attrs[ATTR_MED_SLOTS_MOD]
      result.hiSlots += attrs[ATTR_HI_SLOTS_MOD]
    }
  })

  return result
}

export const getFlagByID = flagID => {
  const flag = flags.find(f => f.flagID === flagID)
  if (!flag) {
    console.error('Not found flagID:', flagID)
    return null
  }

  return flag
}

// const ORDER = ['high', 'med', 'low', 'rig', 'sub'] // 'cargo' latest
// const lowSlots = [11, 12, 13, 14, 15, 16, 17, 18]
// const medSlots = [19, 20, 21, 22, 23, 24, 25, 26]
// const highSlots = [27, 28, 29, 30, 31, 32, 33, 34]
// const rigSlots = [92, 93, 94]
// const subSystemSlots = [125, 126, 127, 128, 129]

export const getFitSlotKey = flag => {
  switch (flag) {
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
      return 'low'
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
      return 'med'
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
      return 'high'
    case 92:
    case 93:
    case 94:
      return 'rig'
    case 125:
    case 126:
    case 127:
    case 128:
    case 129:
      return 'sub'
    case 177:
      return 'subHold'
    default:
      return null
  }
}

export const parseKillmailItems = (victim, prices) => {
  const victimItems = victim.itms || []
  if (!victimItems) return null

  const result = {
    high: [],
    med: [],
    low: [],
    rig: [],
    sub: [],
    subHold: [],
    dropped: 0,
    destroyed: 0,
    ship: prices[victim.ship],
  }
  victimItems.forEach(arrayValue => {
    const [flagID, type, dropped, destroyed, singleton] = arrayValue
    result.dropped += prices[type] * dropped
    result.destroyed += prices[type] * destroyed

    const slotKey = getFitSlotKey(flagID)
    const flag = getFlagByID(flagID)

    if (!flag) {
      console.error('WTF flag not found:', flagID)
    }

    const slotName = slotKey || flag.flagText
    if (!result[slotName]) result[slotName] = []
    const matched = result[slotName].find(item => item.type === type)

    if (matched) {
      matched.dropped += dropped
      matched.destroyed += destroyed
    } else {
      const fitItem = { flag: flag.flagID, type, dropped, destroyed }
      if (singleton) fitItem.singleton = true
      result[slotName].push(fitItem)
    }
  })

  result.total = result.dropped + result.destroyed + result.ship

  return result
}
