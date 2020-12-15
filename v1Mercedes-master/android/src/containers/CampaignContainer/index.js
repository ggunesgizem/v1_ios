import React, { Component } from 'react'
import { connect } from 'react-redux'
import ScrollablePanel from '../../components/ScrollablePanel'
import moment from 'moment'
import ImageCacheLoader from '../../components/ImageCacheLoader'

import './campaign.css'

const campaignCard = (item,ev,cHeight,lang) => {
  var image = ""
  if(typeof item.imageUrl === "string"){
    image = item.imageUrl
  } else {
    image = item.imageUrl[0]
  }
  var interest = item.InterestStatus === "True"
  var target = <ImageCacheLoader style={{width:"100%",height:"100%"}} src={image}/>

  return (
    <div className="campCardMain" onClick={ev} key={item.id} style={{ height:cHeight }}>
      <div className="imageContainer">
        {target}
      </div>
      <div className="campCard_content">
        <div className="interestContainer">{interest ? <div className="interestedIcon"></div> : null}</div>
        <div className="accTitle">
          { lang === "ENGLISH" ?
            item.LeadItemName
            :
            item.LeadItemNameSecondLang
          }
        </div>
      </div>
      <div className="accBg"></div>
    </div>
  )
}

class CampaignContainer extends Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.state = {
      cHeight : 0,
    }
  }

  componentDidMount() {

    var cHeight = window.screen.width * 0.5625
    this.setState({
      cHeight : cHeight,
    })
  }

  handleClick(item){
    this.props.showCampaign(item.id)
  }

  render() {
    let items = this.props.campaign.map(item => {
      return campaignCard(item, this.handleClick.bind(null,item), this.state.cHeight, this.props.selectedLanguage);
    })
    return (
      <ScrollablePanel type={"white"}>
        {items}
      </ScrollablePanel>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
    campaign : state.campaign.all,
    campaignsLastLoaded : state.campaign.campaignsLastLoaded,
  }
}

export default connect(mapStateToProps, {})(CampaignContainer)
