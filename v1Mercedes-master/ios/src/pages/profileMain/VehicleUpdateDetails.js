import React, { Component } from 'react'
import '../page.css'
import { connect } from 'react-redux'
import VehicleDetailContainer from '../../containers/VehicleSettingContainer/VehicleDetailContainer'

class VehicleUpdateDetails extends Component {

  constructor(props){
    super(props)
    this.state = {
      selectedVeh : null
    }
  }

  getSelected(vId){
    for(var i = 0; i< this.props.vehicleList.length; i++ ){
      if(this.props.vehicleList[i].VehicleId == vId){
        return this.props.vehicleList[i]
      }
    }
    return null
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      selectedVeh : this.getSelected(nextProps.selectedid)
    })
  }

  componentDidMount(){
    this.setState({
      selectedVeh : this.getSelected(this.props.selectedid)
    })
  }

  render() {
    var newTopBar = {...this.props.topbar, props:{...this.props.topbar.props, title: (this.state.selectedVeh != null ? this.state.selectedVeh.Plate : "") , showExitButton:true}}
    return (
      <div id="vehUpdateMain">
        <div id="vehUpdateMain_topbar">
          {newTopBar}
        </div>
        <div id="vehUpdateMain_content">
          <VehicleDetailContainer
            selectedVehicleId={this.props.selectedid}
            selectedVeh={this.state.selectedVeh}
            closeModal={this.props.closeModal}
            />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
    vehicleList : state.vehicle.all,
  }
}

export default connect(mapStateToProps)(VehicleUpdateDetails)
