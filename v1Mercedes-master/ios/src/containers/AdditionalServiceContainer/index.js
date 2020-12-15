import React, { Component } from 'react'
import Slider from 'react-slick'
import { connect } from 'react-redux'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import T from 'i18n-react'

import { Transition } from 'react-transition-group'
import { fadeDuration, fixFadeStyle, transitionfadeStyles, transitLeftDuration, transitLeftStyle, transitLeftStyles } from '../../pages/App/transitions'

import './additionalService.css'
import ServiceCard from '../../components/ServiceCard'
import AdditionalServiceDetail from '../../components/AdditionalServiceDetail'
import { fetchServices } from '../../actions/additionalServiceActions'
import warrantyImage from './1.png'
import detailedCleaningImage from './2.png'

let imageList = [
  warrantyImage,
  detailedCleaningImage,
]

class additionalServiceContainer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      displayDetail: false,
      selectedService: null,
    }
    this.renderServiceSlider = this.renderServiceSlider.bind(this)
    this.onCardSelect = this.onCardSelect.bind(this)
    this.onDismissDetail = this.onDismissDetail.bind(this)
    this.renderServiceList = this.renderServiceList.bind(this)
  }

  componentDidMount() {
    this.props.fetchServices()
    this.setState({
      displayDetail: false,
    })
  }

  renderServiceSlider() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
      centerPadding: '20px',
    }

    const currentIndex = this.props.currentIndex
    const name = `${this.props.user.firstName} ${this.props.user.lastName}`
    // const additionalInfo = {
    //   name,
    //   plateNumber: this.props.statusList[currentIndex].plateNumber,
    //   model: this.props.statusList[currentIndex].model,
    // }

    return (
      (this.props.serviceList.length > 0) ?
      <div className="service-slider-container" key={'service-slider-container'}><Slider {...settings}>
        {this.props.serviceList.map((object, index) =>
          <div key={index}>
            <ServiceCard service={object} image={imageList[index]} onCardSelect = {this.onCardSelect}/>
          </div>
         )
        }
      </Slider></div> : null
    )
  }

  renderServiceList(){
    return (
      <div className="additional-service-container" key={'additional-service-container'} >
        {this.renderServiceSlider()}
      </div>
    )
  }

  renderServiceDetail(topbar, isActive){
    
    const currentIndex = this.props.currentIndex
    const name = `${this.props.user.firstName} ${this.props.user.lastName}`

    let additionalInfo = null
    let imgUrl = null

    additionalInfo = {
      name,
      plateNumber: this.props.statusList[currentIndex].plateNumber,
      model: this.props.statusList[currentIndex].model,
      agent: this.props.statusList[currentIndex].appointment.serviceAgent,
      workshop: this.props.statusList[currentIndex].appointment.workshop,
    }

    if(this.state.selectedService != null)
      imgUrl = imageList[this.state.selectedService.id-1]

    return(

        <Transition
          in={isActive}
          timeout={transitLeftDuration}
          >
          {(state) => {
            return (

              <div style={{
                 ...transitLeftStyle,
                 ...transitLeftStyles[state],
                 width:"100%",
                 height: "100%",
                 }}>

                <AdditionalServiceDetail
                  additionalInfo = {additionalInfo}
                  onDismissDetail = {this.onDismissDetail}
                  service={this.state.selectedService}
                  language = {this.props.language}
                  topbar={topbar}
                  imageUrl={imgUrl}
                  allDealers={this.props.allDealers}
                  isActive={isActive}
                  />
                  </div>
          )}}
        </Transition>
    )
  }

  onCardSelect(service){
    this.setState({
      displayDetail: true,
      selectedService: service,
    })
  }

  onDismissDetail(){
    this.setState({
      displayDetail: false,
      selectedService: null,
    })
  }
  goBack(){

  }

  render() {
    var newTopBar = {
      ...this.props.topbar,
      props: {
        ...this.props.topbar.props,
        type:"",
        title:T.translate("my vehicle.status tracker.maintenance.additional service.title"),
        showBackButton:true,
        showExitButton:false,
        showLegalTermButton:true,
        onClickBack : this.props.handleAddtionalServicesClick,
      }
    }

    var sdTopBar = {
      ...this.props.topbar,
      props: {
        ...this.props.topbar.props,
        type:"",
        title:T.translate("my vehicle.status tracker.maintenance.additional service.title"),
        showBackButton:true,
        showExitButton:false,
        showLegalTermButton:true,
        onClickClose : this.props.handleAddtionalServicesClick,
        onClickBack : this.onDismissDetail.bind(this),
      }
    }
    return (

      <div key={this.props.tkey} className="addtionalServiceMain">
        {newTopBar}
        <div className="addtionalServiceMain_content">

            {this.renderServiceDetail(sdTopBar, this.state.displayDetail)}

            {this.renderServiceList()}
        </div>
      </div>
    )
  }
}

additionalServiceContainer.propTypes = {
  serviceList: React.PropTypes.array,
  fetchServices: React.PropTypes.func,
}

additionalServiceContainer.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  const { statusList, currentIndex } = state.status
  const { user } = state
  return {
    serviceList: state.additionalService.all,
    statusList,
    currentIndex,
    user,
    language: state.language.selectedLanguage,
    allDealers: state.dealer.fullList,
  }
}

export default connect(mapStateToProps, { fetchServices })(additionalServiceContainer)
