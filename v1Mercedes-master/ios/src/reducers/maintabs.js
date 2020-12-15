import { UPDATE_TAB } from '../actions/mainTabsActions'

const INITIAL_STATE = {
  mainTabState : 3,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case UPDATE_TAB: {
      return {
        mainTabState: action.payload,
      }
    }
    default:
      return state
  }
}
