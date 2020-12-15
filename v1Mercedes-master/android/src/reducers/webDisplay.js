const INITIAL_STATE = {
  status: 'dismiss',
  type: '',
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case "SHOW_WEBVIEW":
      if(state.status === "show"){
        return state
      }
      return {
        ...state,
        status: 'show',
        type: action.payload.type,
      }
    case "DISMISS_WEBVIEW":
      return {
        ...state,
        status: 'dismiss',
        type: "",
      }
    default:
      return {
        ...state,
      }
  }
}
