import React, { Component } from 'react'

export const tocItemIOS = (pushComponent) => {

  return(
    <div className="legal-container">
      <div className="legal-title">
        Veri Koruma
      </div>
      <div className="legal-text">
        <div className="legal-text-title">
          Gizlilik Beyanı
        </div>
        <div className="legal-text-container">
          Uygulamamıza gösterdiğiniz ilgi için teşekkür ederiz. Kişisel verilerinizin işlenmesi sırasında gizliliğinizin korunması konusuna özellikle dikkat gösteriyor ve Uygulamamızı güvenle kullanmanızı istiyoruz. Uygulamamızı kullanmanız sırasında toplanan kişisel bilgilerinizin işlenmesi, sitelerin işletiminin yapıldığı ülkelerin yasal düzenlemelerine göre bizim tarafımızdan yapılmaktadır. Veri koruma politikamız Mercedes-Benz Türk A.Ş. ve Daimler için geçerli veri koruma politikasına dayanmaktadır.
        </div>
        <div className="legal-text-container">
          <a onClick={()=>{
            window.open('https://www.daimler.com/documents/company/other/daimler-dataprotectionpolicy-tr.pdf','_system')
          }}>https://www.daimler.com/documents/company/other/daimler-dataprotectionpolicy-tr.pdf</a>
        </div>
        <div className="legal-text-title">
          Kişisel Bilgilerin Toplanması ve İşlenmesi
        </div>
        <div className="legal-text-container">
          Uygulamayı ve işlevlerini yalnızca gerektiği kadarıyla veya ek bir kullanıma onay verdiğiniz kadarıyla sunmak için kişisel bilgilerinizi toplamakta, işlemekte ve kullanmaktayız. Özellikle girdiğiniz verileri ve izin vermeniz halinde mobil cihazınızda bulunan veya cihaz işlevlerinin kullanılması yoluyla üretilen verileri kullanırız. (Konum).
        </div>
        <div className="legal-text-container">
          Bu verilere erişilmeden Uygulamanın kullanılması mümkündür. Erişim, iOS ayarlarında herhangi bir zamanda devre dışı bırakılabilir ve devreye alınabilir ve uygulama içerisinde verilmiş olan bu izinleri iptal edebilir. iOS Ayarlar > Gizlilik > Konum Servisleri > Servisim. Ancak Uygulamaya erişimin devre dışı bırakılması halinde bu durum işlevlerde sınırlamalara neden olabilir.
        </div>
        <div className="legal-text-title">
          Kişisel Verilerin  Transferi
        </div>
        <div className="legal-text-container">
        Uygulama ile bağlantılı olarak üçüncü şahıs hizmetlerinin (Google Maps, Whatsapp, Adobe Analytics) kullanılması halinde Yayıncı, Uygulamanın ilgili işlevleri için gerektiği kadarıyla kişisel verileri üçüncü şahıs tedarikçiye / sağlayıcıya aktarma hakkına sahip olacaktır. Bu amaçla kişisel Kullanıcı verileri EU/EWR dışındakişu ülkelere de aktarılabilir: Singapur ve Türkiye. Kişisel veriler yalnızca geçerli zorunlu ulusal kanunlar kapsamında gerekmesi halinde kamu kurum ve yetkililerine aktarılabilecektir
        </div>
        <div className="legal-text-title">
          Bildirimler
        </div>
        <div className="legal-text-container">
          Uygulama servis randevu onayı ve aracın servisteki durum değişiklikleri hakkında kullanıcıyı uyarmak için bildirim yoluyla kullanıcıyı bilgilendirir. Bildirimi, herhangi bir zamanda / iOS sistem ayarından devre dışı bırakabilir ve yeniden etkinleştirebilir. iOS Ayarlar > Bildirimler > Servisim.
          <br/>
          Fonksiyonu uygulamanın başlatılması sırasında veya daha sonra etkinleştirdiyseniz, uygulama yeni kampanya ve etkinlikler hakkında bildirim yoluyla ve cihazınız aracılığıyla sizi bilgilendirir. Bildirimler herhangi bir zamanda iOS Ayarlar > Bildirimler > Servisim üzerinden devre dışı bırakılabilir ve yeniden etkinleştirilebilir.
        </div>
        <div className="legal-text-title">
          Güvenlik
        </div>
        <div className="legal-text-container">
          Tarafınızca temin edilen verileri korumak için tarafımızda yönetilen, kötüye kullanma, kaybetme, imha etme veya üçüncü şahıs erişimini önlemeye yönelik teknik ve organizasyonel güvenlik önlemleri kullanmaktayız. Güvenlik önlemlerimiz teknolojik geliştirmeler doğrultusunda sürekli olarak geliştirilmektedir.
        </div>
        <div className="legal-text-container">
          Uygulama, cihazının şifrelemesini etkin hale getirdiğinizde ve bir parola/PIN ayarladığınızda, şifreli bir biçiminde kişisel verileri saklayacaktır. Cihazınızın üzerinde şifreleme kullanmamanız veya parola/PIN ayarlamamanız halinde kişisel verilerin şifrelenmesi sağlanamaz.
        </div>
        <div className="legal-text-title">
          Veri Koruma Konuları için İletişim Kişisi
        </div>
        <div className="legal-text-container">
          Uygulama içindeki kişisel verilerin işlenmesi hakkındaki her türlü soru için Kullanıcı, Kurumsal Veri Koruma İcra Kurulu Başkanı ile iletişime geçebilir; bu şahıs (ekibiyle birlikte) bilgi talepleri, öneriler veya şikayetlerle de ilgilenecektir.
        </div>
        <br />
        <div className="legal-text-container">
          Kurumsal Veri Koruma İcra Kurulu Başkanı
        </div>
        <div className="legal-text-container">
          Dr. Joachim Rieß
        </div>
        <div className="legal-text-container">
          Daimler AG
        </div>
        <div className="legal-text-container">
          HPC 0518
        </div>
        <div className="legal-text-container">
          D-70546 Stuttgart
        </div>
        <div className="legal-text-container">
          Almanya
        </div>
      </div>
    </div>
  )
}
