import React, { Component, PropTypes } from 'react'
import ImageCacheLoader from '../../ImageCacheLoader'

import sprintf from 'sprintf'
import T from 'i18n-react'
import './table-item.css'

let tableItemCount = 0

let distanceWithPromise = (data) => {
  let promise = new Promise((resolve,reject) => {
    let distanceService = new google.maps.DistanceMatrixService()
    distanceService.getDistanceMatrix(data, (results, status) => {
        if (status == 'OK') {
          resolve(results, status)
        } else {
          reject(status)
        }
    })
  });
  return promise
}

export default class TableItem extends Component {
  constructor(props) {
    super(props)
    this.getDistance = this.getDistance.bind(this)
    this.gDistanceCallBack = this.gDistanceCallBack.bind(this)

    this.state = {
      gottenDistance : false,
      uniqueId : "titem_" + tableItemCount++,
    }
  }

  componentWillUnmount(){
  }

  componentWillReceiveProps(np){
    this.getDistance()
  }

  componentDidMount(){
    this.getDistance()
  }

  getDistance(){
    if(this.props.hasLocation && !this.state.gottenDistance){
      //never gotten distance before and has location
      let location = {
        lat : parseFloat(this.props.item.Latitude),
        lng : parseFloat(this.props.item.Longitude),
      }

      distanceWithPromise({
        'origins': [{lat: location.lat,lng: location.lng}],
        'destinations': [this.props.currentLocation],
        'travelMode': 'DRIVING'
      }).then(res => {
        let item = res
        if(item.rows[0].elements[0].distance && item.rows[0].elements[0].duration){
          let distanceResult = {
            distance: item.rows[0].elements[0].distance.text,
            duration: item.rows[0].elements[0].duration.text,
          }
          let resultInfo = {
            distance: typeof(distanceResult) !== 'undefined' ? distanceResult.distance : -1,
            duration: typeof(distanceResult) !== 'undefined' ? distanceResult.duration : 'NA',
          }
          this.setState({
            gottenDistance : true
          })
          this.gDistanceCallBack(resultInfo)
        } else {
          this.gDistanceCallBack()
        }
      }).catch(err => {
        this.gDistanceCallBack()
      })
    }
  }

  gDistanceCallBack(distance){
    let dataToShow = T.translate("booking.workshop.traffic not available")
    if(distance){
      if(distance.distance !== -1){
        dataToShow = sprintf(T.translate("booking.workshop.distance away"), {distance: distance.distance})
      }else{
        dataToShow = T.translate("booking.workshop.traffic not available")
      }
    }
    let itemToPlace = document.getElementById(this.state.uniqueId)
    if(itemToPlace!=null){
      itemToPlace.innerHTML = `<div class='distanceTransition'>${dataToShow}</div>`
    }
  }

  render() {
    return (
      <div className={this.props.isSelected ? "table-item-selected" : "table-item"} onClick={() => this.props.handleItemSelection(this.props.item)}>
        {this.props.isSelected ?
          <div className="row-first-item">
            <div className="booking-selected-icon" />
          </div> :
          ''
        }
        <div className={this.props.isSelected ? "row-second-item-alt" : "row-second-item" }>
          <div className="item-title">
            {this.props.item.Name}
          </div>
          <div className={this.props.distance ? this.props.distance.distance !== -1 ? "row-container-1" : "row-container-1-alt" : "row-container-1-alt"}>
            <div className="prefer">
              {this.props.isPrefered ? T.translate("booking.workshop.preferred") : ''}
            </div>
            {this.props.isPrefered && this.props.distance && this.props.distance.distance !== -1 ? (<span className="sperator-dot">• </span>) : ''}
            <div className="distance" id={this.state.uniqueId}>

            </div>
          </div>
        </div>
        <div className="row-third-item">
          <ImageCacheLoader style={{width:"100%",height:"100%"}} src={this.props.item.ImageURL} priority={3}/>
        </div>
      </div>
    )
  }
}

TableItem.propTypes = {
  item: PropTypes.object,
  isPrefered: PropTypes.bool,
  handleItemSelection: PropTypes.func,
}
