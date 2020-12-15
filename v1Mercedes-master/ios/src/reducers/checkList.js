import { INIT_STATUS } from '../actions/initialAction'
import { DELETE_VEHICLE } from '../actions/vehicleAction'
import { DELETE_BOOKING } from '../actions/bookingAction'
import T from 'i18n-react'

const INITIAL_STATE = {
  cList : [
    [
      "Has Otomotiv",
      "Fatih Sultan Mehmet Mahallesi, No:, Aos 54. Sk. No:1, 34360 Sarıyer/İstanbul",
      "+90 212 346 34 10",
    ],
    [
      "Change the engine oil",
      "Replace the oil filter",
      "Replace the air filter",
      "Replace fuel filter",
      "Replace the cabin filter",
      "Replace spark plugs",
      "Tune the engine",
    ],
    [
      "Final check under progress to ensure that all processes and your additional requests have been accomplished.",
    ],
    [
      "Windscreen & windows",
      "Body",
      "Headlamps",
      "Tires",
      "Wheels",
    ],
    [
      "Your car is ready to pick up, Please call your dealer",
      "Has Otomotiv",
      "Fatih Sultan Mehmet Mahallesi, No:, Aos 54. Sk. No:1, 34360 Sarıyer/İstanbul",
      "+90 212 346 34 10",
    ]
  ]
}

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case DELETE_VEHICLE : {
      if(action.payload.res.status === 202){
        var  newCList = state.cList.filter((item,index) => {
          if(item.vehId !==  action.payload.veh.VehicleId){
            return item
          }
        })
        return {...state, cList : newCList }
      }
      return { ...state }
    }
    case INIT_STATUS:

      var vehList = action.payload.Vehicles.filter(item => {
        if(!item.VehicleIsDeleted){
          return item
        }
      })

      const checkList = vehList.map((vehicle,index) => {
        const newSubCheckList = []
        if (vehicle.Appointments.length > 0) {
          if(!vehicle.Appointments[vehicle.Appointments.length - 1].AppointmentIsCancelled){
            const tempList = []
            tempList.push(vehicle.Appointments[vehicle.Appointments.length - 1].Workshop.Name)
            tempList.push(vehicle.Appointments[vehicle.Appointments.length - 1].Workshop.Address)
            newSubCheckList.push({checkList : tempList, agentContact : vehicle.Appointments[vehicle.Appointments.length - 1].Workshop.Telephone})

          }
        }
        newSubCheckList.push({
          checkList :
            [
              T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.Change the engine oil"),
              T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.Replace the oil filter"),
              T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.Replace the air filter"),
              T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.Replace the dust filter"),
              T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.Check engine"),
              T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.Check brake & tires"),
              T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.Check exterior & interior"),
            ]
        })
        newSubCheckList.push({
          checkList :
            [
              T.translate("my vehicle.status tracker.final check.final check detail"),
            ]
        })
        newSubCheckList.push({
          checkList :
            [
            T.translate("my vehicle.status tracker.cleaning.overview.exterior.windscreen"),
            T.translate("my vehicle.status tracker.cleaning.overview.exterior.body"),
            T.translate("my vehicle.status tracker.cleaning.overview.exterior.headlamp"),
            T.translate("my vehicle.status tracker.cleaning.overview.exterior.wheels"),
            T.translate("my vehicle.status tracker.cleaning.overview.exterior.tires"),
            ]
        })
        if (vehicle.Appointments.length > 0) {
          if(!vehicle.Appointments[vehicle.Appointments.length - 1].AppointmentIsCancelled){
            const tempList = []
            tempList.push(T.translate("my vehicle.status tracker.handover.ready for pickup") + ". " + T.translate("my vehicle.status tracker.handover.call your dealer")),
            tempList.push(vehicle.Appointments[vehicle.Appointments.length - 1].Workshop.Name)
            tempList.push(vehicle.Appointments[vehicle.Appointments.length - 1].Workshop.Address)
            newSubCheckList.push({checkList:tempList, agentContact:vehicle.Appointments[vehicle.Appointments.length - 1].Workshop.Telephone})
          }
        }
        return { vehId : vehicle.VehicleId, data : newSubCheckList }
      })
      return {
        ...state,
        cList : checkList
      }
    case DELETE_BOOKING : {
      var list = [...state.cList]
      var newCList = state.cList.map(item => {
        if(item.vehId == action.payload.VehId){
          var newSubCheckList = []
          newSubCheckList.push({
            checkList :
              [
                T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.change the engine oil"),
                T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.replace the oil filter"),
                T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.replace the air filter"),
                T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.replace the dust filter"),
                T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.check engine"),
                T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.check brake & tires"),
                T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.check exterior & interior"),
              ]
          })
          newSubCheckList.push({
            checkList :
              [
                T.translate("my vehicle.status tracker.final check.final check detail"),
              ]
          })
          newSubCheckList.push({
            checkList :
              [
              T.translate("my vehicle.status tracker.cleaning.overview.exterior.windscreen"),
              T.translate("my vehicle.status tracker.cleaning.overview.exterior.body"),
              T.translate("my vehicle.status tracker.cleaning.overview.exterior.headlamp"),
              T.translate("my vehicle.status tracker.cleaning.overview.exterior.wheels"),
              T.translate("my vehicle.status tracker.cleaning.overview.exterior.tires"),
              ]
          })
          item.data = newSubCheckList
        }
        return item
      })

      return {
        ...state,
        cList : newCList
      }
    }
    default:
      return {
        ...state
      }
  }
}
