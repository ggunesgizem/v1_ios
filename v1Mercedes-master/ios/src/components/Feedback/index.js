import React, { Component, PropTypes } from 'react'
import Loadable from 'react-loading-overlay'
import T from 'i18n-react'

import './feedback.css'

export default class Feedback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activateItemIndex: 0,
      comment: '',
    }
    this.prefix = ''
    this.handleIconClick = this.handleIconClick.bind(this)
    this.handleTextareaChange = this.handleTextareaChange.bind(this)
  }
  handleIconClick(key) {
    this.setState({
      activateItemIndex: key,
    })
  }
  handleTextareaChange(e) {
    // console.log(e.target.value)
    this.setState({
      comment: e.target.value
    })
  }
 handleSubmitComment(){
    let comnt=this.state.comment
    let indx=this.state.activateItemIndex
    this.setState({activateItemIndex:''})
    this.setState({comment:''})
    this.props.handleSubmitFeedback(indx, comnt)
   

 }
  render() {
    var newTopBar = {
      ...this.props.topbar,
      props: {
        ...this.props.topbar.props,
        type:"",
        title:T.translate("my vehicle.status tracker.handover.feedback.title"),
        showBackButton:true,
        showExitButton:false,
        showLegalTermButton:true,
        onClickBack:this.props.handleExitBtn,
      }
    }
    return (
      <div key={this.props.tkey} className="maintenance-wrapper">
        {newTopBar}
        <div className="feedback_master">
          <div style={{width:"100%"}}>
            <div className="feedback-explain">{T.translate("my vehicle.status tracker.handover.feedback.Please rate our service so that we can serve the best for you")}</div>
            <div className="feedback-form">
              <div className="feedback-icons">
                {this.props.imageList.map((item, key) => {
                  const url = key === this.state.activateItemIndex ? this.props.activateList[key] : item
                  return <img className="faceback-icon" src={this.prefix + url} key={key} onClick={() => this.handleIconClick(key)} />
                })}
              </div>
              <textarea placeholder={T.translate("my vehicle.status tracker.handover.feedback.Enter your feedback here")} className="feedback-text"  onFocus={(e) => e.target.placeholder = ""} onBlur={(e) => e.target.placeholder = T.translate("my vehicle.status tracker.handover.feedback.Enter your feedback here")}
               value={this.state.comment} onChange={this.handleTextareaChange} />
            </div>
          </div>
          <div>
            <button className="feedback-button square-btn" onClick={() => this.handleSubmitComment() }> {T.translate("my vehicle.status tracker.handover.feedback.Submit")} </button>
          </div>
        </div>
      </div>
    )
  }
}

Feedback.propTypes = {
  shouldShow: PropTypes.bool,
}
