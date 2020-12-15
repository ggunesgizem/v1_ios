import React, { Component } from 'react'
import VehicleListContainer from '../../containers/vehicleListContainer'
import '../page.css'

export default class VehicleList extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div id="vehMain">
        <div className="vehicle-list-content-wrapper">
          <VehicleListContainer
            showRegisterModal={this.props.showRegisterModal}
            showStatusTracker={this.props.showStatusTracker}
            showNewBookingModal={this.props.showNewBookingModal}
            />
        </div>
      </div>
    )
  }
}
