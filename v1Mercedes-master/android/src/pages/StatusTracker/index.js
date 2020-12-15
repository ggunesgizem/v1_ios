import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { transitUpDuration, transitUpStyle, transitUpStyles,transitLeftDuration,transitLeftStyle,transitLeftStyles } from '../App/transitions'
import T from 'i18n-react'
import StatusPanelContainer from '../../containers/StatusPanelContainer'
import TopBar from '../../components/TopBar'
import Feedback from '../../components/Feedback'
import smileIcon from '../../assets/smile.svg'
import sadIcon from '../../assets/sad.svg'
import sosoIcon from '../../assets/soso.svg'
import smileActivateIcon from '../../assets/smile_activate.svg'
import sadActivateIcon from '../../assets/sad_activate.svg'
import sosoActivateIcon from '../../assets/soso_activate.svg'
import { loadingStart } from '../../actions/loadingActions'
import { postFeedback } from '../../actions/feedbackActions'
import { changeVehicle } from '../../actions/statusActions'
import { showLegal } from '../../actions/legalAction'
import MaintenanceDetailPage from '../MaintenanceDetailPage'
import AdditionalServiceContainer from '../../containers/AdditionalServiceContainer'
import CleaningDetail from '../../components/CleaningDetail'
import { deleteBooking } from '../../actions/bookingAction'

import '../page.css'

const TransitionLeft = (props) => {
  return (
    <Transition
      in={props.in}
      timeout={transitLeftDuration}
    >
      {(state) => {
        return (
          <div style={{
            top : 0,
             ...transitLeftStyle,
             ...transitLeftStyles[state],
             height : "100%",
             backgroundColor:"black",
           }}>
            {props.children}
          </div>
        )
      }}
    </Transition>
  )
}

class StatusTracker extends Component {
  constructor(props) {
    super(props)
    this.state ={
      shouldFeedBackShow: false,
      showMaintenanceDetails: false,
      showAdditionalServices: false,
      showCleaningService : false,
    }
    this.imageList = [
      smileIcon,
      sadIcon,
      sosoIcon,
    ]
    this.activateList = [
      smileActivateIcon,
      sadActivateIcon,
      sosoActivateIcon,
    ]
    this.emotionList = [
      "Positive",
      "Negative",
      "Neutral",
    ]
    this.handleVehicleChange = this.handleVehicleChange.bind(this)
    this.toggleFeedback = this.toggleFeedback.bind(this)
    this.handleSubmitFeedback = this.handleSubmitFeedback.bind(this)
    this.cancelBookingCallBack = this.cancelBookingCallBack.bind(this)
    this.cancelBookingErrorCallBack = this.cancelBookingErrorCallBack.bind(this)
    this.feedbackCallBackSuccess= this.feedbackCallBackSuccess.bind(this)
    this.feedbackCallBackError = this.feedbackCallBackError.bind(this)


    // console.log(this.props.statusList)
    this.vehicleList = this.props.statusList.filter(
      value => value
      // value.currentStage > 0 || value.status[0].statusIndex === 2
    ).map((item, key) => {
      const object = {}
      object[key] = item.plateNumber
      return object
    })
    .reduce((acc, val) =>
      Object.assign(acc, val)
      , {})
  }


  mobilecheck () {
    if( navigator.userAgent.match(/Android/i)){
      return "android"
    }
    else{
      if(navigator.userAgent.match(/iPhone/i)){
        return "ios"
      }
    }
  };

  handleVehicleChange(val) {
    this.props.changeVehicle(parseInt(val.value, 10))
  }
  toggleFeedback() {
    this.setState({
      shouldFeedBackShow: !this.state.shouldFeedBackShow
    })
  }

  handleSubmitFeedback(activateItemIndex,comment) {
    console.log(activateItemIndex);
    const overallRate = this.emotionList[parseInt(activateItemIndex,10)]
    const wipNumber = this.props.statusList[this.props.currentIndex].wipNumber
    const subject = `${this.props.user.firstName} ${this.props.user.lastName} has a overall rate ${overallRate} for service WIP number ${wipNumber}`
    this.props.loadingStart()
    this.props.postFeedback({
      type: 'feedback',
      subject,
      detail: comment,
      overallRate: parseInt(activateItemIndex,10),
      appId: this.props.statusList[this.props.currentIndex].appointment.id,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
    }, this.feedbackCallBackSuccess.bind(null, activateItemIndex == 0 ? 'happy' : activateItemIndex == 1 ? 'sad' : 'neutral'),this.feedbackCallBackError)
  }

  feedbackCallBackSuccess(status){
    if(navigator.notification){
      //AAnalytics
      let dd = {
        'feedbackstatus': status,
        'feedbackdealername' : this.props.statusList[this.props.currentIndex].appointment.workshop.Name,
        'feedbackdealeroutlet' : this.props.statusList[this.props.currentIndex].appointment.workshop.OutletID,
        'feedbackdealeragentname' : this.props.statusList[this.props.currentIndex].appointment.serviceAgent.ServiceAgentId
      }
      console.log(dd);
      /*if(window.ADB){
        window.ADB.trackAction("newfeedback", dd)
      }*/

      if(this.mobilecheck()==="android"){
        cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
  
   
          if(window.ADB && response==="PermissionIsOpen"){
            window.ADB.trackAction("newfeedback", dd)
           }
          
         });
      
      }
      if(this.mobilecheck()==="ios"){
        cordova.plugins.perm.permCheck("permCheck", function(response){
  
   
          if(window.ADB && response==="True"){
            window.ADB.trackAction("newfeedback", dd)
           }
          
         });
      
      }

      // if(window.ga){
      //   window.ga.trackEvent('Feedback', 'Add', this.props.statusList[this.props.currentIndex].appointment.serviceAgent.ServiceAgentId)
      // }
      
    }else{
      //alert("Feedback Sent")
      this.toggleFeedback()
    }
  }

  feedbackCallBackError(){
    if(navigator.notification){
      navigator.notification.alert(
          T.translate("my vehicle.status tracker.handover.feedback navigator.Add feedback error message"),  // message
          ()=>{
            this.props.closeModal()
          },         // callback
          T.translate("my vehicle.status tracker.handover.feedback navigator.Add feedback error title"),            // title
          T.translate("my vehicle.status tracker.handover.feedback navigator.Add feedback error close")                  // buttonName
      );
    }else{
      alert(T.translate("my vehicle.status tracker.handover.feedback navigator.Add feedback error message"))
    }
  }

  togleMaintenanceDetails(){
    this.setState({showMaintenanceDetails : !this.state.showMaintenanceDetails})
  }

  togleAdditionalServices(){
    this.setState({showAdditionalServices : !this.state.showAdditionalServices})
  }

  togleCleaningMoreDetails(){
    this.setState({showCleaningService : !this.state.showCleaningService})
  }

  handleCancelBooking(){
    var vehId = this.props.statusList[this.props.currentIndex].vehId
    var appId = this.props.statusList[this.props.currentIndex].appointment.id
    if(navigator.notification){
      navigator.notification.confirm(T.translate("my vehicle.status tracker.booking.cancel booking.text"), (buttonIndex)=>{
        if(buttonIndex === 2){
        } else if(buttonIndex === 1) {
          this.props.deleteBooking({VehId : vehId, AppointmentId : appId}, this.cancelBookingCallBack, this.cancelBookingErrorCallBack)
        }
      }, T.translate("my vehicle.status tracker.booking.cancel booking.title"),[T.translate("my vehicle.status tracker.booking.cancel booking.accept"),T.translate("my vehicle.status tracker.booking.cancel booking.reject")])
    }else{
      this.props.deleteBooking({VehId : vehId, AppointmentId : appId}, this.cancelBookingCallBack, this.cancelBookingErrorCallBack)
    }
  }

  cancelBookingCallBack(){
    if(navigator.notification){
      navigator.notification.alert(
          T.translate("my vehicle.status tracker.booking.appointment navigator.delete appointment success message"),         // message
          this.props.backButton, // callback
          '',           // title
          T.translate("my vehicle.status tracker.booking.appointment navigator.delete appointment success close")                  // buttonName
      )
    }else{
      alert(T.translate("my vehicle.status tracker.booking.appointment navigator.delete appointment success message"))
      this.props.backButton()
    }
  }

  cancelBookingErrorCallBack(){
    if(navigator.notification){
      navigator.notification.alert(
          T.translate("my vehicle.status tracker.booking.appointment navigator.delete appointment error message"),         // message
          () => {}, // callback
          T.translate("my vehicle.status tracker.booking.appointment navigator.delete appointment error title"),           // title
          T.translate("my vehicle.status tracker.booking.appointment navigator.delete appointment error close")                  // buttonName
      )
    }else{
      alert(T.translate("my vehicle.status tracker.booking.appointment navigator.Delete appointment error message"))
    }
  }

  render() {
    const currentIndex = this.props.currentIndex


    if(typeof this.props.currentIndex === 'undefined' || !this.props.statusList[currentIndex] || !this.props.checkList[currentIndex]){
      return(<span>></span>)
    }

    var newTopBar = {...this.props.topbar, props:{...this.props.topbar.props, title:T.translate("my vehicle.status tracker.service status"), onClickBack:this.props.backButton}}
    const name = `${this.props.user.firstName} ${this.props.user.lastName}`
    const additionalInfo = {
      name,
      plateNumber: this.props.statusList[currentIndex].plateNumber,
      model: this.props.statusList[currentIndex].model ,
      agent: this.props.statusList[currentIndex].appointment.serviceAgent,
      workshop: this.props.statusList[currentIndex].appointment.workshop,
    }

    return (
      <div className="statusTrackerMain">
        {newTopBar}
        <div className="StatusTracker_content">
            <StatusPanelContainer
              allDealers={this.props.allDealers}
              statusList={this.props.statusList[currentIndex]}
              checkList={this.props.checkList[currentIndex].data}
              handleFeedbackBtnClick={this.toggleFeedback}
              handleMaintenanceDetailsClick={this.togleMaintenanceDetails.bind(this)}
              handleAddtionalServicesClick = {this.togleAdditionalServices.bind(this)}
              additionalInfo={additionalInfo}
              handleCancelBooking={this.handleCancelBooking.bind(this)}
              handleCleaningServicesClick={this.togleCleaningMoreDetails.bind(this)}
            />
        </div>

        <TransitionLeft
          in={this.state.shouldFeedBackShow}
          >
          <Feedback
           shouldShow={this.state.shouldFeedBackShow}
           handleExitBtn={this.toggleFeedback}
           imageList={this.imageList}
           activateList={this.activateList}
           handleSubmitFeedback={this.handleSubmitFeedback}
           isSubmmitting={!this.props.loading.loaded}
           key={"Feedback"}
           topbar={this.props.topbar}
          />
        </TransitionLeft>
        <TransitionLeft
          in={this.state.showMaintenanceDetails}
          >
          <MaintenanceDetailPage
            tkey={"maintenanceDetailPage"}
            handleMaintenanceDetailsClick={this.togleMaintenanceDetails.bind(this)}
            topbar={this.props.topbar}
            />
        </TransitionLeft>
        <TransitionLeft
          in={this.state.showAdditionalServices}
          >
          <AdditionalServiceContainer
            tkey={"additionalService"}
            handleAddtionalServicesClick = {this.togleAdditionalServices.bind(this)}
            topbar={this.props.topbar}
            />
        </TransitionLeft>
        <TransitionLeft
          in={this.state.showCleaningService}
          >
          <CleaningDetail
            tkey={"cleaningService"}
            titleList={this.titleList}
            handleCleaningServicesClick = {this.togleCleaningMoreDetails.bind(this)}
            topbar={this.props.topbar}
            />
        </TransitionLeft>
      </div>

    )
  }
}

StatusTracker.contextTypes = {
  router: React.PropTypes.object.isRequired
}

StatusTracker.propTypes = {
  statusList: PropTypes.array,
  currentIndex: PropTypes.number,
  checkList: PropTypes.array,
  changeVehicle: PropTypes.func,
  postFeedback: PropTypes.func,
}

function mapStateToProps(state) {
  // console.log("StatusTracker: state",state)
  const { statusList, currentIndex } = state.status
  const { checkList, user, loading } = state
  return {
    statusList,
    checkList : checkList.cList,
    currentIndex,
    user,
    loading,
    allDealers : state.dealer.fullList,
  }
}

export default connect(mapStateToProps, { changeVehicle, postFeedback, loadingStart, showLegal, deleteBooking })(StatusTracker)
