import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Transition } from 'react-transition-group'
import { fadeDuration, defaultFadeStyle, transitionfadeStyles } from '../../pages/App/transitions'
import T from 'i18n-react'
import '../../pages/LegalTerm/legalTerm.css'

import { selectLanguage } from '../../actions/languageAction'

class LegalTermNotice extends Component {

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
                   Yasal Uyarılar
                 </div>
                 <div className="legal-text">
                   <div className="legal-text-title">
                     Telif Hakları
                   </div>
                   <div className="legal-text-container">
                     Telif Hakkı 2020 Mercedes Benz Otomotiv Ticaret ve Hizmetler A.Ş. Tüm Hakları Saklıdır. Metinler, grafikler, ses dosyaları, animasyon dosyaları, video dosyaları ve bunların Daimler internet sitelerindeki düzenlemeleri tümüyle Telif Hakkına ve diğer fikri eserleri telif haklarına tabidir Yukarı bahsedilenler ticari kullanım ya da dağıtım amacıyla kopya edilemez, değiştirilemez veya başka web sitelerinde, uygulamalarda veya başka dijital içerikte yayınlanamaz (bundan böyle "Dijital Sunumlar" olarak anılacaktır). Bazı Daimler Dijital Sunumları ayrıca telif hakları üçüncü kişilere ait olan materyalleri içermektedir.
                   </div>
                   <div className="legal-text-title">
                     Ürün varyasyonları
                   </div>
                   <div className="legal-text-container">
                     Bu Dijital Sunumlarda yer alan ürün bilgileri, görselleri ve çizimlerinden bazıları dünya çapındaki farklı ülkelerde sunulan Daimler Dijital Sunumlarında genel kullanım için hazırlanmış olabilmektedir. Dolayısıyla, gösterilen bilgiler ve/veya aksesuarlar bazı ülkelerde bulunmayabilir veya yerel pazar talebinin veya yerel mevzuatların karşılanması amacıyla başka teknik özelliklere ve yapılandırmalara sahip olabilir.
                   </div>
                   <div className="legal-text-container">
                     İnternet sitesinde gösterilen herhangi bir araç modeli, boya, opsiyon veya aksesuarı ile ilgileniyorsanız ve bunun sizin bölgenizde sunulup sunulmadığından veya teknik özelliklerinden emin değilseniz ilgili ürün ve bölgenizdeki güncel detaylı bilgiler hakkında Daimler, Mercedes Benz Otomotiv Ticaret ve Hizmetler A.Ş. ve/veya yerel yetkili bayi ile iletişime geçmelisiniz.
                   </div>
                   <div className="legal-text-title">
                     Fiyatlar
                   </div>
                   <div className="legal-text-container">
                     Belirtilen tüm fiyatlar tavsiye edilen perakende satış fiyatlarıdır. Fiyatlar, yayınlandıkları sıradaki güncel fiyatlardır ve bildirimde bulunulmaksızın değiştirilebilirler.
                   </div>
                   <div className="legal-text-title">
                     Ticari Markalar
                   </div>
                   <div className="legal-text-container">
                     Aksi belirtilmedikçe, Daimler Dijital Sunumları yer alan tüm markalar Daimler marka haklarına tabidir, özellikle isim plakaları, şirket logoları ve amblemleri de buna dahildir.
                   </div>
                   <div className="legal-text-title">
                     Lisans Verilmemesi
                   </div>
                   <div className="legal-text-container">
                     Daimler, yenilikçi ve bilgilendirici Dijital Sunumlar gerçekleştirmeyi amaçlamıştır. Sizin de bu yaratıcı çaba konusunda bizim kadar hevesli olduğunuzu umuyoruz. Ancak, Daimler'in patentleri, ticari markaları ve telif hakları dahil olmak üzere kendi Fikri Mülkiyetini koruması gerekmektedir. Dolayısıyla bu vesile ile size, ne bu Dijital Sunumun ne de sitede mevcut materyallerin hiç bir şekilde, kimseye Daimler'in Fikri Mülkiyetini kullanma izni vermediğini belirtmek isteriz.
                   </div>
                   <div className="legal-text-title">
                     Geleceğe dönük açıklamalara ilişkin uyarılar
                   </div>
                   <div className="legal-text-container">
                     İşbu Dijital Sunum, gelecekteki olaylara yönelik güncel bakış açımızı yansıtan geleceğe dönük açıklamaları içermektedir. “Beklemek,” “tahmin etmek,” “inanmak,” “hesaplamak” “ummak,” “amaçlamak,” “olabilir” ”mümkün” “muhtemelen” “planlamak” “öngörmek” “olacaktır” ve benzeri ifadeler geleceğe dönük ifadeleri tanımlamak için kullanılmaktadır. Bu ifadeler, küresel ekonomik koşullardaki olumsuz gelişmeler, özellikle ithalat pazarlarımızın çoğunda talebin düşmesi, Euro bölgesinde devlet borcu krizinin kötüleşmesi, Amerika Birleşik Devletleri{"'"}nde bütçe durumunun kötüleşmesi, kredi ve finans piyasalarında finansman yenileme imkânlarımızın bozulması, doğal afetler, terör olayları, siyasi huzursuzluk, sanayi kazaları ve bunların satış, satın alma, üretim veya finans hizmetleri faaliyetlerimiz üzerindeki etkileri, döviz kurlarındaki değişmeler, tüketici tercihlerinin daha küçük, düşük marjlı araçlara kayması, ürünlerimizin veya hizmetlerimizin yeterince kabul görmemesi ve bu nedenle beklediğimiz fiyatlara ulaşmamız ve üretim kapasitelerimizi yeterince kullanamamamız, yakıt veya ham madde fiyat artışları, malzeme yetersizliğinden ötürü üretimin sekteye uğraması, grevler veya tedarikçilerin iflas etmesi, ikinci el otomobil fiyatlarının düşmesi, maliyet düşürme ve verimlilik artırma önlemlerinin etkili bir şekilde uygulanması, önemli bir öz sermayeye sahip olduğumuz şirketlerin ticari görünümü, stratejik işbirliklerinin ve ortak girişimlerin başarıyla uygulanması, kanunlarda, yönetmeliklerde ve devlet politikalarında özellikle araç emisyonları, yakıt ekonomisi ve güvenlik ile ilgili değişiklikler, bekleyen devlet soruşturmalarının karar bağlanması ve bekleyen veya olası gelecekteki yasal kovuşturmalar veya bazıları Daimler'in en yeni Yıllık Raporunda "Risk Raporu" başlığı altında belirtilen diğer riskler ve belirsizlikler gibi pek çok risk ve belirsizliğe tabidir. Bu risk ve belirsizliklerin herhangi birinin gerçeğe dönüşmesi veya geleceğe dönük varsayımlarımızdan herhangi birinin doğru çıkmaması halinde asıl sonuçlar, bu ifadelerde belirttiğimiz veya ima ettiğimiz sonuçlardan çok farklı olabilmektedir. Bu geleceğe dönük ifadeler yalnızca yayınlandıkları tarihteki durumlara dayandığından bunları güncellemeyi amaçlamamakta ve böyle bir yükümlülüğü kabul etmemekteyiz.
                   </div>
                   <div className="legal-text-title">
                     Garantinin veya taahhüdün olmaması
                   </div>
                   <div className="legal-text-container">
                     İşbu Dijital Sunumda yer alan bilgiler Daimler tarafından "olduğu şekliyle" sunulmaktadır ve kanunların izin verdiği ölçüde her türlü bunlarla sınırlı olmamak kaydıyla zımni satılabilirlik, belirli bir amaca uygunluk ve ihlal etmeme garantisi dahil olmak üzere hiçbir sarih veya zımni garanti olmaksızın temin edilmektedir. Temin edilen bilgilerin doğru olduğuna inanılmakla birlikte bu bilgilerde hatalar veya tutarsızlıklar da olabilir.
                   </div>
                   <div className="legal-text-container">
                     Dijital Sunumlarımız Daimler{"'"}in kontrolünde olmayan harici sitelere linkleri içermektedir. Bu nedenle hiçbir bağlı sitenin içeriğinden sorumlu değiliz. Daimler, bu linkleri sadece kullanım rahatlığı için size sunmaktadır ve herhangi bir linkin belirtilmesi, Daimlerin link verilen siteyi tasdiklediği anlamına gelmez.
                   </div>
                   <div className="legal-text-title">
                     Öncelik Sırası
                   </div>
                   <div className="legal-text-container">
                     Dijital Sunum Kullanım Koşulları, bu Yasal Açıklama karşısında önceliğe sahiptir.
                   </div>
                   <div className="legal-text-title">
                     Çevrimiçi Uyuşmazlık Çözümü Hakkında Bilgi
                   </div>
                   <div className="legal-text-container">
                     Avrupa Komisyonu, çevrimiçi uyuşmazlık çözümü için bir internet platformu kurdu (“ODR Platformu”). ODR platformu, çevrimiçi sözleşmelerin sözleşmeden doğan yükümlülüklerin mahkemeye başvurmadan çözümüne ilişkin bir erişim noktasıdır. Aşağıdaki bağlantıyı izleyerek ODR platformuna ulaşabilirsiniz:
                   </div>
                   <div className="legal-text-container">
                     https://ec.europa.eu/consumers/odr
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

export default connect(mapStateToProps, { selectLanguage })(LegalTermNotice)
