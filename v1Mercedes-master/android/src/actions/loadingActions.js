import _ from 'lodash'
import T from 'i18n-react'
import { logout } from './initialAction'
export const LOADING_START = "LOADING_START"
export const LOADING_SUCCESS = "LOADING_SUCCESS"
export const LOADING_FAIL = "LOADING_FAIL"
export const LOADING_END = "LOADING_END"

export function loadingEnd() {
  return {
    type: LOADING_END
  }
}

export function loadingFail(error) {
  console.log("came in here", error);
  let notupdated = error && error.pullFail
  let statusCode =  -1
  let errorMessage = ``
  if (error.response) {
    statusCode = error.response.status
    if(statusCode === 401) {
      errorMessage = T.translate("system.session expired")
    }else if(statusCode === 400) {
      errorMessage = `400`
    }
  } else if (error.request) {
    errorMessage = T.translate("system.network error")
  } else {
    errorMessage = T.translate("system.network error")
  }
  if(notupdated){
    errorMessage = T.translate("system.network error 2")
  }
  return dispatch => {
    dispatch({ type: LOADING_FAIL, payload: errorMessage })
    setTimeout( _ => {
      if(statusCode === 401) {
        dispatch(logout())
      }
      dispatch(loadingEnd())
    }, 3000)

  }
}

export function loadingSuccess() {
  let message = `Success`
  return dispatch => {
    dispatch({type: LOADING_SUCCESS, payload: message })
    console.log("loadingSuccess, dispatch loadingEnd")
    return dispatch(loadingEnd())
  }
}

var loaderTimer = null

export function loadingStart() {
  return dispatch => {
    console.log("dispatch loadingStart")
    dispatch({type: LOADING_START})

    if(loaderTimer !== null){
      clearTimeout(loaderTimer);
      loaderTimer = null
    }

    loaderTimer = setTimeout( _ => {
      console.log("loadingStart timeout, dispatch loadingEnd")
      dispatch(loadingEnd())
    }, 30000)

  }
}
