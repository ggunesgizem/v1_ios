import React, { Component } from 'react'
import indicatorIcon from './indicator.png'

export default class DealerIndicator extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='dealer-indicator'>
        <img className='dealer-indicator-image'
          src={indicatorIcon}
          alt="dealerIndicator"
        />
      </div>
    )
  }
}
