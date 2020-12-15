import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { sendBooking, updateStage } from '../../actions/bookingAction'
import Summary from '../../components/Summary'
import BookingProgressBar from '../../components/BookingProgressBar'
import T from 'i18n-react'
import {reset} from 'redux-form'

import moment from 'moment-timezone'
import  { defaultTimeZone } from '../../config'

class BookingSummary extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.sendBookingCallBack = this.sendBookingCallBack.bind(this)
    this.sendBookingErrCallBack = this.sendBookingErrCallBack.bind(this)
  }

  mobilecheck(){
    if( navigator.userAgent.match(/Android/i)){
      
      return "android";
    }
    else{
      if(navigator.userAgent.match(/iPhone/i)){
        return "ios";
      }
    }
  };

  componentWillMount() {
    // console.log(this.props)
  }
  cleanMileage(mile){
    if(mile === "undefined"){
      return "0"
    }
    if(mile == null){
      return "0"
    }

    if(mile == ""){
      return "0"
    }

    var mileageInString = mile.toString()
    var cleanMile = ""
    for(var tt = 0; tt < mileageInString.length; tt++){
      if(!isNaN(mileageInString[tt])){
        cleanMile = cleanMile.concat(mileageInString[tt])
      }
    }
    return cleanMile
  }

  onSubmit(props, requests, rawRequest) {
    let serviceString = ''
    requests.forEach( (item,key) => {
      //AAnalytics
      serviceString += `${key+1}. ${item}\n`
    })

    rawRequest.forEach((i,k)=>{
      /*if(window.ADB){
        let type = ""
       type += i
        window.ADB.trackAction('booking service',{'servicetype':type})
      }*/

      if(this.mobilecheck()==="android"){
        cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
  
   
          if(window.ADB && response==="PermissionIsOpen"){
            let type = ""
            type += i
            window.ADB.trackAction('booking service',{'servicetype':type})
           }
          
         });
      
      }
      if(this.mobilecheck()==="ios"){
        cordova.plugins.perm.permCheck("permCheck", function(response){
  
   
          if(window.ADB && response==="True"){
            let type = ""
            type += i
            window.ADB.trackAction('booking service',{'servicetype':type})
           }
          
         });
      
      }
      

     })

    const bookingObject = {
      ServiceAgentId: props.agent.ServiceAgentId,
      // CustomerId: props.vehicle.CustomerId,
      VehicleId: props.vehicle.VehicleId,
      WorkshopId: props.dealer.WorkshopId,
      AppDate: props.dates.date,
      AppTime: props.dates.time,
      AlternativeAppDate: props.dates.altDate,
      AlternativeAppTime: props.dates.altTime,
      Remark: props.services.other,
      TyreChangeRequirement: props.services.tyreChangeComment,
      selectedServices: serviceString,
      Mileage: this.cleanMileage(props.services.mileage),
    }
    this.props.sendBooking(bookingObject, this.sendBookingCallBack, this.sendBookingErrCallBack)
  }

  sendBookingCallBack(){
     /*if(window.ADB){
      window.ADB.trackAction('submitbooking', {'bookingdealeroutlet':this.props.dealer.OutletID,'bookingdealeroutletname':this.props.dealer.Name})
     }*/

     if(this.mobilecheck()==="android"){
      cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){

 
        if(window.ADB && response==="PermissionIsOpen"){
          window.ADB.trackAction('submitbooking', {'bookingdealeroutlet':this.props.dealer.OutletID,'bookingdealeroutletname':this.props.dealer.Name})
         }
        
       });
    
    }
    if(this.mobilecheck()==="ios"){
      cordova.plugins.perm.permCheck("permCheck", function(response){

 
        if(window.ADB && response==="True"){
          window.ADB.trackAction('submitbooking', {'bookingdealeroutlet':this.props.dealer.OutletID,'bookingdealeroutletname':this.props.dealer.Name})
         }
        
       });
    
    }
    

    this.props.reset('SelectServiceForm')

    if(navigator.notification){

      //AAnalytics
      navigator.notification.alert(
          T.translate("booking.summary.notification.add appointment success message"),  // message
          ()=>{
            this.props.closeModal()
          },      // callback
          '',     // title
          T.translate("booking.summary.notification.add appointment success close") // buttonName
      );
    }else{
      alert(T.translate("booking.summary.notification.add appointment success message"))
      this.props.closeModal()
    }
  }

  sendBookingErrCallBack(){
    if(navigator.notification){
      navigator.notification.alert(
          T.translate("booking.summary.notification.add appointment error message"),  // message
          ()=>{
            //this.props.closeModal()
          },      // callback
          T.translate("booking.summary.notification.add appointment error title"),     // title
          T.translate("booking.summary.notification.add appointment error close") // buttonName
      );
    }else{
      alert(T.translate("booking.summary.notification.add appointment error message"))
    }
  }

  render() {
    return (
      <div style={{height:"100%",display:this.props.active?"block":"none"}}>
        <BookingProgressBar
          title = {T.translate("booking.summary.title")}
          currentStage = {4}
          latestStage = {this.props.latestStage}
          switchStage = {this.props.switchStage}
        />
        { this.props.active ?
        <Summary
         vehicle={this.props.vehicle}
         dates={this.props.dates}
         dealer={this.props.dealer}
         services={this.props.services}
         agent={this.props.agent}
         onSubmit={this.onSubmit}
         isLoaded={this.props.isLoaded}
         language = {this.props.language}
        />
        :
        null
      }
      </div>
    )
  }
}

BookingSummary.propTypes = {
  vehicle: PropTypes.object,
  dates: PropTypes.object,
  dealer: PropTypes.object,
  services: PropTypes.object,
}

function mapStateToProps(state) {
  return {
    dates: state.booking.dates,
    vehicle: state.booking.vehicle,
    user: state.user,
    services: state.booking.services,
    dealer: state.dealer.selected,
    agent: state.agent.selected,
    isLoaded: state.loading.loaded,
    language: state.language.selectedLanguage,
    latestStage: state.booking.latestStage,
  }
}

BookingSummary.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default connect(mapStateToProps, { sendBooking, updateStage, reset })(BookingSummary)
