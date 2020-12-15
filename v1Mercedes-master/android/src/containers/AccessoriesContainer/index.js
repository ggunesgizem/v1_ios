import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAccessories } from '../../actions/productsActions'
import ScrollablePanel from '../../components/ScrollablePanel'
import Loadable from 'react-loading-overlay'
import moment from 'moment'
import ImageCacheLoader from '../../components/ImageCacheLoader'

import './accessories.css'

const accessoriesCard = (item,ev,cHeight,lang) => {
  var image = ""
  if(typeof item.imageUrl === "string"){
    image = item.imageUrl
  } else {
    image = item.imageUrl[0]
  }
  var interest = item.InterestStatus === "True"
  var target = <ImageCacheLoader style={{width:"100%",height:"100%"}} src={image}/>

  return (
    <div className="campCardMain" onClick={ev} key={item.id} style={{ height:cHeight}}>
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

class AccessoriesContainer extends Component {

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
    this.props.showAccessories(item.id)
  }

  render() {
    let items = this.props.accessories.map(item => {
      return accessoriesCard(item, this.handleClick.bind(null,item), this.state.cHeight, this.props.selectedLanguage);
    })
    return (
      <div style={{width:"100%", height:"100%", position:"relative"}}>
        { this.props.isLoadingAccessories && this.props.isFirstTimeLoadingAccessories ?
          <Loadable
            active={true}
            spinner={true}
            animate
            style={{position:"absolute", display: "flex"}}
          />
          :
          null
        }
        <ScrollablePanel type={"white"}>

            {items}

        </ScrollablePanel>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
    accessories : state.products.accessories,
    isLoadingAccessories : state.products.isLoadingAccessories,
    accessoriesLastLoaded : state.products.accessoriesLastLoaded,
    isFirstTimeLoadingAccessories : state.products.isFirstTimeLoadingAccessories,
  }
}

export default connect(mapStateToProps, { fetchAccessories })(AccessoriesContainer)
