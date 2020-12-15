import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { fadeDuration, defaultFadeStyle, transitionfadeStyles } from '../../pages/App/transitions'
import T from 'i18n-react'
import '../../pages/LegalTerm/legalTerm.css'

import { selectLanguage } from '../../actions/languageAction'

class LegalTermAppSupport extends Component {

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
              <div className="legal-container">
                <div className="legal-title">
                  Uygulama Desteği
                </div>
                <div className="legal-text">
                  <br />
                  <div className="legal-text-container">
                    Mercedes-Benz Otomobil satış sonrası hizmetleri hakkında tüm sorularınız, önerileriniz ve şikayetleriniz için bizimle iletişime geçebilirsiniz.
                  </div>
                  <div className="legal-text-container" style={{color:'rgba(0,173,239,1)'}}>
                    iletisimhatti@mercedes-benz.com.tr
                  </div>
                </div>
              </div>
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

export default connect(mapStateToProps, { selectLanguage })(LegalTermAppSupport)
