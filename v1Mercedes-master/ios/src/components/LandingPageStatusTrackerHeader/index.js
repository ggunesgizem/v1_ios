import React, { Component } from 'react'
import Slider from 'react-slick'
import T from 'i18n-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './landingPageStatusTrackerHeader.css'
import MiniVehicleCard from '../MiniVehicleCard'

export default class LandingPageStatusTrackerHeader extends Component {

  constructor(props) {
    super(props)
    this.onVehicleSelect = this.onVehicleSelect.bind(this)
  }

  onVehicleSelect(index) {
    this.props.switchVehicle(index)
  }

  renderVehicleSlider() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      afterChange: this.onVehicleSelect,
      initialSlide: this.initialIndex,
    }
    return (
      (this.props.vechicleList.length > 0) ? <Slider {...settings}>
        {this.props.vechicleList.map((object, index) =>
          <div className="mini-vehicle-card-container" key={index}>
            <MiniVehicleCard plateNumber={object.Plate} model={object.Model} />
          </div>
         )
        }
      </Slider> : null
    )
  }

  render() {
    return (
      <div className="landing-page-status-tracker-header">
        <div className="landing-page-status-tracker-title">
          {T.translate("my vehicle.status tracker.title")}
        </div>
        <div className="landing-page-vehicle-slider-container">
          {this.renderVehicleSlider()}
        </div>
      </div>
    )
  }
}

LandingPageStatusTrackerHeader.propTypes = {
  vechicleList: React.PropTypes.array,
  switchVehicle: React.PropTypes.func,
}
