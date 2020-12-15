import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react'
import '../TopBar/topbar.css'

export default class BookingModalNaviBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="modal-navi-bar-container">
        <div className="top-bar-left-items">
          <button className="modal-navi-bar-backBtn" disabled={true}/>
        </div>
        <div className="topbar-title">{T.translate("booking.navigation.New Request")}</div>
        <div className="top-bar-right-items">
          <button className="top-bar-info-btn" onClick={() => this.props.onClickInfo()}/>
          <button className="modal-navi-bar-crossBtn" onClick={() => this.props.onClickClose("booking")}/>
        </div>
      </div>
    )
  }
}

BookingModalNaviBar.propTypes = {
  onClickInfo: PropTypes.func,
  onClickClose: PropTypes.func,
}
