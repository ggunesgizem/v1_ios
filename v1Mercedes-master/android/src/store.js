import { applyMiddleware, createStore, compose } from 'redux'
// import { browserHistory } from 'react-router'
import { syncHistoryWithStore, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import persistState, { mergePersistedState } from 'redux-localstorage'
import adapter from 'redux-localstorage/lib/adapters/localStorage'
import rootReducers from './reducers'
import { LOG_OUT } from './actions/initialAction'
import createMemoryHistory from 'history/lib/createMemoryHistory';
let memoryHistory = createMemoryHistory();

const reducers = compose(
  mergePersistedState()
)(rootReducers)

const appReducers = (state, action) => {
  if(action.type === LOG_OUT) {
    // const { routing } = state
    // // console.log(routing)
    // const newRouting = {
    //   locationBeforeTransitions : {
    //       ...routing.locationBeforeTransitions,
    //       pathname: '/'
    //   }
    // }
    // state = { routing: newRouting }
  }
  return reducers(state,action)
}

const storage = compose()(adapter(window.localStorage))

const middleWares = applyMiddleware(
  thunk,
  // logger,
  routerMiddleware(memoryHistory),
)

const enhancer = compose(
  middleWares,
  persistState(storage, 'my-key'),
)

export const store = createStore(
  appReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  enhancer
)

// Create an enhanced history that syncs navigation events with the store
export const history = syncHistoryWithStore(memoryHistory, store)
