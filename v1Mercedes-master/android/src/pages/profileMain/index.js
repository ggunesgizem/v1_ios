import React, { Component } from 'react'
import TopBar from '../../components/TopBar'
import '../page.css'
import Tab from '../../components/Tab'
import T from 'i18n-react'
import ProfileContainer from  '../../containers/ProfileContainer'
import VehicleSettingContainer from '../../containers/VehicleSettingContainer'
import SettingsContainer from '../../containers/SettingsContainer'

export default class ProfileMain extends Component {

  constructor(props){
    super(props)
    this.state = {
      lang : props.selectedLanguage,
    }
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

  componentWillReceiveProps(np){

  }

  componentDidMount() {
    
  }

  triggerStats(item){
    //AAnalytics
    /*if(window.ADB){
      window.ADB.trackState('profile',{'subtab':item})
     }*/

     if(this.mobilecheck()==="android"){
      cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){

 
        if(window.ADB && response==="PermissionIsOpen"){
          window.ADB.trackState('profile',{'subtab':item})
         }
        
       });
    
    }

  }

  render() {

    const style = {
      display : this.props.active ? "flex" : "none"
    }

    let items = [{
      aaname: "personal",
      tabname : T.translate("profile.personal.title"),
      component : <ProfileContainer topbar={this.props.topbar} router={this.props.router}/>
    },
    {
      aaname: "vehicle",
      tabname : T.translate("profile.vehicle.title"),
      component : <VehicleSettingContainer router={this.props.router} showVehEditModal={this.props.showVehEditModal}/>
    },
    {
      aaname: "settings",
      tabname : T.translate("profile.settings.title"),
      component : <SettingsContainer router={this.props.router} topbar={this.props.topbar} showSetPreferenceModal={this.props.showSetPreferenceModal}/>
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
