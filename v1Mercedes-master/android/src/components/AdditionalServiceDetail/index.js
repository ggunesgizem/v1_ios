import React, { Component, PropTypes } from 'react'
import T from 'i18n-react'
import './additionalServiceDetail.css'
import ButtonPage from '../ButtonPage'
import {transitLeftDuration, transitLeftStyle, transitLeftStyles } from '../../pages/App/transitions'
import { Transition } from 'react-transition-group'


const InnerContent = (props) => {
  return (
    <div className="leadDetailMain">
      <div className="additionalServiceDetailImage" style={{height:props.h+"px", backgroundImage: `url(${props.imageUrl})`}}>
      </div>
      <div className="laedDetailContent">

        {props.service !=null ?
          props.service.detail.split('\n').map(function(item, key) {
            return (
              <span key={key}>
                {T.translate(`my vehicle.status tracker.maintenance.additional service.${props.service.name}.detail.${key}`)}
                <br/>
              </span>
            )
          })
          :
          null
        }
      </div>
      <div className="leadDetailContent_toc">
        {T.translate(`my vehicle.status tracker.maintenance.additional service.footnote`)}
      </div>
    </div>
  )
}

export default class AdditionalServiceDetail extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scrollHeight: 0,
      textHeight: 1,
      cHeight : 300,
      selectedServiceId : -1,
      additionalInfo : null,
      link : null,
      serviceName:"",
    }
  }

  handleOnClick(link){
    window.open(link,'_system')
  }

  componentWillMount(){
    var cHeight = window.screen.width * 0.5625
    this.setState({
      cHeight : cHeight,
    })
  }

  componentWillReceiveProps(np){
    if(np.service != null){
      if(this.state.selectedServiceId != np.service.id){
        let link = null

        if(np.additionalInfo != null){
          const { plateNumber, name } = np.additionalInfo
          let ww = np.allDealers.find(w => {
            if(w.WorkshopId == np.additionalInfo.workshop.WorkshopId){
              return true
            }
          })

          if(ww){
            let consultant = ww.ServiceAgents.find((item)=>{
              if(item.Role == 2 && item.Active)
                return true
            })
            if(consultant){
              link = `whatsapp://send?text=Merhaba. Ben ${name}, ${plateNumber} plakalı aracın sahibiyim. `+ T.translate("my vehicle.status tracker.maintenance.additional service."+np.service.name) + ` hizmeti hakkında daha fazla bilgi edinmek istiyorum. &phone=${consultant.MobilePhone}`
              if(np.selectedLanguage === "ENGLISH"){
                link = `whatsapp://send?text=Hi. I am ${name}, the owner of vehicle with plate number ${plateNumber}. I would like to have more information regarding "${np.service.name}". &phone=${consultant.MobilePhone}`
              }
            }
          }
        }

        this.setState({
          selectedServiceId : np.service.id,
          link : link,
          additionalInfo : {
            imageUrl : np.imageUrl,
            service : np.service,
          },
          serviceName:np.service.name,
        })

      }
    }
  }

  render() {

    var newTopBar = {
      ...this.props.topbar,
      props: {
        ...this.props.topbar.props,
        title: this.state.serviceName != null ? T.translate(`my vehicle.status tracker.maintenance.additional service.${this.state.serviceName}.title`) : ""
      }
    }

    return (
     <div style={{width:"100%", height:"100%"}}>
       {newTopBar}
       <div className="service-detail-container-inner">
         <ButtonPage
           buttonState={true}
           hideButton= {this.state.link === null}
           buttonText={T.translate(`my vehicle.status tracker.maintenance.additional service.contactDealer`)}
           content={<InnerContent {...this.state.additionalInfo} h={this.state.cHeight}/>}
           onclick={this.handleOnClick.bind(this, this.state.link)}
         />
       </div>
     </div>
    )
  }
}

AdditionalServiceDetail.contextTypes = {
  router: React.PropTypes.object.isRequired
}
