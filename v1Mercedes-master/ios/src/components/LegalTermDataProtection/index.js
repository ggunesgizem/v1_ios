import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { fadeDuration, defaultFadeStyle, transitionfadeStyles } from '../../pages/App/transitions'
import T from 'i18n-react'
import '../../pages/LegalTerm/legalTerm.css'

import { tocItemIOS } from './ios'
import { tocItemAndroid } from './android'

import { selectLanguage } from '../../actions/languageAction'

class LegalTermDataProtection extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {

  }

  render() {
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
              )
            }}
          </Transition>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
  }
}

export default connect(mapStateToProps, { selectLanguage })(LegalTermDataProtection)
