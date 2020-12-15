import React, { Component, PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import _ from 'lodash'
import { selectService, updateStage, setCurrentStage } from '../../actions/bookingAction'
import BookingProgressBar from '../../components/BookingProgressBar'
import { MUI_SelectField, MUI_TextField, MUI_CheckBox } from '../../components/MuiForms'
import {reset} from 'redux-form'
import { TextField } from 'material-ui'
import T from 'i18n-react'
import "../../containers/form.css"
import "./selectService.css"
import infoIcon from '../../assets/info.svg'

class SelectService extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCheckBoxChange = this.onCheckBoxChange.bind(this)
    this.renderEach = this.renderEach.bind(this)
    this.renderField = this.renderField.bind(this)
    this.onChange = this.onChange.bind(this)
    this.validateBooking = this.validateBooking.bind(this)
    this.enableSubmitBtn = this.enableSubmitBtn.bind(this)
    this.state = {
      selectedServices: this.props.booking.services,
      isPopupShow : false
    }
    this.textInput = null
  }

  componentWillMount(){

  }

  componentWillReceiveProps(np){
    this.setState({
      selectedServices: np.booking.services,
    })
    
  }

  componentDidMount(){
    this.props.selectService({})
  }

  componentWillUnmount(){
    this.props.selectService({})
    
  }

  formatMileage(mile){
    if(mile === "undefined"){
      return ""
    }
    if(mile == null){
      return ""
    }

    if(mile == ""){
      return ""
    }

    var mileageInString = mile.toString()
    var cleanMile = ""
    for(var tt = 0; tt < mileageInString.length; tt++){
      if(!isNaN(mileageInString[tt])){
        cleanMile = cleanMile.concat(mileageInString[tt])
      }
    }

    if(cleanMile === ""){
      return ""
    }

    let mileageString = parseInt(cleanMile)
    mileageString = mileageString.toFixed(0).replace(/./g, function(c, i, a) {
      return i && c !== "," && ((a.length - i) % 3 === 0) ? '.' + c : c
    })

    return mileageString
  }

  onCheckBoxChange(e, type){
    const updatedService = Object.assign({}, this.state.selectedServices)

    if (type === "other") {
      updatedService.other = e.target.value
    } else if(type === "tyreChangeComment") {
      updatedService.tyreChangeComment = e.target.value
    } else if (type === "tyreChange") {
      if(e.target.checked){
        updatedService[type] = e.target.checked
      } else {
        updatedService.tyreChangeComment = ""
        updatedService[type] = e.target.checked
      }
    } else {
      updatedService[type] = e.target.checked
    }

    this.props.selectService(updatedService)
    this.enableSubmitBtn(updatedService)
  }

  onChange(e) {
    const updatedService = Object.assign({}, this.state.selectedServices)
    if (e.target.name === "other") {
      updatedService.other = e.target.value
    } else if(e.target.name === "tyreChangeComment") {
      updatedService.tyreChangeComment = e.target.value
    } else if (e.target.name === "mileage") {

      var temp = this.formatMileage(e.target.value)
      updatedService.mileage = temp
    }
    this.props.selectService(updatedService)
    this.enableSubmitBtn(updatedService)
  }

  onSubmit(values) {
    if(!(!this.props.anyTouched || !this.props.valid || !this.props.booking.services.mileage)){
      if(this.props.latestStage < 4){
        this.props.updateStage(4)
      } else {
        console.log("not updating latestStage: ", this.props.latestStage)
      }
      this.props.setCurrentStage(4)
      //this.context.router.push('/newappointmentmain/confirmbooking')
    }
  }

  enableSubmitBtn(items) {
    const formStatus = this.validateBooking(items)
    if(formStatus.dateTime.isValid && formStatus.workshop.isValid && formStatus.agent.isValid && formStatus.vehicle.isValid && formStatus.services.isValid){
      return true
    } else {
      if(this.props.latestStage > 3){
        this.props.updateStage(3)
      }
      return false
    }
  }

  validateBooking(items) {
    const formStatus = {
      workshop: {
        msg: "Workshop",
        isValid: true,
      },
      agent: {
        msg: "Service advisor",
        isValid: true,
      },
      dateTime: {
        msg: "Date and time",
        isValid: true,
      },
      services: {
        msg: "Service detail",
        isValid: true,
      },
      vehicle: {
        msg: "Vehicle",
        isValid: true,
      },
    }
    // console.log("validateBooking", this.props.booking)

    // check date form
    if (this.props.booking.dates) {
      _.forIn(this.props.booking.dates, (value) => {
        if (value === "") {
          formStatus.dateTime.isValid = false
        }
      })
    } else {
      formStatus.dateTime.isValid = false
    }
    // console.log("dataTime ", formStatus.dateTime.isValid)

    // check dealer
    if (!this.props.booking.selectedDealer) {
      formStatus.workshop.isValid = false
    }
    // console.log("workshop ", formStatus.workshop.isValid)
    if (!this.props.booking.selectedAgent || this.props.booking.selectedAgent.WorkshopId !== this.props.booking.selectedDealer.WorkshopId) {
      formStatus.agent.isValid = false
    }

    // check vehicle
    if (!this.props.booking.vehicle) {
      formStatus.vehicle.isValid = false
    }
    // console.log("vehicle ", formStatus.vehicle.isValid)

    if (!items.mileage || items.mileage === "") {
      formStatus.services.isValid = false
    } else {
      // check services

      var r = true
      /*if(items.maintenance || items.inspection || items.repair || items.appointmentSelected || items.paint){

      }else{
        
      }*/
      /*if(!items.other){
        r = false
      }else if(items.other === ""){
        r = false
      }*/
      formStatus.services.isValid = r
    }
    // console.log("services ", formStatus.services.isValid)
    // return (formStatus.dateTime.isValid && formStatus.workshop.isValid && formStatus.vehicle.isValid && formStatus.services.isValid
    return formStatus
  }

  renderField(p) {
    const {tou, val, input, label, type, selectedServices, meta: { touched, error, warning }} = p
    let inputComponent
    if (type === 'checkbox') {
      var newInput = {...input, value:val}
      inputComponent = (
        <div className="checkbox-container">
          <label className="checkbox-container-title" htmlFor={label}> {label} </label>
          <div>
            <MUI_CheckBox
              input={newInput}
              onPreChange={this.onCheckBoxChange}
              errorText={error}
            />
          </div>
        </div>
      )
    } else if (type === 'textarea') {
      var newInput = {...input, value:val}
      inputComponent = (
        <div className="select-service-other">
          {
            (input.name === "other" || selectedServices.tyreChange) ?
            <MUI_TextField
              {...p}
              input={newInput}
              multiLine={true}
              rows={3}
              onPreChange={this.onChange}
              disabled={input.name === "other" ? false : selectedServices.tyreChange ? false : true}
            />
            :
            null
          }
        </div>
      )
    } else if (type === 'text') {
      var newInput = {...input, id:"mileageId", ref : (input) =>  { if(this.textInput == null ) { this.textInput = input.input} }}
      inputComponent = (
        <div className="select-service-mileage">
          <div className="selectFieldContainer">
            <TextField
              underlineStyle={{borderColor:"#cccccc"}}
              underlineFocusStyle={{borderColor:"#00adef"}}
              hintText={""}
              hintStyle={{color:"#cccccc", fontSize:"18px", fontFamily:"CorpoS"}}
              floatingLabelText={label}
              floatingLabelStyle={{fontSize:"18px"}}
              floatingLabelFocusStyle={{color:"#cccccc"}}
              errorText={touched && error ? error : null}
              errorStyle={{color:"#8c0005", fontFamily:"CorpoS_Light", fontSize:"13px"}}
              style={{width:"100%",fontSize:"18px", fontFamily:"CorpoS"}}
              {...newInput}
              onChange={(event, value)=>{
                this.onChange(event, input.name)
                newInput.onChange(event)
              }}
              value={val}
            />
          </div>
        </div>
      )
    } else if (type === 'header') {
      inputComponent = (
        <div className="select-service-form-section">
          {label}
        </div>
      )
    } else if (type === 'errorSpace') {
      inputComponent = (
        <div className="select-service-errorSpsace">
          {error && tou ? error : ""}
        </div>
      )
    }
    return (
      <div className="select-service-form-item">
        {inputComponent}
      </div>
    )
  }

  renderEach(fieldConfig, field) {
    if(fieldConfig.name==="header1")
    {
      return (
        <div>
          <div className='select-service-form-item'>
            <div className='select-service-form-section'>
              {fieldConfig.label}
              {/* Normal popup çıkaran info iconu */}
              <img src={infoIcon} onClick={()=>{
                navigator.notification.confirm('Randevu talepleri ve araç servis durum takip fonksiyonu yalnızca "Periyodik Bakım" işlemleri için aktiftir.',()=>{},'Randevu Bilgisi',['Tamam']);
              }} style={{width:20,height:20,marginLeft:10}} className="animated flash delay-2s slow"/>

              {/* Custom popop yapısını gösteren info iconu */}
              {/* {<img src={infoIcon} onClick={()=>{
                this.setState({ isPopupShow : true });
              }} style={{width:20,height:20,marginLeft:10}} className="animated flash delay-2s slow"/>} */}

            </div>
          </div>
        </div>
      );
    }
    else if(fieldConfig.name==="header3")
    {
      return (
        <div>
          <div className='select-service-form-item'>
            <div className='select-service-form-section'>
              {fieldConfig.label}
              <img src={infoIcon} onClick={()=>{
                navigator.notification.confirm('Vale hizmeti ve İkame araç hizmetleri belirli yetkili servislerimizde geçerlidir. Hizmetin geçerli olması durumunda, talebinizle ilgili olarak yetkili servislerimiz sizinle iletişime geçecektir.',()=>{},'Diğer Hizmetler',['Tamam']);
              }} style={{width:20,height:20,marginLeft:10}} />
            </div>
          </div>
        </div>
      );
    }
    else if(fieldConfig.name==="question")
    {
      return (
        <div style={{borderColor:'black',borderWidth:2,borderStyle:'solid',color:'black',margin:10,fontSize:18,padding:5,fontFamily:'CorpoS_Light,Times,serif',textAlign:'left'}}>
          {fieldConfig.label}
        </div>
      );
    }
    else{
      return (
        <Field key={field} name={field}
          type={fieldConfig.type}
          component={this.renderField}
          label={fieldConfig.label}
          selectedServices={this.state.selectedServices}
          val={fieldConfig.value}
          tou={fieldConfig.tou}/>
      )
    }
    
  }

  render() {
    const FIELDS = {
      header1: {
        name: 'header1',
        type: 'header',
        label: T.translate("booking.services.general.title"),
      },
      mileage: {
        name: 'mileage',
        type: 'text',
        label: T.translate("booking.services.general.mileage of your vehicle"),
        value: this.formatMileage(this.state.selectedServices.mileage),
      },
      appointmentSelected: {
        name: 'appointmentSelected',
        type: 'checkbox',
        label: T.translate("booking.services.general.appointmentSelected"),
        value: 'appointmentSelected',
      },
      question: {
        name: 'question',
        type: 'header',
        label: 'Periyodik Bakım haricinde yaptırmak istediğiniz ek işlemler var mı?',
      },
      /*inspection: {
        name: 'inspection',
        type: 'checkbox',
        label: T.translate("booking.services.general.general inspection"),
        value: this.state.selectedServices.inspection,
      },
      maintenance: {
        name: 'maintenance',
        type: 'checkbox',
        label: T.translate("booking.services.general.maintenance"),
        value: this.state.selectedServices.maintenance,
      },*/
      repair: {
        name: 'repair',
        type: 'checkbox',
        label: T.translate("booking.services.general.repair"),
        value: this.state.selectedServices.repair,
      },
      paint: {
        name: 'paint',
        type: 'checkbox',
        label: T.translate("booking.services.general.paint/body"),
        value: this.state.selectedServices.paint,
      },
      tyreChange: {
        name: 'tyreChange',
        type: 'checkbox',
        label: T.translate("booking.services.tyre.tyre change"),
        value: this.state.selectedServices.tyreChange,
      },
      tyreChangeComment: {
        name: 'tyreChangeComment',
        type: 'textarea',
        label: T.translate("booking.services.tyre.tyre change request"),
        value: this.state.selectedServices.tyreChangeComment,
      },
      other: {
        name: 'other',
        type: 'textarea',
        label: T.translate("booking.services.others.other request hint"),
        value: this.state.selectedServices.other,
      },
      errorSpace :{
        name: 'errorSpace1',
        type: 'errorSpace',
        tou : this.props.anyTouched,
      },
      /*header2: {
        name: 'header2',
        type: 'header',
        label: T.translate("booking.services.tyre.title"),
      },*/
      
      header3: {
        name: 'header3',
        type: 'header',
        label: T.translate("booking.services.others.title"),
      },
      valet: {
        name: 'valet',
        type: 'checkbox',
        label: T.translate("booking.services.others.valet service"),
        value: this.state.selectedServices.valet,
      },
      replacementCar: {
        name: 'replacementCar',
        type: 'checkbox',
        label: T.translate("booking.services.others.replacement car"),
        value: this.state.selectedServices.replacementCar,
      },
    }
    return (
      <div className="select-service-container" style={{display:this.props.active?"block":"none"}}>

      <div className="custom-modal" onClick={()=>{ this.setState({isPopupShow:false}) }} style={{ display: this.state.isPopupShow?'block':'none' }}>
        <div className="modal-message">
        <div className="title">Randevu Bilgisi</div>
        Randevu talepleri ve araç servis durum takip fonksiyonu yalnızca "Periyodik Bakım" işlemleri için aktiftir.
        </div>
      </div>

        <BookingProgressBar
          title = {T.translate("booking.services.title")}
          currentStage = {3}
          latestStage = {this.props.latestStage}
          switchStage = {this.props.switchStage}
        />
        <form className="select-service-form" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          { _.map(FIELDS, this.renderEach)}
          <button type="submit" className="btn button_general">{T.translate("booking.services.button.next")}</button>
        </form>
      </div>
    )
  }
}

SelectService.contextTypes = {
  router: React.PropTypes.object.isRequired
}

SelectService.propTypes = {
  handleSubmit: PropTypes.func,
  selectService: PropTypes.func,
  booking: PropTypes.object,
}

SelectService.defaultProps = {
  handleSubmit: i => i,
  selectService: i => i,
  dispatch: i => i,
  booking: {},
}

const warn = () => {
  const warnings = {}
  return warnings
}

const validate = values => {
  const errors = {}
  if (!values.mileage || values.mileage === "") {
    errors.mileage = T.translate("booking.services.form.validation.required")
  }

  /*if(typeof(values.maintenance) === "undefined" &&
    typeof(values.inspection) === "undefined" &&
    typeof(values.repair) === "undefined" &&
    typeof(values.paint) === "undefined"
  ){
    var r = false
    if(!values.other){
      r = true
    }else if(values.other === ""){
      r = true
    }
    if(r){
      errors.errorSpace = T.translate("booking.services.form.validation.please specify at least a service")
    }
  }*/
  return errors
}

function mapStateToProps(state) {
  const { booking } = state
  booking.selectedDealer = state.dealer.selected
  booking.selectedAgent = state.agent.selected
  return {
    booking,
    latestStage : state.booking.latestStage,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectService : (item) => {dispatch(selectService(item))},
    updateStage : (item) => {dispatch(updateStage(item))},
    setCurrentStage : (item) => {dispatch(setCurrentStage(item))},
    formReset : () => {dispatch(reset('SelectServiceForm'))}
  }
}

const WrappedSelectDateContainer = reduxForm({
  form: 'SelectServiceForm',
  validate,
  warn,
})(SelectService)



export default connect(mapStateToProps, mapDispatchToProps)(WrappedSelectDateContainer)
