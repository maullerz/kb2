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

//
// TODO: FOKIN CONTAINERS!
// http://localhost:3000/kill/86935694
//
// "flagID": 5, "flagText": "Cargo",
// "flagID": 90, "flagText": "Ship Hangar",
// "flagID": 155, "flagText": "Fleet Hangar",
//
// -----------------------------------
// { type, dropped, destroyed, singleton, sumDropped, sumDestroyed }
// we ignore flagID and flagGroups here
const addItemToDict = (result, item) => {
  const { type } = item
  if (result.rawDict[type]) {
    const { dropped, destroyed, sumDropped, sumDestroyed } = result.rawDict[type]
    result.rawDict[type] = {
      ...result.rawDict[type],
      dropped: dropped + item.dropped,
      destroyed: destroyed + item.destroyed,
      sumDropped: sumDropped + item.sumDropped,
      sumDestroyed: sumDestroyed + item.sumDestroyed,
    }
  } else {
    result.rawDict[type] = {
      type,
      dropped: item.dropped,
      destroyed: item.destroyed,
      sumDropped: item.sumDropped,
      sumDestroyed: item.sumDestroyed,
      singleton: item.singleton,
    }
  }
}

export const parseKillmailItems = kmData => {
  const { vict: victim, prices } = kmData

  const victimItems = victim.itms || []
  const victimConts = victim.cnts

  const result = {
    dropped: 0,
    destroyed: 0,
    ship: prices[victim.ship],
    rawList: [],
    rawDict: {},
    flagGroupsArray: [],
    flagGroups: {}, // 15: { id, name, items: [] }, ...
    conts: null,
  }

  victimItems.forEach(arrayValue => {
    const [flagID, type, dropped, destroyed, singleton] = arrayValue
    const slotKey = getFitSlotKey(flagID)
    const flag = getFlagByID(flagID)

    if (!flag) {
      throw new Error(`WTF flag not found: ${flagID}`)
    }

    const sumDropped = prices[type] * dropped
    const sumDestroyed = prices[type] * destroyed
    result.dropped += sumDropped
    result.destroyed += sumDestroyed

    // fitting flags is grouped to high / med / lo / etc.
    const flagGroup = slotKey || flag.flagText
    if (!result.flagGroups[flagGroup]) {
      result.flagGroups[flagGroup] = {
        id: flag.flagID,
        key: flagGroup,
        name: flag.flagText,
        items: [],
      }
    }
    const currentGroup = result.flagGroups[flagGroup]

    // grouping same typeID in same flagGroup
    const matched = currentGroup.items.find(item => item.type === type)

    if (matched) {
      // increment counts, grouping by type in flagGroup
      matched.dropped += dropped
      matched.destroyed += destroyed
    } else {
      const fitItem = { flag: flag.flagID, type, dropped, destroyed }
      if (singleton) {
        fitItem.singleton = true
      }
      currentGroup.items.push(fitItem)
    }

    // for ordering and totalSum / counts grouping
    addItemToDict(result, { type, dropped, destroyed, singleton, sumDropped, sumDestroyed })
  })

  // === CONTAINERS ===
  victimConts.forEach(cont => {
    // const [flag, type, drop, dstr, items] = cont
    const isDestroyed = !!cont.dstr
    const container = {
      flag: cont.flag,
      type: cont.type,
      isDestroyed,
      items: [],
    }
    // add container cost to total
    if (isDestroyed) {
      result.destroyed += prices[cont.type] * 1
    } else {
      result.dropped += prices[cont.type] * 1
    }
    cont.items.forEach(item => {
      // flagID not needed for raw list
      const [, type, dropped, destroyed, singleton] = item

      // add each item cost to total
      const sumDropped = prices[type] * dropped
      const sumDestroyed = prices[type] * destroyed
      result.dropped += sumDropped
      result.destroyed += sumDestroyed

      // flagID not needed - actual for ships inside, zero for other containers
      const itemInCont = {
        type, dropped, destroyed, singleton, sumDropped, sumDestroyed,
      }
      container.items.push(itemInCont)
      addItemToDict(result, itemInCont)
    })
  })

  // // raw list of items for sorting, but grouped by type, destroyed/dropped
  // let tempObjList = []
  // Object.keys(result).forEach(key => {
  //   const slotItems = result.flagGroups[key]
  //   if (Array.isArray(slotItems)) {
  //     tempObjList = tempObjList.concat(slotItems)
  //   }
  // })

  // // console.log('tempObjList:', JSON.stringify(tempObjList, null, 2))

  // tempObjList.forEach(item => {
  //   const { flag, type, dropped, destroyed, singleton } = item
  //   const sumDropped = prices[type] * dropped
  //   const sumDestroyed = prices[type] * destroyed

  //   if (sumDropped) {
  //     result.rawList.push({
  //       flag,
  //       type,
  //       isDestroyed: false,
  //       count: dropped,
  //       sum: sumDropped,
  //       singleton,
  //     })
  //   }

  //   if (sumDestroyed) {
  //     result.rawList.push({
  //       flag,
  //       type,
  //       isDestroyed: true,
  //       count: destroyed,
  //       sum: sumDestroyed,
  //       singleton,
  //     })
  //   }
  // })

  // Sorting flag groups logically
  const flagKeys = Object.keys(result.flagGroups)
  const startGroupsOrder = ['high', 'med', 'low', 'rig', 'sub', 'subHold', 'Drone Bay']
  const endGroupsOrder = ['Cargo']
  const tmp = []
  // sorted start
  startGroupsOrder.forEach(key => {
    const matched = flagKeys.includes(key)
    if (matched) {
      tmp.push(key)
    }
  })
  // unsorted middle
  flagKeys.forEach(key => {
    const matched = tmp.includes(key)
    const endMatched = endGroupsOrder.includes(key)
    if (!matched && !endMatched) {
      tmp.push(key)
    }
  })
  // sorted end
  endGroupsOrder.forEach(key => {
    const matched = flagKeys.includes(key)
    if (matched) {
      tmp.push(key)
    }
  })
  result.flagGroupsArray = tmp.map(key => result.flagGroups[key])
  // console.log('flagKeys:', flagKeys)
  // console.log('tmp:', tmp)
  // console.log('result.flagGroupsArray:', result.flagGroupsArray)

  result.total = result.dropped + result.destroyed + result.ship
  // console.log('result:', JSON.stringify(result, null, 2))
  return result
}

// export const parseKillmailItems1 = kmData => {
//   const { vict: victim, prices } = kmData

//   const victimItems = victim.itms || []
//   const victimConts = victim.cnts

//   // console.log('victimItems:', JSON.stringify(victimItems, null, 2))
//   // console.log('victimConts:', JSON.stringify(victimConts, null, 2))
//   // victimConts: [
//   //   {
//   //     "flag": 90,
//   //     "type": 52252,
//   //     "drop": 0,
//   //     "dstr": 1,
//   //     "items": [
//   //       [
//   //         93,
//   //         31378,
//   //         0,
//   //         1
//   //       ],

//   const result = {
//     dropped: 0,
//     destroyed: 0,
//     ship: prices[victim.ship],
//     rawList: [],
//     flagGroups: {
//       // high: [],
//       // med: [],
//       // low: [],
//       // rig: [],
//       // sub: [],
//       // subHold: [],
//     },
//     conts: null,
//   }

//   function parseArrayValue(value) {
//     const [flagID, type, dropped, destroyed, singleton] = value
//     result.dropped += prices[type] * dropped
//     result.destroyed += prices[type] * destroyed

//     const slotKey = getFitSlotKey(flagID)
//     const flag = getFlagByID(flagID)

//     if (!flag) {
//       console.error('WTF flag not found:', flagID)
//     }

//     const flagGroup = slotKey || flag.flagText
//     if (!result.flagGroups[flagGroup]) result.flagGroups[flagGroup] = []
//     const matched = result.flagGroups[flagGroup].find(item => item.type === type)

//     if (matched) {
//       matched.dropped += dropped
//       matched.destroyed += destroyed
//     } else {
//       const fitItem = { flag: flag.flagID, type, dropped, destroyed }
//       if (singleton) fitItem.singleton = true
//       result.flagGroups[flagGroup].push(fitItem)
//     }
//   }

//   victimItems.forEach(arrayValue => {
//     parseArrayValue(arrayValue)
//   })

//   victimConts.forEach(cont => {
//     console.log('cont:', cont)
//     const [flag, type, drop, dstr, items] = cont
//     const container = {
//       flag,
//       type,
//       isDestroyed: !!dstr,
//       items: [],
//     }
//     items.forEach(item => {
//       container.items.push()
//     })
//     result.dropped += prices[type] * dropped
//     result.destroyed += prices[type] * destroyed
//     // parseArrayValue(arrayValue)
//   })

//   result.total = result.dropped + result.destroyed + result.ship

//   // raw list of items for sorting, but grouped by type, destroyed/dropped
//   let tempObjList = []
//   Object.keys(result).forEach(key => {
//     const slotItems = result.flagGroups[key]
//     if (Array.isArray(slotItems)) {
//       tempObjList = tempObjList.concat(slotItems)
//     }
//   })

//   // console.log('tempObjList:', JSON.stringify(tempObjList, null, 2))

//   tempObjList.forEach(item => {
//     const { flag, type, dropped, destroyed, singleton } = item
//     const sumDropped = prices[type] * dropped
//     const sumDestroyed = prices[type] * destroyed

//     if (sumDropped) {
//       result.rawList.push({
//         flag,
//         type,
//         isDestroyed: false,
//         count: dropped,
//         sum: sumDropped,
//         singleton,
//       })
//     }

//     if (sumDestroyed) {
//       result.rawList.push({
//         flag,
//         type,
//         isDestroyed: true,
//         count: destroyed,
//         sum: sumDestroyed,
//         singleton,
//       })
//     }
//   })

//   // console.log('result:', JSON.stringify(result, null, 2))

//   return result
// }
