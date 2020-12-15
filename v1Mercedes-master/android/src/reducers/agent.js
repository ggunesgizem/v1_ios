import { AGENT_GET, AGENT_SELECT, SELECT_PREFERRED_AGENT } from '../actions/dealerActions'

const INITIAL_STATE = {
  all: [],
  selected: null,
  preferred: null,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AGENT_GET: {
      return {
        ...state,
        all: action.payload,
      }
    }
    case AGENT_SELECT: {
      return {
        ...state,
        selected: action.payload,
      }
    }
    case SELECT_PREFERRED_AGENT: {
      return {
        ...state,
        preferred: action.payload,
      }
    }
    default:
      return state
  }
}
