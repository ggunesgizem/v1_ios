import React, { Component, PropTypes } from 'react'
import T from 'i18n-react'

import './social.css'

export default class Social extends Component {
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
      <div className="social-container">
        <div className="social-row-container">
          <div className="social-link-facebook" onClick={() => {
             console.log("SOCIAL") 
        
             /*if(window.ADB){
              console.log("SOCIAL") 
              window.ADB.trackAction('social facebook')
            }*/

            if(this.mobilecheck()==="android"){
              cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
        
         
                if(window.ADB && response==="PermissionIsOpen"){
                  window.ADB.trackAction('social facebook')
                 }
                
               });
            
            }
            if(this.mobilecheck()==="ios"){
              cordova.plugins.perm.permCheck("permCheck", function(response){
        
         
                if(window.ADB && response==="True"){
                  window.ADB.trackAction('social facebook')
                 }
                
               });
            
            }

            window.open('https://www.facebook.com/mercedesbenztr','_system')
          }}/>
          <div className="social-link-web" onClick={() => {
             console.log("SOCIAL LINK") 
            //AAnalytics
             /*if(window.ADB){
              console.log("SOCIAL") 
              window.ADB.trackAction('social web')
             }*/

             if(this.mobilecheck()==="android"){
              cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
        
         
                if(window.ADB && response==="PermissionIsOpen"){
                  window.ADB.trackAction('social web')
                 }
                
               });
            
            }
            if(this.mobilecheck()==="ios"){
              cordova.plugins.perm.permCheck("permCheck", function(response){
        
         
                if(window.ADB && response==="True"){
                  window.ADB.trackAction('social web')
                 }
                
               });
            
            }

            window.open('http://www.mercedes-benz.com.tr/content/turkey/mpc/mpc_turkey_website/tr/home_mpc/passengercars.html','_system')
          }}/>
        </div>
        <div className="social-row-container">
          <div className="social-link-ins" onClick={() => {
            //AAnalytics
            /* if(window.ADB){
               window.ADB.trackAction('social instagram')
            }*/

            if(this.mobilecheck()==="android"){
              cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
        
         
                if(window.ADB && response==="PermissionIsOpen"){
                  window.ADB.trackAction('social instagram')
                 }
                
               });
            
            }
            if(this.mobilecheck()==="ios"){
              cordova.plugins.perm.permCheck("permCheck", function(response){
        
         
                if(window.ADB && response==="True"){
                  window.ADB.trackAction('social instagram')
                 }
                
               });
            
            }

            if(this.props.selectedLanguage === "ENGLISH"){
              window.open('http://instagram.com/mercedesbenzturkiye','_system')
            }else{
              window.open('http://instagram.com/mercedesbenzturkiye','_system')
            }
          }}/>
          <div className="social-link-twitter" onClick={() => {
            //AAnalytics
             /*if(window.ADB){
              window.ADB.trackAction('social twitter')
             }*/

             if(this.mobilecheck()==="android"){
              cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
        
         
                if(window.ADB && response==="PermissionIsOpen"){
                  window.ADB.trackAction('social twitter')
                 }
                
               });
            
            }
            if(this.mobilecheck()==="ios"){
              cordova.plugins.perm.permCheck("permCheck", function(response){
        
         
                if(window.ADB && response==="True"){
                  window.ADB.trackAction('social twitter')
                 }
                
               });
            
            }

            window.open('https://twitter.com/mercedesturkiye','_system')
          }}/>
        </div>
        <div className="social-row-container">
          <div className="social-link-youtube" onClick={() => {
            //AAnalytics
             /*if(window.ADB){
              window.ADB.trackAction('social youtube')
            }*/

            if(this.mobilecheck()==="android"){
              cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
        
         
                if(window.ADB && response==="PermissionIsOpen"){
                  window.ADB.trackAction('social youtube')
                 }
                
               });
            
            }
            if(this.mobilecheck()==="ios"){
              cordova.plugins.perm.permCheck("permCheck", function(response){
        
         
                if(window.ADB && response==="True"){
                  window.ADB.trackAction('social youtube')
                 }
                
               });
            
            }
            

            window.open('http://www.youtube.com/mbtrvideo','_system')
          }}/>
          <div className="social-link-blank" />
        </div>
      </div>
    )
  }
}
