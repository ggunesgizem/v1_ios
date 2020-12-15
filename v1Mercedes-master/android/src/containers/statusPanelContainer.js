import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import StatusPanel from '../components/StatusPanel'
import { expandVechicleStatus } from '../actions/statusActions'
import bookingIcon from '../assets/booking.svg'
import maintenanceIcon from '../assets/maintenance.svg'
import finalCheckIcon from '../assets/finalCheck.svg'
import cleaningIcon from '../assets/cleaning.svg'
import handoverIcon from '../assets/handover.svg'
// import appPrefix from '../config/prefix'

class StatusPanelContainer extends Component {
  constructor(props) {
    super(props)
    this.handleClickItem = this.handleClickItem.bind(this)
    const prefix = ''
    this.iconList = [
      prefix + bookingIcon,
      prefix + maintenanceIcon,
      prefix + finalCheckIcon,
      prefix + cleaningIcon,
      prefix + handoverIcon,
    ]
  }
  handleClickItem(val) {
    this.props.expandVechicleStatus(val)
  }
  render() {
  console.log("status panel")
    return (
      <div>
        {this.props.statusList.status.map((item, index) =>
          <div key={index}>
            <StatusPanel
              appointment={this.props.statusList.appointment}
              statusInfo={item}
              statusDetail={this.props.statusList}
              checkItems={this.props.checkList[index]}
              key={index}
              handleItemClick={this.handleClickItem}
              index={index}
              length={this.props.statusList.length}
              statusIcon={this.iconList[index]}
              handleFeedbackBtnClick={this.props.handleFeedbackBtnClick}
              handleMaintenanceDetailsClick={this.props.handleMaintenanceDetailsClick}
              handleAddtionalServicesClick = {this.props.handleAddtionalServicesClick}
              additionalInfo={this.props.additionalInfo}
              handleCancelBooking={this.props.handleCancelBooking}
              handleCleaningServicesClick={this.props.handleCleaningServicesClick}
              allDealers={this.props.allDealers}
              selectedLanguage={this.props.selectedLanguage}
            />
            {index !== 4 ? <div className="status-seperator" /> : ''}
          </div>
        )}
      </div>
    )
  }
}

const mapStatetoProps = (state) => {
  return {
    selectedLanguage : state.language.selectedLanguage
  }
}

StatusPanelContainer.propTypes = {
  statusList: PropTypes.object.isRequired,
  checkList: PropTypes.array.isRequired,
  expandVechicleStatus: PropTypes.func,
}

export default connect(mapStatetoProps, { expandVechicleStatus })(StatusPanelContainer)
