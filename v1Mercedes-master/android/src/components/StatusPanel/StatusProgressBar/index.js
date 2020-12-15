import React, { Component, PropTypes } from 'react'
import moment from 'moment-timezone'

import { userTimeZone } from '../../../config'

import './statusProgressBar.css'

export default class StatusProgressBar extends Component {
  renderExpandedProgressBar(statusIndex, timeStamp, name) {
    const isLast = (this.props.index === 4)
    let progress = "0%"
    let backgroundColor = ""
    if (statusIndex === 1) {
      progress = "60%"
    } else if (statusIndex === 2) {
      progress = "100%"
      backgroundColor = "#00ADEF"
    }
    return (
      <div className="status-progress-bar-expanded" >
        <div className="status-progress-time-group">
          { statusIndex !== 0 && name !== "Booking" ? <div className="status-time-high"> {timeStamp.startTime} </div> : <div className="status-time-high" /> }
          { statusIndex === 2 && !isLast && name !== "Booking" ? <div className="status-time-low"> {timeStamp.endTime} </div> : <div className="status-time-low" /> }
        </div>
        <div className="status-progress-indicator-group">
          <div style={{"margin":"auto","width":"0.5vw","maxWidth":"3px","height":"2px","backgroundColor":"rgb(0, 173, 239)"}} />
          <div className="status-progress-bar-icon">
            <img className="status-icon" src={this.props.statusIcon} alt="status icon" />
          </div>
          {isLast ? "" :
          <div className={name === "Final Check" ? "status-progress-bar-body-finalCheck" : name === "Cleaning" || name === "Booking" ? "status-progress-bar-body-booking" : "status-progress-bar-body-maintenance"} >
            <div className="status-progress-bar-fill" style={{ height: `${progress}` }} >
              {statusIndex === 2 ? <div className="status-progress-check" /> : '' }
            </div>
          </div>
          }
          {isLast ?
            <div className="status-progress-bar-line-last" />
            :
            <div className="status-progress-bar-line" style={{ backgroundColor: `${backgroundColor}` }} />
          }
        </div>
      </div>
    )
  }
  renderNestedProgressBar(statusIndex, timeStamp, name) {
    let backgroundColor = ""
    const isFirst = (this.props.index === 0)
    const isLast = (this.props.index === 4)
    if (statusIndex === 2 || statusIndex === 1) {
      backgroundColor = "#00ADEF"
    }
    return (
      <div className="status-progress-bar-collapsed" >
        <div className="status-progress-time-group">
          { (statusIndex !== 0 && name !== "Booking") ? <div className="status-time-collapsed"> {statusIndex === 1 ? timeStamp.startTime : timeStamp.endTime} </div> : <div className="status-time-collapsed" /> }
        </div>
        <div className="status-progress-indicator-group">
          { isFirst ? <div style={{ height: "20px", }} /> : <div className="status-progress-bar-line" style={{ height: "20px", backgroundColor: `${backgroundColor}` }} />}
          <div className="status-progress-bar-point" style={{ backgroundColor: `${backgroundColor}` }}>
            {statusIndex === 2 ? <div className="status-progress-check" /> : '' }
          </div>
          { isLast ? <div style={{ height: "20px", }} /> : <div className="status-progress-bar-line" style={{ height: "20px", backgroundColor: `${backgroundColor}` }} />}
        </div>
      </div>
    )
  }
  render() {
    const { statusIndex, isExpanded, startTime, endTime, name } = this.props.statusInfo
    // console.log("StatusProgressBar:",this.props.statusInfo)
    const timeObject = {
      startTime: moment(startTime).tz(userTimeZone).format('HH:mm'),
      endTime: moment(endTime).tz(userTimeZone).format('HH:mm'),
    }
    return isExpanded ? this.renderExpandedProgressBar(statusIndex, timeObject, name) : this.renderNestedProgressBar(statusIndex, timeObject, name)
  }
}

StatusProgressBar.propTypes = {
  statusInfo: PropTypes.object,
  index: PropTypes.number,
  length: PropTypes.number,
  statusIcon: PropTypes.string,
}
