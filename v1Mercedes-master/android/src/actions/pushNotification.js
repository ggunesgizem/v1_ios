import axios from 'axios'

export function enablePushNotification(){
  return dispatch =>  {
    dispatch({
      type : "ENABLE_PUSH_NOTIFICATION",
    })
  }
}

export function updatePushToken(payload){
  if(payload.isLogin){
    return dispatch =>{
      axios.patch('/deviceid/updatedeviceid',{ DeviceID : payload.token })
        .then(res => {
          dispatch({
            type : "CHANGE_PUSH_NOTIFICAITON",
            payload : payload.token
          })
        })
        .catch(err => {
        })
    }
  }else{
    return {
      type : "CHANGE_PUSH_NOTIFICAITON",
      payload : payload.token
    }
  }
}
