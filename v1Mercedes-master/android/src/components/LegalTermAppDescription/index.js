import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { fadeDuration, defaultFadeStyle, transitionfadeStyles } from '../../pages/App/transitions'
import T from 'i18n-react'
import '../../pages/LegalTerm/legalTerm.css'

import { selectLanguage } from '../../actions/languageAction'

class LegalTermAppDescription extends Component {

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
                   Uygulama Açıklaması
                 </div>
                 <br />
                 <div className="legal-text">
                   <div className="legal-text-container">
                      Mercedes Servisim mobil uygulaması, Mercedes-Benz Türkiye Otomobil Satış Sonrası Hizmetleri tarafından geliştirilmiştir.
                   </div>
                   <div className="legal-text-container">
                     Uygulama, kullanıcıların Mercedes-Benz yetkili servislerine online servis randevu talebi iletmesini sağlar.
                   </div>
                   <div className="legal-text-container">
                     Mercedes-Benz otomobil sahipleri araçlarının yetkili servislerde statülerini eş zamanlı olarak randevu aşamasından teslimata kadar görebilirler.
                   </div>
                   <div className="legal-text-container">
                     Kullanıcılar ayrıca Satış Sonrası Hizmetler kapsamında yer alan güncel kampanyaları görebilir ve araçlarına özel servis teklifleri alabilirler.
                   </div>
                   <div className="legal-text-container">
                     Uygulama aynı zamanda yetkili servisler ile gerçek zamanlı mesajlaşma  (Whatsapp üzerinden) özelliğini barındırır.
                   </div>
                   <div className="legal-text-title">
                     Özellikler
                   </div>
                   <div className="legal-text-container">
                     - Tercih edilen yetkili servislerden servis randevu talebi (bakım, lastik değişimi, onarım, vb.)
                   </div>
                   <div className="legal-text-container">
                     - Yetkili servise telefonun harita uygulaması üzerinden ulaşım sağlama
                   </div>
                   <div className="legal-text-container">
                     - Tercih edilen Müşteri Danışmanı seçimi
                   </div>
                   <div className="legal-text-container">
                     - Otomobilin yetkili servisteki işlem statüsünü, tahmini başlangıç ve bitiş süreleri ile gösterme
                   </div>
                   <div className="legal-text-container">
                     - Periyodik bakım işlem detayları (süreç detayları, yedek parça değişim bilgisi)
                   </div>
                   <div className="legal-text-container">
                     - Satış Sonrası Hizmetler kampanyaları
                   </div>
                   <div className="legal-text-container">
                     - Aracın kondisyonuna özel ürün ve hizmetlerin teklif edilmesi
                   </div>
                   <div className="legal-text-container">
                     - Araç statü değişimlerinde ve teslimatında bildirim gönderimi
                   </div>
                   <div className="legal-text-container">
                     - Aracın teslimata hazır olması durumunda yetkili servisi arama opsiyonu
                   </div>
                   <div className="legal-text-container">
                     - Yetkili servis ile gerçek zamanlı online chat fonksiyonu
                   </div>
                   <div className="legal-text-container">
                     - Yetkili servisten alınan hizmet ve müşteri memnuniyeti için geri bildirim anketi
                   </div>
                 </div>
               </div>
             </div>
           )}}
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

export default connect(mapStateToProps, { selectLanguage })(LegalTermAppDescription)
