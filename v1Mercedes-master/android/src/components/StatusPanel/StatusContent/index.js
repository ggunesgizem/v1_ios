import React, { Component, PropTypes } from 'react'
import { Transition } from 'react-transition-group'
import { fadeDuration, fixFadeStyle, transitionfadeStyles } from '../../../pages/App/transitions'
import T from 'i18n-react'
import phoneIcon from '../../../assets/phone.svg'
import ButtonPage from '../../ButtonPage'
import App from '../../../pages/App'


import './statusContent.css'
import moment from 'moment-timezone'
import { userTimeZone } from '../../../config'

const getEstimatedFinish = (timeIn,duration) => {
  return T.translate("my vehicle.status tracker.estimated time to complete") + " " + moment(timeIn).tz(userTimeZone).add(duration,"m").format("HH:mm")
}

export default class StatusContent extends Component {
  constructor(props) {
    super(props)
    
    this.prefix = ''
    this.state={feedbackWorked:0}
  
  }

  componentDidMount()
  {
    //alert(JSON.stringify(this.props.statusInfo));
  }

    //xml'den randevu oluşturulursa tarih içerisinde gelen 00:00 gösterilmeyecek.
    clearTime() {
      var xmlDateTime = this.props.selectedAppointmentDate;
      if (xmlDateTime.includes("00:00")) {
        xmlDateTime = xmlDateTime.replace("00:00", "");
        this.props.selectedAppointmentDate = xmlDateTime;
        return xmlDateTime;
      }
  
      return xmlDateTime;
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

  removePhoneNumberRegion(number){
    if(number == null){
      return number
    }
    if(number[0] === "+" && number.length > 4){
      return number.substring(3,number.length).trim()
    }
    return number
  }

   
  renderChatFrame(){
    const { name, plateNumber, model, agent, workshop } = this.props.additionalInfo
    let ww = this.props.allDealers.find(w => {
      if(w.WorkshopId == workshop.WorkshopId){
        return true
      }
    })
    if(ww){
      let consultant = ww.ServiceAgents.find((item)=>{
        if(item.Role == 2)
          return true
      })
      let consultantNumber = (consultant ? consultant.MobilePhone : null)
      if(consultant){
        if(this.props.selectedLanguage === "ENGLISH"){
          return (
            <div className="status-more-details">
              <a onClick={() =>{
                /*if(window.ADB){
                  window.ADB.trackAction('whatsapp')
                }*/

                if(this.mobilecheck()==="android"){
                  cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
            
             
                    if(window.ADB && response==="PermissionIsOpen"){
                      window.ADB.trackAction('whatsapp')
                     }
                    
                   });
                
                }
                if(this.mobilecheck()==="ios"){
                  cordova.plugins.perm.permCheck("permCheck", function(response){
            
             
                    if(window.ADB && response==="True"){
                      window.ADB.trackAction('whatsapp')
                     }
                    
                   });
                
                }

                window.open( `whatsapp://send?text=Hi. This is ${name}, the owner of vehicle with plate number ${plateNumber}. I have some questions regarding my ongoing car service at ${workshop.Name}. &phone=${consultantNumber}`,'_system')
              }}
              className="anchor-free-btn">
                <div className="msg_icon_text">{T.translate("my vehicle.status tracker.contact customer consultant")}</div><div className="msg_ico"></div>
              </a>
            </div>
          )
        }else{
          return (
            <div className="status-more-details">
              <a
                onClick={() =>{
                 /*if(window.ADB){
                    window.ADB.trackAction('whatsapp')
                 }*/

                 if(this.mobilecheck()==="android"){
                  cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
            
             
                    if(window.ADB && response==="PermissionIsOpen"){
                      window.ADB.trackAction('whatsapp')
                     }
                    
                   });
                
                }
                if(this.mobilecheck()==="ios"){
                  cordova.plugins.perm.permCheck("permCheck", function(response){
            
             
                    if(window.ADB && response==="True"){
                      window.ADB.trackAction('whatsapp')
                     }
                    
                   });
                
                }

                  window.open(`whatsapp://send?text=Merhaba. Ben ${name}, ${plateNumber} plakalı aracın sahibiyim. ${workshop.Name} bayisinde serviste olan otomobilim hakkında bazı sorularım var. &phone=${consultantNumber}`,'_system')
                }}
                className="anchor-free-btn">
                <div className="msg_icon_text">{T.translate("my vehicle.status tracker.contact customer consultant")}</div><div className="msg_ico"></div>
              </a>
            </div>
          )
        }
      }
    }
    return(null)
  }

  renderFeedback(isLast){

     
      if(this.isLast) {
        if(this.props.appointment.FeedbackProvided !== "undefined"){
         
          if(!this.props.appointment.FeedbackProvided){
            return (
              <div style={{width:"100%", height:"100%"}}>

           <div onClick={this.props.handleFeedbackBtnClick} >
                  <p className="mry">Aracı Teslim Aldım</p>
            </div>
              
            </div>
            )
          }
        }else{
      
        }

      }else{
      
       

       /* return(
          <App/>
        );
        */
      }
      return (null)

  }
  renderExpandedItem() {

    if(this.props.currentStage == 0 && this.props.statusInfo.statusIndex == 1){
      return (
        
        <div key={'expanded-status-content'}>
          <div className="status_title_top_space">
            <div className="status-title">
              {T.translate(`my vehicle.status tracker.booking.booking pending`)}
            </div>
            <span className="glyphicon glyphicon-menu-up" aria-hidden="true" style={{ color: "#AAAAAA", fontSize: "16px", }} />
          </div>
          <div className="booking-info">
            {T.translate('my vehicle.status tracker.requesting appointment on')}
            <br/>
            {this.props.appointmentDate}
            <br/>
            {T.translate('my vehicle.or')}
            <br/>
            {this.props.alternativeAppointmentDate}
          </div>
          <div className="status-item-list">
            <div className="status-more-details" onClick={this.props.handleCancelBooking} > {T.translate("my vehicle.status tracker.cancel booking request")} </div>

            {this.props.additionalInfo.workshop.Telephone ? <div className="status-more-details" onClick={() => {
              //AAnalytics
             /*if(window.ADB){
                 window.ADB.trackAction('service phone call', {'stage':this.props.index})
               }*/

               if(this.mobilecheck()==="android"){
                cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
          
           
                  if(window.ADB && response==="PermissionIsOpen"){
                    window.ADB.trackAction('service phone call', {'stage':this.props.index})
                   }
                  
                 });
              
              }
              if(this.mobilecheck()==="ios"){
                cordova.plugins.perm.permCheck("permCheck", function(response){
          
           
                  if(window.ADB && response==="True"){
                    window.ADB.trackAction('service phone call', {'stage':this.props.index})
                   }
                  
                 });
              
              }

              window.location.href = `tel:${this.props.additionalInfo.workshop.Telephone}`
            }} > {this.props.additionalInfo.workshop.Telephone} </div> : null}

            {this.renderChatFrame()}
          </div>
        </div>
      )
    }
    return (
      <div key={'expanded-status-content'}>
          <div className="status_title_top_space">
            <div className="status-title">
              {T.translate(`my vehicle.status tracker.${this.props.statusInfo.name.toLowerCase()}.stage name`)}
              
            </div>
            <span className="glyphicon glyphicon-menu-up" aria-hidden="true" style={{ color: "#AAAAAA", fontSize: "16px", }} />
          </div>
          {this.isFirst ? <div className="booking-info"> {T.translate("my vehicle.status tracker.booking.booking confirmed")} </div> : `` }
          {this.isFirst ? <div className="booking-time"> {this.clearTime()}</div> : ``}
          <div className="status-estimation">
            {
              this.isFinished ?
              (this.isFirst ? `` : this.isThird ? T.translate("my vehicle.status tracker.service duration") + " 15 " + T.translate("my vehicle.status tracker.mins") : this.isForth ? T.translate("my vehicle.status tracker.service duration") + " 30 " + T.translate("my vehicle.status tracker.mins") : T.translate("my vehicle.status tracker.service duration") + " 2 " + T.translate('my vehicle.status tracker.hours') + " 30 " + T.translate("my vehicle.status tracker.mins"))
              :
              (
                this.isLast ?
                ``
                :
                (
                  <div>
                    {T.translate("my vehicle.status tracker.estimated time left") + " " + this.props.statusInfo.estimatedTime + " " +  T.translate("my vehicle.status tracker.mins")}
                    <br/>
                    {getEstimatedFinish(this.props.statusInfo.startTime,this.props.statusInfo.estimatedTime)}
                  </div>
                )

              )
            }
          </div>
          {this.isForth ? <div className="exterior"> {T.translate("my vehicle.status tracker.cleaning.overview.exterior.title")} </div>: ""}

          <div className="status-item-list">
            {this.props.checkItems.checkList.map((item, key) =>
              <div
                className={this.isFirst || this.isLast || this.isThird ? ( this.isFirst && key === 2 || this.isLast && key === 3 ? "special-info special-status-item" : (this.isFirst && key === 0 || this.isLast && key === 1) ? "dealer-title" : "special-status-item") : "status-item"}
                key={key}
              >
                { item }
              </div>
            )}
            {(this.isFirst || this.isLast) && this.props.additionalInfo.workshop.Telephone ? <div className="status-more-details" onClick={() => {
              //AAnalytics
             /*if(window.ADB){
                window.ADB.trackAction('service phone call', {'stage':this.props.index})
               }*/

               if(this.mobilecheck()==="android"){
                cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
          
           
                  if(window.ADB && response==="PermissionIsOpen"){
                    window.ADB.trackAction('service phone call', {'stage':this.props.index})
                   }
                  
                 });
              
              }
              if(this.mobilecheck()==="ios"){
                cordova.plugins.perm.permCheck("permCheck", function(response){
          
           
                  if(window.ADB && response==="True"){
                    window.ADB.trackAction('service phone call', {'stage':this.props.index})
                   }
                  
                 });
              
              }

              window.location.href = `tel:${this.props.additionalInfo.workshop.Telephone}`
            }} > {this.props.additionalInfo.workshop.Telephone} </div> : null}

            {this.isFirst || this.isLast || this.isThird || this.isForth ? "" : <div className="status-more-details" onClick={this.props.handleMaintenanceDetailsClick} > {T.translate("my vehicle.status tracker.more detail")} </div>}
            {this.isFirst || this.isLast || this.isThird || this.isForth ? "" : <div className="status-more-details" onClick={this.props.handleAddtionalServicesClick} >{T.translate("my vehicle.status tracker.additional services")}</div>}
            {this.isForth ? <div className="status-more-details" onClick={this.props.handleCleaningServicesClick} >{T.translate("my vehicle.status tracker.more detail")} </div> : ""}
            {/* {this.isSecond || (!this.isThird) || (!this.isForth)? <div className="status-more-details" onClick={this.props.handleCancelBooking} > {T.translate("my vehicle.status tracker.cancel booking request")} </div>:""} */}
            {this.isSecond && this.isPending ? <div className="status-more-details" style={{ marginBottom: "20px" }}><div className="start-icon" />{T.translate("my vehicle.status tracker.additional services")}</div> : "" }
            {/* Randevu onay iptali */}
            {this.props.statusInfo.name.toLowerCase()==="booking" && this.props.currentStage==0?<div className="status-more-details" onClick={this.props.handleCancelBooking} > {T.translate("my vehicle.status tracker.cancel booking request")} </div>:""}
            {this.renderChatFrame()}
            {this.renderFeedback(this.isLast)}

          </div>
      </div>
    )
  }
  renderNestedItem(statusIndex) {
    return (
      <div className="status-content" onClick={this.isPending ? i => i : () => this.props.handleItemClick(this.props.index)} >
        <div
          className="status-pending-title"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: statusIndex === 0 ? "" : "white",
            paddingTop : "15px",
          }}
        >
          {T.translate(`my vehicle.status tracker.${this.props.statusInfo.name.toLowerCase()}.stage name`)}
          { this.isPending ?
            "" :
            <span
              className="glyphicon glyphicon-menu-down"
              aria-hidden="true"
              style={{ margin: "2px 0 0 px", color: "#AAAAAA", fontSize: "16px" }}
            />
          }
        </div>
      </div>
    )
  }
  render() {
    const { statusIndex, isExpanded } = this.props.statusInfo

    this.isFinished = (statusIndex === 2)
    this.isFirst = (this.props.index === 0)
    this.isSecond = (this.props.index === 1)
    this.isThird = (this.props.index === 2)
    this.isForth = (this.props.index === 3)
    this.isLast = (this.props.index === 4)
    this.isPending = !(statusIndex === 2 || statusIndex === 1)
    this.isActive = (statusIndex === 1)
    return isExpanded ?
    <Transition
      in={true}
      unmountOnExit={true}
      mountOnEnter={true}
      timeout={fadeDuration}
    >
      {(state) => {
        return (
          <div className={"status-content"} style={{
             ...fixFadeStyle,
             ...transitionfadeStyles[state]
           }}>
            {this.renderExpandedItem()}
          </div>
        )
      }}
      </Transition> : this.renderNestedItem(statusIndex)
  }
}

StatusContent.contextTypes = {
  router: React.PropTypes.object.isRequired
}

StatusContent.propTypes = {
  statusInfo: PropTypes.object,
  handleItemClick: PropTypes.func,
  index: PropTypes.number,
  length: PropTypes.number,
  checkItems: PropTypes.object,
}
