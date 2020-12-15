import React, { Component } from 'react'
import TopBar from '../../components/TopBar'
import '../page.css'
import Tab from '../../components/Tab'
import Contacts from  '../../components/Contacts'
import Social from '../../components/Social'
import T from 'i18n-react'

export default class ContactUsMain extends Component {

  constructor(props){
    super(props)
    this.triggerStats = this.triggerStats.bind(this)
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

  componentDidMount() {

  }

  triggerStats(item){
    //AAnalytics
    /*if(window.ADB){
      window.ADB.trackState('contact us',{'subtab':item})
     }*/

     if(this.mobilecheck()==="android"){
      cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){

 
        if(window.ADB && response==="PermissionIsOpen"){
          window.ADB.trackState('contact us',{'subtab':item})
         }
        
       });
    
    }
    if(this.mobilecheck()==="ios"){
      cordova.plugins.perm.permCheck("permCheck", function(response){

 
        if(window.ADB && response==="True"){
          window.ADB.trackState('contact us',{'subtab':item})
         }
        
       });
    
    }

  }

  render() {
    const style = {
      display : this.props.active ? "flex" : "none"
    }
    let items = [{
      aaname: "contactsemergency",
      tabname : T.translate("contactus.contacts.title"),
      component : <Contacts topbar={this.props.topbar} router={this.props.router}/>
    },
    {
      aaname: "contactssocial",
      tabname : T.translate("contactus.social.title"),
      component : <Social selectedLanguage={this.props.selectedLanguage} topbar={this.props.topbar} router={this.props.router}/>
    },]
    return (
      <div className="productsMainContainer" style={style}>
      <div className="productsMains">
        <Tab
          triggerStats={this.triggerStats}
          list={items}
          paddingTopBottomSize={"4px"}
          paddingLeftRightSize={"12px"}
          selectedLanguage={this.props.selectedLanguage}
          />
      </div>
      </div>
    )
  }
}
