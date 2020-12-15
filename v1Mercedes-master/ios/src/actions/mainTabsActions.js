export const UPDATE_TAB = "UPDATE_MAIN_TAB"

export function updateMainTab(value) {
  return dispatch => {
    dispatch({
      type: UPDATE_TAB,
      payload: value,
    })
  }
}
