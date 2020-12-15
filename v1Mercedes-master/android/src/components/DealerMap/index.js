import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import T from 'i18n-react'
import DealerIndicator from './DealerIndicator'
import LocationIndicator from './LocationIndicator'
import './dealer-map.css'

export default class DealerMap extends Component {

  constructor(props) {
    super(props)
    const defaultCenter = { lat: 41.0082, lng: 28.9784 }
    const defaultZoom = 10
    this.state = {
      defaultCenter,
      defaultZoom,
      center: defaultCenter,
      zoom: defaultZoom,
    }
    this.onIconClick = this.onIconClick.bind(this)
    this.renderDealerIndicator = this.renderDealerIndicator.bind(this)
  }

  componentDidMount(){
    if(this.props.selectedDealerID === -1) {
      if(this.props.searchedLocation) {
        this.setState({
          center: this.props.searchedLocation,
          zoom: 10,
        })
      } else {
        this.setState({
          center: this.props.currentLocation,
          zoom: 10,
        })
      }
    } else {
      this.setState({
        center: this.props.dealerLocation,
        zoom: 10,
      })
    }
  }

  onIconClick(id){
    // let center = { lat: this.props.locationList[id-1].lat, lng: this.props.locationList[id-1].lng }
    // this.props.onIconClick(id)
    // this.setState({
    //   center: center
    // })
  }

  renderDealerIndicator() {
    console.log(this.props.dealerLocation)
    if(typeof(this.props.dealerLocation) !== 'undefined'){
      return (
        <DealerIndicator lat={this.props.dealerLocation.lat} lng={this.props.dealerLocation.lng} />
      )
    } else return ('')
  }

  onBoundsChange = (center, zoom) => {
    this.setState({
      center: center,
      zoom: zoom,
    })
  }
  // <a href={`comgooglemapsurl://?saddr=${sString}&daddr=${dString}&directionsmode=driving`} className="get-direction-link"> {T.translate("booking.workshop.Get direction")} </a>
  render() {
    let sString = `${this.props.currentLocation.lat},${this.props.currentLocation.lng}`
    let dString = `${this.props.dealerLocation.lat},${this.props.dealerLocation.lng}`
    return (
      <div>
        <div className="dealer-map">
          <div className="dealer-map-mask">
            <div className="dealer-map-toolbar">
              <div className="dealer-map-toobar-text">
                <a onClick={() =>{
                  window.open(`https://www.google.com/maps/dir/?api=1&origin=${sString}&destination=${dString}&directionsmode=driving`,'_system')
                }} className="get-direction-link"> {T.translate("booking.workshop.get direction")} </a>
              </div>
            </div>
            <div className="dealer-map-clickable" onClick={()=>this.props.showMapPopover()} />
          </div>
          <GoogleMap
            bootstrapURLKeys={{
              key: 'AIzaSyBUmOq5vIrtMPY-8-Zv4eRotDAENgdmlQk',
              language: 'tr',
            }}
            defaultCenter={this.state.defaultCenter}
            defaultZoom={this.state.defaultZoom}
            center={this.state.center}
            zoom={this.state.zoom}
          >
            {typeof(this.props.currentLocation) !== 'undefined' ?
              <LocationIndicator
                lat={this.props.currentLocation.lat}
                lng={this.props.currentLocation.lng}
              />
              : ''
            }
            {this.renderDealerIndicator()}
          </GoogleMap>
        </div>
      </div>
    )
  }
}
