import {
  types,
  groups,
  cats,
  shipAttributes,
  flags,
  uniSystems,
} from './SdeData'

// TODO: fetch from esi.evetech.net
// Problems when type not found
const additionalTypes = {} // require('./sde/additionalTypes.json')

export const getSystemSS = sysID => {
  return uniSystems[sysID].ss
}

export const getSSColor = ss => {
  switch (true) {
    case (ss < 0.1):
      return '#F30202'
    case (ss < 0.2):
      return '#DC3201'
    case (ss < 0.3):
      return '#EB4903'
    case (ss < 0.4):
      return '#F66301'
    case (ss < 0.5):
      return '#E58000'
    case (ss < 0.6):
      return '#F5F501'
    case (ss < 0.7):
      return '#96F933'
    case (ss < 0.8):
      return '#00FF00'
    case (ss < 0.9):
      return '#02F34B'
    case (ss < 1.0):
      return '#4BF3C3'
    default:
      return '#33F9F9'
  }
}

export const getSystemDescr = systemID => {
  const system = uniSystems[systemID]
  const region = system.region.name
  const ss = parseFloat(system.ss).toFixed(2)
  const ssColor = getSSColor(ss)

  return {
    system: system ? system.name : systemID,
    region,
    ss,
    ssStyle: { color: ssColor },
  }
}

export const getTypeInfo = typeID => {
  return types[typeID] || additionalTypes[typeID]
}

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
      return ['low', 'Low Slots']
    case 19:
    case 20:
    case 21:
    case 22:
    case 23:
    case 24:
    case 25:
    case 26:
      return ['med', 'Medium Slots']
    case 27:
    case 28:
    case 29:
    case 30:
    case 31:
    case 32:
    case 33:
    case 34:
      return ['high', 'High Slots']
    case 92:
    case 93:
    case 94:
      return ['rig', 'Rigs']
    case 125:
    case 126:
    case 127:
    case 128:
    case 129:
      return ['sub', 'Subsystems']
    case 177:
      return ['subHold', 'Subsystem Hold']
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

// singleton: 2
// http://localhost:3000/kill/91944946

// we ignore flagID and flagGroups here
const addItemToDict = (result, item) => {
  const { type } = item
  if (item.sumDropped === null || item.sumDestroyed === null) {
    console.log('==========================================')
    console.log(JSON.stringify(item, null, 2))
    console.log('==========================================')
  }

  if (result.rawDict[type]) {
    const { dropped, destroyed, sumDropped, sumDestroyed } = result.rawDict[type]
    if (sumDropped === null || sumDestroyed === null) {
      console.log('==========================================')
      console.log(JSON.stringify(result.rawDict[type], null, 2))
      console.log('==========================================')
    }
    result.rawDict[type] = {
      ...result.rawDict[type],
      dropped: dropped + item.dropped,
      destroyed: destroyed + item.destroyed,
      sumDropped: sumDropped + item.sumDropped,
      sumDestroyed: sumDestroyed + item.sumDestroyed,
    }
  } else {
    // !Warning its [may be] possible to have same type but not the same singlton value
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

const getItemPrice = (typeID, prices) => {
  // TODO: Static Prices for Fraction Structures / Supercapitals / Etc.

  if (!prices[typeID]) {
    return 1 // BPC-singleton and something unknown
  }

  return prices[typeID]
}

export const parseKillmailItems = kmData => {
  const { vict: victim, prices } = kmData

  const victimItems = victim.itms || []
  const victimConts = victim.cnts || []

  const result = {
    dropped: 0,
    destroyed: 0,
    ship: prices[victim.ship],
    // raw list for ordered not grouped display of items
    rawList: [],
    rawDict: {},
    // displaying of grouped items by flag
    flagGroupsArray: [], // array of keys of flagGroups
    flagGroups: {}, // 15: { id, name, items: [] }, ...
    conts: [],
  }

  // ============= All Items not in containers =============
  victimItems.forEach(arrayValue => {
    const [flagID, type, dropped, destroyed, singleton] = arrayValue

    const [slotKey, slotNameOverride] = getFitSlotKey(flagID) || []
    const flag = getFlagByID(flagID)

    if (!flag) {
      throw new Error(`WTF flag not found: ${flagID}`)
    }

    const itemPrice = getItemPrice(type, prices)
    const sumDropped = itemPrice * dropped
    const sumDestroyed = itemPrice * destroyed
    result.dropped += sumDropped
    result.destroyed += sumDestroyed

    // fitting flags is grouped to high / med / lo / etc.
    const flagGroup = slotKey || flag.flagText
    if (!result.flagGroups[flagGroup]) {
      result.flagGroups[flagGroup] = {
        id: flag.flagID,
        key: flagGroup,
        name: slotNameOverride || flag.flagText,
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
  // =======================================

  // ============= CONTAINERS =============
  victimConts.forEach(cont => {
    // const [flag, type, drop, dstr, items] = cont
    const isDestroyed = !!cont.dstr
    const flagName = getFlagByID(cont.flag).flagText
    const container = {
      flag: cont.flag,
      flagName,
      type: cont.type,
      isDestroyed,
      items: [],
      totalSum: 0,
    }
    // add container cost to total
    const contPrice = getItemPrice(cont.type, prices)
    if (isDestroyed) {
      result.destroyed += contPrice * 1
      container.sumDestroyed = contPrice * 1
      container.totalSum = container.sumDestroyed
    } else {
      result.dropped += contPrice * 1
      container.sumDropped = contPrice * 1
      container.totalSum = container.sumDropped
    }
    // add container to Dict
    addItemToDict(result, { ...container, dropped: Number(!isDestroyed), destroyed: Number(isDestroyed) })

    // Add empty Groups for each Flag of Containers
    if (!result.flagGroups[cont.flag]) {
      result.flagGroups[cont.flag] = {
        id: cont.flag,
        key: flagName, // ? const flagGroup = slotKey || flag.flagText
        name: flagName,
        totalSum: 0,
        items: [],
      }
    }

    cont.items.forEach(item => {
      const [flagID, type, dropped, destroyed, singleton] = item

      // add each item cost to total
      const itemPrice = getItemPrice(type, prices)
      const sumDropped = itemPrice * dropped
      const sumDestroyed = itemPrice * destroyed
      result.dropped += sumDropped
      result.destroyed += sumDestroyed
      container.totalSum += sumDropped
      container.totalSum += sumDestroyed

      // flagID - actual for ships inside, zero for other containers
      // flagID needed for differentiate React children with same type - fitted items of ships in Fleet Hangar
      // TODO: group items for ships in Fleet Hangar
      const itemInCont = {
        flag: flagID, type, dropped, destroyed, singleton, sumDropped, sumDestroyed,
      }
      container.items.push(itemInCont)
      addItemToDict(result, itemInCont)
    })

    result.conts.push(container)
  })
  // =======================================

  // Forming Dict finished, create list for sorting
  Object.values(result.rawDict).forEach(dictItem => {
    const { type, dropped, destroyed, sumDestroyed, sumDropped, singleton } = dictItem
    const isDestroyed = sumDestroyed > 0
    const rawItem = {
      type,
      isDestroyed,
      singleton,
      sum: isDestroyed ? sumDestroyed : sumDropped,
      count: isDestroyed ? destroyed : dropped,
    }
    result.rawList.push(rawItem)
    if (isDestroyed && sumDropped > 0) {
      const secondRawItem = {
        type,
        isDestroyed: false,
        singleton,
        sum: sumDropped,
        count: dropped,
      }
      result.rawList.push(secondRawItem)
    }
  })
  // =======================================

  // Sorting flag groups logically
  const flagKeys = Object.keys(result.flagGroups)
  const startGroupsOrder = ['high', 'med', 'low', 'rig', 'sub', 'subHold', 'Drone Bay']
  const endGroupsOrder = ['Cargo']
  const orderedFlagGroupKeys = []
  // sorted start
  startGroupsOrder.forEach(key => {
    const matched = flagKeys.includes(key)
    if (matched) {
      orderedFlagGroupKeys.push(key)
    }
  })
  // unsorted middle
  flagKeys.forEach(key => {
    const matched = orderedFlagGroupKeys.includes(key)
    const endMatched = endGroupsOrder.includes(key)
    if (!matched && !endMatched) {
      orderedFlagGroupKeys.push(key)
    }
  })
  // sorted end
  endGroupsOrder.forEach(key => {
    const matched = flagKeys.includes(key)
    if (matched) {
      orderedFlagGroupKeys.push(key)
    }
  })
  result.flagGroupsArray = orderedFlagGroupKeys // .map(key => result.flagGroups[key])
  // =======================================

  // Get Totals for each Flag Group
  Object.values(result.flagGroups).forEach(group => {
    const totalItemsSum = group.items.reduce((total, item) => {
      const { type, destroyed, dropped, singleton } = item
      const itemPrice = singleton ? 1 : getItemPrice(type, prices)
      const costDestroyed = destroyed * itemPrice
      const costDropped = dropped * itemPrice
      return total + costDestroyed + costDropped
    }, 0)
    const totalContsSum = result.conts
      .filter(cont => cont.flag === group.id)
      .reduce((total, cont) => (total + cont.totalSum), 0)

    group.totalSum = totalItemsSum + totalContsSum
  })

  result.total = result.dropped + result.destroyed + result.ship
  // console.log('result:', JSON.stringify(result, null, 2))

  // const { conts, rawDict, flagGroupsArray, flagGroups, ...rest } = result
  // console.log('conts:', JSON.stringify(result.conts, null, 2))
  // console.log('flagGroupsArray:', JSON.stringify(result.flagGroupsArray, null, 2))
  // console.log('flagGroups:', JSON.stringify(result.flagGroups, null, 2))
  // console.log('rawDict:', JSON.stringify(result.rawDict, null, 2))

  return result
}
