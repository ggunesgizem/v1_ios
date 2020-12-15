import axios from 'axios'
import moment from 'moment'
import { SubmissionError } from 'redux-form'
import { loadingSuccess, loadingFail, loadingStart } from './loadingActions'
import { fetchAccessories } from '../actions/productsActions'
import { fetchCollections } from '../actions/productsActions'
import { fetchCampaigns, fetchOthers } from '../actions/campaignActions'
import { fetchModels } from '../actions/vehicleAction'
import { showRegistrationPage } from '../actions/userActions'
import { getAllDealers } from '../actions/dealerActions'

export const LOG_OUT = "LOG_OUT"
export const INIT_USER = "INIT_USER"
export const INIT_USER_FAIL = "INIT_USER_FAIL"
export const INIT_VEHICLE = "INIT_VEHICLE"
export const INIT_STATUS = "INIT_STATUS"
export const INIT_JWT = "INIT_JWT"
export const INIT_PREFIX = "INIT_PREFIX"

export function initPrefix() {
  return {
    type: INIT_PREFIX,
  }
}


export function afterfeedback(){
  return dispatch => { 

    dispatch(loadingSuccess())
  }


}
export function initialLoad() {
  console.log("init load exex");
  const url = `customer/getcustomerbyciamid`
  return dispatch => {
    dispatch(loadingStart())
    return axios.get(url)
      .then((response) => {
        console.log(response.data)
      
        dispatch(loadingSuccess())
        dispatch({ type: INIT_VEHICLE, payload: response.data })
        dispatch({ type: INIT_STATUS, payload: response.data })
        dispatch({ type: INIT_USER, payload: response.data })

        dispatch(fetchModels(moment().toDate().getTime()))
        dispatch(fetchCampaigns(moment().toDate().getTime()))
        dispatch(fetchOthers(moment().toDate().getTime()))
        dispatch(fetchAccessories(moment().toDate().getTime()))
        dispatch(fetchCollections(moment().toDate().getTime()))
        dispatch(getAllDealers())

      })
      .catch((error) => {
        dispatch(loadingFail(error))
      })
    }
}

export function patchDeviceID() {
  axios.patch('/deviceid/updatedeviceid',{ DeviceID: window.registerID ? window.registerID : '' })
      //  .then(res => console.log(res))
      //  .catch(err => console.error(err))
}

export function logout() {
  console.log("initialAction: logout()")
  return dispatch => {
    dispatch(loadingStart())
    return axios.post('/logout/logoutupdatedeviceid')
      .then( res => {
        axios.defaults.headers.common['Authorization'] = `Bearer`
       
        dispatch({ type: LOG_OUT })
        dispatch({ type: "USER_LOGOUT" })
        // dispatch(replace('/'))
        return res;
      })
      .catch( err =>  {
        console.error(err)
        axios.defaults.headers.common['Authorization'] = `Bearer`
        dispatch({ type: LOG_OUT })
        dispatch({ type: "USER_LOGOUT" })
        // dispatch(replace('/'))
      })
  }
}

//deprecated
export function login(email, password, context, location) {
  console.log("login action called?");
  return dispatch => {
    dispatch(loadingStart())
    axios.post('/login',{ Email: email, Password: password })
      .then(res => {
        dispatch(loadingSuccess())
        const token = res.data.Content
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        dispatch(updateJWT(token))
        dispatch(initialLoad())
      })
      .catch(err => dispatch(loadingFail(err)))
  }
}

export function updateJWT(token) {
  return {
    type: INIT_JWT,
    payload: {
      token: token,
    },
  }
}

export function fReloadContent(isShowLoader, callback, errcallback){
  console.log("frload");
  const url = `customer/getcustomerbyciamid`
  return dispatch => {
    if(isShowLoader){
      dispatch(loadingStart())
    }
    axios.get(url)
      .then((response) => {
        
        dispatch({ type: INIT_VEHICLE, payload: response.data })
        dispatch({ type: INIT_STATUS, payload: response.data })
        dispatch({ type: INIT_USER, payload: response.data })
        if(isShowLoader){
          dispatch(loadingSuccess())
        }
        if(callback){
          callback()
        }
      })
      .catch((error) => {
        if(isShowLoader){
          dispatch(loadingSuccess())
        }
        dispatch(loadingFail(error))
        if(errcallback){
          errcallback()
        }
      })
    }
}
