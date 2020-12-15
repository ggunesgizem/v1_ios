import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react'
import '../TopBar/topbar.css'

export default class LegalModalNavigationBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // console.log("modal navi", this.props.pageStructure)
    // console.log("modal navi", this.props.currentPageIndex)
    return (
      <div className="modal-navi-bar-container">
        <div className="top-bar-left-items">
          <button className="modal-navi-bar-backBtn" disabled={this.props.currentPageIndex == this.props.pageStructure[0]} onClick={() => this.props.backBtnClicked(this.props.pageStructure[this.props.pageStructure.length-2])}/>
        </div>
        <div className="topbar-title"></div>
        <div className="top-bar-right-items">
            <button className="modal-navi-bar-crossBtn" disabled={!this.props.showCloseButton} onClick={this.props.closeBtnClicked}/>
        </div>
      </div>
    )
  }
}

LegalModalNavigationBar.propTypes = {
  showCloseButton: PropTypes.bool,
  currentPageIndex: PropTypes.number,
  pageStructure: PropTypes.array,
  pageList: PropTypes.array,
  backBtnClicked: PropTypes.func,
  closeBtnClicked: PropTypes.func,
}
