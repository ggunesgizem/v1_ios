import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react'
import BookingModalNaviBar from '../BookingModalNaviBar'

import './topbar.css'

class TopBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showBackButton : false,
      showLegalButton : false,
      showExitButton : false,
      title : "",
    }
  }

  homeTopBar() {
    return (
      <div className="modal-navi-bar-container">
        <div className="top-bar-left-items">
          <div className="logo" />
          <div className="brand" />
          <div className="seperator" />
        </div>
        <div className="topbar-title">{this.props.title}</div>
        <div className="top-bar-right-items">
          <button className="top-bar-info-btn" onClick={() => this.props.onClickInfo()}/>
        </div>
      </div>
    )
  }

  generalTopBar(){
    return (
      <div className="modal-navi-bar-container">
        <div className="top-bar-left-items">
          <button className="modal-navi-bar-backBtn" onClick={() => this.props.onClickBack()} disabled={!this.props.showBackButton}/>
        </div>
        <div className={this.props.type === "preferences" ? "topbar-title-alt" : "topbar-title"}>{this.props.title}</div>
        <div className="top-bar-right-items">
          { this.props.showLegalTermButton ?
            <button className="top-bar-info-btn" onClick={() => this.props.onClickInfo()} disabled={!this.props.showLegalTermButton}/>
            :
            null
          }
          { this.props.showExitButton ?
            <button
              className="modal-navi-bar-crossBtn"
              onClick={() => {
                if(this.props.preclose){
                  console.log("pre close happen");
                  this.props.preclose()
                }
                this.props.onClickClose(this.props.modalType)
              }}
              disabled={!this.props.showExitButton}/>
            :
            null
          }
        </div>
      </div>
    )
  }

  render() {
    let topBarComponents = <div />
    topBarComponents = this.generalTopBar()

    if (this.props.type === 'vehiclemain') {
      topBarComponents = this.homeTopBar()
    }

    return (
      <div id="topbar-container">
        {topBarComponents}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
  }
}

TopBar.defaultProps = {
  type: 'vehicleMain',
}

TopBar.contextTypes = {
  router: React.PropTypes.object.isRequired
}

TopBar.propTypes = {
  type: PropTypes.string.isRequired,
  onClickMenu: PropTypes.func,
  title: PropTypes.string,
  additionalInfo: PropTypes.object,
}

export default connect(mapStateToProps,null)(TopBar)
