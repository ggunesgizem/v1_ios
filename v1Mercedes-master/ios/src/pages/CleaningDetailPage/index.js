import React, { Component } from 'react'
import CleaningDetail from '../../components/CleaningDetail'
import T from 'i18n-react'

export default class CleaningDetailPage extends Component {
  constructor(props) {
    super(props)
    this.titleList = [
      T.translate("my vehicle.status tracker.cleaning.overview.title"),
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
  render() {
    return (
      <CleaningDetail
       titleList={this.titleList}
       handleExitBtn={this.handleExitBtn}
      />
    )
  }
}

CleaningDetailPage.contextTypes = {
  router: React.PropTypes.object.isRequired
}
