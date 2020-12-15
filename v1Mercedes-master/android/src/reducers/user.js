import { INIT_USER, INIT_USER_FAIL, INIT_JWT } from '../actions/initialAction'
import { USER_PROFILE_CREATE, USER_PROFILE_DELETE, USER_PROFILE_UPDATE, USER_PROFILE_GET, USER_AUTH_CODE, SHOW_REGISTRATION_PAGE, HIDE_REGISTRATION_PAGE, USER_CIAM_ID } from '../actions/userActions'
import moment from 'moment'

const INITIAL_STATE = {
  // id: -1,
  email: "",
  firstName: "",
  lastName: "",
  mobileNumber: '',
  city: '',
  country: '',
  address: '',
  occupation: '',
  token: '',
  isLogin: false,
  ciamID: '',
  authCode: '',
  registrationRequired: false,
  lastLoginTime : null,
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case INIT_USER:
      return {
        ...state,
        id: action.payload.Id,
        email: action.payload.Email,
        firstName: action.payload.FirstName,
        lastName: action.payload.LastName,
        mobilePhone: action.payload.MobilePhone,
        country: action.payload.Country,
        city: action.payload.City,
        occupation: action.payload.Occupation,
        address: action.payload.Address,
        isLogin: true,
        lastLoginTime: moment().toDate().getTime(),
      }
    case INIT_USER_FAIL:
      return {
        isLogin: false,
      }
    case INIT_JWT:
      return {
        ...state,
        token: action.payload.token,
      }
    case USER_CIAM_ID:
      return {
        ...state,
        ciamID: action.payload,
      }
    case USER_AUTH_CODE:
      return {
        ...state,
        authCode: action.payload,
      }
    case SHOW_REGISTRATION_PAGE:
      return {
        ...state,
        registrationRequired: true,
      }
    case HIDE_REGISTRATION_PAGE:
      console.log("HIDE_REGISTRATION_PAGE")
      return {
        ...state,
        registrationRequired: false,
      }
    case USER_PROFILE_UPDATE: {
      return {
        ...state,
        ...action.payload,
      }
    }
    default:
      return {
        ...state,
      }
  }
}
