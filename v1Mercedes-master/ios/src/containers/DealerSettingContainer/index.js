import React, { Component } from 'react'
import { connect } from 'react-redux'
import LocateDealer from '../../pages/LocateDealer'
import SelectAgent from '../../pages/SelectAgent'
import TopBar from '../../components/TopBar'
import T from 'i18n-react'
import './dealerSettingsContainer.css'

class DealerSettingContainer extends Component {

  constructor(props) {
    super(props)
    this.settingPageForward = this.settingPageForward.bind(this)
    this.settingPageBack = this.settingPageBack.bind(this)
    this.onClickBack = this.onClickBack.bind(this)
    this.onClickClose = this.onClickClose.bind(this)
    console.log("DSC", props);
    this.state=({
      currentPage: "Workshop",
      isInitLoading : true,
      active : false,
    })
  }

  componentWillReceiveProps(np){
    console.log("DSC np", np);
    if(np.transitionState === "exited"){
      console.log("exited");
      setTimeout(()=>{
        this.setState({
          currentPage: "Workshop",
          active : false,
        })
      },300)

    }else if(np.transitionState === "entering"){
      console.log("entering");
      this.setState({
        active :true,
      })
    }
  }

  componentDidMount() {
    this.setState({
      isInitLoading : false,
    })
  }

  settingPageForward(){
    this.setState({
      currentPage: "Agent",
    })
  }

  settingPageBack(){
    this.setState({
      currentPage: "Workshop",
    })
  }

  onClickBack(){
    this.settingPageBack()
  }

  onClickClose(){
    this.props.dismissDealerSetting()
  }

  render() {
    var newTopBar = {
      ...this.props.topbar,
      props: {
        ...this.props.topbar.props,
        type:"preferences",
        title:T.translate("booking.workshop.preference.title"),
        onClickClose:this.onClickClose,
        showBackButton:false,
        showExitButton:true,
      }
    }

    if(this.state.currentPage === "Agent"){
      newTopBar = {
        ...newTopBar,
        props: {
          ...newTopBar.props,
          onClickBack:this.onClickBack,
          onClickClose:this.onClickClose,
          showBackButton:true,
          showExitButton:true,
        }}
    }

    return (
      <div style={{"height":"100%","width":"100%"}}>
        <div className="dsc_main">
          {newTopBar}
        </div>

          <div className="dsc_content">
              <LocateDealer
                isGeoActive={this.props.isActive}
                isSettingMode={true}
                settingPageForward={this.settingPageForward}
                active={this.state.currentPage === "Workshop"}
                isInitLoading={this.state.isInitLoading}
                />

              <SelectAgent
                isSettingMode={true}
                dismissDealerSetting={this.props.dismissDealerSetting}
                active={this.state.currentPage === "Agent"}
                />

          </div>

      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
  }
}

export default connect(mapStateToProps)(DealerSettingContainer)
