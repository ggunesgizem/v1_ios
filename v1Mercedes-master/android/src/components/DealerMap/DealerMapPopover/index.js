import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import T from 'i18n-react'
import DealerIndicator from '../DealerIndicator'
import LocationIndicator from '../LocationIndicator'
import './dealerMapPopover.css'

export default class DealerMapPopover extends Component {
  constructor(props) {
    super(props)
    this.renderPopoverDealerIndicator = this.renderPopoverDealerIndicator.bind(this)
  }

  renderPopoverDealerIndicator() {
    if(typeof(this.props.dealerLocation) !== 'undefined'){
      return (
        <DealerIndicator lat={this.props.dealerLocation.lat} lng={this.props.dealerLocation.lng} />
      )
    } else return ('')
  }

  render() {
    let sString = `${this.props.currentLocation.lat},${this.props.currentLocation.lng}`
    let dString = `${this.props.dealerLocation.lat},${this.props.dealerLocation.lng}`
    return (
      <div className="popover-map-container">
        <div className="popover-map">
          <div className="popover-map-toolbar">
            <div className="popover-map-toolbar-text">
              <a onClick={() =>{
                window.open(`https://www.google.com/maps/dir/?api=1&origin=${sString}&destination=${dString}&directionsmode=driving`,'_system')
              }} className="get-direction-link"> {T.translate("booking.workshop.get direction")} </a>
            </div>
            <button className="popover-map-toolbar-btn" onClick={()=>this.props.closePopover()}/>
          </div>
          <div className="popover-map-wrapper">
            <GoogleMap
              bootstrapURLKeys={{
                key: 'AIzaSyBUmOq5vIrtMPY-8-Zv4eRotDAENgdmlQk',
                language: 'tr',
              }}
              defaultCenter={this.props.dealerLocation}
              defaultZoom={10}
              center={this.props.dealerLocation}
              zoom={10}
            >
              {typeof(this.props.currentLocation) !== 'undefined' ?
                <LocationIndicator
                  lat={this.props.currentLocation.lat}
                  lng={this.props.currentLocation.lng}
                />
                : ''
              }
              {this.renderPopoverDealerIndicator()}
            </GoogleMap>
          </div>
          <div className="popover-map-footer" />
        </div>
      </div>
    )
  }
}
