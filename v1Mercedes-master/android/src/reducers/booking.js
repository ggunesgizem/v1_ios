import { INIT_BOOKING } from '../actions/initialAction'
import { SELECT_DATE, SELECT_VEHICLE, SELECT_SERVICES, UPDATE_STAGE, UPDATE_CURRENT_STAGE } from '../actions/bookingAction'

const INITIAL_STATE = {
  all: [],
  dates: null,
  vehicle: null,
  services: {},
  serviceStatus: null,
  latestStage: 0,
  currentStageInBooking : 0,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case SELECT_DATE: {
      return {
        ...state,
        dates: action.payload
      }
    }
    case SELECT_VEHICLE: {
      return { ...state, vehicle: action.payload }
    }
    case SELECT_SERVICES: {
      return { ...state, services: action.payload }
    }
    case UPDATE_STAGE: {
      return {
        ...state,
        latestStage: action.payload
      }
    }
    case UPDATE_CURRENT_STAGE: {
      return {
        ...state,
        currentStageInBooking: action.payload
      }
    }
    default:
      return {
        ...state
      }
  }
}
