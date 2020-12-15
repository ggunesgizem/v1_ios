import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { fadeDuration, defaultFadeStyle, transitionfadeStyles } from '../../pages/App/transitions'
import T from 'i18n-react'
import '../../pages/LegalTerm/legalTerm.css'

import { selectLanguage } from '../../actions/languageAction'

class LegalTermThirdPartyContent extends Component {

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
                   Üçüncü Taraf İçeriği
                 </div>
                 <div className="legal-text">
                   <div className="legal-text-title">
                     Bu uygulamayı kullanarak, kullanıcı üçüncü taraf içeriği ve yazılımı için bu özel şartları kabul eder. Aşağıdaki şartlar ve koşullar uygulanabilir.
                   </div>
                   <div className="legal-text-title">
                     Google Maps
                   </div>
                   <div className="legal-text-container">
                     Google Maps Kullanım Koşulları aşağıdadır:
                     <a onClick={()=>{
                       window.open('https://www.google.com/intl/tr/policies/terms/','_system')
                     }}>https://www.google.com/intl/tr/policies/terms/</a>
                   </div>
                   <br />
                   <div className="legal-text-container">
                    Google Maps Yasal Uyarılar aşağıdadır:
                     <a onClick={()=>{
                       window.open('http://www.google.com/intl/tr/help/legalnotices_maps.html','_system')
                     }}>http://www.google.com/intl/tr/help/legalnotices_maps.html</a>
                   </div>
                   <br />
                   <div className="legal-text-container">
                    Google Maps Gizlilik Politikası aşağıdadır:
                     <a onClick={()=>{
                       window.open('https://www.google.com/intl/tr/policies/privacy/','_system')
                     }}>https://www.google.com/intl/tr/policies/privacy/</a>
                   </div>

                   <br/>
                     <div className="legal-text-title">
                       Whatsapp
                     </div>
                     <div className="legal-text-container">
                       Whatsapp Kullanım Koşulları aşağıdadır:
                       <a onClick={()=>{
                         window.open('https://www.whatsapp.com/legal/?l=tr#terms-of-service','_system')
                       }}>https://www.whatsapp.com/legal/?l=tr#terms-of-service</a>
                     </div>
                     <br />
                     <div className="legal-text-container">
                       Whatsapp Yasal Uyarılar aşağıdadır:
                       <a onClick={()=>{
                         window.open('https://www.whatsapp.com/legal/?l=tr','_system')
                       }}>https://www.whatsapp.com/legal/?l=tr</a>
                     </div>
                     <br />
                     <div className="legal-text-container">
                       Whatsapp Gizlilik Politikası aşağıdadır:
                       <a onClick={()=>{
                         window.open('https://www.whatsapp.com/legal/?l=tr#privacy-policy','_system')
                       }}>https://www.whatsapp.com/legal/?l=tr#privacy-policy</a>
                     </div>
                     <div className="legal-text-title">
                     Adobe Analytics
                     </div>
                    
                     <div className="legal-text-container">
                     Adobe Analytics Kullanım Koşulları metni aşağıdadır:
                       <a onClick={()=>{
                         window.open('https://marketing.adobe.com/resources/help/en_US/terms.html','_system')
                       }}>https://marketing.adobe.com/resources/help/en_US/terms.html</a>
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

export default connect(mapStateToProps, { selectLanguage })(LegalTermThirdPartyContent)
