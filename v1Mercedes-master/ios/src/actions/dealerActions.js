import axios from 'axios'
import { loadingStart, loadingFail, loadingSuccess } from './loadingActions'

export const CLEAR_DEALERS = "CLEAR_DEALERS"
export const ALL_DEALERS = "GET_ALL_DEALERS"
export const DEALER_GET = "DEALERS_GET"
export const DEALER_SELECT = "DEALER_SELECT"
export const PREFERED_SELECT = "PREFERED_SELECT"
export const AGENT_SELECT = "AGENT_SELECT"
export const GET_CITY = "GET_CITY"
export const SEARCH_DEALER = "SEARCH_DEALER"
export const SELECT_PREFERRED_AGENT = "SELECT_PREFERRED_AGENT"
export const GET_NEARBY_DEALERS = "GET_NEARBY_DEALERS"
export const START_GET_NEARBY_DEALERS = "START_GET_NEARBY_DEALERS"
export const END_GET_NEARBY_DEALERS = "END_GET_NEARBY_DEALERS"



export function clearDealers() {
    return dispatch => {
      dispatch({
        type : CLEAR_DEALERS,
      })
    }
}

export function getAllDealers() {
  return dispatch => {
    axios.get(`workshop`)
      .then(res => {
        console.log("loaded all dealer", res.data);
          dispatch({ type: ALL_DEALERS, payload: res.data })
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export function getDealerList(parseDealerList) {
  console.log("action: all dealers")
  return dispatch => {
    // dispatch(loadingStart())
    axios.get(`workshop`)
      .then(res => {
        if(parseDealerList) {
        
          dispatch({ type: ALL_DEALERS, payload: res.data })
          parseDealerList()
          //dispatch(loadingSuccess())
        }
      })
      .catch(err => {
       
        //dispatch(loadingFail(err))
      })
  }
}

export const startLoadingNearByDealer = () => {
  return {
    type : START_GET_NEARBY_DEALERS
  }
}

export const endLoadingNearByDealer = () => {
  return {
    type : END_GET_NEARBY_DEALERS
  }
}
export function getNearbyDealers(parseDealerList,location) {
  if(parseDealerList && location){
    return dispatch => {
      dispatch(startLoadingNearByDealer())
      axios.get(`workshop/getnearbyworkshops`,{ headers:{Longitude: location.lng, Latitude: location.lat} })
        .then(res => {
          console.log(res.data)

            dispatch({
              type: GET_NEARBY_DEALERS,
              payload: {
                data : res.data,
                location : location,
              },
            })
            dispatch(endLoadingNearByDealer())
        })
        .catch(err => {
          dispatch(endLoadingNearByDealer())
          dispatch(loadingFail(err))
        })
    }
  } else {

    return disptach => {
      dispatch(endLoadingNearByDealer())
      disptach({
            type: GET_NEARBY_DEALERS,
            payload: {
              data : [],
              location : location,
            },
          })
    }

  }

}

export function searchDealer(parseDealerList, city) {
  var temp = {
    City : city
  }
  return dispatch => {
    // dispatch(loadingStart())
    axios.post(`workshop/getworkshopsbycityname`,{...temp})
      .then(res => {
        // let results = []
        // res.data.forEach((dealer) => {
        //   if(dealer.City === city){
        //     results.push(dealer)
        //   }
        // })
        // console.log(results)
        if(parseDealerList) {
          dispatch({ type: SEARCH_DEALER, payload: res.data })
          parseDealerList()
          //dispatch(loadingSuccess())
        }
      })
      .catch(err => {
        dispatch(loadingFail(err))
      })
  }
}

export function getCitylist(ctime){
  return dispatch => {
    axios.get(`workshop/getcitylist`)
      .then(res => {
        dispatch({
          type: GET_CITY,
          payload: {
            timeRequest : ctime,
            data : res.data
          }
        })
      })
      .catch(err => {
      })
  }
}

export function selectAgent(agent) {
  return {
    type: AGENT_SELECT,
    payload: agent,
  }
}

export function selectPreferredAgent(agent) {
  return {
    type: SELECT_PREFERRED_AGENT,
    payload: agent,
  }
}

export function selectDealer(item) {
  return {
    type: DEALER_SELECT,
    payload: item
  }
}

export function selectPrefered(dealer) {
  return dispatch => {
    dispatch({
      type: PREFERED_SELECT,
      payload: dealer
    })
    dispatch({
      type: SELECT_PREFERRED_AGENT,
      payload: null
    })
  }
}
