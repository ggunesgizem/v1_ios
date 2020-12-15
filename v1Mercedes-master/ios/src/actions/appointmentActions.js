import axios from 'axios'

export function getAppointment(appId, callback) {
  axios.post(`appointment/getappointment`, {AppointmentId : appId})
    .then(res => {
      callback(res)
    })
    .catch(err => {
    })
}
