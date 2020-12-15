import React, { Component } from 'react'
import LoginContainer from '../../containers/LoginContainer'
import '../page.css'

export default class Login extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <LoginContainer topbar={this.props.topbar}/>
    )
  }
}
