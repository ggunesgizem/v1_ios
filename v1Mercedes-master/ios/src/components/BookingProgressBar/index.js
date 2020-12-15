import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react'
import './bookingProgressBar.css'
import BookingProgressIndicator from '../BookingProgressIndicator'
import locateDealer from '../../assets/booking_stage/locateDealer.png'
import selectAdvisor from '../../assets/booking_stage/selectAdvisor.png'
import selectTime from '../../assets/booking_stage/selectTime.png'
import selectServices from '../../assets/booking_stage/selectServices.png'
import requestSummary from '../../assets/booking_stage/requestSummary.png'

export default class BookingProgressBar extends Component {
  constructor(props) {
    super(props)
    this.renderIndicators = this.renderIndicators.bind(this)
    this.stageList = [
      {
        title: "Select a workshop",
        iconUrl: locateDealer,
        stageIndex: 0,
      },
      {
        title: "Select a service advisor",
        iconUrl: selectAdvisor,
        stageIndex: 1,
      },
      {
        title: "Input appointment preferences",
        iconUrl: selectTime,
        stageIndex: 2,
      },
      {
        title: "Service preferences",
        iconUrl: selectServices,
        stageIndex: 3,
      },
      {
        title: "Confirm request",
        iconUrl: requestSummary,
        stageIndex: 4,
      }
    ]
  }

  renderIndicators() {
    return(
      <div className="booking-progress-bar">
        {this.stageList.map((stageInfo, i) =>
          <BookingProgressIndicator
            key={i}
            index={i}
            isActive={this.props.currentStage === i}
            isDisabled={this.props.latestStage < i}
            iconUrl={stageInfo.iconUrl}
            stageIndex={stageInfo.stageIndex}
            switchStage={this.props.switchStage}
          />
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="booking-progress-bar-container">
        {this.renderIndicators()}
        <div className="booking-progress-bar-title-container">
          <div className="booking-progress-bar-title">
            {this.props.title}
          </div>
        </div>
      </div>
    )
  }
}

BookingProgressBar.propTypes = {
  title: PropTypes.string,
  currentStage: PropTypes.number,
  latestStage: PropTypes.number,
  updateStage: PropTypes.func,
}
