/* eslint import/no-mutable-exports: off */
/* eslint global-require: off */
import axios from 'axios'

let types = null // require('./sde/rawTypesShort.json')
let shipAttributes = null // require('./sde/typeDogmaParsedShips.json') // const attributes = req..('./sde/typeAttributesShips.json')
let groups = null // require('./sde/groupIDs.json')
let skinsTypes = null // require('./sde/skinsTypesIds.json')
// let cats = null // require('./sde/categoryIDs.json')
// let flags = null // require('./sde/flags.json')
// // let typesArr = null

const isDev = process.env.NODE_ENV === 'development'

function castTypesArrayToObj(typesArray) {
  const result = {}
  typesArray.forEach(typeArr => {
    const [typeID, groupID, name] = typeArr
    result[typeID] = { groupID, name }
  })
  return result
}

// function loadDataAsync() {
//   types = castTypesArrayToObj(require('./sde/rawTypesArray.json'))
//   groups = require('./sde/groupsShort.json')
//   cats = require('./sde/categoryIDs.json')
//   shipAttributes = require('./sde/typeDogmaParsedShips.json')
//   flags = require('./sde/flags.json')
//   return Promise.resolve()
// }

function loadData() {
  if (types) {
    if (isDev) {
      console.warn('already loaded!')
    }
    return Promise.resolve()
  }

  if (isDev) {
    console.log('============================================')
    console.log('============== LOADING JSONS ===============')
    console.log('============================================')
  }

  const m1 = axios.get('/data/rawTypesArray.json').then(res => {
    isDev && console.log('rawTypesArray loaded.')
    types = castTypesArrayToObj(res.data)
  })

  const m2 = axios.get('/data/typeDogmaParsedShips.json').then(res => {
    isDev && console.log('typeDogmaParsedShips loaded.')
    shipAttributes = res.data
  })

  const m3 = axios.get('/data/groupsShort.json').then(res => {
    isDev && console.log('groupsShort loaded.')
    groups = res.data
  })

  const m4 = axios.get('/data/skinsTypesIds.json').then(res => {
    isDev && console.log('skinsTypesIds loaded.')
    skinsTypes = res.data
  })

  return Promise.all([m1, m2, m3, m4])
}

// const types = castTypesArrayToObj(require('./sde/rawTypesArray.json'))
// const shipAttributes = require('./sde/typeDogmaParsedShips.json')
// const groups = require('./sde/groupsShort.json')
const cats = require('./sde/categoryIDs.json')
const flags = require('./sde/flags.json')
const shipGroups = require('./sde/shipGroups.json')
const implants = require('./sde/implantsShort.json')

export {
  loadData,
  types,
  groups,
  cats,
  shipAttributes,
  flags,
  skinsTypes,
  shipGroups,
  implants,
}
