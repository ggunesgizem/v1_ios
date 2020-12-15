import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { fadeDuration, defaultFadeStyle, transitionfadeStyles } from '../../pages/App/transitions'
import T from 'i18n-react'
import '../../pages/LegalTerm/legalTerm.css'
import { tocItem } from './tocItem'

import { tocItemIOS } from './ios'
import { tocItemAndroid } from './android'

import { selectLanguage } from '../../actions/languageAction'

class LegalTermToU extends Component {

  constructor(props) {
    super(props)
   
    this.state = {
      scrollHeight: 0,
      textHeight: 1,
      buttonState : false,
    }
  }
  componentWillMount(){
    console.log("BUTTONS RENDERED AGAIN");
    console.log("ANSWER...."+this.props.buttonsAreActive);
   
  }
 

  componentDidMount() {
    if(!this.props.showPage){
      this.props.changeToHomePage();
    }else{
      document.getElementById('legalScrollPage').addEventListener('scroll', (e) => {
 

       {
        !this.state.buttonState ? e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 20 : this.props.fnc()
       }

    
        this.setState({
          scrollHeight: e.target.scrollTop,
          textHeight: document.getElementsByClassName('legal-text')[0].clientHeight,
          buttonState : !this.state.buttonState ? e.target.scrollTop + e.target.clientHeight >= e.target.scrollHeight - 20 : true,
        })
     
      })
    }
    if(this.state.buttonState){
      this.props.fnc()
    }
  }

  render() {
   
   if(this.props.showPage===true && this.props.buttonsAreActive===true){
    return (
      <div style={{height:"calc(100% - var(--main-nav-height))"}}>
        <Transition
          in={true}
          appear={true}
          timeout={fadeDuration}
        >
          {(state) => {
            return (
              <div style={{
                 ...defaultFadeStyle,
                 ...transitionfadeStyles[state]
               }}>
                <div id="legalScrollPage" className="legal-container">

                  {
                    typeof(device) !== "undefined" ?
                      device.platform.toLowerCase() === "android" ?
                        tocItemAndroid(this.props.pushComponent)
                        :
                        tocItemIOS(this.props.pushComponent)
                    :
                    tocItemAndroid(this.props.pushComponent)
                  }

                </div>
                <div style={(this.props.showAcceptButton || this.props.showDeclineButton) ? {"backgroundColor":"black","width":"80%","position":"absolute","left":"10%","bottom":"0px","display":"flex","flexDirection":"row","alignItems":"center","justifyContent":"space-between","paddingBottom":"3vh","paddingTop":"3vh"} : {display:"none"}}>
                  {
                    this.props.showAcceptButton ?
                    <button
                      className="btn square-btn accept-btn tocMani"
                      disabled={false}
                      onClick={this.props.handleClickAccept}
                    >
                      {T.translate("legalTerm.accept")}
                    </button>
                    :
                    null
                  }
                  {
                    this.props.showDeclineButton ?
                    <button
                      className="btn square-btn decline-btn tocMani"
                      disabled={false}
                      onClick={this.props.handleClickDecline}
                    >
                      {T.translate("legalTerm.decline")}
                    </button>
                    :
                    null
                  }
                </div>
              </div>
            )
          }}
        </Transition>

      </div>

    )
   }
   else{

  


    // console.log(this.state.scrollHeight/this.state.textHeight)
    if(this.props.showPage){
    
        return (
          <div style={{height:"calc(100% - var(--main-nav-height))"}}>
            <Transition
              in={true}
              appear={true}
              timeout={fadeDuration}
            >
              {(state) => {
                return (
                  <div style={{
                     ...defaultFadeStyle,
                     ...transitionfadeStyles[state]
                   }}>
                    <div id="legalScrollPage" className="legal-container">
  
                      {
                        typeof(device) !== "undefined" ?
                          device.platform.toLowerCase() === "android" ?
                            tocItemAndroid(this.props.pushComponent)
                            :
                            tocItemIOS(this.props.pushComponent)
                        :
                        tocItemAndroid(this.props.pushComponent)
                      }
  
                    </div>
                    <div style={(this.props.showAcceptButton || this.props.showDeclineButton) ? {"backgroundColor":"black","width":"80%","position":"absolute","left":"10%","bottom":"0px","display":"flex","flexDirection":"row","alignItems":"center","justifyContent":"space-between","paddingBottom":"3vh","paddingTop":"3vh"} : {display:"none"}}>
                      {
                        this.props.showAcceptButton ?
                        <button
                          className="btn square-btn accept-btn tocMani"
                          disabled={!this.state.buttonState}
                          onClick={this.props.handleClickAccept}
                        >
                          {T.translate("legalTerm.accept")}
                        </button>
                        :
                        null
                      }
                      {
                        this.props.showDeclineButton ?
                        <button
                          className="btn square-btn decline-btn tocMani"
                          disabled={!this.state.buttonState}
                          onClick={this.props.handleClickDecline}
                        >
                          {T.translate("legalTerm.decline")}
                        </button>
                        :
                        null
                      }
                    </div>
                  </div>
                )
              }}
            </Transition>
  
          </div>
  
        )
      
     
    } else {
      return <div></div>
    }
  }
  }
}
LegalTermToU.contextTypes = {
  router: React.PropTypes.object.isRequired
}
LegalTermToU.propTypes = {
  showCloseButton: PropTypes.bool,
  showAcceptDeclineButton: PropTypes.bool,
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
    isUserLoggedIn : state.user.isLogin,
  }
}

export default connect(mapStateToProps, { selectLanguage })(LegalTermToU)
