/* eslint import/no-mutable-exports: off */

// TODO: move that to API ?
let types = null // require('./sde/rawTypesShort.json')
let groups = null // require('./sde/groupIDs.json')
let cats = null // require('./sde/categoryIDs.json')
let shipAttributes = null // require('./sde/typeDogmaParsedShips.json') // const attributes = req..('./sde/typeAttributesShips.json')
let flags = null // require('./sde/flags.json')
// let typesArr = null

function castTypesArrayToObj(typesArray) {
  const result = {}
  typesArray.forEach(typeArr => {
    const [typeID, groupID, name] = typeArr
    result[typeID] = { groupID, name }
  })
  return result
}

function loadData() {
  if (types) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('already loaded!')
    }
    return Promise.resolve()
  } if (process.env.NODE_ENV === 'development') {
    console.log('============================================')
    console.log('============== LOADING JSONS ===============')
    console.log('============================================')
  }

  // const m1 = import('./sde/rawTypesShort.json')
  //   .then(module => { types = module.default })
  const m1 = import('./sde/rawTypesArray.json')
    .then(module => { types = castTypesArrayToObj(module.default) })

  // const m2 = import('./sde/groupIDs.json')
  const m2 = import('./sde/groupsShort.json')
    .then(module => { groups = module.default })

  const m3 = import('./sde/categoryIDs.json')
    .then(module => { cats = module.default })

  const m4 = import('./sde/typeDogmaParsedShips.json')
    .then(module => { shipAttributes = module.default })

  const m5 = import('./sde/flags.json')
    .then(module => { flags = module.default })

  return Promise.all([m1, m2, m3, m4, m5])
}

export {
  loadData,
  types,
  groups,
  cats,
  shipAttributes,
  flags,
}
