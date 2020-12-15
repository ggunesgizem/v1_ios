const INITIAL_STATE = {
  enabled : false,
  pushToken : "",
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ENABLE_PUSH_NOTIFICATION" : {
      console.log("push notification setting to enabled here");
      return {
        ...state,
        enabled : true,
      }
    }
    case "CHANGE_PUSH_NOTIFICAITON" : {
      return {
        ...state,
        pushToken : action.payload
      }
    }
    case 'USER_LOGOUT' : {
      console.log("setting user payload to ");
      console.log(action.payload);
      return {
        ...state,
        enabled : action.payload.enabled,
        pushToken : action.payload.pushToken,
      }
    }
    default :{
      return {
        ...state
      }
    }
  }
}
