import _ from 'lodash'
import moment from 'moment'

import { INIT_VEHICLE } from '../actions/initialAction'
import { REGISTER_VEHICLE, UPDATE_VEHICLE, DELETE_VEHICLE, FETCH_MODELS, START_FETCH_MODELS, END_FETCH_MODELS } from '../actions/vehicleAction'

const INITIAL_STATE = {
  all: [],
  selected: null,
  isFetchingVehicleCatalog : false,
  catalog: null,
  vehListLastUpdated : 0,
  catalogLastLoaded : 0,
  isFirstTimeLoadingCatalog : true,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REGISTER_VEHICLE: {
      let all = _.concat(state.all, action.payload.res.data)
      // console.log(all)
      return { ...state, all: all, vehListLastUpdated:moment().toDate().getTime()}
    }
    case UPDATE_VEHICLE: {
      if(action.payload.res.status === 202){
        var item = state.all.map(item => {
          if(item.VehicleId ===  action.payload.veh.VehicleId){
            return {...item, ...action.payload.veh}
          }
          return item
        })
        return {...state, all:[...item], vehListLastUpdated:moment().toDate().getTime()}
      }
      return { ...state}
    }
    case DELETE_VEHICLE: {
      if(action.payload.res.status === 202){
        var items = state.all.filter(item => {
          if(item.VehicleId !==  action.payload.veh.VehicleId){
            return item
          }
        })
        return {...state, all:[...items], vehListLastUpdated:moment().toDate().getTime()}
      }
      return { ...state}
    }
    case INIT_VEHICLE:
      var vehList = action.payload.Vehicles.filter(item => {
        if(!item.VehicleIsDeleted){
          return item
        }
      })
      return {
        ...state,
        all: vehList,
        vehListLastUpdated:moment().toDate().getTime(),
      }
    case START_FETCH_MODELS :
      return {
        ...state,
        isFetchingVehicleCatalog : true,
        catalogLastLoaded:action.payload,
      }
    case END_FETCH_MODELS :
      if(action.payload.status === "success"){
        return {
          ...state,
          isFetchingVehicleCatalog : false,
          isFirstTimeLoadingCatalog: false,
          catalogLastLoaded : action.payload.cTime,
        }
      }
      return {
        ...state,
        isFetchingVehicleCatalog : false,
      }
    case FETCH_MODELS:{
      if(action.payload.status === 200){
        return {
          ...state,
          catalog : action.payload.data,
        }
      }
      return {
        ...state,
      }
    }
    default:
      return state
  }
}
