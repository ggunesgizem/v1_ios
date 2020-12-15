import React, { Component, PropTypes } from 'react'
import './buttonPage.css'
import ScrollablePanel from '../ScrollablePanel'

export default class ButtonPage extends Component {

  constructor(props){
    super(props)
    this.state = {
      extraScroll : 0,
      bgOpacity : 1,
    }

    console.log("button page stuff");

    this.handleButtonClick = this.handleButtonClick.bind(this)
  }

  handleButtonClick(){
    if(this.props.buttonState || this.props.expressButtonStyle){
      this.props.onclick()
    }
  }

  render() {
    var buttonStypeClass = "bg_button"
    if(!this.props.buttonState){
      buttonStypeClass = "bg_button_disabled";
      if(this.props.expressButtonStyle){
        buttonStypeClass = "bg_button_disabled_style2"
      }
    }

    return (
      <div className="buttonPageMain">
        <div id="bp_contentArea" className={this.props.hideButton ? "bp_contentArea_full" : "bp_contentArea"}>
          <ScrollablePanel>
            {this.props.content}
          </ScrollablePanel>
        </div>
        <div className="bp_buttonZone" style={{display: this.props.hideButton ? "none" : "flex"}}>
          <div className={buttonStypeClass} onClick={this.handleButtonClick}>{this.props.buttonState ? this.props.buttonText : this.props.buttonText_disbaled}</div>
        </div>
      </div>
    )
  }
}

ButtonPage.propTypes = {
  buttonState: PropTypes.bool.isRequired,
  buttonText : PropTypes.string,
  buttonText_disbaled : PropTypes.string,
  content : PropTypes.object,
  onclick : PropTypes.func,
}
