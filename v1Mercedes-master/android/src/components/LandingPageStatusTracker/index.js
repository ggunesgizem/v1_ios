import React, { Component } from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react'
import './landingPageStatusTracker.css'
import moment from 'moment-timezone'
import { userTimeZone } from '../../config'

export default class LandingPageStatusTracker extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

  render() {
   

    if (!this.props.status || this.props.status.status[0].statusIndex === 0) {
      return (
        <div className="landing-page-status-tracker-container" onClick={() => {this.props.onclick(); this.props.showNewBookingModal()}}>
          <div className="landing-page-status-time" />
          <div className="landing-page-status-tracker-bar">
            <div className="landing-page-progress-bar-line-container">
              <div className="landing-page-progress-bar-line-upper" style={{width:0}}/>
              <div className="landing-page-status-tracker-bar-icon-inactive">
                <span className={`status-icon-0`} aria-hidden="true" />
              </div>
              <div className="landing-page-progress-bar-line-lower-inactive" />
            </div>
          </div>
          <div className="landing-page-current-status-content">
            <div className="landing-page-current-status-title-make-booking">
              {T.translate("my vehicle.status tracker.booking.new request")}
            </div>
            <div className="landing-page-current-status-info">
              <div className="landing-page-current-status-create-booking">
                {T.translate("my vehicle.status tracker.booking.make booking text")}
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      // const currentStage = this.props.status.currentStage
      // const service = this.props.status
      var currentStage = this.props.status.currentStage
      const service = this.props.status
   
      const displayDate = moment(service.appointment.date).format('LL dddd')
      const displayTime = moment(service.appointment.time).format('HH:mm')
      const displayAltDate = moment(service.appointment.altDate).format('LL dddd')
      const displayAltTime = moment(service.appointment.altTime).format('HH:mm')
      
      
      if (currentStage === 0 && service.status[0].statusIndex === 1){
        // booking pending
        return (
          <div className="landing-page-status-tracker-container" onClick={() => {this.props.onclick(); this.props.showStatusTracker();}}>
            <div className="landing-page-status-time" />
            <div className="landing-page-status-tracker-bar">
              <div className="landing-page-progress-bar-line-container">
                <div className="landing-page-progress-bar-line-upper" style={{width:0}}/>
                <div className="landing-page-status-tracker-bar-icon-inactive">
                  <span className={`status-icon-${currentStage}`} aria-hidden="true" />
                </div>
                <div className="landing-page-progress-bar-line-lower-inactive" />
              </div>
            </div>
            <div className="landing-page-current-status-content">
              <div className="landing-page-current-status-title">
                {T.translate("my vehicle.status tracker.booking.booking pending")}
              </div>
              <div className="landing-page-current-status-info">
                {
                  this.props.language === "ENGLISH" ?
                  <div style={{width:"100%",height:"100%",paddingTop:"10px"}}>
                    <div className="lpst_topText">
                      {T.translate("my vehicle.status tracker.requesting appointment on")}
                    </div>
                    <div className="lpst_topText_imp">
                      {displayDate}
                      <br/>
                      {displayTime}
                    </div>
                    <div className="lpst_topText_footer">
                      {(T.translate("my vehicle.status tracker.booking.sent on title") + " " + moment(service.status[0].startTime).tz(userTimeZone).format('LL HH:mm'))}
                    </div>
                  </div>
                  :
                  <div style={{width:"100%",height:"100%",paddingTop:"10px"}}>
                    <div className="lpst_topText">
                    </div>
                    <div className="lpst_topText_imp">
                      {T.translate("my vehicle.status tracker.booking.selected time").replace("*",(displayDate +" "+ displayTime))}
                    </div>
                    <div className="lpst_topText_footer">
                      {(moment(service.status[0].startTime).tz(userTimeZone).format('LL HH:mm') + " " + T.translate("my vehicle.status tracker.requesting appointment on"))}
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        )
      } else if (currentStage === 0 && service.status[0].statusIndex === 2){
        // booking confirmed
        return (
          <div className="landing-page-status-tracker-container" onClick={() => {this.props.onclick(); this.props.showStatusTracker();}}>
            <div className="landing-page-status-time" />
            <div className="landing-page-status-tracker-bar">
              <div className="landing-page-progress-bar-line-container">
                <div className="landing-page-progress-bar-line-upper" style={{width:0}} />
                <div className="landing-page-status-tracker-bar-icon">
                  <span className={`status-icon-${currentStage}-active`} aria-hidden="true" />
                </div>
                <div className="landing-page-progress-bar-line-lower" />
              </div>
            </div>
            <div className="landing-page-current-status-content">
              <div className="landing-page-current-status-title">
                {T.translate("my vehicle.status tracker.booking.booking confirmed")}
              </div>
              <div className="landing-page-current-status-info">
                <div style={{width:"100%",height:"100%",paddingTop:"10px"}}>
                  <div className="lpst_topText">
                    {T.translate("my vehicle.status tracker.booking.appointment on")}
                  </div>
                  <div className="lpst_topText_imp">
                    {moment(service.status[0].selectedDate).format('LL dddd')}
                    <br/>
                    {moment(service.status[0].selectedTime).format('HH:mm')}
                  </div>
                  <div className="lpst_topText_footer">
                    {T.translate("my vehicle.status tracker.booking.updated by service provider")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      } else if ((currentStage !== 0 && currentStage !== 4) && service.status[currentStage].statusIndex === 1) {
        // current stage is on-going
        const currentStageName = service.status[currentStage].name
        // console.log(currentStageName)
        return (
          <div className="landing-page-status-tracker-container" onClick={() => {this.props.onclick(); this.props.showStatusTracker();}}>
            <div className="landing-page-status-time">
              {moment(service.status[currentStage].startTime).tz(userTimeZone).format('HH:mm')}
            </div>
            <div className="landing-page-status-tracker-bar">
              <div className="landing-page-progress-bar-line-container">
                <div className="landing-page-progress-bar-line-upper" />
                <div className="landing-page-status-tracker-bar-icon">
                  <span className={`status-icon-${currentStage}-active`} aria-hidden="true" />
                </div>
                <div className="landing-page-progress-bar-line-lower" />
              </div>
            </div>
            <div className="landing-page-current-status-content">
              <div className="landing-page-current-status-title">
                {T.translate(`my vehicle.status tracker.${currentStageName.toLowerCase()}.stage name`)}
              </div>
              <div className="landing-page-current-status-info">
                <div style={{width:"100%",height:"100%",paddingTop:"10px"}}>
                  <div className="lpst_topText">
                    {T.translate("my vehicle.status tracker.estimated time left")}
                  </div>
                  <div className="lpst_topText_imp">
                    {service.status[currentStage].estimatedTime}
                    &nbsp;
                    {T.translate("my vehicle.status tracker.minutes")}
                  </div>
                  <div className="lpst_topText_footer">
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      } else if ((currentStage !== 0 && currentStage !== 4) && service.status[currentStage].statusIndex === 2) {
        // current stage is completed
        return (
          <div className="landing-page-status-tracker-container" onClick={() => {this.props.onclick(); this.props.showStatusTracker();}}>
            <div className="landing-page-status-time">
              {moment(service.status[currentStage].endTime).tz(userTimeZone).format('HH:mm')}
            </div>
            <div className="landing-page-status-tracker-bar">
              <div className="landing-page-progress-bar-line-container">
                <div className="landing-page-progress-bar-line-upper" />
                <div className="landing-page-status-tracker-bar-icon">
                  <span className={`status-icon-${currentStage}-active`} aria-hidden="true" />
                </div>
                <div className="landing-page-progress-bar-line-lower" />
              </div>
            </div>
            <div className="landing-page-current-status-content">
              <div className="landing-page-current-status-title">
                {T.translate(`my vehicle.status tracker.${service.status[currentStage].name.toLowerCase()}.stage name`)}
              </div>
              <div className="landing-page-current-status-info">
                <div style={{width:"100%",height:"100%",paddingTop:"10px"}}>
                  <div className="lpst_topText">
                    {T.translate("my vehicle.status tracker.completed")}
                  </div>
                  <div className="lpst_topText_imp">
                    {
                      this.props.language === "ENGLISH" ?
                      T.translate("my vehicle.status tracker.in transit to") + " " + T.translate(`my vehicle.status tracker.${service.status[currentStage+1].name.toLowerCase()}.stage name`)
                      :
                      T.translate(`my vehicle.status tracker.${service.status[currentStage+1].name.toLowerCase()}.transit name`)
                    }
                  </div>
                  <div className="lpst_topText_footer">
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      } else if (currentStage === 4) {
        // handover stage
     
        return (
          <div className="landing-page-status-tracker-container" onClick={() => {this.props.onclick(); this.props.showStatusTracker();}}>
            <div className="landing-page-status-time">
              {moment(service.status[currentStage-1].endTime).tz(userTimeZone).format('HH:mm')}
            </div>
            <div className="landing-page-status-tracker-bar">
              <div className="landing-page-progress-bar-line-container">
                <div className="landing-page-progress-bar-line-upper" />
                <div className="landing-page-status-tracker-bar-icon">
                  <span className={`status-icon-${currentStage}-active`} aria-hidden="true" />
                </div>
                <div className="landing-page-progress-bar-line-lower" style={{width:0}} />
              </div>
            </div>
            <div className="landing-page-current-status-content">
              <div className="landing-page-current-status-title">
                {T.translate(`my vehicle.status tracker.${service.status[currentStage].name.toLowerCase()}.stage name`)}
              </div>
              <div className="landing-page-current-status-info">
                <div className="landing-page-current-status-subtitle">
                  {T.translate("my vehicle.status tracker.handover.ready for pickup")}
                </div>
                <div className="landing-page-current-status-time">
                   {T.translate("my vehicle.status tracker.handover.call your dealer")}
                </div>
              </div>
            </div>
          </div>
        )
      }
    }
  }
}

LandingPageStatusTracker.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    statusList: state.status.statusList,
    language: state.language.selectedLanguage,
  }
}

//export default connect(mapStateToProps, null)(LandingPageStatusTracker)
