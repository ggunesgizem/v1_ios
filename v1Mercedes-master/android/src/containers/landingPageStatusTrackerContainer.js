import React, { Component } from 'react'
import { connect } from 'react-redux'
import LandingPageStatusTrackerHeader from '../components/LandingPageStatusTrackerHeader'
import LandingPageStatusTracker from '../components/LandingPageStatusTracker'
import { getVehicleStatus, changeVehicle } from '../actions/statusActions'
import { initialLoad } from '../actions/initialAction'
import { fetchVehicles } from '../actions/vehicleAction'
import { selectVehicle } from '../actions/bookingAction'

class landingPageStatusTrackerContainer extends Component {

  constructor(props) {
    super(props)
    this.onVehicleSelect = this.onVehicleSelect.bind(this)
    // this.isLoaded = false
    this.state = {
      // selectedVehicleStatus: null,
      selectedVehicleIndex: this.props.currentVehicleIndex,
    }
  }

  onVehicleSelect(index) {
    // this.setState({
    //   selectedVehicleStatus: null,
    // })
    this.props.selectVehicle(this.props.vehicleList[index])
    this.props.changeVehicle(index)
    this.setState({
      selectedVehicleIndex: index
    })
    // this.props.statusList.forEach(status => {
    //   if(status.plateNumber === this.props.vehicleList[index].Plate) {
    //     this.setState({
    //       selectedVehicleStatus: status
    //     })
    //   }
    // })
  }
  // componentWillMount() {
  //   if (this.isLoaded === false) {
  //     this.isLoaded = true
  //     this.props.vehicleList.length > 0 ? this.onVehicleSelect(0) : this.isLoaded = false
  //   }
  // }
  componentDidMount() {
    if(window.prePath !== '/campaignDetail'){
      this.props.initialLoad()
    }
    this.props.vehicleList.length > 0 ? this.onVehicleSelect(0) : null
  }
  render() {
    // console.log('landingPageStatusTrackerContainer: this.state.selectedVehicleIndex',this.state.selectedVehicleIndex)
    // console.log('landingPageStatusTrackerContainer: statusList',this.props.statusList)
    // console.log('landingPageStatusTrackerContainer: currentVehicleIndex',this.props.currentVehicleIndex)
    return (
      <div style={{width:'100%',height:'100%'}}>
        <LandingPageStatusTracker status={this.state.selectedVehicleStatus} vehicleIndex={this.state.selectedVehicleIndex}/>
      </div>
    )
  }
}

landingPageStatusTrackerContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

landingPageStatusTrackerContainer.propTypes = {
  statusList: React.PropTypes.array,
  vehicleList: React.PropTypes.array,
  getVehicleStatus: React.PropTypes.func,
  selectVehicle: React.PropTypes.func,
}

landingPageStatusTrackerContainer.defaultProps = {
  getVehicleStatus: i => i,
  statusList: [],
  vehicleList: [],
}

function mapStateToProps(state) {
  return {
    statusList: state.status.statusList,
    vehicleList: state.vehicle.all,
    currentVehicleIndex: state.status.currentIndex,
    email: state.user.email,
    language: state.language.selectedLanguage,
  }
}

export default connect(mapStateToProps, { getVehicleStatus, fetchVehicles, selectVehicle, changeVehicle, initialLoad })(landingPageStatusTrackerContainer)
