export const LEGAL_SHOW = "SHOW_LEGAL"
export const LEGAL_HIDE = "HIDE_LEGAL"
export const TOGGLE_FIRSTTIME = "TOGGLE_FIRSTTIME"
export function showLegal() {
  return dispatch => {
    dispatch({
      type: LEGAL_SHOW
    })
  }
}

export function hideLegal() {
  return dispatch => {
    dispatch({
      type: LEGAL_HIDE
    })
  }
}

export function toggleFirsttime(){
  return dispatch =>{
    dispatch({
      type: TOGGLE_FIRSTTIME
    })
  }
}
