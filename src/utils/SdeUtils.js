import {
  types,
  groups,
  cats,
  shipAttributes,
  flags,
} from './SdeData'

// TODO: fetch from esi.evetech.net
// Problems when type not found
const additionalTypes = require('./sde/additionalTypes.json')
const skinsTypes = require('./sde/skinsTypesIds.json')

const SKIN_GROUP = 1950

export const isWH = whClassID => {
  const result = whClassID <= 6 || (whClassID > 9 && whClassID < 19)
  return result
}

export function getClassName(whClassID) {
  const className = `C${whClassID}`
  switch (whClassID) {
    case 13:
      return `${className} Shattered`
    case 14:
      return `${className} Sentinel Drifter`
    case 15:
      return `${className} Barbican Drifter`
    case 16:
      return `${className} Vidette Drifter`
    case 17:
      return `${className} Conflux Drifter`
    case 18:
      return `${className} Redoubt Drifter`
    default:
      return className
  }
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

export const getTypeInfo = typeID => {
  const result = types[typeID] || additionalTypes[typeID]
  if (!result && skinsTypes.includes(Number(typeID))) {
    return {
      name: 'SKIN',
      groupID: SKIN_GROUP,
    }
  }
  return result
}

export const getTypeName = typeID => {
  const typeInfo = getTypeInfo(typeID)
  if (!typeInfo) {
    console.error('getTypeName: not found typeID:', typeID)
    return 'Unknown'
  }
  return typeInfo.name
}

export const getGroupTypes = groupID => {
  const typeIds = Object.keys(types).filter(typeID => {
    const type = types[typeID]
    return type.groupID === Number(groupID)
  })
  return typeIds.map(id => ({
    id,
    name: types[id].name,
  }))
}

export const getGroupInfo = groupID => {
  const groupInfo = groups[groupID]
  if (!groupInfo) {
    console.error('getGroupInfo: not found groupID:', groupID)
    return false
  }
  return {
    id: groupID,
    name: groupInfo.name,
    categoryID: groupInfo.cat,
    types: getGroupTypes(groupID),
  }
}

export const getGroupID = typeID => {
  const typeInfo = getTypeInfo(typeID)
  if (!typeInfo) {
    console.error('getGroupID: not found typeID:', typeID)
    return false
  }
  return typeInfo.groupID
}

export const getGroupName = typeID => {
  const info = getTypeInfo(typeID)
  if (!info) {
    console.error('getGroupName: not found typeID:', typeID)
    return 'Unknown'
  }
  const group = groups[info.groupID]
  return group.name
}

export const getCategory = typeID => {
  const info = getTypeInfo(typeID)
  const group = groups[info.groupID]
  return {
    id: Number(group.cat),
    name: cats[group.cat].name.en,
  }
}

export const getCategoryID = typeID => {
  const group = groups[getGroupID(typeID)]
  if (!group) {
    console.error('getCategoryID: not found groupID:', getGroupID(typeID))
    console.log('  typeID:', typeID)
    return 0
  }
  return Number(group.cat)
}

// "6": { "name": "Ship" }
// "65": { "name": "Structure" }
// "87": { "name": "Fighter"
export const SHIP_CATEGORIES = [6, 65, 87]

export const isShip = typeID => {
  const categoryID = getCategoryID(typeID)
  return SHIP_CATEGORIES.includes(categoryID)
}

const CAT_AMMO = 8

export const isAmmo = typeID => {
  const categoryID = getCategoryID(typeID)
  return categoryID === CAT_AMMO
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

// singleton: 1
// http://localhost:4001/kill/97030057
// singleton: 2
// http://localhost:3000/kill/91944946

// we ignore flagID and flagGroups here
const addItemToDict = (result, item) => {
  const { type: origType, singleton } = item
  // if (origType === 11489) {
  //   console.json('item:', item)
  // }

  const type = singleton ? `${origType}-copy` : origType
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
      type: origType,
      singleton,
      dropped: item.dropped,
      destroyed: item.destroyed,
      sumDropped: item.sumDropped,
      sumDestroyed: item.sumDestroyed,
    }
  }
  // if (origType === 57451) {
  //   console.log('result.rawDict[type]:', result.rawDict[type])
  // }
}

const getItemPrice = (typeID, prices, singleton) => {
  if (singleton || !prices[typeID]) {
    return 1 // BPC-singleton and something unknown
  }

  return prices[typeID]
}

export const parseKillmailItems = kmData => {
  const { vict: victim } = kmData

  const prices = kmData.prices || {}
  const victimItems = victim.itms || []
  const victimConts = victim.cnts || []

  const result = {
    dropped: 0,
    destroyed: 0,
    fittedValue: 0,
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

    const itemPrice = getItemPrice(type, prices, singleton)
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
    const contDestroyed = Number(isDestroyed)
    const contDropped = Number(!isDestroyed)
    result.destroyed += contPrice * contDestroyed
    result.dropped += contPrice * contDropped
    container.sumDestroyed = contPrice * contDestroyed
    container.sumDropped = contPrice * contDropped
    if (isDestroyed) {
      container.totalSum = container.sumDestroyed
    } else {
      container.totalSum = container.sumDropped
    }
    // add container to Dict
    addItemToDict(result, { ...container, dropped: contDropped, destroyed: contDestroyed })

    // Add empty Groups for each Flag of Containers
    if (!result.flagGroups[flagName]) {
      result.flagGroups[flagName] = {
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
      const itemPrice = getItemPrice(type, prices, singleton)
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
  // Make one Structure Service Slots group
  const serviceSlots = [
    'Structure service slot 1',
    'Structure service slot 2',
    'Structure service slot 3',
    'Structure service slot 4',
    'Structure service slot 5',
    'Structure service slot 6',
    'Structure service slot 7',
    'Structure service slot 8',
  ]
  const tmpFlagGroups = {}
  const serviceSlotsGroup = {
    id: -1,
    key: 'Structure Service Slots',
    name: 'Structure Service Slots',
    items: [],
    totalSum: 0,
  }
  Object.keys(result.flagGroups).forEach(groupKey => {
    const group = result.flagGroups[groupKey]
    if (serviceSlots.includes(group.key)) {
      // serviceSlotsGroup.totalSum += group.totalSum
      serviceSlotsGroup.items = serviceSlotsGroup.items.concat(group.items)
    } else {
      tmpFlagGroups[groupKey] = group
    }
  })
  result.flagGroups = {
    ...tmpFlagGroups,
  }
  if (serviceSlotsGroup.items.length > 0) {
    result.flagGroups['Structure Service Slots'] = serviceSlotsGroup
  }
  // --------------------------------------------- Make one Structure Service Slots group

  // Sorting flag groups logically
  const flagKeys = Object.keys(result.flagGroups)
  const startGroupsOrder = ['high', 'med', 'low', 'rig', 'sub', 'subHold', 'Drone Bay', 'Specialized Fuel Bay']
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
      const itemPrice = getItemPrice(type, prices, singleton)
      const costDestroyed = destroyed * itemPrice
      const costDropped = dropped * itemPrice
      return total + costDestroyed + costDropped
    }, 0)
    const totalContsSum = result.conts
      .filter(cont => cont.flag === group.id)
      .reduce((total, cont) => (total + cont.totalSum), 0)

    group.totalSum = totalItemsSum + totalContsSum
  })

  // Get Fitted value
  const fitGroups = [
    'high', 'med', 'low', 'rig', 'sub', 'subHold', 'Drone Bay', 'Specialized Fuel Bay',
    // 'Core Room',
    // "Structure service slot 1",
    // "Structure service slot 2",
    // "Structure service slot 3",
    // "Structure service slot 4",
    // "Structure service slot 5",
    // "Structure service slot 6",
    // "Structure service slot 7",
    // "Structure service slot 8",
  ]
  Object.values(result.flagGroups).forEach(group => {
    if (fitGroups.includes(group.key)) {
      result.fittedValue += group.totalSum
    }
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
