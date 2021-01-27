import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import history from 'services/routerHistory'

import settings from 'store/reducers/settings.reducer'

const reducers = {
  settings,
}

const rootReducer = combineReducers({
  router: connectRouter(history),
  ...reducers,
})

export default rootReducer
