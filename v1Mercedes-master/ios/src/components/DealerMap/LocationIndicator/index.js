import React, { Component } from 'react'
import yourLocationIcon from './your_location.png'

export default class LocationIndicator extends Component {
  constructor(props) {
    super(props)
    this.prefix = ''
  }
  render() {
    return (
      <div
        style={{
          position: 'absolute',
          width: '20px',
          heigth: '20px',
          left: '-10px',
          top: '-10px',
        }}
      >
        <img
          src={this.prefix + yourLocationIcon}
          alt="current location"
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </div>
    )
  }
}
