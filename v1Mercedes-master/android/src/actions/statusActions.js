import axios from 'axios'
export const CHANGE_VEHICLE = "CHANGE_VEHICLE"
export const EXPAND_VEHICLE_STATUS = "EXPAND_VEHICLE_STATUS"
export const GET_IN_SERVICE_VEHICLES = "GET_IN_SERVICE_VEHICLES"

export function changeVehicle(index) {
  return {
    type: CHANGE_VEHICLE,
    payload: index,
  }
}

export function expandVechicleStatus(index) {
  return {
    type: EXPAND_VEHICLE_STATUS,
    payload: {
      index
    }
  }
}

export function reloadCustomer() {
  console.log("reloadCustomer");
  const url = `customer/getcustomerbyciamid`
  return dispatch => {
    return axios.get(url)
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
    }
}
