import React, { Component } from 'react'
import T from 'i18n-react'
import Tab from '../Tab'

export default class CleaningDetail extends Component {

  constructor(props) {
    super(props)
  }

  renderContent(state) {
    switch(state) {
      case 0:
        return (
          <div className="detail-container">
          <div className="maintenance-subtitle"> {T.translate("my vehicle.status tracker.footnote")} </div>
            <div className="detail-title">
              {T.translate("my vehicle.status tracker.cleaning.overview.exterior.title")}
            </div>
            <div className="detail-content">
               {T.translate("my vehicle.status tracker.cleaning.overview.exterior.windscreen")}
            </div>
            <div className="detail-content">
               {T.translate("my vehicle.status tracker.cleaning.overview.exterior.body")}
            </div>
            <div className="detail-content">
               {T.translate("my vehicle.status tracker.cleaning.overview.exterior.headlamp")}
            </div>
            <div className="detail-content">
               {T.translate("my vehicle.status tracker.cleaning.overview.exterior.tires")}
            </div>
            <div className="detail-content">
               {T.translate("my vehicle.status tracker.cleaning.overview.exterior.wheels")}
            </div>
            <div className="detail-title">{T.translate("my vehicle.status tracker.cleaning.overview.interior.title")}</div>
            <div className="detail-content">
               {T.translate("my vehicle.status tracker.cleaning.overview.interior.dashConsole")}
            </div>
            <div className="detail-content">
               {T.translate("my vehicle.status tracker.cleaning.overview.interior.steeringWheel")}
            </div>
            <div className="detail-content">
               {T.translate("my vehicle.status tracker.cleaning.overview.interior.floor")}
            </div>
            <div className="detail-content">
               {T.translate("my vehicle.status tracker.cleaning.overview.interior.door")}
            </div>
            <div className="detail-content">
               {T.translate("my vehicle.status tracker.cleaning.overview.interior.seats")}
            </div>
          </div>
        )
      default:
        return (
          <div />
        )
    }
  }
  render() {
    let items = [{
      aaname: "cleaningoverview",
      tabname : T.translate("my vehicle.status tracker.cleaning.overview.title"),
      component : this.renderContent(0)
    }]

    var newTopBar = {
      ...this.props.topbar,
      props: {
        ...this.props.topbar.props,
        type:"",
        title:T.translate("my vehicle.status tracker.cleaning.stage name"),
        showBackButton:true,
        showExitButton:false,
        showLegalTermButton:true,
        onClickBack:this.props.handleCleaningServicesClick,
      }
    }

    return (
      <div key={this.props.tkey} className="maintenance-wrapper">
        {newTopBar}
        <div className="maintenance_tab_master">
          <Tab
            list={items}
            paddingTopBottomSize={"4px"}
            paddingLeftRightSize={"12px"}
            />
        </div>
      </div>
    )
  }
}
