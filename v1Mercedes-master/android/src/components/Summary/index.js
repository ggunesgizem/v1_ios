import React, { Component, PropTypes } from 'react'
import _ from 'lodash'
import T from 'i18n-react'
import './summary.css'
import BookingProgressBar from '../../components/BookingProgressBar'
import moment from 'moment'
import { userTimeZone } from '../../config'

export default class Summary extends Component {

  mapIndexToText(requestList){
    return requestList.map(key=>{
      if(key === "inspection")
        return(T.translate("booking.summary.email.general.general inspection"))
      if(key === "maintenance")
        return(T.translate("booking.summary.email.general.maintenance"))
      if(key === "repair")
        return(T.translate("booking.summary.email.general.repair"))
      if(key === "paint")
        return(T.translate("booking.summary.email.general.paint/body"))
      if(key === "tyreChange")
        return(T.translate("booking.summary.email.tyre.tyre change"))
      if(key === "valet")
        return(T.translate("booking.summary.email.others.valet service"))
      if(key === "replacementCar")
        return(T.translate("booking.summary.email.others.replacement car"))
    })
  }

  render() {
    if(this.props.dates == null || this.props.dealer == null || this.props.agent ==  null){
      return (<span/>)
    }
    const dateString = moment(this.props.dates.date).tz(userTimeZone).format("LL")
    const altDateString = moment(this.props.dates.altDate).tz(userTimeZone).format("LL")

    const requests = []
    const { handleSubmit } = this.props
    const FIELDS = {
      header1: {
        name: 'header1',
        type: 'header',
        label: T.translate("booking.summary.general.title"),
      },
      mileage: {
        name: 'mileage',
        type: 'text',
        label: T.translate("booking.summary.general.mileage of your vehicle"),
      },
      inspection: {
        name: 'inspection',
        type: 'checkbox',
        label: T.translate("booking.summary.general.general inspection"),
      },
      maintenance: {
        name: 'maintenance',
        type: 'checkbox',
        label: T.translate("booking.summary.general.maintenance"),
      },
      repair: {
        name: 'repair',
        type: 'checkbox',
        label: T.translate("booking.summary.general.repair"),
      },
      paint: {
        name: 'paint',
        type: 'checkbox',
        label: T.translate("booking.summary.general.paint/body"),
      },
      other: {
        name: 'other',
        type: 'textarea',
        label: T.translate("booking.summary.other request"),
      },
      header2: {
        name: 'header2',
        type: 'header',
        label: T.translate("booking.summary.tyre.title"),
      },
      tyreChange: {
        name: 'tyreChange',
        type: 'checkbox',
        label: T.translate("booking.summary.tyre.tyre change"),
      },
      tyreChangeComment: {
        name: 'tyreChangeComment',
        type: 'textarea',
        label: T.translate("booking.summary.tyre.tyre change request"),
      },
      header3: {
        name: 'header3',
        type: 'header',
        label: T.translate("booking.summary.others.title"),
      },
      valet: {
        name: 'valet',
        type: 'checkbox',
        label: T.translate("booking.summary.others.valet service"),
      },
      replacementCar: {
        name: 'replacementCar',
        type: 'checkbox',
        label: T.translate("booking.summary.others.replacement car"),
      },
    }
    let otherRequest = ''
    let tyreChangeComment = ''
    _.forIn(this.props.services, (value, key) => {
      if (key === 'other') {
        const str = value.replace(/[^A-Z0-9]/ig, '')
        if (str !== '') {
          otherRequest = value
        }
      } else if (key === 'tyreChangeComment') {
        const str = value.replace(/[^A-Z0-9]/ig, '')
        if (str !== '') {
          tyreChangeComment = value
        }
      } else if (value === true) {
        requests.push(key)
      }
    })
    return (
      <div className="booking-summary">
        <div className="vehicle-info">
          <div className="booking-summary-title">
            {`${this.props.vehicle.Plate}`}
          </div>
          <div className="booking-summary-text">
            {`${this.props.vehicle.Model.ModelName}`}
          </div>
        </div>
        <div className="booking-summary-divider-container">
          <div className="booking-summary-divider" />
        </div>
        <div className="date-info">
          <div className="booking-summary-text">
            {T.translate("booking.summary.preferred appointment schedule")}
          </div>
          <div className="booking-summary-title">
            {dateString}
          </div>
          <div className="booking-summary-title">
            {this.props.dates.time}
          </div>
        </div>
        <div className="date-info">
          <div className="booking-summary-text">
            {T.translate("booking.summary.or alternatively")}
          </div>
          <div className="booking-summary-title">
            {altDateString}
          </div>
          <div className="booking-summary-title">
            {this.props.dates.altTime}
          </div>
        </div>
        <div className="address-info">
          <div className="booking-summary-text-b">
            {T.translate("booking.summary.workshop")}
          </div>
          {`${this.props.dealer.Name}, ${this.props.dealer.Address}`}
          <div className="contact-info">
            {this.props.dealer.Telephone}
          </div>
        </div>
        <div className="address-info">
          <div className="booking-summary-text-b">
            {T.translate("booking.summary.service Agent")}
          </div>
            {`${this.props.agent.FirstName} ${this.props.agent.LastName}`}
          <div className="contact-info">
            {this.props.agent.MobilePhone}
          </div>
          <div className="contact-info">
            {this.props.agent.Email}
          </div>
        </div>
        <div className="summary-service-info">
          <div className="booking-summary-text-b">
            {T.translate("booking.summary.service related requests")}
          </div>
          <div>
            {_.map(requests, request =>
              <div className="booking-summary-text" key={FIELDS[request].label}>
                {FIELDS[request].label}
              </div>
            )}
          </div>
        </div>
        {tyreChangeComment !== "" ?
          <div className="summary-other-service-container">
            {tyreChangeComment === "" ? "" : <div className="booking-summary-text-b">{T.translate("booking.summary.tyre change requirement")}</div>}
            <div className="summary-other-service">
              {tyreChangeComment === "" ? "" : <div className="booking-summary-text">{tyreChangeComment}</div>}
            </div>
          </div> : ''
        }
        {otherRequest !== "" ?
          <div className="summary-other-service-container">
            {otherRequest === "" ? "" : <div className="booking-summary-text-b">{T.translate("booking.summary.other requests")}</div>}
            <div className="summary-other-service">
              {otherRequest === "" ? "" : <div className="booking-summary-text">{otherRequest}</div>}
            </div>
          </div> : ''
        }
        <button className="btn button_general" onClick={() => this.props.onSubmit(this.props,this.mapIndexToText(requests), requests)}>{T.translate("booking.summary.button.confirm booking")}</button>
      </div>
    )
  }
}

Summary.contextTypes = {
  router: React.PropTypes.object.isRequired
}

Summary.propTypes = {
  vehicle: PropTypes.object,
  dates: PropTypes.object,
  dealer: PropTypes.object,
  services: PropTypes.object,
}
