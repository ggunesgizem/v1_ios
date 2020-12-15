import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchCollections } from '../../actions/productsActions'
import ScrollablePanel from '../../components/ScrollablePanel'
import Loadable from 'react-loading-overlay'
import moment from 'moment'
import ImageCacheLoader from '../../components/ImageCacheLoader'

import './collections.css'

const collectionCard = (item, ev, height, lang) => {
  var image = ""
  if(typeof item.imageUrl === "string"){
    image = item.imageUrl
  } else if(item.imageUrl == null){

  } else {
    image = item.imageUrl[0]
  }
  var interest = item.InterestStatus === "True"
  var target = <ImageCacheLoader style={{width:"100%",height:"100%"}} src={image}/>

  return (
    <div className="collectionCard" onClick={ev} key={item.id}>
      <div className="collectionCard_image">
        <div className="imageContainer">
          {target}
        </div>
        <div className="collectionCard_image_content">
          {
            interest ?
            <div className="interestedIcon"></div>
            :
            null
          }
        </div>
      </div>
      <div className="collectionCard_text">{lang === "ENGLISH" ? item.LeadItemName : item.LeadItemNameSecondLang}</div>
    </div>
  )
}

class CollectionsContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      cHeight : 0,
    }
  }

  componentWillReceiveProps(np){

  }

  componentDidMount() {

    var cHeight = window.screen.width * 0.5625
    this.setState({
      cHeight : cHeight,
    })
  }

  handleClick(item){
    this.props.showCollections(item.id)
  }

  render() {
    let items = this.props.collections.map(item => {
      return collectionCard(item, this.handleClick.bind(this,item), this.state.cHeight, this.props.selectedLanguage);
    })

    return (
      <div style={{width:"100%", height:"100%", position:"relative"}}>
        { this.props.isLoadingCollections && this.props.isFirstTimeLoadingCollections ?
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
          <div className="collectionsMainContainer">
            {items}
          </div>
        </ScrollablePanel>
      </div>
    )
  }
}


function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
    collections : state.products.collections,
    isLoadingCollections : state.products.isLoadingCollections,
    collectionsLastLoaded : state.products.collectionsLastLoaded,
    isFirstTimeLoadingCollections : state.products.isFirstTimeLoadingCollections,
  }
}

export default connect(mapStateToProps, { fetchCollections })(CollectionsContainer)
