import React, { Component } from 'react'
import T from 'i18n-react'
import part_Material_eng from '../../assets/part_Material_eng.png'
import part_Material_tuk from '../../assets/part_Material_tuk.png'
import TopBar from '../TopBar'
import Tab from '../Tab'
import './maintenanceDetail.css'

export default class MaintenanceDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 0,
    }
  }


  renderContent(state) {
  
    switch(state) {
      case 0: {
        var items = this.props.itemList[0].map((item,key) => {
          return (
            <div className="maintenance-item" key={key}>
              {T.translate(`my vehicle.status tracker.maintenance.maintenance detail.overview.${item}`)}
            </div>
          )
        })
        return (
          <div className="pm_mainContainer">
            {items}
            <div className="maintenance-subtitle"> {T.translate("my vehicle.status tracker.footnote")} </div>
          </div>
        )
      }
      case 1:
        return (
            <div className="detail-container" key={"detail-container"}>
              <div className="detail-container-inner">
              <div className="detail-title">{T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.tyreBrake.title")}</div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.tyreBrake.Perform brake test")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.tyreBrake.Check brake pad thickness")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.tyreBrake.Check conditions of front/rear axles and axle ball joints")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.tyreBrake.Check tires (measure tire tread depth and correct tire pressure)")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.tyreBrake.Check condition of shock absorbers & springs")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.tyreBrake.Perform brake test")}
              </div>
              <div className="detail-title">{T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.exterior.title")}</div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.exterior.Check exterior lights")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.exterior.Check headlamp range & adjustment")}
              </div>
              <div className="detail-content">
                {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.exterior.Clean and lubricate panoramic sliding sunroof (if exists)")}
              </div>
              <div className="detail-title">{T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.interior.title")}</div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.interior.windowShieldCheck")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.interior.replaceKeyBat")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.interior.instrumentLightCheck")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.interior.trunkLightCheck")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.interior.firstAidCheck")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.interior.symbolLightCheck")}
              </div>
              <div className="detail-title">{T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.engine.title")}</div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.engine.starterCheck")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.engine.checkEngineParts")}
              </div>
              <div className="detail-content">
                 {T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.engine.checkUndersideParts")}
              </div>
              </div>
              <div className="maintenance-subtitle"> {T.translate("my vehicle.status tracker.footnote")} </div>
         d  </div>
        )
      case 2:
        return (

            <div className="pm_mainContainer">
              {this.props.language === "ENGLISH" ?
                <img src={part_Material_eng} className="part-material" />
                :
                <img src={part_Material_tuk} className="part-material" />
              }
              <div className="part-material-main-text">
                {T.translate("my vehicle.status tracker.maintenance.maintenance detail.replacement.description")}
              </div>
              <ol className="part-material-list">
                <li className="part-material-sub-text">
                  {T.translate("my vehicle.status tracker.maintenance.maintenance detail.replacement.fuelFilterReplacement")}
                </li>
                <li className="part-material-sub-text">
                  {T.translate("my vehicle.status tracker.maintenance.maintenance detail.replacement.brakeFluidReplacement")}
                </li>
                <li className="part-material-sub-text">
                  {T.translate("my vehicle.status tracker.maintenance.maintenance detail.replacement.sparkPlugReplacement")}
                </li>
                <li className="part-material-sub-text">
                  {T.translate("my vehicle.status tracker.maintenance.maintenance detail.replacement.coolantReplacement")}
                </li>
              </ol>
              <div className="maintenance-subtitle"> {T.translate("my vehicle.status tracker.footnote")} </div>
         d  </div>
        )
      default:
        return (
          <div></div>
        )
    }
  }


  render() {
    var newTopBar = {
      ...this.props.topbar,
      props: {
        ...this.props.topbar.props,
        type:"",
        title:T.translate("my vehicle.status tracker.maintenance.stage name"),
        showBackButton:true,
        showExitButton:false,
        showLegalTermButton:true,
        onClickBack : this.props.handleMaintenanceDetailsClick,
      }
    }

    let items = [{
      aaname: "maintenanceoverview",
      tabname : T.translate("my vehicle.status tracker.maintenance.maintenance detail.overview.title"),
      component : this.renderContent(0)
    },
    {
      aaname: "maintenancedetail",
      tabname : T.translate("my vehicle.status tracker.maintenance.maintenance detail.detail.title"),
      component : this.renderContent(1)
    },
    
    {
      aaname: "maintenancepartsandmaterial",
      tabname : T.translate("my vehicle.status tracker.maintenance.maintenance detail.part & material replacement"),
      component : this.renderContent(2)
    },]

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
