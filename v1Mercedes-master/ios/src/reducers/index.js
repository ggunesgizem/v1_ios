import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import user from './user'
import dealer from './dealer'
import vehicleReducer from './vehicle'
import bookingReducer from './booking'
import status from './status'
import checkList from './checkList'
import campaign from './campaign'
import prefix from './prefix'
import loading from './loading'
import additionalService from './additionalService'
import agent from './agent'
import language from './language'
import legal from './legal'
import webview from './webDisplay'
import products from './products'
import maintabs from './maintabs'
import pushNoti from './pushNoti'

const appReducer = combineReducers({
  user,
  pushNoti,
  dealer,
  status,
  checkList,
  form: formReducer,
  loading,
  vehicle: vehicleReducer,
  routing: routerReducer,
  booking: bookingReducer,
  campaign,
  additionalService,
  agent,
  language,
  legal,
  webview,
  products,
  maintabs,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    action.payload = {
      enabled : state.pushNoti.enabled,
      pushToken :  state.pushNoti.pushToken,
    }
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer
