import React, { Component } from 'react'
import { Transition } from 'react-transition-group'
import { transitLeftDuration, transitLeftStyle, transitLeftStyles } from '../../pages/App/transitions'
import '../page.css'

import VehicleList from '../VehicleList'

export default class VehicleMain extends Component {

  constructor(props){
    super(props)
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    const style = {
      display : this.props.active ? "flex" : "none"
    }
    return (
      <div className="vehicleMainContainer" style={style}>
        <Transition
          in={this.props.isShowStatusTracker}
          timeout={transitLeftDuration}
        >
          {(state) => {
            return (
              <div style={{
                 ...transitLeftStyle,
                 ...transitLeftStyles[state],
                 height : "calc(100% - var(--main-nav-height))"
               }}>
                {this.props.children != null ? React.cloneElement(this.props.children) : ""}
              </div>
            )
          }}
          </Transition>
        <VehicleList
          showRegisterModal={this.props.showRegisterModal}
          showStatusTracker={this.props.showStatusTracker}
          showNewBookingModal={this.props.showNewBookingModal}
          />
      </div>
    )
  }
}
