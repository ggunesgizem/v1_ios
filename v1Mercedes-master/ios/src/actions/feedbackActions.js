import axios from 'axios'
import { loadingSuccess, loadingFail } from './loadingActions'
import {afterfeedback} from './initialAction'


export const MARK_FEEDBACK_SENT = "MARK_FEEDBACK_SENT"

export function postFeedback(feedback,callbackurl, callbackerrurl) {

 
  
  return dispatch => axios.post('/email/postemail',feedback)
    .then(res => {
    dispatch(loadingSuccess())
      dispatch({
        type: MARK_FEEDBACK_SENT,
        payload : feedback.appId
      })
      callbackurl()
    })
    .catch(err => {
        dispatch(loadingFail(err))
        callbackerrurl()
      }
    )
}
