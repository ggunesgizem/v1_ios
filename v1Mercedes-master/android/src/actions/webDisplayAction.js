export function showWebview(type){
  return {
    type: "SHOW_WEBVIEW",
    payload: {
      status: "show",
      type: type,
    }
  }
}

export function dismissWebview(type){
  return {
    type: "DISMISS_WEBVIEW",
    payload: {
      status: "dismiss",
      type: type,
    }
  }
}
