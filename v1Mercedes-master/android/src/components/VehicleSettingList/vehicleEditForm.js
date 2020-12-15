import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, initialize } from 'redux-form'
import { MUI_SelectField, MUI_TextField_CUS } from '../MuiForms'
import moment from 'moment'
import T from 'i18n-react'

import './vehicleEditForm.css'


const validate = values => {
  const errors = {}
  if(typeof(values.Mileage) === "undefined" || values.Mileage === ""){
      errors.Mileage = T.translate("vehicleedit.form.validation.required")
  }else{
    if(isNaN(Number(values.Mileage))){
      errors.Mileage = T.translate("vehicleedit.form.validation.invaild input")
    } else if(String(values.Mileage).includes(".")) {
      errors.Mileage = T.translate("vehicleedit.form.validation.invaild input")
    }
  }
  if (!values.SeriesId) {
    errors.SeriesId = T.translate("vehicleedit.form.validation.required")
  }
  if (!values.ModelId) {
    errors.ModelId = T.translate("vehicleedit.form.validation.required")
  }
  if (values.YearModel) {
    if(isNaN(Number(values.YearModel))){
        errors.YearModel = T.translate("vehicleedit.form.validation.invaild input")
    }
  } else {
    errors.YearModel = T.translate("vehicleedit.form.validation.required")
  }

  return errors
}

const renderField = (p) => {
  const {touched,error,warning} = p.meta
  return (
    <MUI_TextField_CUS
      {...p}
    />
  )
}

const renderSelect= (p) => {
  const {touched,error,warning} = p.meta
  return (
    <MUI_SelectField
      {...p}
    />
  )
}

class VehicleEditForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      catalog : this.props.catalog,
      selectedVehId : -1,
      setSeries : [{ text:T.translate("vehicleedit.form.no series data"), value : "-1"} ],
      setModels : [{ text:T.translate("vehicleedit.form.select model first"), value : "-1" }],
      selectedSeries : parseInt(props.veh.Model.SeriesId),
      selectedModel: parseInt(props.veh.ModelId),
      selectedYear: parseInt(props.veh.YearModel),
      mileage : props.veh.Mileage,
    }
  }


  loadModelsList(selectedValue){
    var models = []
    this.props.catalog.filter(t => {
      if(t.SeriesID === selectedValue){
        models = t.Models.map(item =>{
          return {
            value : item.ModelID,
            text : item.ModelName,
            obj : item,
          }
        })
      }
    })
    return models
  }

  loadVariantsList(selectedValue, list){
    var variants = []
    list.filter(t => {
      if(t.value === selectedValue){
        variants = t.obj.Variants.map(item => {
          return {
            value : item.VariantID,
            text : item.VariantName,
          }
        })
      }
    })
    return variants
  }

  preOnchangeMileage(e){
    this.setState({
      mileage : e.target.value,
    })
  }

  preOnchangeSeries(selectedValue){
    var models = this.loadModelsList(selectedValue)
    this.setState({
      setModels : models,
      selectedSeries : selectedValue,
      selectedModel : null,
    })
  }

  preOnchangeModels(selectedValue){
    this.setState({
      selectedModel: selectedValue,
    })
  }

  preOnchangeVariant(selectedValue){
    this.setState({
      selectedVariant: selectedValue,
    })
  }

  preOnchangeYearModel(selectedValue){
    this.setState({
      selectedYear: selectedValue,
    })
  }

  componentWillReceiveProps(np){
    if(np.veh.VehicleId != this.state.selectedVehId){

      this.props.initForm({
        VehicleId : np.veh.VehicleId,
        SeriesId : parseInt(np.veh.Model.SeriesId),
        ModelId: parseInt(np.veh.ModelId),
        YearModel: parseInt(np.veh.YearModel),
        Mileage : np.veh.Mileage,
      })

      var modelList = this.loadModelsList(parseInt(np.veh.Model.SeriesId))

      this.setState({
        setModels : modelList,
        selectedVehId : np.veh.VehicleId,
        selectedSeries : parseInt(np.veh.Model.SeriesId),
        selectedModel: parseInt(np.veh.ModelId),
        selectedYear: parseInt(np.veh.YearModel),
        mileage : np.veh.Mileage,
      })
    }
  }

  componentDidUpdate(pp,np){

  }

  componentDidMount() {
    var seriesList = this.props.catalog.map(t => {
      return {
        value : t.SeriesID,
        text : t.SeriesName,
      }
    })

    var modelList = this.loadModelsList(parseInt(this.props.veh.Model.SeriesId))

    this.setState({
      setSeries : seriesList,
      setModels : modelList,
      selectedSeries : parseInt(this.props.veh.Model.SeriesId),
      selectedModel: parseInt(this.props.veh.ModelId),
    })

  }

  generateYearSelection(){
    let sYear = 1926
    let eYear = parseInt(moment().format('YYYY'));

    let items = []
    while(eYear >= sYear){
      items.push({
        value : eYear,
        text : eYear,
      })
      eYear--
    }
    return items
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.submitForm();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Field name="Mileage" type="text" component={renderField} label={T.translate("vehicleedit.form.mileage")} val={this.state.mileage} onPreChange={this.preOnchangeMileage.bind(this)}/>
        <Field
          name="SeriesId"
          type="text"
          component={renderSelect}
          label={T.translate("vehicleedit.form.series")}
          items={this.state.setSeries}
          preOnchange={this.preOnchangeSeries.bind(this)}
          val={this.state.selectedSeries}
        />
        <Field
          name="ModelId"
          type="text"
          component={renderSelect}
          label={T.translate("vehicleedit.form.model")}
          items={this.state.setModels}
          preOnchange={this.preOnchangeModels.bind(this)}
          val={this.state.selectedModel}
        />

        <Field
          name="YearModel"
          type="text"
          component={renderSelect}
          label={T.translate("vehicleedit.form.production year")}
          items={this.generateYearSelection()}
          preOnchange={this.preOnchangeYearModel.bind(this)}
          val={this.state.selectedYear}
        />

      </form>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    catalog: state.vehicle.catalog,
  }
}

function mapDispatchToProps(dispatch){
    return {
      initForm  : (data) => dispatch(initialize("vehicleUpdateForm", data))
    }
}

VehicleEditForm = reduxForm({
  form : 'vehicleUpdateForm',
  validate,
})(VehicleEditForm)

export default connect(mapStateToProps, mapDispatchToProps)(VehicleEditForm)
