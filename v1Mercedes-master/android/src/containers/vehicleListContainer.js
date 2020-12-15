import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import T from 'i18n-react'
import { changeVehicle } from '../actions/statusActions'
import { selectVehicle } from '../actions/bookingAction'
import VehicleCard from '../components/VehicleCard'
import LandingPageStatusTracker from '../components/LandingPageStatusTracker'

import "./vehicleList.css"

class VehicleListContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedVeh : 0,
      vehComponents : this.generateVeh(this.props.vehicles),
      vehListLastUpdatedStore : this.props.vehListLastUpdated,
      touchControl_addVeh : { x : 0, y : 0 },
    }
    console.log("VLC", props);
    this.onVehicleSelect = this.onVehicleSelect.bind(this)
  }

  componentWillMount() {
    //console.log("will mount");
    this.props.selectVehicle(this.props.vehicles[this.props.currentIndex])
  }

  componentWillReceiveProps(np){
    if(np.vehListLastUpdated !== this.state.vehListLastUpdatedStore){
      this.setState({
        vehComponents : this.generateVeh(np.vehicles),
        vehListLastUpdatedStore : np.vehListLastUpdated,
      })
    }
  }

  onVehicleSelect(index) {
    
    this.props.changeVehicle(index)
    this.props.selectVehicle(this.props.vehicles[index])
  }

  generateVeh(vehList){
    var veh = vehList.map((vehicle, index) => {
      
      return (
        
        <div className="vehicle-card-container" key={index}>
          <div className="vehicle-card-combined-container">
            <VehicleCard vehicle={vehicle} />
            <div style={{height:"40%"}}>
              <LandingPageStatusTracker
                vehicleIndex={index}
                onclick={this.onVehicleSelect.bind(this,index)}
                showStatusTracker={this.props.showStatusTracker}
                showNewBookingModal={this.props.showNewBookingModal}
                status={this.props.statusList[index]}
                language={this.props.language}
                />
            </div>
          </div>
        </div>
      )
    })

    return [...veh, (
      <div id="vehicle-card-container" className="vehicle-card-container" key={vehList.length}>
        <div className="vehicle-card-combined-container" onClick={this.props.showRegisterModal}>
          <VehicleCard vehicle={null} />
          <div style={{height:"40%"}}>
            <div className="landing-page-status-tracker-container add_vehicle_button_container">
             <div className="add_vehicle_button">{T.translate("my vehicle.add new vehicle")}</div>
            </div>
          </div>
        </div>
      </div>
    )]

  }

  renderVehicles() {
    console.log("selected....")
  
    var settings = {
      dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
    }
    return (
      <div id="vehCombinedPageSwap" style={{height:"100%"}}>
        <Slider ref='vehslider' {...settings}>
          {this.generateVeh(this.props.vehicles)}
        </Slider>
      </div>
    )
  }

  componentDidMount(){
    // var itemToControl = document.getElementById("vehicle-card-container")
    // itemToControl.addEventListener("touchstart",(event) => {
    //   this.setState({
    //     touchControl_addVeh : { x : event.targetTouches[0].pageX, y :  event.targetTouches[0].pageY}
    //   })
    // })
    // itemToControl.addEventListener("touchend",(event) => {
    //   if(Math.abs(this.state.touchControl_addVeh.x - event.changedTouches[0].pageX) < 3 && Math.abs(this.state.touchControl_addVeh.y - event.changedTouches[0].pageY) < 3){
    //     this.props.showRegisterModal()
    //   }
    //   this.setState({
    //     touchControl_addVeh : { x : 0, y : 0}
    //   })
    // })
  }

  componentWillUnmount(){
    // var itemToControl = document.getElementById("vehicle-card-container")
    // itemToControl.removeEventListener("touchstart")
    // itemToControl.removeEventListener("touchend")
  }

  render() {
    return (
      <div className="vehicle-list-container">
        <div style={{height:"100%"}}>
          {this.renderVehicles()}
        </div>
      </div>
    )
  }
}

VehicleListContainer.propTypes = {
  fetchVehicles: PropTypes.func,
  vehicles: PropTypes.array,
}

VehicleListContainer.defaultProps = {
  fetchVehicles: i => i,
  vehicles: [],
}

function mapStateToProps(state) {
  return {
    vehicles: state.vehicle.all,
    email: state.user.email,
    currentIndex: state.status.currentIndex,
    vehListLastUpdated : state.vehicle.vehListLastUpdated,
    statusList : state.status.statusList,
    language : state.language.selectedLanguage,
  }
}

export default connect(mapStateToProps, { changeVehicle, selectVehicle })(VehicleListContainer)
