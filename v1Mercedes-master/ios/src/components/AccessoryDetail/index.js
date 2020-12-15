import React, { Component } from 'react'
import './accessoryDetail.css'
import Slider from 'react-slick'
import T from 'i18n-react'

const ImageSet = (key,imageSet) => {
  return(
    <div key={key} className={"collectionDetailImageSet"} style={{backgroundImage: `url(${imageSet})`}}></div>
  )
}

export default class AccessoryDetail extends Component {

  constructor(props){
    super(props)
  }

  componentDidMount() {
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

      if (temp.length > 0) {
        return (
          <Slider {...settings}>
          {temp}
          </Slider>
        )
      }else{
        return(<span></span>)
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
    var item = this.imageSlider(this.props.accessory.imageUrl)
    return (
      <div className="accDetailMain">
        <div className="accDetailImage">
          {item}
          { this.props.accessory.interest ?
            <div className="accDetailInterestBar ">
              <div className="interestedIcon_white"></div>
              &nbsp;
              {T.translate("mb world.interest.interested")}
            </div>
            :
            null
          }
        </div>
        { this.props.accessory.ProductNumber ?
          <div className="accDetailContent_ProductNumber">
            {this.props.accessory.ProductNumber}
          </div>
          :
          null
        }
        <div className="accDetailContent" dangerouslySetInnerHTML={{__html : this.formatHtml(this.props.accessory.content)}}></div>
        { this.props.accessory.Price ?
          <div className="accDetailContent">{this.props.accessory.Price}₺</div>
          :
          null
        }
        <div className="accDetailContent_toc">
          {T.translate("mb world.lead.toc 1")}
          <br/>
          {T.translate("mb world.lead.toc 2")}
          <br/>
          {T.translate("mb world.lead.toc 3")}
          <br/>
          {T.translate("mb world.lead.toc 4")}
        </div>
      </div>
    )
  }
}
