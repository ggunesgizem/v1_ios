import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import T from 'i18n-react'
import './campaignDetail.css'

class CampaignDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scrollHeight: 0,
      textHeight: 1,
    }
  }

  render() {
    return (
      <div>
        <div className="service-detail-navigation">
          <div className="glyphicon glyphicon-remove service-detail-closeBtn" onClick={this.context.router.goBack}/>
        </div>
        <div className="service-detail-container">
          <div className="service-detail-title">
            {T.translate(`campaign.${this.props.campaign.id}.name`)}
          </div>
          <div className="service-detail-text">
            {T.translate(`campaign.${this.props.campaign.id}.description`)}
          </div>
          <div className="service-remark-text">
            <T.span text='campaign.footnote'/>
            <a style={{"marginLeft":"5px"}} href={"http://www.mercedes-benz.com.tr/content/turkey/mpc/mpc_turkey_website/tr/home_mpc/passengercars.html"}>
              <T.span text='campaign.link'/>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

CampaignDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    campaign: state.campaign.selected,
  }
}

export default connect(mapStateToProps, null)(CampaignDetail)
