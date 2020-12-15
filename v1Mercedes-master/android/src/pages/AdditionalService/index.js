import React, { Component } from 'react'
import AdditionalServiceContainer from '../../containers/AdditionalServiceContainer'

export default class AdditionalService extends Component {

  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <AdditionalServiceContainer />
    )
  }
}
