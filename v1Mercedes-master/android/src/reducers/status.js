import _ from "lodash";

import { INIT_STATUS } from "../actions/initialAction";

import {
  GET_VEHICLE_STATUS,
  CHANGE_VEHICLE,
  EXPAND_VEHICLE_STATUS
} from "../actions/statusActions";

import { MARK_FEEDBACK_SENT } from "../actions/feedbackActions";

import { DELETE_VEHICLE } from "../actions/vehicleAction";

import { DELETE_BOOKING } from "../actions/bookingAction";

const INITIAL_STATE = {
  statusList: [],

  currentIndex: 0
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DELETE_VEHICLE: {
      if (action.payload.res.status === 202) {
        var newStatusList = state.statusList.filter((item, index) => {
          if (item.vehId !== action.payload.veh.VehicleId) {
            return item;
          }
        });

        return { ...state, statusList: newStatusList };
      }

      return { ...state };
    }

    case INIT_STATUS:
      var vehList = action.payload.Vehicles.filter(item => {
        if (!item.VehicleIsDeleted) {
          return item;
        }
      });

      const statusList = vehList.map((vehicle, index) => {
        // default for this vehicle

        let vehId = vehicle.VehicleId;

        let plateNumber = vehicle.Plate;

        let model = vehicle.Model;

        let currentStage = 0;

        let wipNumber = "";

        let appointment = {
          date: "",

          altDate: ""
        };

        // status template

        let status = [
          { name: "Booking", statusIndex: 0, isExpanded: false },

          { name: "Maintenance", statusIndex: 0, isExpanded: false },

          { name: "Final Check", statusIndex: 0, isExpanded: false },

          { name: "Cleaning", statusIndex: 0, isExpanded: false },

          { name: "Handover", statusIndex: 0, isExpanded: false }
        ];

        // check if there is active appointment for this vehicle

        if (vehicle.Appointments.length > 0) {
          var targetedAppointment =
            vehicle.Appointments[vehicle.Appointments.length - 1];

          if (targetedAppointment.AppointmentIsCancelled) {
            return {
              plateNumber,

              model,

              currentStage,

              appointment,

              status,

              wipNumber
            };
          }

          appointment.FeedbackProvided = targetedAppointment.FeedbackProvided;

          appointment.id = targetedAppointment.AppointmentId;

          appointment.date = targetedAppointment.AppDate;

          appointment.time = targetedAppointment.AppTime;

          appointment.altDate = targetedAppointment.AlternativeAppDate;

          appointment.altTime = targetedAppointment.AlternativeAppTime;

          appointment.serviceAgent = targetedAppointment.ServiceAgent;

          appointment.workshop = targetedAppointment.Workshop;

          targetedAppointment.AppointmentStatuses.forEach(bookingStatus => {
            // set appointment submit time stamp

            if (bookingStatus.Status === 0) {
              status[0] = {
                ...status[0],

                startTime: bookingStatus.TimeStamp
              };

              status[0].statusIndex = 1;
            }

            // set appintment confirm time stamp if it is confirmed

            if (bookingStatus.Status === 1) {
              status[0] = {
                ...status[0],

                endTime: bookingStatus.TimeStamp,

                checkList: ["Booking Received", "Booking Confirmed"],

                selectedDate: bookingStatus.AppDate,

                selectedTime: bookingStatus.AppTime
              };

              status[0].statusIndex = 2;

              targetedAppointment.selectedDate = bookingStatus.AppDate;

              targetedAppointment.selectedTime = bookingStatus.AppTime;
            }
          });

          if (targetedAppointment.Service) {
            // has service record, service has already started

            const serviceRecords = targetedAppointment.Service.ServiceStatuses;

            const statusCount = serviceRecords.length;

            // console.log(statusCount)

            if (statusCount > 0) {
              wipNumber = targetedAppointment.WIP;
            }

            switch (statusCount) {
              case 1:
                // B M F C H

                // 2 1 0 0 0

                currentStage = 1;

                status[currentStage].statusIndex = 1;

                status[currentStage].isExpanded = true;

                status[currentStage] = {
                  ...status[currentStage],

                  startTime: serviceRecords[statusCount - 1].TimeStamp,

                  estimatedTime: "150"
                };

                break;

              case 2:
                // 2 2 0 0 0

                currentStage = 1;

                status[currentStage].statusIndex = 2;

                status[currentStage].isExpanded = true;

                status[currentStage] = {
                  ...status[currentStage],

                  startTime: serviceRecords[statusCount - 2].TimeStamp,

                  endTime: serviceRecords[statusCount - 1].TimeStamp
                };

                break;

              case 3:
                // 2 2 1 0 0

                currentStage = 2;

                status[currentStage].statusIndex = 1;

                status[currentStage].isExpanded = true;

                status[currentStage] = {
                  ...status[currentStage],

                  startTime: serviceRecords[statusCount - 1].TimeStamp,

                  estimatedTime: "15"
                };

                break;

              case 4:
                // 2 2 2 0 0

                currentStage = 2;

                status[currentStage].statusIndex = 2;

                status[currentStage].isExpanded = true;

                status[currentStage] = {
                  ...status[currentStage],

                  startTime: serviceRecords[statusCount - 2].TimeStamp,

                  endTime: serviceRecords[statusCount - 1].TimeStamp
                };

                break;

              case 5:
                // 2 2 2 1 0

                currentStage = 3;

                status[currentStage].statusIndex = 1;

                status[currentStage].isExpanded = true;

                status[currentStage] = {
                  ...status[currentStage],

                  startTime: serviceRecords[statusCount - 1].TimeStamp,

                  estimatedTime: "30"
                };

                break;

              case 6:
                // 2 2 2 2 0

                currentStage = 3;

                status[currentStage].statusIndex = 2;

                status[currentStage].isExpanded = true;

                status[currentStage] = {
                  ...status[currentStage],

                  startTime: serviceRecords[statusCount - 2].TimeStamp,

                  endTime: serviceRecords[statusCount - 1].TimeStamp
                };

                break;

              case 7:
                // B M F C H

                // 2 2 2 2 1

                currentStage = 4;

                status[currentStage].statusIndex = 1;

                status[currentStage].isExpanded = true;

                status[currentStage] = {
                  ...status[currentStage],

                  startTime: serviceRecords[statusCount - 1].TimeStamp,

                  estimatedTime: "40"
                };

                break;

              case 8:
                // B M F C H

                // 2 2 2 2 2

                currentStage = 4;

                status[currentStage].statusIndex = 2;

                status[currentStage].isExpanded = true;

                status[currentStage] = {
                  ...status[currentStage],

                  startTime: serviceRecords[statusCount - 2].TimeStamp,

                  endTime: serviceRecords[statusCount - 1].TimeStamp
                };

                break;

              default:
                // >8

                // B M F C H

                // 2 2 2 2 2

                currentStage = 4;

                status[currentStage].statusIndex = 2;

                status[currentStage].isExpanded = true;

                status[currentStage] = {
                  ...status[currentStage],

                  startTime: serviceRecords[statusCount - 2].TimeStamp,

                  endTime: serviceRecords[statusCount - 1].TimeStamp
                };

                break;
            }

            // change completed service status in status template

            status = status.map((item, index) => {
              if (index !== 0 && index < currentStage) {
                // index = 1, 2, 3

                // serviceRecords 1, 2, 3, 4, 5, 6

                (item.statusIndex = 2),
                  (item = {
                    ...item,

                    startTime: serviceRecords[index * 2 - 1].TimeStamp,

                    endTime: serviceRecords[index * 2].TimeStamp
                  });
              }

              return item;
            });
          } else {
            // no service record, still in booking stage

            currentStage = 0;

            status[0].isExpanded = true;
          }
        }

       

        if (
          vehicle.Appointments.length > 0 &&
          vehicle.Appointments[0].Service !== null &&
          vehicle.Appointments[0].Service.ServiceStatuses.length > 0
        ) {
          var ms = vehicle.Appointments[0].Service.ServiceStatuses.filter(
            val => {
              return val.Remark == "Maintenance Start";
            }
          );

          var me = vehicle.Appointments[0].Service.ServiceStatuses.filter(
            val => {
              return val.Remark == "Maintenance End";
            }
          );

          var fcs = vehicle.Appointments[0].Service.ServiceStatuses.filter(
            val => {
              return val.Remark == "Final Check Start";
            }
          );

          var fce = vehicle.Appointments[0].Service.ServiceStatuses.filter(
            val => {
              return val.Remark == "Final Check End";
            }
          );

          var cs = vehicle.Appointments[0].Service.ServiceStatuses.filter(
            val => {
              return val.Remark == "Cleaning Start";
            }
          );

          var ce = vehicle.Appointments[0].Service.ServiceStatuses.filter(
            val => {
              return val.Remark == "Cleaning End";
            }
          );

          var hs = vehicle.Appointments[0].Service.ServiceStatuses.filter(
            val => {
              return val.Remark == "Handover Start";
            }
          );

          var he = vehicle.Appointments[0].Service.ServiceStatuses.filter(
            val => {
              return val.Remark == "Handover End";
            }
          );

          status.map(val => {
            if (val.name == "Maintenance") {
              if (ms[0] != null) {
                val.startTime = ms[0].TimeStamp;
              }

              if (me[0] != null) {
                val.endTime = me[0].TimeStamp;
              }
            }
          });

          status.map(val => {
            if (val.name == "Final Check") {
              if (fcs[0] != null) {
                val.startTime = fcs[0].TimeStamp;
              }

              if (fce[0] != null) {
                val.endTime = fce[0].TimeStamp;
              }
            }
          });

          status.map(val => {
            if (val.name == "Cleaning") {
              if (cs[0] != null) {
                val.startTime = cs[0].TimeStamp;
              }

              if (ce[0] != null) {
                val.endTime = ce[0].TimeStamp;
              }
            }
          });

          status.map(val => {
            if (val.name == "Handover") {
              if (hs[0] != null) {
                val.startTime = hs[0].TimeStamp;
              }

              if (he[0] != null) {
                val.endTime = he[0].TimeStamp;
              }
            }
          });
        }

    

        // return status object for this vehicle

        return {
          vehId,

          plateNumber,

          model,

          currentStage,

          appointment,

          status,

          wipNumber
        };
      });

      //console.log("Integration test:", statusList)

      return {
        ...state,

        statusList
      };

    case GET_VEHICLE_STATUS:
      return {
        ...state,

        statusList: action.payload
      };

    case CHANGE_VEHICLE:
      return {
        ...state,

        currentIndex: action.payload
      };

    case EXPAND_VEHICLE_STATUS: {
      const index = action.payload.index;

      const clone = _.cloneDeep(state.statusList);

      clone[state.currentIndex].status = clone[state.currentIndex].status.map(
        (value, key) => {
          const object = value;

          if (key === index) {
            object.isExpanded = true;
          } else {
            object.isExpanded = false;
          }

          return object;
        }
      );

      return {
        ...state,

        statusList: clone
      };
    }

    case DELETE_BOOKING: {
      var newStatusList = state.statusList.map(item => {
        if (item.appointment.id) {
          if (item.appointment.id == action.payload.AppointmentId) {
            item.appointment = {
              date: "",

              altDate: ""
            };

            item.status = [
              { name: "Booking", statusIndex: 0, isExpanded: false },

              { name: "Maintenance", statusIndex: 0, isExpanded: false },

              { name: "Final Check", statusIndex: 0, isExpanded: false },

              { name: "Cleaning", statusIndex: 0, isExpanded: false },

              { name: "Handover", statusIndex: 0, isExpanded: false }
            ];

            item.wipNumber = "";

            item.currentStage = 0;
          }
        }

        return item;
      });

      return {
        ...state,

        statusList: newStatusList
      };
    }

    case MARK_FEEDBACK_SENT: {
      var newSList = state.statusList.map(item => {
        if (item.appointment.id === action.payload) {
          item.appointment.FeedbackProvided = true;
        }

        return item;
      });

      return {
        ...state,

        statusList: newSList
      };
    }

    default:
      return state;
  }
}