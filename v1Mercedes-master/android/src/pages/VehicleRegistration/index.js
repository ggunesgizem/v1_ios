import React, { Component } from 'react'
import VehicleRegistrationContainer from '../../containers/VehicleRegisterContainer'

export default class VehicleRegistration extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div className="registration-page-content-wrapper">
        <VehicleRegistrationContainer topbar={this.props.topbar} closeModal={this.props.closeModal} active={this.props.active}/>
      </div>
    )
  }
}
