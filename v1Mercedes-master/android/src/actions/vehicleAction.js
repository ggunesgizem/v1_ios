import axios from 'axios'
import { loadingStart, loadingFail, loadingSuccess } from './loadingActions'
import { fReloadContent } from './initialAction'

export const REGISTER_VEHICLE = 'REGISTER_VEHICLE'
export const FETCH_VEHICLES = 'FETCH_VEHICLES'
export const UPDATE_VEHICLE = 'UPDATE_VEHICLE'
export const DELETE_VEHICLE = 'DELETE_VEHICLE'
export const FETCH_MODELS = 'FETCH_MODELS'
export const START_FETCH_MODELS = 'START_FETCH_MODELS'
export const END_FETCH_MODELS = 'END_FETCH_MODELS'

export function registerVehicle(props, callbackFunction, errCallBackFunction) {
  return dispatch => {
    dispatch(loadingStart())
    var itemToSend = {
      Plate : props.vehicleInfo.Plate,
      YearModel : props.vehicleInfo.YearModel,
      SeriesId : props.vehicleInfo.Series,
      ModelId : props.vehicleInfo.Model,
    }
    return axios.post(`vehicle`, itemToSend)
    .then(res => {
      if(res.status === 201){
        dispatch(fReloadContent(true,callbackFunction))
      }else{
        errCallBackFunction(res.status)
        dispatch(loadingSuccess())
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(loadingSuccess())
      errCallBackFunction(err.response.status)
    })
  }
}

export function fetchVehicles() {
  const vlist = [
    { id: 0, model: "C202", plateNumber: "12 HS 2231", productionYear: "2009", variant: "C202DX" },
    { id: 1, model: "C400", plateNumber: "67 DF 2891", productionYear: "2012", variant: "C400" }
  ]
  return {
    type: FETCH_VEHICLES,
    payload: vlist,
  }
}

function startFetchModels(cTime){
  return {
    type: START_FETCH_MODELS,
    payload: cTime,
  }
}

function endFetchModels(payload){
  return {
    type: END_FETCH_MODELS,
    payload: payload,
  }
}
export function fetchModels(cTime) {
  console.log("fetching vehicle catalog");
  return dispatch => {
    dispatch(startFetchModels(cTime))
    return axios.get(`series`)
    .then(res => {
      dispatch({
        type: FETCH_MODELS,
        payload: res,
      })
      dispatch(endFetchModels({status:"success", cTime : cTime}))
    })
    .catch(err => {
      dispatch(endFetchModels({status:"fail", error:err}))
    })
  }
}

export function updateVehicle(payload, callbackFunction, errCallBackFunction){
  return dispatch => {
    dispatch(loadingStart())
    var itemToSend = {
      VehicleId : payload.VehicleId,
      Mileage : payload.Mileage,
      YearModel : payload.YearModel,
      SeriesId : payload.SeriesId,
      ModelId : payload.ModelId,
    }
    return axios.patch(`vehicle/UpdateVehicle`, itemToSend)
    .then(res => {
      if(res.status == 202){
        dispatch({
          type: UPDATE_VEHICLE,
          payload: {
            res : res,
            veh : itemToSend,
          },
        })
        dispatch(loadingSuccess())
        callbackFunction()
        //fReloadContent(false)
      }else{
        dispatch(loadingSuccess())
        errCallBackFunction()
      }
    })
    .catch(err => {
      dispatch(loadingSuccess())
      errCallBackFunction()
    })
  }
}

export function deleteVehicle(veh, callbackFunction, errCallBackFunction){
  return dispatch => {
    dispatch(loadingStart())
    return axios.patch(`vehicle/DeleteVehicle`,{}, {
      headers : {
        Plate : veh.Plate,
      }
    })
    .then(res => {
      if(res.status === 202){
        dispatch({
          type : DELETE_VEHICLE,
          payload : {
            res : res,
            veh : veh,
          },
        })
        dispatch(loadingSuccess())
        callbackFunction();
      } else {
        dispatch(loadingSuccess())
        errCallBackFunction()
      }
    })
    .catch(err => {

      const statusCode = err && err.response ? err.response.status : -1
      errCallBackFunction(statusCode)
      //console.log(err)
      dispatch(loadingSuccess())
      //errCallBackFunction()
    })
  }
}
