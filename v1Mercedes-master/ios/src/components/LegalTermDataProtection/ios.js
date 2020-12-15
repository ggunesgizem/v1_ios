import React, { Component } from 'react'

export const tocItemIOS = (pushComponent) => {

  return (
    <div className="legal-container">
      <div className="legal-title">
        Veri Koruma
      </div>
      <div className="legal-text">
        <div className="legal-text-title">
          Gizlilik Beyanı
        </div>
        <div className="legal-text-container">
          (Yayıncı ve herhangi bir ayrı sağlayıcı olarak) bu uygulamaya olan ilginiz için teşekkür ederiz. Uygulama kullanıcısı olarak gizliliğinizi korumayı taahhüt ediyoruz. Bu doküman içerisinde, uygulamaya ilişkin kişisel verileri ne şekilde işlediğimiz açıklanmaktadır. Kişisel Veri, Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgidir. Kişisel verileri, daima, yürürlükte bulunan Veri Koruma Politikamız çerçevesinde işlemekteyiz.
        </div>
        <div className="legal-text-container">
          <a onClick={()=>{
            window.open('https://www.daimler.com/documents/company/other/daimler-dataprotectionpolicy-tr.pdf','_system')
          }}>https://www.daimler.com/documents/company/other/daimler-dataprotectionpolicy-tr.pdf</a>
        </div>
        <div className="legal-text-title">
          1 Sorumluluk
        </div>
        <div className="legal-text-container">
          İşbu veri koruma hükümlerinin amaçları doğrultusunda "Yayıncı" terimi, Yayıncının SKLS (Bölüm I)’in münhasır sözleşme ortağı olup olmadığına veya Sağlayıcı bilgilerinde başka bir Sağlayıcının tanımlanmış olmasına bakılmaksızın her iki türlü şahıs için de geçerli olacaktır. Verilerin korunması noktasında ise sorumluluk Sağlayıcıdadır (kontrolör).  Yayıncının sorumluluğu bulunmamaktadır.
        </div>
        <div className="legal-text-title">
          2 Veri işleme kapsamı
        </div>
        <div className="legal-text-title">
          2.1 Veri kategorileri
        </div>
        <div className="legal-text-container">
          Yayıncı, Uygulamayı ve işlevlerini temin etmek için kişisel verileri yalnızca gerektiği kadarıyla veya Kullanıcının ek kullanım için onay verdiği kadarıyla toplar, işler ve kullanır. Uygulama, bilhassa Kullanıcının girdiği verileri ve Kullanıcının onayı halinde mobil cihaz üzerindeki verileri veya cihaz işlevlerinin kullanılması yoluyla üretilen verileri (Konum) kullanır. Konum verisi, Kullanıcıya en yakın bayiyi göstermek amacıyla kullanılmaktadır.
        </div>
        <div className="legal-text-container">
          Bu verilere erişilmeksizin Uygulamanın kullanılması mümkündür. Erişim, iOS ayarlarında herhangi bir zamanda devre dışı bırakılabilir ve devreye alınabilir ve uygulama içerisinde verilmiş olan bu izinler iptal edilebilir. iOS Ayarlar > Gizlilik > Konum Servisleri > Servisim.  Uygulamaya erişimin devre dışı bırakılması halinde bu durum işlevlerde sınırlamalara neden olabilir.
          </div>
        <div className="legal-text-title">
          3 Kullanım verilerinin değerlendirilmesi
        </div>
        <div className="legal-text-container">
          Fonksiyonu etkinleştirerek kullanım verilerinin değerlendirilmesine izin verdiyseniz, tercihlerinizi tespit etmek ve uygulamayı geliştirmek için uygulamanın kullanım verilerini değerlendirmekteyiz. Bu, uygulamayı kullanıcıların ihtiyaçlarına daha yakından uyarlamamızı ve tekliflerimizi geliştirmemizi sağlar.
        </div>
        <div className="legal-text-container">
          iOS Ayarları> Servisim> Analitik Veri Kullanım İzni altındaki işlevi devre dışı bırakarak kullanım verilerinin değerlendirilmesini istediğiniz zaman devre dışı bırakabilir veya yeniden etkinleştirmeyi seçebilirsiniz.
       </div>
        <div className="legal-text-title">
          4 Anlık bildirimler
        </div>
        <div className="legal-text-container">
          Uygulama, servis randevu onayı ve aracın servisteki durum değişiklikleri hakkında kullanıcıyı uyarmak için bildirim yoluyla kullanıcıyı bilgilendirir. Bildirim herhangi bir zamanda iOS sistem ayarından devre dışı bırakılabilir ve yeniden etkinleştirebilir. iOS Ayarlar > Bildirimler > Servisim.
        </div>
        <div className="legal-text-container">
          Kullanıcı fonksiyonu uygulamanın ilk başlatılmasında veya daha sonra etkinleştirdiyse, Uygulama yeni kampanya ve etkinlikler hakkında bildirim yoluyla ve cihaz aracılığıyla Kullanıcıyı bilgilendirebilir. Bildirim herhangi bir zamanda iOS Ayarlar > Bildirimler > Servisim üzerinden devre dışı bırakılabilir ve yeniden etkinleştirilebilir.
          </div>
        <div className="legal-text-title">
          5 Kişisel Verilerin Transferi Devri
        </div>
        <div className="legal-text-container">
          <i>  Üçüncü taraflara aktarım</i>
        </div>
        <br />
        <div className="legal-text-container">
          Uygulama ile bağlantılı olarak üçüncü taraf hizmetlerinin (Google Maps, Whatsapp, Adobe Analytics) kullanılması halinde Kullanıcı bilgileri tarafımızca ilgili sağlayıcılar ve diğer üçüncü taraflarla paylaşılacaktır. Verileriniz söz konusu taraflarla, ancak ve yalnızca uygulama ve işlevlerinin sağlanması ve kullanılması açısından gerekli olduğu takdirde, Yayıncının ya da üçüncü tarafların meşru menfaatlerinin korunması amacıyla ya da daha evvel verilerinizin paylaşılmasına onay vermiş olduğunuz takdirde paylaşılacaktır (bkz. "Mercedes Benz Otomotiv Ticaret ve Hizmetler Anonim Şirketi Kişisel Verilerin İşlenmesi Aydınlatma Metni” maddesi).
        </div>
        <div className="legal-text-container">
          Sağlayıcılar tarafımızca dikkatle seçilmiş olup, özellikle kendilerinin erişimine sunulan kişisel bilgilerin güvenli bir biçimde işlenmesi ve bunların güvenliği açısından, düzenli olarak takip edilip denetlenmektedir. Tüm sağlayıcıların gizlilik yükümlülükleri ile yasal yükümlülüklere uyumu kabul etmesini şart koşmakta ve talep etmekteyiz.
        </div>
        <br />
        <div className="legal-text-container">
          <i> Üçüncü taraf ülkelerde bulunan veri alıcıları</i>
        </div>
        <br />
        <div className="legal-text-container">
          Kullanıcılara ait kişisel verileri, AB/AEB dışındaki şu ülkelere aktarmaktayız: Singapur ve Türkiye
       </div>
        <br />
        <div className="legal-text-container">
          <i> Resmi kurum ya da kuruluşlar</i>
        </div>
        <br />
        <div className="legal-text-container">
          Kişisel veriler, yalnızca zorunlu yasal gereklilikler (bkz. "Mercedes Benz Otomotiv Ticaret ve Hizmetler Anonim Şirketi Kişisel Verilerin İşlenmesi Aydınlatma Metni” maddesi) çerçevesinde olmak üzere, resmi kurum ya da kuruluşlarına aktarılmaktadır.        </div>
        <div className="legal-text-title">
          6    Saklama ve silme süresi
        </div>
        <div className="legal-text-container">
          Kişisel verilerinizi ancak ve yalnızca ilgili amaçlar açısından gereklilik arz ettiği sürece saklamakta ve işlemekteyiz (bkz. "Veri işleme kapsam ve amaçları" hakkındaki madde). Ayrıca; veriler ancak ve yalnızca yasal gerekliliklere uyum (vergi yasaları ya da ticari yasalar uyarınca veri saklama yükümlülükleri gibi) gibi bir başka amaç (bkz. "Veri işleme kapsam ve amaçları" hakkındaki madde) açısından gereklilik arz ettiği takdirde saklanmakta ve işlenmektedir. Bu durumda; verilerin daha uzun süreli olarak işlenmesi tarafımızca bu amaçla ve daha uzun süreli olarak işlemenin yasal temeli ile sınırlandırılmaktadır.
        </div>
        <div className="legal-text-title">
          7    Veri Koruma Konuları için İletişim Kişisi
        </div>
        <div className="legal-text-container">
          Uygulama içindeki kişisel verilerin işlenmesi hakkındaki her türlü soru için Kullanıcı, Kurumsal Veri Koruma İcra Kurulu Başkanı ile iletişime geçebilir; bu kişi (ekibiyle birlikte) bilgi talepleri, öneriler veya şikayetlerle de ilgilenecektir.        </div>
        <div className="legal-text-container">
          <br />
        </div>
        <div className="legal-text-container">
          Daimler AG
        </div>
        <div className="legal-text-container">
          Kurumsal Veri Koruma İcra Kurulu Başkanı
        </div>
        <div className="legal-text-container">
          HPC G353
        </div>
        <div className="legal-text-container">
          D-70546 Stuttgart, Almanya
        </div>
        <div className="legal-text-container">
          Email: data.protection@daimler.com
        </div>
        <div className="legal-text-title">
          8    Mercedes Benz Otomotiv Ticaret ve Hizmetler Anonim Şirketi Kişisel Verilerin İşlenmesi Aydınlatma Metni
        </div>
        <br />
        <div className="legal-text-container">
        6698 sayılı Kişisel Verilerin Korunması Kanunu’nun (“KVKK”) 10’uncu maddesi ‘Veri Sorumlusunun Aydınlatma Yükümlülüğü’ madde başlığı ile ‘veri sorumlusu’ olan Mercedes Benz Otomotiv Ticaret ve Hizmetler Anonim Şirketi’nin (“MBO”) ilgili kişileri (diğer ifadeyle ‘veri sahiplerini’) veri sorumlusunun kimliği, kişisel veri işleme amaçları, kişisel verilerin aktarıldığı kişiler ve aktarma amaçları, kişisel verilerin toplanmasının hukuki sebepleri ve yöntemleri, kişisel veri sahibinin veri sorumlusuna yönelteceği KVKK’nın 11’inci maddesinde sayılan hakları konusunda bilgilendirme yükümlülüğü getirmiştir. 
        </div>
        <br />
        <div className="legal-text-container">
        İşbu Aydınlatma Metni ile KVKK’nın 10’uncu maddesi hükmü uyarınca veri sahipleri bilgilendirilmekte ve aydınlatılmaktadır.
        </div>
        <br />
        
        <div className="legal-text-container">
          a. Veri Sorumlusunun Kimliği
        </div>
        <br />

        <div className="legal-text-container">
        ‘Veri Sorumlusunun Aydınlatma Yükümlülüğü’ başlıklı KVKK’nın 10’uncu maddesinin 1’inci fıkrasının (a) bendi veri sorumlusunun kimliği konusunda bilgi verilmesi yükümlülüğünü getirmiştir. KVKK’nın 3’üncü maddesinin 1’inci fıkrasının (ı) bendinde veri sorumlusu, ‘Kişisel verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin kurulmasından ve yönetilmesinden sorumlu olan gerçek veya tüzel kişiler’ olarak tanımlanmıştır. KVKK’nın uygulanması bakımından MBO ‘veri sorumlusu’ olabilir. Bu çerçevede ‘veri sorumlusunun kimliği’, Türkiye Cumhuriyeti kanunlarına uygun şekilde anonim şirket olarak kurulmuş ve fasılasız bir şekilde varlığını sürdüren, İstanbul Ticaret Sicil Memurluğu nezdinde 187958-5  sicil numarası ile kayıtlı, 0616068739300001 Mersis Numaralı, şirket merkezi Akçaburgaz Mah. Süleyman Şah Cad. No: 6/1 Esenyurt 34522 ESENYURT / İSTANBUL adresinde bulunan MERCEDES BENZ OTOMOTİV TİCARET VE HİZMETLER A.Ş.’dir.
        </div>
        <br />

        <div className="legal-text-container">
          b. Kişisel Verilerin İşlenme Amaçları
        </div>
        <br />

        <div className="legal-text-container">
        Kişisel Verileriniz KVKK’nın 5’inci maddesinde belirtilen kişisel veri işleme şartlarından bir veya birkaçına dayalı olarak, KVKK’nın 4’üncü maddesinde belirtilen kişisel veri işleme ilkelerine uygun şekilde işlenmektedir. MBO’nun yürütmüş olduğu tüm kişisel veri işleme faaliyetlerinde KVKK başta olmak üzere ilgili tüm mevzuatta aranan yükümlüklere de uygun olarak hareket edilmektedir. Kişisel verilerinizin işlenme amaçları KVKK’nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları dahilinde Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması; Şirketimiz tarafından sunulan ürün ve hizmetlerin sizlerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi; Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini ve Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanmasıdır. Kişisel verilerinizin Şirket’imiz tarafından işlenme amaçları konusunda detaylı bilgilere,<a onClick={() => {
            window.open('https://www.mercedes-benz.com.tr', '_system')
          }}>www.mercedes-benz.com.tr</a>  internet adresinden ulaşabileceğiniz Mercedes Benz Otomotiv Ticaret ve Hizmetler Anonim Şirketi Kişisel Verilerin İşlenmesi ve Korunması Politikası’nda yer verilmiştir.
       </div>
        <br />

        <div className="legal-text-container">
          c.	İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği
        </div>
        <br />

        <div className="legal-text-container">
        Toplanan kişisel verileriniz, Şirketimiz tarafından sunulan ürün ve hizmetlerden sizleri faydalandırmak için gerekli çalışmaların iş birimlerimiz tarafından yapılması; Şirketimiz tarafından sunulan ürün ve hizmetlerin sizlerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi; Şirketimizin ve Şirketimizle iş ilişkisi içerisinde olan kişilerin hukuki ve ticari güvenliğinin temini ve Şirketimizin ticari ve iş stratejilerinin belirlenmesi ve uygulanması amaçlarıyla iş ortaklarımıza, tedarikçilerimize, hissedarlarımıza, kanunen yetkili kamu kurumlarına ve özel kişilere, KVKK’nın 8. ve 9. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları çerçevesinde <a onClick={() => {
            window.open('https://www.mercedes-benz.com.tr', '_system')
          }}>www.mercedes-benz.com.tr</a> internet adresinden ulaşabileceğiniz Mercedes Benz Otomotiv Ticaret ve Hizmetler Anonim Şirketi Kişisel Verilerin İşlenmesi ve Korunması Politikası’nda belirtilen amaçlarla sınırlı olarak aktarılabilecektir.
      </div>
        <br />

        <div className="legal-text-container">
          d.	Kişisel Veri Toplamanın Yöntemi ve Hukuki Sebebi
      </div>
        <br />

        <div className="legal-text-container">
        Kişisel verileriniz ticari faaliyetlerimizi yürütmek amacıyla MBO tarafından farklı kanallarla ve hukuki sebeplere dayanarak toplanmaktadır. Kişisel verileriniz KVKK’nın 5. ve 6. maddelerinde belirtilen kişisel veri işleme şartları ve amaçları kapsamında işbu Aydınlatma Metni’nde belirtilen amaçlarla da işlenebilmekte ve aktarılabilmektedir.      </div>
        <br />
        <div className="legal-text-container">
          e.	Kişisel Veri Sahibinin 6698 sayılı Kanun’un 11. maddesinde Sayılan Hakları
      </div>
        <br />

        <div className="legal-text-container">
          Kişisel veri sahipleri olarak, haklarınıza ilişkin taleplerinizi <a onClick={() => {
            window.open('https://www.mercedes-benz.com.tr', '_system')
          }}>www.mercedes-benz.com.tr</a> internet adresinden kamuoyu ile paylaşılmış olan Mercedes Benz Otomotiv Ticaret ve Hizmetler Anonim Şirketi Kişisel Verilerin İşlenmesi ve Korunması Politikası’nda düzenlenen yöntemlerle tarafımıza iletebilirsiniz. MBO, talebin niteliğine göre talebi en kısa sürede ve en geç otuz (30) gün içinde ücretsiz olarak sonuçlandıracaktır. Ancak, işlemin ayrıca bir maliyeti gerektirmesi hâlinde, tarafımızca Kişisel Verileri Koruma Kurulunca belirlenen tarifedeki ücret alınacaktır. Kişisel verisi işlenen gerçek kişilerin KVKK’nın 11. maddesi uyarıca sahip olduğu haklar aşağıdaki gibidir:
      </div>
        <div className="legal-text-container">
          •	Kişisel veri işlenip işlenmediğini öğrenme,
            </div>
        <div className="legal-text-container">
          •	Kişisel verileri işlenmişse buna ilişkin bilgi talep etme,
      </div>
        <div className="legal-text-container">
          •	Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,
      </div>
        <div className="legal-text-container">
          •	Yurt içinde veya yurt dışında kişisel verilerin aktarıldığı üçüncü kişileri bilme,
     </div>
        <div className="legal-text-container">
          •	Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,      </div>
        <div className="legal-text-container">
          •	KVKK ve ilgili diğer kanun hükümlerine uygun olarak işlenmiş olmasına rağmen, işlenmesini gerektiren sebeplerin ortadan kalkması hâlinde kişisel verilerin silinmesini veya yok edilmesini isteme ve bu kapsamda yapılan işlemin kişisel verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,       </div>
        <div className="legal-text-container">
          •	İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,      </div>
        <div className="legal-text-container">
          •	Kişisel verilerin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme, haklarına sahiptir.      </div>
          <br>
          </br>
          <div className="legal-text-container">
          Seçme Olanakları
     </div>
     <div className="legal-text-container">
     Verilerinizden, sizi ürünlerimiz ve hizmetlerimiz konusunda bilgilendirebilmek ve gerektiğinde bu konularda size danışabilmek amacı ile yararlanmak arzusundayız. Doğal olarak bu tür etkinliklere katılıp katılmamak tamamen sizin seçiminizdir. Bu konuda onay vermemeniz durumunda bunu her an bildirebilirsiniz; biz de bilgilerinizi gerektiği şekilde erişime kapalı tutarız. 
     </div>
     <div className="legal-text-container">
     Konu ile ilgili daha ayrıntılı bilgiyi web sitelerinde bulabilirsiniz.
     </div>
     <br></br>
     <div className="legal-text-container">
     Güvenlik
     </div>
     <div className="legal-text-container">
     Mercedes-Benz, tarafımızdan yönetilen kişisel verilerinizi, manipülasyona uğramamaları, kaybolmamaları, hasar görmemeleri ve yetkisi olmayan kişilerce kullanılmamaları için koruma amacı ile teknik ve organizasyonel açıdan güvenlik önlemleri uygulamaktadır. Güvenlik önlemlerimiz teknolojik ilerlemeler ile birlikte sürekli gelişme içersindedir.     </div>
   
     <br></br>
     <div className="legal-text-container">
     Bilgi Alma Hakkı
     </div>
     <div className="legal-text-container">
     Mercedes Benz Otomotiv Ticaret ve Hizmetler A.Ş. ya da şirketin sizin bölgenizden sorumlu yetkili birimi, talebiniz üzerine olabildiğince hızlı ve yazılı olarak yürürlükteki yasalar uyarınca, kişisel verilerinizin bizde kayıtlı olup olmadığını veya hangilerinin kayıt edildiğini bildirmektedir. Kullanıcı olarak kayıtlı iseniz, size verileri görme ve gerektiğinde silme ya da değiştirme olanağı tanınmaktadır. Bilgilerin doğruluğu ve güncelliğiyle ilgili çabalarımıza karşın yanlış bilgiler kayıt edilmiş ise, bu yanlışlar sizin uyarınız üzerine düzeltilmektedir.   
     </div>
      <br></br>
     <div className="legal-text-container">
     Bilgi Alma Hakkı
     </div>

        <div className="legal-text-title">
          9 Güncelleme
        </div>
        <div className="legal-text-container">
          Bu veri koruma bildirimini, durum ve koşullarda bir değişiklik meydana gelmesi ve teknik gelişmeler yaşanması gibi hallerin ardından, ileride geçerlilik kazanmak üzere zaman zaman güncelleme hakkımızı saklı tutarız.  Her türlü önemli değişiklik yeterli süre öncesinden ve uygun yollardan tarafınıza bildirilerek değişikliğe ilişkin haklarınız açıklanacaktır.
      </div>
      <br />
        <div className="legal-text-container">
          Son güncelleme: Ocak 2020
       </div>
       <br></br>
       <div className="legal-text-container" style={{ justifyContent: 'center', textAlign: "center" }}>
          <strong>
            MÜŞTERİ KİŞİSEL VERİLERİNİN İŞLENMESİ RIZA METNİ
        </strong>
        </div>
        <div className="legal-text-container">
        Şirketimiz tarafından Mercedes Benz Otomotiv Ticaret ve Hizmetler Anonim Şirketi Kişisel Verilerin Korunması ve İşlenmesi Politikası ve işbu Veri Koruma hükümlerine uygun olarak ve yukarıda yer alan Aydınlatma Metni kapsamında kişisel verilerinizin şirket nezdinde kayıt oluşturulması ve bu kapsamda; ürün ve hizmetlerin sizlerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi ile satış ve pazarlama faaliyetleri amacıyla işlenmesini onaylıyor musunuz?     
         </div>
      </div>

    </div>
  )
}
