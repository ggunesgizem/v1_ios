import React, { Component, PropTypes } from 'react'
import T from 'i18n-react'
import sprintf from 'sprintf'

import './contacts.css'


let number = '444 62 44'
export default class Contact extends Component {
  constructor(props) {
    super(props)
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

  render() {

    return (
      <div className="contact-container">
        <div className="contact-sub-header">
          {T.translate("contactus.contacts.emergency contact")}
        </div>
        <div className="contact-help-text">
          {T.translate("contactus.contacts.emergency details")}
        </div>
        <div className="contact-text">
          {T.translate("contactus.contacts.emergency footnote")}
        </div>
        <div className="contact-call-container" onClick={() => {
          //AAnalytics
          /*if(window.ADB){
            window.ADB.trackAction('contact emergency')
          }*/

          if(this.mobilecheck()==="android"){
            cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
      
       
              if(window.ADB && response==="PermissionIsOpen"){
                window.ADB.trackAction('contact emergency')
               }
              
             });
          
          }
          

          window.location.href = 'tel:'+number
        }}>
          <div className="contact-call-text">
          {sprintf(T.translate("contactus.contacts.button.tel"), {number:number})}
          </div>
          <div className="contact-call-icon" />
        </div>
      </div>
    )
  }
}
