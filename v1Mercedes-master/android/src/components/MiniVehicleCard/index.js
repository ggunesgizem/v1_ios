import React, { Component, PropTypes } from 'react'
import './miniVehicleCard.css'
import miniImageCar from '../../assets/mini-car.png'

export default class MiniVehicleCard extends Component {
  constructor(props) {
    super(props)
    this.prefix = ''
  }
  render() {
    return (
      <div className="mini-vehicle-card-container">
          <div className="mini-vehicle-card-plate">
            {this.props.plateNumber}
          </div>
          <div className="mini-vehicle-card-model-container">
            <img className="mini-vehicle-card-icon" alt="Mini-Vehicle" src={this.prefix + miniImageCar} />
            <div className="mini-vehicle-card-model">
              {this.props.model}
            </div>
          </div>
      </div>
    )
  }
}

MiniVehicleCard.propTypes = {
  plateNumber: PropTypes.string,
  model: PropTypes.string,
}
