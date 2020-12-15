import axios from 'axios'
import { loadingStart, loadingSuccess, loadingFail, loadingEnd } from './loadingActions'
import { reloadCustomer } from './statusActions'
import { INIT_STATUS } from './initialAction'

export const SEND_BOOKING = 'SEND_BOOKING'
export const FETCH_BOOKINGS = 'FETCH_BOOKINGS'
export const SELECT_DATE = 'SELECT_DATE'
export const SELECT_VEHICLE = 'SELECT_VEHICLE'
export const SELECT_SERVICES = 'SELECT_SERVICES'
export const FETCH_STATUS = 'FETCH_STATUS'
export const UPDATE_STAGE = 'UPDATE_STAGE'
export const UPDATE_CURRENT_STAGE = 'UPDATE_CURRENT_STAGE'
export const DELETE_BOOKING = 'DELETE_BOOKING'

export function selectDate(dates) {
  return {
    type: SELECT_DATE,
    payload: dates,
  }
}

export function selectVehicle(vehicle) {
  return {
    type: SELECT_VEHICLE,
    payload: vehicle,
  }
}

export function selectService(services) {
  return {
    type: SELECT_SERVICES,
    payload: services,
  }
}

export function updateStage(index) {
  return {
    type: UPDATE_STAGE,
    payload: index,
  }
}

export function setCurrentStage(index) {
  return {
    type: UPDATE_CURRENT_STAGE,
    payload: index,
  }
}

export function sendBooking(props, callbackfunction, callbackerrfunction) {
  return dispatch => {
    dispatch(loadingStart())
    axios.post(`appointment`, props)
      .then(res => {
        console.log("added appointment",res);
        if(res.status === 201){
          const url = `customer/getcustomerbyciamid`
          axios.get(url)
            .then((response) => {
              dispatch({
                type: INIT_STATUS,
                payload : {
                  Vehicles : response.data.Vehicles
                }
              })
              dispatch(loadingSuccess())
              callbackfunction()
            })
            .catch((error) => {
              callbackfunction()
              //callbackerrfunction()
              console.error(error)
              dispatch(loadingFail({...error, pullFail : 1 }))
            })
        }else{
          errorCallBack()
        }

      })
      .catch(err => {
        console.log(err)
        callbackerrfunction()
        dispatch(loadingFail(err))
      })
    }
}

export function deleteBooking(props, callback, errorCallBack) {
  return dispatch => {
    dispatch(loadingStart())
    console.log("delete appointment", props);
    axios.patch(`appointment/CancelBooking`, {AppointmentId : props.AppointmentId})
      .then(res => {
        if(res.status == 202){
          dispatch({
            type: DELETE_BOOKING,
            payload : {
              ...props
            }
          })
          dispatch(loadingSuccess())
          callback()
          // const url = `customer/getcustomerbyciamid`
          // axios.get(url)
          //   .then((response) => {
          //     dispatch({
          //       type: INIT_STATUS,
          //       payload : {
          //         Vehicles : response.data.Vehicles
          //       }
          //     })
          //     dispatch(loadingSuccess())
          //     callback()
          //   })
          //   .catch((error) => {
          //     errorCallBack()
          //     dispatch(loadingFail(error))
          //   })
        }else{
          errorCallBack()
          dispatch(loadingSuccess())
        }
      })
      .catch(err => {
        dispatch(loadingFail(err))
        errorCallBack()
      })
    }
}
