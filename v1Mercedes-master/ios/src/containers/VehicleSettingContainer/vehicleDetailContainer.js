import React, { Component } from 'react'
import { connect } from 'react-redux'
import './vehicleSettingContainer.css'
import VehicleSettingList from '../../components/VehicleSettingList'
import VehicleEditForm  from '../../components/VehicleSettingList/VehicleEditForm'
import ButtonPage from '../../components/ButtonPage'
import { submit, reset } from 'redux-form'
import T from 'i18n-react'
import { updateVehicle, deleteVehicle } from '../../actions/vehicleAction'
import { fReloadContent } from '../../actions/initialAction'

class VehicleDetailContainer extends Component {

  constructor(props) {
    super(props)
    this.updateVehCallBcack = this.updateVehCallBcack.bind(this)
    this.updateVehErrCallBack = this.updateVehErrCallBack.bind(this)
    this.deleteVehCallBcack = this.deleteVehCallBcack.bind(this)
    this.deleteVehErrCallBack = this.deleteVehErrCallBack.bind(this)
    this.state = {
      isNeedUpdate : false,
    }
  }

  componentDidMount() {
    
  }

  componentWillReceiveProps(np){
    let needChange = false
    if(np.selectedVeh !== null && np.form){
      if(np.form.initial.Mileage.toString() !== np.form.values.Mileage.toString()){
        needChange = true
      }
      if(np.form.initial.SeriesId !== np.form.values.SeriesId){
        needChange = true
      }
      if(np.form.initial.ModelId !== np.form.values.ModelId){
        needChange = true
      }
      if(np.form.initial.YearModel.toString() !== np.form.values.YearModel.toString()){
        needChange = true
      }
    }
    this.setState({
      isNeedUpdate : needChange
    })
  }

  updateVehCallBcack(){
    this.props.resetForm()
    this.props.fReloadContent(false)
    if(navigator.notification){
      navigator.notification.alert(
          T.translate("vehicleedit.notification.edit.success.message"),  // message
          ()=>{
            this.props.closeModal()
          },         // callback
          '',            // title
          T.translate("vehicleedit.notification.edit.success.close")                  // buttonName
      );
    }else{
      alert(T.translate("vehicleedit.notification.edit.success.message"))
      this.props.closeModal()
    }
  }

  updateVehErrCallBack(){
    if(navigator.notification){
      navigator.notification.alert(
          T.translate("vehicleedit.notification.edit.error.message"),  // message
          ()=>{
          },         // callback
          T.translate("vehicleedit.notification.edit.error.title"),            // title
          T.translate("vehicleedit.notification.edit.error.close")                  // buttonName
      );
    }else{
      alert(T.translate("vehicleedit.notification.edit.error.message"))
    }
  }

  deleteVehCallBcack(){
    if(navigator.notification){
      navigator.notification.alert(
          T.translate("vehicleedit.notification.delete.success.message"),  // message
          ()=>{
            this.props.closeModal()
          },         // callback
          '',            // title
          T.translate("vehicleedit.notification.delete.success.close")                  // buttonName
      );
    }else{
      alert(T.translate("vehicleedit.notification.delete.success.message"))
      this.props.closeModal()
    }
  }

  deleteVehErrCallBack(type){
    if(type){
      if(navigator.notification){

        navigator.notification.alert(
            T.translate("vehicleedit.notification.delete.error.secondary.message"),  // message
            ()=>{
            },         // callback
            T.translate("vehicleedit.notification.delete.error.secondary.title"),            // title
            T.translate("vehicleedit.notification.delete.error.secondary.close")                  // buttonName
        );
      }else{
        alert(T.translate("vehicleedit.notification.delete.error.secondary.message"))
      }
    }
    return

    if(navigator.notification){

      navigator.notification.alert(
          T.translate("vehicleedit.notification.delete.error.primary.message"),  // message
          ()=>{
          },         // callback
          T.translate("vehicleedit.notification.delete.error.primary.title"),            // title
          T.translate("vehicleedit.notification.delete.error.primary.close")                  // buttonName
      );
    }else{
      alert(T.translate("vehicleedit.notification.delete.error.primary.message"))
    }
  }

  submitForm(){
    this.props.updateVehicle(this.props.form.values,this.updateVehCallBcack, this.updateVehErrCallBack)
  }

  removeVehicle(){
    if(navigator.notification){
      navigator.notification.confirm(T.translate("vehicleedit.notification.delete.comfirmation.message"), (buttonIndex)=>{
        if(buttonIndex === 2){
        } else if(buttonIndex === 1) {
          this.props.deleteVehicle({VehicleId : this.props.selectedVeh.VehicleId, Plate : this.props.selectedVeh.Plate},this.deleteVehCallBcack, this.deleteVehErrCallBack)
        }
      }, T.translate("vehicleedit.notification.delete.comfirmation.title"),[T.translate("vehicleedit.notification.delete.comfirmation.accept"),T.translate("vehicleedit.notification.delete.comfirmation.reject")])
    }else{
      this.props.deleteVehicle({VehicleId : this.props.selectedVeh.VehicleId, Plate : this.props.selectedVeh.Plate},this.deleteVehCallBcack, this.deleteVehErrCallBack)
    }
  }

  render() {
    var buttonState = false
    if(this.props.form){
      buttonState = (typeof this.props.form.syncErrors === "undefined" && this.state.isNeedUpdate)
    }
    return (
      <ButtonPage
        buttonState={buttonState}
        content={
          <div className="vehicleUpdateForm_container">
            {this.props.selectedVeh != null ?
            <VehicleEditForm
              veh={this.props.selectedVeh}
              submitForm={this.submitForm}
              initialValues={this.props.selectedVeh}
              />
              :
              null
            }

            <div className="vehicleUpdateForm_removeButton_container">
              <div onClick={this.removeVehicle.bind(this)} className="vehicleUpdateForm_removeButton">{T.translate("vehicleedit.button.remove")}</div>
            </div>
          </div>}
        buttonText={T.translate('vehicleedit.button.save')}
        buttonText_disbaled={T.translate('vehicleedit.button.save')}
        onclick={this.submitForm.bind(this)}
        hideButton={false}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
    form : state.form.vehicleUpdateForm,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitForm : () => dispatch(submit("vehicleUpdateForm")),
    resetForm : () => dispatch(reset("vehicleUpdateForm")),
    updateVehicle : (veh,callBackF,errCallBackF) => dispatch(updateVehicle(veh,callBackF,errCallBackF)),
    deleteVehicle : (vehId,callBackF,errCallBackF) => dispatch(deleteVehicle(vehId,callBackF,errCallBackF)),
    fReloadContent : (b) => dispatch(fReloadContent(b))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(VehicleDetailContainer)
