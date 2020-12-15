import { LEGAL_SHOW, LEGAL_HIDE,TOGGLE_FIRSTTIME } from '../actions/legalAction'

const INITIAL_STATE = {
  toc_Show : false,
  isFirstTimeOnApp : true,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_FIRSTTIME : {
      return {
        ...state,
        isFirstTimeOnApp : false,
      }
    }
    case LEGAL_SHOW: {
      return {
        ...state,
        toc_Show: true,
        isFirstTimeOnApp : false,
      }
    }
    case LEGAL_HIDE: {
      return {
        ...state,
        toc_Show: false,
        isFirstTimeOnApp : false,
      }
    }
    case 'USER_LOGOUT' :{
      console.log("logout in legal");
      return {
        ...state,
        isFirstTimeOnApp : false,
      }
    }
    default:
      return state
  }
}
