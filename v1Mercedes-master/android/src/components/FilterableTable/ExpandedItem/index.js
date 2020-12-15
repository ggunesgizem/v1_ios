import React, { Component, PropTypes } from 'react'
import ImageCacheLoader from '../../ImageCacheLoader'
import T from 'i18n-react'
import './expandedItem.css'
import sprintf from 'sprintf'

export default class ExpandedItem extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className="expanded-item">
        <div className="top-banner">
          <ImageCacheLoader className="workshop-image" alt="top-banner" src={this.props.item.ImageURL} priority={3}/>
        </div>
        <div className="expand-item-info">
          <div className="expand-item-name">
            {this.props.item.Name}
          </div>
          <div className="expand-item-container-1">
            <div className="prefer">
              {this.props.isPrefered ? T.translate("booking.workshop.preferred") : ''}
            </div>
            <div className="distance">
              {this.props.isPrefered ? (<span className="sperator-dot">• </span>) : ''}
              {this.props.distance ? this.props.distance.distance !== -1 ? <div style={{"display":"flex","flexDirection":"row"}}><div style={{marginRight:"4px"}}> {this.props.distance.distance},</div>
                  <div> {sprintf(T.translate("booking.workshop.drive away"),{distance:this.props.distance.duration})}</div></div> : T.translate("booking.workshop.traffic not available") : T.translate("booking.workshop.traffic not available")}
            </div>
          </div>
        </div>
        <div className="expend-item-description">
          {this.props.item.Address}
        </div>
        <div className="expend-item-description">
          {this.props.item.Telephone}
        </div>
        <div className="item-more-info" />
        {typeof(this.props.isSettingMode) === 'undefined' ?
          <div className="prefer-checkbox">
            <input className="checkbox-small needsclick" type="checkbox" id="cbox1" onChange={() => this.props.handlePreferedClick(this.props.item)} checked={this.props.isPrefered} />
            <span className="prefer-checkbox-label" htmlFor="cbox1" > {T.translate("booking.workshop.set as preferred workshop")} </span>
          </div> : ''
        }
      </div>
    )
  }
}

ExpandedItem.propTypes = {
  item: PropTypes.object,
  handleSelectItemClick: PropTypes.func,
  handlePreferedClick: PropTypes.func,
  isPrefered: PropTypes.bool,
}
