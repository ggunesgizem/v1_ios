import axios from 'axios'
import { loadingStart, loadingSuccess, loadingFail } from './loadingActions'
import { updateJWT, initialLoad, fReloadContent } from './initialAction'
import { showWebview } from './webDisplayAction'
import moment from 'moment'
export const USER_PROFILE_CREATE = 'USER_PROFILE_CREATE'
export const USER_PROFILE_DELETE = 'USER_PROFILE_DELETE'
export const USER_PROFILE_UPDATE = 'USER_PROFILE_UPDATE'
export const USER_PROFILE_GET = "USER_PROFILE_GET"
export const USER_AUTH_CODE = "USER_AUTH_CODE"
export const USER_CIAM_ID = "USER_CIAM_ID"
export const SHOW_REGISTRATION_PAGE = "SHOW_REGISTRATION_PAGE"
export const HIDE_REGISTRATION_PAGE = "HIDE_REGISTRATION_PAGE"

export function registerUser(props) {
  console.log("registerUser",props)
  return dispatch => {
    dispatch(loadingStart())
    return axios.post('customer/postcustomerregistration',{...props})
      .then(res => {
        console.log(res.data)
        dispatch(loadingSuccess())
        // dispatch({
        //   type: USER_PROFILE_UPDATE,
        //   payload: props,
        // })
      })
      .catch(err =>
        dispatch(loadingFail(err))
      )
  }
}

export function updateUserProfile(props) {
  console.log("updateUserProfile",props)
  return dispatch => {
    dispatch(loadingStart())
    return axios.patch('customer/updatecustomer',{...props})
      .then(res => {
        console.log(res.data)
        if(res.data === "Update Accepted"){
          dispatch(loadingSuccess())
          dispatch(hideRegistrationPage())
          dispatch({
            type: USER_PROFILE_UPDATE,
            payload: props,
          })
        }
      })
      .catch(err =>
        dispatch(loadingFail(err))
      )
  }
}

export function showRegistrationPage() {
  return ({
    type: SHOW_REGISTRATION_PAGE,
    payload: null,
  })
}

export function hideRegistrationPage() {
  return ({
    type: HIDE_REGISTRATION_PAGE,
    payload: null,
  })
}


export function validateUser(code, platform, uuid, isInvis) {

  

  console.log("validateUser")
  console.log(code);
  return dispatch => {
    //dispatch(loadingStart())
    dispatch({
      type: USER_AUTH_CODE,
      payload: code,
    })
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
    axios.defaults.headers.common['Authorization'] = 'Bearer'
    return axios.post('ciamlogin',{AuthCode: code, DeviceType:platform, DeviceId:uuid}, {timeout: 6000000})
      .then(res => {
        dispatch(loadingSuccess())
        let result = JSON.parse(res.data.Content)
        console.log("validateUser", result)
        let token = result.AccessToken
        let ciamID = result.CiamId
       setTimeout(() => {
          
         if(window.ADB ){
            window.ADB.setUserIdentifier(ciamID)
             window.ADB.trackAction('login', {'logintime':moment().format("HH")})
           }




         }, 0)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        dispatch(updateJWT(token))
        dispatch({
          type: USER_CIAM_ID,
          payload: ciamID,
        })
        if(res.data.Code === 'Accepted' || res.data.Code === 'OK'){
          if(isInvis){
            dispatch(fReloadContent(false,()=>{}))
          }else{
            dispatch(initialLoad())
          }
        }
      })
      .catch(err => {
          dispatch(showWebview('logout'))
        }
      )

  }
}
