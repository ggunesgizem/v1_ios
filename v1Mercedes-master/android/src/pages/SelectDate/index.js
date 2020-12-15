import React, { Component, PropTypes } from 'react'
// import _ from 'lodash'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import moment from 'moment'
import T from 'i18n-react'
import { selectDate } from '../../actions/bookingAction'
import { updateStage, setCurrentStage } from '../../actions/bookingAction'
import BookingProgressBar from '../../components/BookingProgressBar'
import { MUI_SelectField, MUI_TextField, MUI_DatePicker } from '../../components/MuiForms'
import '../../containers/form.css'
import './selectDate.css'


const renderField = (p) => {
  const { touched, error, warning } = p.meta
  return (
    <MUI_TextField
      {...p}
    />
  )
}

const renderSelect = (p) => {
  const { touched, error, warning } = p.meta
  return (
    <MUI_SelectField
      {...p}
    />
  )
}

const renderDatePicker = (p) => {
  const { touched, error, warning } = p.meta
  return (
    <MUI_DatePicker
      {...p}
    />
  )
}

const minsToTime = (min) => {
  var h = parseInt(min / 60).toString()
  var m = (min % 60).toString()
  var s = (h.length === 1 ? "0" + h : h) + ":" + (m.length === 1 ? "0" + m : m)
  return {
    value: s,
    text: s,
  }
}

const timerange = () => {
  var startTime = 510
  var endTime = 930
  var stepCount = 30
  var items = []
  while (startTime < endTime) {
    items.push(minsToTime(startTime))
    startTime += stepCount
  }
  return (items)
}
class SelectDate extends Component {

  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
    this.renderField = this.renderField.bind(this)
    this.onChange = this.onChange.bind(this)
    this.handleTimeChange = this.handleTimeChange.bind(this)
    this.handleAltTimeChange = this.handleAltTimeChange.bind(this)
    this.validateDate = this.validateDate.bind(this)
    let today = new Date()
    // var mDate = moment(today).add(2, 'd')
    // if(mDate.day() === 0){
    //   mDate = moment(today).add(3, 'd')
    // }
    var mDate = moment(today);
    if (mDate.day() === 0) {
      mDate = moment(today).add(1, 'd')
    }
    this.state = {
      date: this.props.dates ? this.props.dates.date : mDate.format("YYYY-MM-DD"),
      altDate: this.props.dates ? this.props.dates.altDate : mDate.format("YYYY-MM-DD"),
      time: this.props.dates ? this.props.dates.time : (moment().format('hh:mm')).toString(),
      altTime: this.props.dates ? this.props.dates.altTime : (moment().format('hh:mm')).toString(),
    }
    this.timeRange = timerange()
    // console.log(this.props.dates)

  }

  validateDate(e) {
    let date = moment(e.target.value)
    let dow = date.day()
    let todayDow = moment().day()
    // console.log("selected date:", dow)
    // console.log("todays date:", todayDow)
    if (dow === 0) {
      if (todayDow === 0) {
        // select tomorrow to prevent infinite alert
        let tomorrow = new Date()
        tomorrow.setDate(tomorrow.getDate() + 1)
        // console.log(moment(tomorrow).format("YYYY-MM-DD"))
        switch (e.target.name) {
          case "date": {
            this.setState({
              date: moment(tomorrow).format("YYYY-MM-DD")
            })
            break
          }
          case "altDate": {
            this.setState({
              altDate: moment(tomorrow).format("YYYY-MM-DD")
            })
            break
          }
          default:
        }
        return false
      }
    } else {
      return true
    }
  }

  onChange(e) {
    if (e.target) {
      if (!this.validateDate(e)) {
        if (navigator.notification) {
          navigator.notification.alert(T.translate("booking.select date.notification.sunday alert.message"), null, T.translate("booking.select date.notification.sunday alert.title"), T.translate("booking.select date.notification.sunday alert.close"))
        } else {
          window.alert(T.translate("booking.select date.notification.sunday alert.message"))
        }
      } else {
        switch (e.target.name) {
          case "date": {
            this.setState({
              date: e.target.value
            })
            break
          }
          case "altDate": {
            this.setState({
              altDate: e.target.value
            })
            break
          }
          default:
        }
      }
    }
  }

  onSubmit() {
    this.props.selectDate(this.state)
    if (this.props.latestStage < 3) {
      this.props.updateStage(3)
    } else {
      console.log("not updating latestStage: ", this.props.latestStage)
    }
    this.props.setCurrentStage(3)
    //this.context.router.replace('/newappointmentmain/selectservice')
  }

  renderField({ input, type, val, meta: { touched, error, warning } }) {
    // console.log(val)
    return (
      <div>
        <div>
          <input
            {...input}
            type={type}
            className="form-control textbox_general date-form needsclick"
            value={val}
            onChange={this.onChange}
          />
          {touched && ((error && <span className="form-error-msg">{error}</span>) || (warning && <span>{warning}</span>))}
        </div>
      </div>
    )
  }

  handleTimeChange(time) {
    this.setState({
      time: time
    })
  }

  handleAltTimeChange(time) {
    this.setState({
      altTime: time
    })
  }

  handleDateChange(date) {
    this.setState({ date: date })
  }

  handleAltDateChange(date) {
    this.setState({ altDate: date })
  }

  componentWillUnmount() {
    this.props.selectDate(null)
  }

  render() {
    const { handleSubmit, submitting } = this.props
    return (
      <div className="select-date-container" style={{ display: this.props.active ? "block" : "none" }}>
        <BookingProgressBar
          title={T.translate("booking.select date.title")}
          currentStage={2}
          latestStage={this.props.latestStage}
          switchStage={this.props.switchStage}
        />
        <form className="date-form" onSubmit={handleSubmit(this.onSubmit)}>

          <div className="section-title">
            {T.translate("booking.select date.i want an appointment")}
          </div>

          <Field name="date"
            type="text"
            val={new Date(this.state.date)}
            component={renderDatePicker}
            label={T.translate("booking.select date.form.date")}
            changeEvent={this.handleDateChange.bind(this)}
            lang={this.props.selectedLanguage === "ENGLISH" ? "en-US" : "tr"}
          />

          <Field
            name="time"
            type="text"
            component={renderSelect}
            label={T.translate("booking.select date.form.time")}
            items={this.timeRange}
            preOnchange={this.handleTimeChange}
            val={this.state.time}
          />

          <div className="section-title">
            {T.translate("booking.select date.or alternatively")}
          </div>

          <Field name="altDate"
            type="text"
            val={new Date(this.state.altDate)}
            component={renderDatePicker}
            label={T.translate("booking.select date.form.date")}
            changeEvent={this.handleAltDateChange.bind(this)}
            lang={this.props.selectedLanguage === "ENGLISH" ? "en-US" : "tr"}
          />

          <Field
            name="altTime"
            type="text"
            component={renderSelect}
            label={T.translate("booking.select date.form.time")}
            items={this.timeRange}
            preOnchange={this.handleAltTimeChange}
            val={this.state.altTime}
          />

          <button type="submit" className="btn button_general" disabled={submitting}>{T.translate('booking.select date.button.next')}</button>
        </form>
      </div>
    )
  }
}

SelectDate.contextTypes = {
  router: React.PropTypes.object.isRequired
}

SelectDate.propTypes = {
  handleSubmit: PropTypes.func,
  selectDate: PropTypes.func,
  submitting: PropTypes.bool,
  dates: PropTypes.object,
}

SelectDate.defaultProps = {
  handleSubmit: i => i,
  selectDate: i => i,
  submitting: true,
}

const warn = () => {
  const warnings = {}
  return warnings
}

const validate = () => {
  const errors = {}
  // _.each(FIELDS, (value, field) => {
  //   console.log(values)
  //   console.log(field)
  //   if (!values[field]) {
  //     errors[field] = `${value.msg}`
  //   }
  // })
  return errors
}

function mapStateToProps(state) {
  return {
    dates: state.booking.dates,
    latestStage: state.booking.latestStage,
    fooo: state.form,
    selectedLanguage: state.language.selectedLanguage,
  }
}

const WrappedSelectDateContainer = reduxForm({
  form: 'SelectDateForm',
  validate,
  warn,
})(SelectDate)

export default connect(mapStateToProps, { selectDate, updateStage, setCurrentStage })(WrappedSelectDateContainer)
