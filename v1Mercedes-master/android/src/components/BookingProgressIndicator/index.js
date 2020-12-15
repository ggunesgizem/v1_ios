import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react'
import './bookingProgressIndicator.css'
export default class BookingProgressIndicator extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="booking-progress-indicator-container" onClick={this.props.isDisabled || this.props.isActive ? null : () => this.props.switchStage(this.props.stageIndex)}>
        {this.props.index === 0 ? '' :
          <div className={this.props.isDisabled ? "booking-progress-indicator-line-disabled" : "booking-progress-indicator-line"} />
        }
        <div className={this.props.isActive ? "booking-progress-indicator-circle-active" : this.props.isDisabled ? "booking-progress-indicator-circle-disabled" : "booking-progress-indicator-circle"}>
          <div style={{ backgroundImage: `url(${this.props.iconUrl})`}} className={this.props.isActive ? "booking-progress-indicator-icon-active" : "booking-progress-indicator-icon"} />
        </div>
      </div>
    )
  }
}

BookingProgressIndicator.propTypes = {
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  type: PropTypes.string,
}
