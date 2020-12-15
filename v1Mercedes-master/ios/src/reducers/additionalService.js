import { FETCH_SERVICES } from '../actions/additionalServiceActions'

const INITIAL_STATE = {
  all: [],
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_SERVICES: {
      return {
        ...state,
        all: action.payload,
      }
    }
    default:
      return state
  }
}
