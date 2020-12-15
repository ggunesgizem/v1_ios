import React, { Component, PropTypes } from 'react'
import './vehicleCard.css'
import vehicleImage from '../../assets/vehicle_image/c400.png'
import vehicleImageAlt from '../../assets/vehicle_image/addVehicle@3x.png'

import ImageCacheLoader from '../ImageCacheLoader'

export default class VehicleCard extends Component {
  constructor(props) {
    super(props)
    // this.state = {
    //   imageSrc : ''
    // }
    this.prefix = ''
    // import(`../../assets/vehicle_image/c400.png`).then(image => {
    //   this.setState({ imageSrc: this.prefix + image })
    // }).catch(err => {
    //   console.error('vehicle image loading error')
    // })
  }

  render() {
    if(this.props.vehicle == null){
      return (
        <div className="vehicle-card-container_topmain">
          <div className="vehicle-card-plate">&nbsp;</div>
          <div className="vehicle-card-container-lowerZone">

            <div className="vehicle-card-image" alt="Vehicle" style={{backgroundImage: `url(${vehicleImageAlt})`}}>
            </div>

            <div className="vehicle-card-class">&nbsp;</div>
          </div>
        </div>
      )
    }

    if(this.props.vehicle)
    return (
      <div className="vehicle-card-container_topmain">
        <div className="vehicle-card-plate">{this.props.vehicle.Plate}</div>
        <div className="vehicle-card-container-lowerZone">

          <div className="vehicle-card-image" alt="Vehicle">
            <ImageCacheLoader style={{width:"100%",height:"100%"}} fit="contain" src={this.props.vehicle.Model.ImageUrl} priority={2}/>
          </div>

          <div className="vehicle-card-class">{this.props.vehicle.Model.ModelName}</div>
        </div>
      </div>
    )

    return(<span></span>)
  }
}

VehicleCard.propTypes = {
  vehicle: PropTypes.object,
}
