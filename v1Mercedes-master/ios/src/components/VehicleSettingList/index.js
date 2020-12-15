import React, { Component } from 'react'
import { connect } from 'react-redux'
import './vehicleSettingList.css'
import TextButton from '../TextButton'
import ScrollablePanel from '../ScrollablePanel'
import T from 'i18n-react'

const VehicleSettingCard = (props) => {
  return (
    <div className="vehicleSettingCard">
      <div>
        <div className="vehicleSettingCard_plate">{props.item.Plate}</div>
        <div className="vehicleSettingCard_model">{props.item.Model.ModelName}</div>
      </div>
      <div className="vehicleSettingCard_model_button">
        <TextButton
          onclick={props.editButtonClick.bind(null,props.item.VehicleId)}
          buttonText={T.translate("profile.vehicle.button.edit")}
          paddingTop = {true}
          paddingLeft = {true}
          paddingBottom = {true}
          paddingRight = {true}
          />
      </div>
    </div>
  )
}



export default class VehicleSettingList extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  updateSelectedClick(veh){
      this.props.updateVehicle(veh)
  }


  render() {
    let items = this.props.vehicleList.map(item => {
      return <VehicleSettingCard key={"vkey"+item.VehicleId} item={item} updateClick={this.updateSelectedClick} editButtonClick={this.props.editButtonClick}/>
    })
    return (
      <div className="settings-container" style={{height:"100%"}}>
        <ScrollablePanel type={"white"}>
          <div style={{width:"100%"}}>
            {items}
          </div>
        </ScrollablePanel>
      </div>
    )
  }
}
