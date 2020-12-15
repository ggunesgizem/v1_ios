import React, { Component, PropTypes } from 'react'
import moment from 'moment-timezone'
import { userTimeZone } from '../../config'
import StatusProgressBar from './StatusProgressBar'
import StatusContent from './StatusContent'
import './statusPanel.css'

export default class StatusPanel extends Component {

  render() {
    const { isExpanded } = this.props.statusInfo
    const selectedAppointmentDate = moment(this.props.statusDetail.status[0].selectedDate).format('LL dddd') + " " + moment(this.props.statusDetail.status[0].selectedTime).format('HH:mm')
    const appointmentDate = moment(this.props.statusDetail.appointment.date).format('LL dddd') + " " + moment(this.props.statusDetail.appointment.time).format('HH:mm')
    const altAppointmentDate = moment(this.props.statusDetail.appointment.altDate).format('LL dddd') + " " + moment(this.props.statusDetail.appointment.altTime).format('HH:mm')
    return (
      <div className="status-panel">
        <StatusProgressBar
          statusInfo={this.props.statusInfo}
          index={this.props.index}
          length={this.props.length}
          statusIcon={this.props.statusIcon}
        />
        <StatusContent
          appointment={this.props.appointment}
          selectedLanguage={this.props.selectedLanguage}
          currentStage={this.props.statusDetail.currentStage}
          statusInfo={this.props.statusInfo}
          selectedAppointmentDate={selectedAppointmentDate}
          appointmentDate={appointmentDate}
          alternativeAppointmentDate={altAppointmentDate}
          handleItemClick={this.props.handleItemClick}
          handleFeedbackBtnClick={this.props.handleFeedbackBtnClick}
          index={this.props.index}
          length={this.props.length}
          checkItems={this.props.checkItems}
          handleMaintenanceDetailsClick={this.props.handleMaintenanceDetailsClick}
          handleAddtionalServicesClick = {this.props.handleAddtionalServicesClick}
          additionalInfo={this.props.additionalInfo}
          handleCancelBooking={this.props.handleCancelBooking}
          handleCleaningServicesClick={this.props.handleCleaningServicesClick}
          allDealers={this.props.allDealers}
        />
      </div>
    )
  }
}

StatusPanel.propTypes = {
  statusInfo: PropTypes.object,
  handleItemClick: PropTypes.func,
  handleFeedbackBtnClick: PropTypes.func,
  index: PropTypes.number,
  length: PropTypes.number,
  statusIcon: PropTypes.string,
  checkItems: PropTypes.object,
}
StatusPanel.defaultProps = {
  statusInfo: { name: "Booking", statusIndex: 1 },
  handleItemClick: i => i,
}
