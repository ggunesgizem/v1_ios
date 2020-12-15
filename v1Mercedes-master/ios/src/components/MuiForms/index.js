import React, { Component, PropTypes } from 'react'
import { SelectField, MenuItem, TextField, DatePicker, Checkbox } from 'material-ui';
import { DateTimeFormat, userTimeZone } from '../../config'
import moment from 'moment-timezone'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import T from 'i18n-react'

export const MUI_CheckBox = (props) => {
  return (
    <Checkbox
      label={""}
      checked={props.input.value ? true : false}
      onCheck={(event, value)=>{
        if(typeof props.onPreChange !== "undefined"){
           props.onPreChange(event, props.input.name)
        }
        props.input.onChange(event)
      }}
    />
  )
}

export const MUI_TextField = (props) => {
  var errorText = null
  if(props.meta.touched && props.meta.error){
    errorText = props.meta.error
  }
  return (
    <div className="selectFieldContainer needsclick">
      <TextField
        underlineStyle={{borderColor:"#cccccc"}}
        underlineFocusStyle={{borderColor:"#00adef"}}
        hintText={""}
        hintStyle={{color:"#cccccc", fontSize:"18px", fontFamily:"CorpoS"}}
      
        floatingLabelText={props.label}
        floatingLabelStyle={{fontSize:"18px"}}
        floatingLabelFocusStyle={{color:"#cccccc"}}
        errorText={errorText}
        errorStyle={{color:"#8c0005",  fontSize:"18px"}}
        errorStyle={{color:"#8c0005", fontFamily:"CorpoS_Light", fontSize:"13px"}}
        style={{width:"100%",fontSize:"18px", fontFamily:"CorpoS"}}
        {...props.input}
        disabled={props.disabled}
        multiLine={props.multiLine ? props.multiLine : false}
        rows={props.row ? props.row : 1}
        onChange={(event, value)=>{
          if(typeof props.onPreChange !== "undefined"){
             props.onPreChange(event, props.input.name)
          }
          props.input.onChange(event)
        }}
      />
    </div>
  )
}

export const MUI_TextField_CUS = (props) => {
  var errorText = null
  if(props.meta.touched && props.meta.error){
    errorText = props.meta.error
  }
  return (
    <div className="selectFieldContainer needsclick">
      <TextField
        underlineStyle={{borderColor:"#cccccc"}}
        underlineFocusStyle={{borderColor:"#00adef"}}
        hintText={""}
        hintStyle={{color:"#cccccc", fontSize:"18px", fontFamily:"CorpoS"}}
        floatingLabelText={props.label}
        floatingLabelStyle={{fontSize:"18px"}}
        floatingLabelFocusStyle={{color:"#cccccc"}}
        errorText={errorText}
        errorStyle={{color:"#8c0005", fontFamily:"CorpoS_Light", fontSize:"13px"}}
        style={{width:"100%",fontSize:"18px", fontFamily:"CorpoS"}}
        {...props.input}
        disabled={props.disabled}
        multiLine={props.multiLine ? props.multiLine : false}
        rows={props.row ? props.row : 1}
        onChange={(event, value)=>{
          if(typeof props.onPreChange !== "undefined"){
             props.onPreChange(event, props.input.name)
          }
          props.input.onChange(event)
        }}
        value={props.val}
      />
    </div>
  )
}

export class MUI_SelectField extends Component {
  constructor(props){
    super(props)
    this.state = {
      selectedValue : props.input.value,
    }
  }

  handleChange(value){
    if(typeof this.props.preOnchange !== "undefined"){
      this.props.preOnchange(value)
    }
    this.props.input.onChange(value)
  }

  componentWillReceiveProps(np){
    np.input.onChange(np.val)
  }
  render(){
    var temp = {...this.props.input}
    var errorText = null
    if(this.props.meta.touched && this.props.meta.error){
      errorText = this.props.meta.error
    }
    return (
      <div className="selectFieldContainer needsclick">
        <SelectField
          underlineStyle={{borderColor:"#cccccc"}}
          underlineFocusStyle={{borderColor:"#00adef"}}
          hintText={""}
          hintStyle={{color:"#cccccc", fontSize:"18px", fontFamily:"CorpoS"}}
          {...this.props.input}
          onChange={(event, index, value) => this.handleChange(value)}
          style={{width:"100%",fontSize:"18px", fontFamily:"CorpoS"}}
          maxHeight={300}
          floatingLabelText={this.props.label}
          floatingLabelStyle={{fontSize:"18px"}}
          floatingLabelFocusStyle={{color:"#cccccc"}}
          errorText={this.props.meta.touched && this.props.meta.error}
          errorStyle={{color:"#8c0005", fontFamily:"CorpoS_Light", fontSize:"13px"}}
          disabled={this.props.disabled}
          value={this.props.val}
          menuItemStyle={{fontSize:"18px", fontFamily:"CorpoS"}}
          labelStyle={{fontSize:"18px", fontFamily:"CorpoS"}}
          selectedMenuItemStyle={{color:"#00adef"}}
          >
            { this.props.items.map((t,index) => {
                return <MenuItem key={index} value={t.value} primaryText={t.text} />
              })
            }
        </SelectField>
      </div>
    )
  }
}

const muiTheme = getMuiTheme({
  datePicker: {
    selectColor : "#00adef",
    backgroundColor : "#00adef",
  },
  palette: {
   primary1Color: "#00adef",
   primary2Color: "#000000",
   primary3Color: "#000000",
   accent1Color: "#000000",
   accent2Color: "#000000",
   accent3Color: "#000000",
   textColor: "#000000",
   alternateTextColor: "#ffffff",
   canvasColor: "#ffffff",
   borderColor: "#00adef",
   pickerHeaderColor: "#00adef",
 },
});


export const MUI_DatePicker = (props) => {

  const minDate = new Date();
  const maxDate = new Date();
  minDate.setFullYear(minDate.getFullYear());
  minDate.setHours(48, 0, 0, 0);
  maxDate.setFullYear(maxDate.getFullYear() + 3);
  maxDate.setHours(0, 0, 0, 0);

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="selectFieldContainer">
        <DatePicker
          DateTimeFormat={DateTimeFormat}
          locale={props.lang}
          style={{width:"100%"}}
          textFieldStyle={{width:"100%"}}
          autoOk={true}
          floatingLabelText={props.label}
          name={props.input.name}
          onChange={(a, b)=>{
            var temp = moment(b).tz(userTimeZone).format("YYYY-MM-DD")
            props.input.onChange(temp)
            props.changeEvent(temp)}
          }
          value={props.val}
          minDate={minDate}
          maxDate={maxDate}
          shouldDisableDate={(date)=>{
            return date.getDay() === 0
          }}
          cancelLabel={T.translate("booking.select date.button.cancel")}
          />
      </div>
    </MuiThemeProvider>
  )
}
