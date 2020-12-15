import React, { Component } from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react'
import MaintenanceDetail from '../../components/MaintenanceDetail'

class MaintenanceDetailPage extends Component {
  constructor(props) {
    super(props)
    this.titleList = [
      T.translate(`my vehicle.status tracker.maintenance.maintenance detail.overview.title`),
      T.translate(`my vehicle.status tracker.maintenance.maintenance detail.detail.title`),
      T.translate(`my vehicle.status tracker.maintenance.maintenance detail.replacement.title`),
    ]
    this.overviewList = [
      'Change the engine oil',
      'Replace the oil filter',
      'Replace the air filter',
      'Replace the dust filter',
      'Check engine',
      'Check brake & tires',
      'Check exterior & interior',
    ]
    this.itemList = [
      this.overviewList,
    ]
    this.handleExitBtn = this.handleExitBtn.bind(this)
    this.state = {
      currentIndex: 0,
    }
  }
  handleExitBtn() {
    // console.log('handleExitBtn')
    this.context.router.goBack()
  }

  componentDidMount(){

  }

  render() {
    return (
      <MaintenanceDetail
       tkey={this.props.tkey}
       itemList={this.itemList}
       titleList={this.titleList}
       handleExitBtn={this.handleExitBtn}
       language={this.props.language}
       handleMaintenanceDetailsClick={this.props.handleMaintenanceDetailsClick}
       topbar={this.props.topbar}
      />
    )
  }
}

MaintenanceDetailPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state){
  return{
    language: state.language.selectedLanguage
  }
}


export default connect(mapStateToProps)(MaintenanceDetailPage)
