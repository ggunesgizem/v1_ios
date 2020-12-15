import React, { Component } from 'react'
import Slider from 'react-slick'
import { connect } from 'react-redux'
import T from 'i18n-react'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './selectAgent.css'
import AgentCard from '../../components/AgentCard'
import { selectAgent, selectPreferredAgent } from '../../actions/dealerActions'
import { updateStage, setCurrentStage } from '../../actions/bookingAction'
import BookingProgressBar from '../../components/BookingProgressBar'

class SelectAgent extends Component {

  constructor(props) {
    super(props)
    this.onAgentSelect = this.onAgentSelect.bind(this)
    this.onNextBtnClick = this.onNextBtnClick.bind(this)
    console.log("SA",props);
  }

  mobilecheck () {
    if( navigator.userAgent.match(/Android/i)){
      return "android"
    }
    else{
      if(navigator.userAgent.match(/iPhone/i)){
        return "ios"
      }
    }
  };


  renderAgentSlider() {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      centerMode: true,
      centerPadding: '25px',
    }

    let agentList = []

    if(typeof(this.props.isSettingMode) === 'undefined'){
      agentList = this.props.selectedDealer.ServiceAgents
      if(this.props.preferredAgent){
        var pA = null
        agentList = agentList.filter((agent)=>{
          if(agent.ServiceAgentId === this.props.preferredAgent.ServiceAgentId){
            pA = agent
            return
          }
          return agent
        })
        if(pA !== null){
          agentList = [pA,...agentList]
        }
      }
    } else {
      agentList = this.props.preferredDealer.ServiceAgents
    }

    agentList = agentList.filter(item =>{
      console.log(item);
      if(item.Role == 1)
      return true
    })

    return (
      (agentList.length > 0) ?
        <Slider {...settings}>
          {agentList.map((object, index) =>
            <div key={index}>
              <AgentCard
                agent={object}
                selectedAgent={typeof(this.props.isSettingMode) === 'undefined'
                ? this.props.selectedAgent ? this.props.selectedAgent : agentList[0]
                : this.props.preferredAgent ? this.props.preferredAgent : agentList[0]}
                preferredAgent={this.props.preferredAgent ? this.props.preferredAgent : null}
                onAgentSelect={this.onAgentSelect}
                isSettingMode={this.props.isSettingMode}
              />
            </div>
           )
          }
        </Slider>
      :
      null
    )
  }

  onAgentSelect(agent) {
    // console.log(agent)
    if(typeof(this.props.isSettingMode) === 'undefined'){
      // booking
      this.props.selectAgent(agent)
    } else {
      this.props.selectPreferredAgent(agent)
    }
  }

  onNextBtnClick() {
    if(typeof(this.props.isSettingMode) === 'undefined'){
      if(this.props.latestStage < 2){
        this.props.updateStage(2)
      } else {
        console.log("not updating latestStage: ", this.props.latestStage)
      }
      this.props.setCurrentStage(2)
      //this.context.router.replace('/newAppointmentMain/selectDate')
    } else {
      this.props.dismissDealerSetting()
      //AAnalytics
      let dd = {
        'preferencesdealername' : this.props.preferredDealer.Name,
        'preferencesdealeroutlet' : this.props.preferredDealer.OutletID,
        'preferencesagentname' : this.props.preferredAgent.FirstName+" "+this.props.preferredAgent.LastName
      }
      
      /*if(window.ADB){
        console.log("sending action preferences");
         window.ADB.trackAction("preferences", dd)
       }*/

       if(this.mobilecheck()==="android"){
        cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){
  
   
          if(window.ADB && response==="PermissionIsOpen"){
            window.ADB.trackAction("preferences", dd)
           }
          
         });
      
      }

    }
  }

  componentWillMount(){

  }

  componentWillUnmount(){
      this.props.selectAgent(null)
  }
  componentDidMount() {
  if (typeof(this.props.isSettingMode) !== 'undefined') {
    //setting mode
    if (this.props.preferredDealer) {
      if (this.props.preferredDealer.ServiceAgents.length > 0) {
        if (this.props.preferredAgent) {
          var agent = this.props.preferredDealer.ServiceAgents.find((agent) => {
            if (agent.ServiceAgentId === this.props.preferredAgent.ServiceAgentId) {
              return agent
            }
          })
          if (agent) {
            this.onAgentSelect(agent)
          } else {
            this.onAgentSelect(this.props.preferredDealer.ServiceAgents[0])
          }
        } else {
          this.onAgentSelect(this.props.preferredDealer.ServiceAgents[0])
        }
      }
    }
  }
}

  componentWillReceiveProps(np){
    console.log("SA NP", np);
    if(typeof(np.isSettingMode) === 'undefined'){
      // booking
      if(np.selectedDealer !== null){
        console.log("hey", np.selectedAgent);
        if(!np.selectedAgent){
          console.log("No previous selection, select default agent:" ,np.selectedDealer.ServiceAgents[0])
          if(np.preferredAgent){
            var agent = np.selectedDealer.ServiceAgents.find((agent)=>{
              if(agent.ServiceAgentId === np.preferredAgent.ServiceAgentId){
                return agent
              }
            })
            if(agent){
              np.selectAgent(agent)
            }else{
              np.selectAgent(np.selectedDealer.ServiceAgents[0])
            }
          }else{
            np.selectAgent(np.selectedDealer.ServiceAgents[0])
          }
        } else if(np.selectedAgent.WorkshopId !== np.selectedDealer.WorkshopId){
          console.log("Workshop changed, select default agent:",np.selectedDealer.ServiceAgents[0])
          np.selectAgent(np.selectedDealer.ServiceAgents[0])
        }
      }
    } else {
      // preference setting
      if(np.preferredDealer !== null){
        if(!np.preferredAgent){
          console.log("No previous selection, select default preferred agent:",np.preferredDealer.ServiceAgents[0])
          np.selectPreferredAgent(np.preferredDealer.ServiceAgents[0])
        } else if(np.preferredAgent.WorkshopId !== np.preferredDealer.WorkshopId){
          console.log("Workshop changed, select default preferred agent:",np.preferredDealer.ServiceAgents[0])
          np.selectPreferredAgent(np.preferredDealer.ServiceAgents[0])
        }
      }
    }
  }

  render() {
    console.log("selected agent",this.props.selectedAgent);
    if(typeof(this.props.isSettingMode) === 'undefined'){
      return (
        <div style={{width:"100%", height:"100%","background":"black", display: this.props.active ? "flex":"none", flexDirection:"column"}}>

            <BookingProgressBar
              title = {T.translate("booking.agent.title")}
              currentStage = {1}
              latestStage = {this.props.latestStage}
              switchStage = {this.props.switchStage}
            /> : ''

          <div className={"agent-container"}>
            { this.props.selectedAgent ?
                <div className="agentContainer">
                  <div className="agent-slider-container">
                      { this.props.selectedDealer ? this.renderAgentSlider() : null }
                  </div>
                  <button className="btn button_general" onClick={()=>this.onNextBtnClick()}>
                    {T.translate("booking.agent.button.next")}
                  </button>
              </div>
              :
              <div className="agentContainer">
                <div className="agentContainer_info">
                  {T.translate('booking.agent.not found 1')}
                  <br/>
                  {T.translate('booking.agent.not found 2')}
                </div>
              </div>
            }
          </div>
        </div>
      )
    }else{
      return (
        <div style={{width:"100%", height:"100%","background":"black", display: this.props.active ? "block":"none"}}>
          <div className={"agent-container-alt"}>
            { this.props.preferredAgent ?
                <div className="agentContainer">
                  <div className="agent-slider-container">
                    {this.props.preferredDealer ? this.renderAgentSlider() : null}
                  </div>
                  <button className="btn button_general" onClick={()=>this.onNextBtnClick()}>
                    {T.translate('booking.agent.save as preferences')}
                  </button>
              </div>
              :
              <div className="agentContainer">
                <div className="agentContainer_info">
                {T.translate('booking.agent.not found 1')}
                <br/>
                {T.translate('booking.agent.not found 2')}
                </div>
              </div>
            }
          </div>
        </div>
      )
    }

  }
}

SelectAgent.propTypes = {
  selectAgent: React.PropTypes.func,
}

SelectAgent.contextTypes = {
  router: React.PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    selectedDealer: state.dealer.selected,
    selectedAgent: state.agent.selected,
    latestStage: state.booking.latestStage,
    preferredDealer: state.dealer.prefered,
    preferredAgent: state.agent.preferred,
  }
}

export default connect(mapStateToProps, { selectAgent, updateStage, selectPreferredAgent, setCurrentStage })(SelectAgent)
