import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react'
import { submit, reset } from 'redux-form'
import { registerVehicle } from '../../actions/vehicleAction'
import { changeVehicle } from '../../actions/statusActions'
import ButtonPage from '../../components/ButtonPage'
import RegisterVehicleForm from '../../components/RegisterVehicleForm'

import './vehicleRegister.css'

class VehicleRegistrationContainer extends Component {

  constructor(props) {
    super(props)
    this.vehAddCallBack = this.vehAddCallBack.bind(this)
    this.vehAddErrCallBack = this.vehAddErrCallBack.bind(this)
    this.preclose = this.preclose.bind(this)
    this.state = {
      timeToReset : 0
    }
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

  }

  vehAddCallBack(){
    if(navigator.notification){

      var s = this.props.catalog.find((item)=>{
        if(item.SeriesID === this.props.form.values.Series){
          return true
        }
        return false
      })
      var m = null
      if(s){
        m = s.Models.find((item) => {
          if(item.ModelID === this.props.form.values.Model){
            return true
          }
          return false
        })
      }
      var va = ""
      if(s){
        va = s.SeriesName
      }
      if(m){
        va += " "+m.ModelName
      }

      //AAnalytics
      /*if(window.ADB){
         window.ADB.trackAction('vehicle registration', {'vehicletype':va})
       }*/

       if(this.mobilecheck()==="android"){
        cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
  
   
          if(window.ADB && response==="PermissionIsOpen"){
            window.ADB.trackAction('vehicle registration', {'vehicletype':va})
           }
          
         });
      
      }
      if(this.mobilecheck()==="ios"){
        cordova.plugins.perm.permCheck("permCheck", function(response){
  
   
          if(window.ADB && response==="True"){
            window.ADB.trackAction('vehicle registration', {'vehicletype':va})
           }
          
         });
      
      }

      navigator.notification.alert(
          T.translate("vehicleadd.notification.add.success.message"),  // message
          ()=>{
            this.props.resetVehForm()
            this.props.closeModal()
            this.props.changeVehicle(this.props.noOfVeh - 1 > 0 ? this.props.noOfVeh - 1 : 0)
          },      // callback
          '',     // title
          T.translate("vehicleadd.notification.add.success.close") // buttonName
      );
    }else{
      this.setState({
        timeToReset : ++this.state.timeToReset
      })
      this.props.resetVehForm()
      this.props.closeModal()
      this.props.changeVehicle(this.props.noOfVeh - 1 > 0 ? this.props.noOfVeh - 1 : 0)
    }
  }

  vehAddErrCallBack(errCode){
    var isNotified = false
    if(errCode){
      if(errCode == 406){
        if(navigator.notification){
          navigator.notification.alert(
                T.translate("vehicleadd.notification.add.error.secondary.message"),  // message
              ()=>{
              },         // callback
              T.translate("vehicleadd.notification.add.error.secondary.title"),            // title
              T.translate("vehicleadd.notification.add.error.secondary.close")                  // buttonName
          );
        }else{
          alert(T.translate("vehicleadd.notification.add.error.secondary.message"))
        }
        isNotified = true
      }
    }

    if(!isNotified){
      if(navigator.notification){
        navigator.notification.alert(
              T.translate("vehicleadd.notification.add.error.primary.message"),  // message
            ()=>{
            },         // callback
            T.translate("vehicleadd.notification.add.error.primary.title"),            // title
            T.translate("vehicleadd.notification.add.error.primary.close")                  // buttonName
        );
      }else{
        alert(T.translate("vehicleadd.notification.add.error.primary.message"))
      }
    }

  }

  submitForm(){
    this.props.submitForm();
    if(typeof this.props.form.syncErrors === "undefined" && typeof this.props.form.values !== "undefined"){
      this.props.registerVehicle({ vehicleInfo : this.props.form.values }, this.vehAddCallBack, this.vehAddErrCallBack)
    }
  }

  componentDidMount(){
  }

  preclose(){
    this.setState({
      timeToReset : ++this.state.timeToReset
    })
  }

  render() {
    var newTopBar = {
      ...this.props.topbar,
      props: {
        ...this.props.topbar.props,
        type:"",
        preclose : this.preclose,
        title:T.translate(`vehicleadd.title`)
      }
    }
    var buttonState = false
    if(this.props.form){
      buttonState = (typeof this.props.form.syncErrors === "undefined" && typeof this.props.form.values !== "undefined")
    }

    return (
      <div className="vehicleContainerMain">
        {newTopBar}
        <div className="vehicleContainerMain_content">
          <ButtonPage
            buttonState={buttonState}
            onclick={this.submitForm.bind(this)}
			content={this.props.catalog !== null ? <RegisterVehicleForm lang={this.props.lang} catalog={this.props.catalog} timeToReset={this.state.timeToReset}/> :<span/>}
            buttonText={T.translate("vehicleadd.button.add")}
            buttonText_disbaled={T.translate("vehicleadd.button.add")}
            hideButton={false}
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    catalog: state.vehicle.catalog,
    form : state.form.newVehicleForm,
    noOfVeh : state.vehicle.all.length,
    lang : state.language.selectedLanguage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitForm : () => dispatch(submit("newVehicleForm")),
    resetVehForm : () => dispatch(reset("newVehicleForm")),
    registerVehicle : (veh,callbackFunction,errCallBack)=>{dispatch(registerVehicle(veh, callbackFunction, errCallBack))},
    changeVehicle : (index) => dispatch(changeVehicle(index)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(VehicleRegistrationContainer)
