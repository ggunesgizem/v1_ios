import React, { Component } from 'react'
import TopBar from '../../components/TopBar'
import '../page.css'
import Tab from '../../components/Tab'
import CampaignContainer from '../../containers/CampaignContainer'
import OtherContainer from '../../containers/OtherContainer'
import { Transition } from 'react-transition-group'
import { transitLeftDuration, transitLeftStyle, transitLeftStyles } from '../../pages/App/transitions'
import T from 'i18n-react'

let ce = 0
const ChildTransition = (child, status) => {
  console.log("here");
  console.log(child);
  console.log(status);
  return (
    <Transition
      in={child.props.type === status}
      unmountOnExit={false}
      mountOnEnter={false}
      timeout={transitLeftDuration}
      key={"rooo"+ce++}
    >
      {(state) => {
        console.log("a",state);
        return (
          <div style={{
             ...transitLeftStyle,
             ...transitLeftStyles[state]
           }}>
            {child}
          </div>
        )
      }}
      </Transition>
  )
}

export default class NewsMain extends Component {

  constructor(props){
    super(props)
    this.triggerStats = this.triggerStats.bind(this)

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



  componentDidMount() {
  }

  triggerStats(item){
    console.log(item);
    //AAnalytics
    /*if(window.ADB){
       window.ADB.trackState('MB World',{'subtab':item})
     }*/

     if(this.mobilecheck()==="android"){
      cordova.plugins.deneme.permissionCheck("permissionCheck", function(response){

 
        if(window.ADB && response==="PermissionIsOpen"){
          window.ADB.trackState('MB World',{'subtab':item})
         }
        
       });
    
    }

  }

  componentWillReceiveProps(np){
  }

  render() {
    const style = {
      display : this.props.active ? "flex" : "none"
    }

    let items = [{
      aaname: "campaign",
      tabname : T.translate("mb world.campaign.title"),
      component : <CampaignContainer topbar={this.props.topbar} showCampaign={this.props.showCampaign}/>
    },
    {
      aaname: "others",
      tabname : T.translate("mb world.others.title"),
      component : <OtherContainer topbar={this.props.topbar} showOther={this.props.showOtherEvents}/>
    },]

    return (
      <div className="newsMainContainer" style={style}>

        <Transition
          in={"campaign" === this.props.currType}
          unmountOnExit={false}
          mountOnEnter={true}
          timeout={transitLeftDuration}
        >
          {(state) => {
            return (
              <div style={{
                 ...transitLeftStyle,
                 ...transitLeftStyles[state],
                 height:"calc(100% - var(--main-nav-height))",
               }}>
                {this.props.children[0]}
              </div>
            )
          }}
          </Transition>

          <Transition
            in={"others" === this.props.currType}
            unmountOnExit={false}
            mountOnEnter={true}
            timeout={transitLeftDuration}
          >
            {(state) => {
              return (
                <div style={{
                   ...transitLeftStyle,
                   ...transitLeftStyles[state],
                   height:"calc(100% - var(--main-nav-height))",
                 }}>
                  {this.props.children[1]}
                </div>
              )
            }}
            </Transition>

          <div className="newsMains">
            <Tab
              triggerStats = {this.triggerStats}
              list={items}
              paddingTopBottomSize={"4px"}
              paddingLeftRightSize={"12px"}
              selectedLanguage={this.props.selectedLanguage}
              />
          </div>
        </div>
    )
  }
}
