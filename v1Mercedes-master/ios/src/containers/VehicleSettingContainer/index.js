import React, { Component } from 'react'
import { connect } from 'react-redux'
import './vehicleSettingContainer.css'
import VehicleSettingList from '../../components/VehicleSettingList'
import { updateVehicle } from '../../actions/vehicleAction'

class VehicleSettingContainer extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  editButtonClick(id){
    this.props.showVehEditModal(id)
  }

  render() {
    return (
      <VehicleSettingList
        vehicleList={this.props.vehicleList}
        updateVehicle={this.props.updateVehicle}
        editButtonClick={this.editButtonClick.bind(this)}
        />
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
    vehicleList : state.vehicle.all,
  }
}

export default connect(mapStateToProps,{ updateVehicle })(VehicleSettingContainer)
