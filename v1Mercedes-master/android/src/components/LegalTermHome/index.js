import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { fadeDuration, defaultFadeStyle, transitionfadeStyles } from '../../pages/App/transitions'
import T from 'i18n-react'
import '../../pages/LegalTerm/legalTerm.css'

import { selectLanguage } from '../../actions/languageAction'

class LegalTermHome extends Component {

  constructor(props) {
    super(props)
    this.state = {
      scrollHeight: 0,
      textHeight: 1,
    }
  }


  componentDidMount() {
    if (!this.props.showPage) {
      this.props.changeToHomePage();
    } else {
      document.getElementsByClassName('legal-container')[0].addEventListener('scroll', (e) => {
        this.setState({
          scrollHeight: e.target.scrollTop,
          textHeight: document.getElementsByClassName('legal-text')[0].clientHeight,
        })
      })
    }
  }

  render() {

    if (this.props.showPage) {
      return (
        <div style={{ width: "100%", height: "100%" }}>

          <div className="legal-container">
            <div className="legal-title">
              Hakkımızda
                    </div>
            <div className="legal-text">
              <br />
              <div className="legal-text-title">
                Sağlayıcı
                      </div>
              <div className="legal-text-container">
              Mercedes Benz Otomotiv Ticaret ve Hizmetler A.Ş.
                      </div>
              <div className="legal-text-container">
                Akçaburgaz Mahallesi
                      </div>
              <div className="legal-text-container">
                Süleyman Şah Caddesi, No:2
                      </div>
              <div className="legal-text-container">
                34522 Esenyurt, İstanbul
                      </div>
              <div className="legal-text-container">
                Telefon: 0212 867 30 00 pbx
                      </div>
              <div className="legal-text-container">
                Email: iletisimhatti@mercedes-benz.com.tr
                      </div>
              <br />
              <div className="legal-text-title">
                Direktörler Kurulu
                      </div>
              <br />
              <div className="legal-text-container">
                <table>
                  <tbody>
                    <tr>
                      <td>Ahmet Şükrü Bekdikhan</td>
                      <td>İcra Kurulu Başkanı</td>
                    </tr>
                    <tr>
                      <td>Manfred Ausweger</td>
                      <td>İcra Kurulu Üyesi – Finansman & Kontrol, CFO</td>
                    </tr>
                    <tr>
                      <td>Ahmet Tufan Akdeniz</td>
                      <td>İcra Kurulu Üyesi – Hafif Ticari Araçlar</td>
                    </tr>
                    <tr>
                      <td>Özlem Vidin Engindeniz</td>
                      <td>İcra Kurulu Üyesi – SAP & Sistem Yay. Hiz. Merkezi</td>
                    </tr>
                    
                  </tbody>
                </table>
              </div>
              <br />
              <div className="legal-text-container">
                Ticaret Sicil No: 187958-5
                      </div>
              <div className="legal-text-container">
                www.mercedes-benz.com.tr
                      </div>
              <div className="legal-text-container">
              Mersis No: 0616068739300001
                      </div>
              <div className="legal-text-container">
                Telif Hakkı © 2020 Mercedes Benz Otomotiv Ticaret ve Hizmetler A.Ş. Tüm Hakları saklıdır.
                      </div>
              <br />
              <div className="legal-text-link" onClick={() => this.props.pushComponent(2)}>
                > Uygulama Açıklaması
                      </div>
              <div className="legal-text-link" onClick={() => this.props.pushComponent(4)}>
                > Ücretsiz ve Açık Kaynaklı Yazılım
                      </div>
              <div className="legal-text-link" onClick={() => this.props.pushComponent(1)}>
                > Kullanım Koşulları
                      </div>
              <div className="legal-text-link" onClick={() => this.props.pushComponent(6)}>
                > Veri Koruma
                      </div>
              <div className="legal-text-link" onClick={() => this.props.pushComponent(5)}>
                > Üçüncü Taraf İçeriği
                      </div>
              <div className="legal-text-link" onClick={() => this.props.pushComponent(3)}>
                > Yasal Uyarılar
                      </div>
              <div className="legal-text-link" onClick={() => this.props.pushComponent(7)}>
                > Uygulama Desteği
                      </div>
            </div>
          </div>

        </div>

      )
    } else {
      return <div></div>
    }

  }
}
LegalTermHome.contextTypes = {
  router: React.PropTypes.object.isRequired
}
LegalTermHome.propTypes = {
  showCloseButton: PropTypes.bool,
  showAcceptDeclineButton: PropTypes.bool,
}

function mapStateToProps(state) {
  return {
    selectedLanguage: state.language.selectedLanguage,
    isUserLoggedIn: state.user.isLogin,
  }
}

export default connect(mapStateToProps, { selectLanguage })(LegalTermHome)
