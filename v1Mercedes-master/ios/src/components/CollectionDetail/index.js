import React, { Component } from 'react'
import './collectionDetail.css'
import Slider from 'react-slick'
import T from 'i18n-react'

const ImageSet = (key,imageSet) => {
  return(
    <div key={key} className={"collectionDetailImageSet"} style={{backgroundImage: `url(${imageSet})`}}></div>
  )
}

export default class CollectionDetail extends Component {

  constructor(props){
    super(props)
    this.state = {
      h : 300,
    }
  }

  componentDidMount() {
    this.setState({
      h : window.screen.width,
    })
    //AAnalytics
  }

  imageSwap(){
  }

  imageSlider(imageSet){
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      afterChange: this.imageSwap,
      arrows: false,
    }
    if(typeof imageSet === "string"){
      return ImageSet(0,imageSet)
    }else{
      var c = 0
      var temp = imageSet.map(item =>{
        return ImageSet("imageKey"+c++,item)
      })

      if(temp.length > 0){
        return (
          <Slider {...settings}>
            {temp}
          </Slider>
        )
      }else{
        return (<span></span>)
      }

    }
  }

  formatHtml(text){
    while(text.indexOf("\n") > 0){
      text= text.replace("\n", "<br/>");
    }
    return text
  }

  render() {
    var item = this.imageSlider(this.props.item.imageUrl)
    return (
      <div className="collectionDetailMain">
        <div className="collectionDetailImage" style={{height:this.state.h}}>
          {item}
          { this.props.item.interest ?
            <div className="collectionDetailInterestBar">
              <div className="interestedIcon_white"></div>
              &nbsp;
              {T.translate("products.interest.interested")}
            </div>
            :
            null
          }
        </div>
        <div className="accDetailContent_ProductNumber">
          {this.props.item.ProductNumber}
        </div>
        <div className="accDetailContent" dangerouslySetInnerHTML={{__html : this.formatHtml(this.props.item.content)}}>
        </div>
        <div className="accDetailContent">
          {this.props.item.Price}₺
        </div>
        <div className="accDetailContent_toc">
          {T.translate("products.lead.toc 1")}
          <br/>
          {T.translate("products.lead.toc 2")}
          <br/>
          {T.translate("products.lead.toc 3")}
          <br/>
          {T.translate("products.lead.toc 4")}
        </div>
      </div>
    )
  }
}
