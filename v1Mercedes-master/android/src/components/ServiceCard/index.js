import React, { Component, PropTypes } from 'react'
import T from 'i18n-react'
import './serviceCard.css'

export default class ServiceCard extends Component {
  constructor(props) {
    super(props)
    this.prefix = ''
    this.imageSrc = this.prefix + this.props.image
  }

  render() {
    return (
        <div className="service-card-container" onClick={() => this.props.onCardSelect(this.props.service)}>
          <img className="service-card-image" alt={this.imageSrc} src={this.imageSrc} />
            <div className="service-card-text-container">
              <div className="service-card-text-header" />
              <div className="service-card-description-container">
                <div className="service-card-name">
                  {T.translate(`my vehicle.status tracker.maintenance.additional service.${this.props.service.name}.title`)}
                </div>
                <div className="service-card-description">
                {T.translate(`my vehicle.status tracker.maintenance.additional service.${this.props.service.name}.description`)}
                </div>
              </div>
              <div className="service-card-price-container">
                <div className="service-card-price-header" />
              </div>
          </div>
        </div>
    )
  }
}

ServiceCard.contextTypes = {
  router: React.PropTypes.object.isRequired
}
