import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'

import history from 'services/routerHistory'
// import apiCallMiddleware from './apiCallMiddleware'
// import payloadMiddleware from './payloadMiddleware'

import rootReducer from './rootReducer'

const initialState = {}

const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      // apiCallMiddleware,
      // payloadMiddleware,
    ),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
)

if (module.hot) {
  module.hot.accept('./rootReducer', () => {
    store.replaceReducer(rootReducer)
  })
}

export default store
