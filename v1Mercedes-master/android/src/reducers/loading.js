import { LOADING_START, LOADING_SUCCESS, LOADING_FAIL, LOADING_END } from '../actions/loadingActions.js'

export default function(state={status: 3}, action) {
  switch (action.type) {
    case LOADING_START:
      return {
        ...state,
        status: 0,
      }
    case LOADING_SUCCESS:
      return {
        ...state,
        status: 1,
        message: action.payload
      }
    case LOADING_FAIL:
      return {
        ...state,
        status: 2,
        message: action.payload
      }
    case LOADING_END:
      return {
        ...state,
        status: 3,
      }
    default:
      return {
        ...state,
      }
  }
}
