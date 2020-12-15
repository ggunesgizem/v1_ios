import React, { Component, PropTypes } from 'react'
import './textbutton.css'

export default class TextButton extends Component {

  constructor(props){
    super(props)
  }

  render() {
    var cName = "tocMani textButton"
    if(this.props.paddingTop){
      cName += " tb_paddingTop"
    }
    if(this.props.paddingBottom){
      cName += " tb_paddingBottom"
    }
    if(this.props.paddingLeft){
      cName += " tb_paddingLeft"
    }
    if(this.props.paddingRight){
      cName += " tb_paddingRight"
    }
    return (
      <div className={cName} onClick={this.props.onclick}>
        {this.props.buttonText}
      </div>
    )
  }
}

TextButton.propTypes = {
  buttonText: PropTypes.string.isRequired,
  onclick : PropTypes.func,
  paddingTop : PropTypes.bool,
  paddingBottom : PropTypes.bool,
  paddingLeft : PropTypes.bool,
  paddingRight : PropTypes.bool,
}
