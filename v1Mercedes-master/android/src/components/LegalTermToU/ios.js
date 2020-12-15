import React, { Component } from 'react'

export const tocItemIOS = (pushComponent) => {

  let name = "iOS"
  let date = "02/01/2020"
  let version = "1.3.0 "

  return(
    <span>
      <div className="legal-title">
        Mercedes Servisim Uygulaması ({name}) için Son Kullanıcı Lisans Şartları
      </div>
      <div className="legal-text">
        <div className="legal-text-container">
          <br/>
        </div>
        <div className="legal-text-container">
          Sürüm {version} {date} tarihinden itibaren
        </div>
        <div className="legal-text-title">
          BÖLÜM I Son Kullanıcı Lisans Şartları (SKLS)
        </div>
        <div className="legal-text-title">
          1     Giriş
        </div>
        <div className="legal-text-title">
          1.1 Yayıncı ve Sağlayıcı
        </div>
        <div className="legal-text-container">
          İşbu Uygulama, Yayıncısı tarafından bağımsız operatörün ("Platform Operatörü") uygulama mağazasında (“Platform”) sunulmaktadır. Aksi belirtilmedikçe, Kullanıcının sözleşme çerçevesinde karşı tarafı Yayıncıdır. Sağlayıcı ("Provider") işbu sözleşmeden yararlanandır. Sağlayıcı ("Provider"), Kullanıcıya Uygulamanın kullanılabilmesi için gerekli hakları ve olası desteği sağlar.
          <br/>
          Platform Operatörünün işbu sözleşme kapsamındaki uygulama veya içeriği hakkında Kullanıcı ile iş ilişkisi bulunmamaktadır.
        </div>
        <div className="legal-text-title">
          1.2 Uygulama Kullanıcısı ve Kullanım Amacı
        </div>
        <div className="legal-text-container">
          Kullanıcı, şahıs olarak veya kendisini çalıştıran işletme adına uygulamanın kullanıma yönelik işbu sözleşmenin tarafıdır. Kullanıcının sözleşmeyi yetkisi bulunmaksızın imzalaması halinde, Kullanıcı kendi nam ve hesabına işbu sözleşmenin tarafı haline gelecektir.
        </div>
        <div className="legal-text-container">
          İşbu  Uygulama,  hak sahibi olan Kullanıcı tarafından kişisel veya ticari amaca yönelik olarak kullanabilir.
        </div>
        <div className="legal-text-title">
          1.3 Uygulamanın İşlevi ve Amacı
        </div>
        <div className="legal-text-container">
          Uygulamanın işlevi ve amacı linkte belirtilmiş olan Uygulama Açıklaması isimli dokümanda açıklanmaktadır.
        </div>
        <div className="legal-text-link" onClick={() => pushComponent(2)}>
          Uygulama Açıklaması
        </div>
        <div className="legal-text-title">
          1.4 Kayıt
        </div>
        <div className="legal-text-container">
          Bir Kullanıcı hesabı kaydının yapılması gerektiği durumda, Kullanıcı doğru ve eksiksiz verileri girmeli ve bu bilgileri her zaman güncel tutmalıdır. Bu verilerin alınması için Bölüm II geçerlidir.
        </div>

        <div className="legal-text-title">
          2     Kullanım Hakları
        </div>
        <div className="legal-text-title">
          2.1  Kullanım Haklarının Kapsamı
        </div>
        <div className="legal-text-container">
          İşbu Kullanım şartları hak sahibi Kullanıcıya şahsi kullanım için Uygulamanın kullanılması hakkını vermektedir. Bu kullanım hakkı Kullanıcıya münhasır olmayan, alt lisans verilemez, devredilemez ve geri alınabilir bir haktır.
        </div>
        <div className="legal-text-container">
          Sapma ve tamamlamalar, UAKKY (Bölüm 2.2) ve Üçüncü Tarafa Ait İçerik (Bölüm 2.3) bilgi ve koşullarından kaynaklanabilir.
        </div>

        <div className="legal-text-title">
          2.2  UAKKY Kullanım Hakları
        </div>
        <div className="legal-text-container">
          Uygulama, Ücretsiz ve  Açık Kaynak Kodlu  Yazılım ( “UAKKY” veya Free And Open Source Software "FOSS") parçalarını içerebilir. Bu bileşenler için UAKKY BİLGİLERİNE İLŞKİN BİLGİ VE ŞARTLAR adlı linkte belirtilen doküman geçerlidir. Belirtilen UAKKY BİLGİLERİNE İLŞKİN BİLGİ VE ŞARTLAR belgesi hükümleri
        </div>
        <div className="legal-text-link" onClick={() => pushComponent(4)}>
          Ücretsiz ve Açık Kaynaklı Yazılım
        </div>
        <div className="legal-text-container">
          işbu SKLS hükümlerine göre önceliğe sahiptir.
        </div>
        <div className="legal-text-title">
          2.3  Üçüncü Tarafa Ait İçerik
        </div>
        <div className="legal-text-container">
          Uygulamada üçüncü şahıs yazılımları veya içeriği bulunabilir veya kullanılabilir. Bu bileşenler için ÜÇÜNCÜ ŞAHIS İÇERİĞİ İLE İLGİLİ BİLGİLER VE KOŞULLAR adlı belge geçerlidir.
        </div>
        <div className="legal-text-link" onClick={() => pushComponent(5)}>
          Üçüncü Taraf İçeriği
        </div>
        <div className="legal-text-container">
          adlı belge hükümleri işbu SKLS’ya göre önceliğe sahiptir.
        </div>
        <div className="legal-text-container">
          Üçüncü kişi sağlayıcı tarafından ilgili hakların doğrudan Kullanıcıya sağlanması durumunda, Kullanıcı işbu SKLS{"'"}yi kabul ederek, üçüncü kişi ile üçüncü şahıs içeriğinin kullanımı hakkında geçerli koşullar kapsamında bir sözleşmeye taraf olmaktadır. Bu sözleşmesel ilişki koşullarının ihlal edilmesi durumunda üçüncü kişi sağlayıcı Kullanıcıya karşı hak iddia edebilecektir.
        </div>
        <div className="legal-text-title">
          2.4  Kullanım Haklarının Sona Ermesi
        </div>
        <div className="legal-text-container">
          Kullanım Lisansı, Kullanıcının işbu SKLS'ya uyması mutlak koşuluyla verilmektedir. Kullanıcının işbu SKLS'yı ihlali halinde Uygulama ve içeriği ile ilgili olarak verilen lisans kendiliğinden sona erer.
        </div>
        <div className="legal-text-container">
          Bundan bağımsız olarak Uygulamanın Yayıncısı ve Sağlayıcısı Uygulamanın kullanılması için işbu SKLS kapsamında verilen hakları derhal yürürlüğe girmek üzere tek taraflı bildirim ile iptal edebilir.
        </div>
        <div className="legal-text-title">
          2.5 İhlaller
        </div>
        <div className="legal-text-container">
          İşbu SKLS’nin ihlal edilmesi Kullanıcı için, Kullanım haklarının sona ermesine ek olarak, Uygulama ve içeriğinin yasa dışı kullanımı nedeniyle başka yasal sonuçlar doğurabilir. Buna Uygulamanın kullanımının durdurulması veya uygulamadaki hatalar ve bunlara bağlı tazminat talepleri de dahildir.
        </div>
        <div className="legal-text-title">
          3     Kullanıcı Yükümlülükleri
        </div>
        <div className="legal-text-title">
          3.1  Gizlilik
        </div>
        <div className="legal-text-container">
          Kullanıcı, Uygulamayı ve içeriğini yalnızca özel amaçlar için kullanabilir. İçeriğini sosyal ağlar veya başka bir yolla halka açık olarak erişilebilir hale getiremez.
        </div>
        <div className="legal-text-title">
          3.2  Düzgün Çalışmama Hakkında Bilgilendirme Yükümlülüğü
        </div>
        <div className="legal-text-container">
          Kullanıcı, Uygulamadaki bozukluklar veya aksaklıklar hakkında Uygulama Desteği birimine şu link aracılığı ile haber vermelidir.
        </div>
        <div className="legal-text-link" onClick={() => pushComponent(7)}>
          Uygulama Desteği
        </div>
        <div className="legal-text-title">
          3.3  Yasalara Uygun Kullanım
        </div>
        <div className="legal-text-container">
          Kullanıcı Uygulamayı yalnızca işbu SKLS ve yürürlükteki kanunlara uygun şekilde kullanacağını kabul ve taahhüt etmektedir.
        </div>
        <div className="legal-text-title">
          4     Sınırlamalar
        </div>
        <div className="legal-text-title">
          4.1 Transfer ve İstismar ile ilgili Yasaklar
        </div>
        <div className="legal-text-container">
          Uygulamanın her hangi bir üçüncü kişi tarafından bir ücret ödemesi karşılığında veya ücretsiz olarak kullanmasına izin verilmesine, Uygulamanın yayınlanmasına, lisanslandırılmasına, satılmasına veya başka bir şekilde ticari istismarına izin verilmemektedir. İşbu SKLS kapsamında Uygulama ile ilgili olarak kiralama veya devir izni verilmemektedir.
        </div>
        <div className="legal-text-title">
          4.2 Değişiklik Yapma Yasağı
        </div>
        <div className="legal-text-container">
          Uygulamanın değiştirilmesine, ayarlanmasına, dönüştürülmesine, türev çalışmaların oluşturulmasına, çözülmesine, ters mühendisliğine, Uygulamanın silinmesine veya başka bir şekilde Uygulamanın kaynak koduna ulaşmaya çalışılmasına izin verilmez. Yayıncı tarafından makul koşullar altında sunulmadığı takdirde, Kullanıcının Kaynak Koda Dönüştürmek için diğer programlar ile birlikte gerekli bilgilerin toplanmasına yönelik hakları saklıdır.
        </div>
        <div className="legal-text-title">
          4.3 Yayıncı veya bir Üçüncü Şahsın Yazılımları veya Web Siteleri Hakkındaki Hükümler
        </div>
        <div className="legal-text-container">
          Uygulamanın kendisi üzerinde, ilişkili web sitelerinde veya Uygulamanın eriştiği yazılımlarda olumsuz bir etkiye sahip her türlü Uygulamanın kullanımı yasaktır.
        </div>
        <div className="legal-text-title">
          5. Garanti Kapsamındaki Hususlar
        </div>
        <div className="legal-text-container">
        </div>
        <div className="legal-text-title">
          5.1 Ücretsiz Temin
        </div>
        <div className="legal-text-container">
          BU UYGULAMA “OLDUĞU GİBİ” VE BEDELSİZ OLARAK SAĞLANIR. UYGULAMA VE İÇERİĞİNİN KULLANILABİLİRLİĞİNE İLİŞKİN HİÇBİR YÜKÜMLÜLÜK KABUL EDİLMEMEKTEDİR. UYGULAMA KUSURLARINA İLİŞKİN GARANTİLERE İLİŞKİN TALEPLER UYGULAMA YAYINCISININ VEYA SAĞLAYICININ KASITLI VEYA AĞIR  İHMALİ DIŞINDA KABUL EDİLMEZ. AYNI DURUM MUHTEMEL DESTEK İÇİN DE GEÇERLİDİR.
        </div>
        <div className="legal-text-title">
          5.2 Bilgilerin Doğruluğu
        </div>
        <div className="legal-text-container">
          Yayıncı Uygulama içinde doğru ve güncel bilgileri sunmak için her türlü çabayı gösterir. ANCAK YAYINCI, BU BİLGİLERİN TAMLIĞI VE DOĞRULUĞU İLE İLGİLİ HİÇBİR SORUMLULUK ÜSTLENMEZ. MALLARIN, HİZMETLERİN VE FİYATLARIN SUNUMU TAMLIĞI VE DOĞRULUĞUNA İLİŞKİN HİZMETLER HİÇ BİR GARANTİDE BULUNULMAKSIZIN YAPILMAKTADIR.
        </div>
        <div className="legal-text-title">
          5.3 Garanti Kapsamı
        </div>
        <div className="legal-text-container">
          İŞBU MADDE 5’DE AKSİ YÖNDE BELİRTİLEN HÜKÜMLER YAYINCININ VEYA TEDARİKÇİNİN KANUNEN BELİRLENMİŞ HİÇBİR ZORUNLU GARANTİ YÜKÜMLÜLÜĞÜNÜ SINIRLAMAYACAK VE MUAFİYET SAĞLAMAYACAKTIR.
        </div>
        <div className="legal-text-title">
          6    Yükümlülükler
        </div>
        <div className="legal-text-title">
          6.1 Yayıncı ile Sağlayıcının Yükümlülüğü
        </div>
        <div className="legal-text-container">
          Sağlayıcı veya Yayıncının kusurlu olmasına bakılmaksızın, ayıbın hile ile gizlenmesine ilişkin sorumluluk ve kasıtlı olarak bir kusurun saklanmasına ilişkin sorumluluk, garantinin veya satın alma riskinin kabulünden etkilenmez.
        </div>
        <div className="legal-text-container">
          YASAL TEMSİLCİLERİN, VEKİL ACENTELERİN, YAYINCININ VE SAĞLAYICININ İHMALKARLIK NEDENİYLE ORTAYA ÇIKAN ZARARLARA İLİŞKİN KİŞİSEL SORUMLULUĞU HARİÇ TUTULMUŞTUR.
        </div>
        <div className="legal-text-title">
          6.2 Tazminat
        </div>
        <div className="legal-text-container">
          Uygulamanın Sağlayıcısı veya Yayıncısı aleyhine üçüncü şahıs tarafından SKLS’nın Kullanıcı tarafından ihlali hakkında bir bildirimde bulunulması halinde Kullanıcı, Yayıncı ve Sağlayıcı her türlü talep ve masraftan ber’i kılacak ve makul yasal danışmanlık ve avukat vekalet ücreti de dahil olmak üzere doğrudan ve dolaylı zararlarını tazmini talep edebilecektir. Bu durum, kullanıcının böyle bir ihlalden sorumlu olmaması halinde geçerli değildir. Yayıncı, bu talepler karşısında savunmayı üstlenme hakkını saklı tutmaktadır.
        </div>
        <div className="legal-text-title">
          6.3 Tazminatın Kapsamı
        </div>
        <div className="legal-text-container">
          İŞBU BÖLÜM 6’DA BELİRTİLEN KOŞULLARA BAKILMAKSIZIN, BÖLÜM 6’DAKİ HİÇBİR HUSUS, YÜRÜRLÜKTEKİ KANUNLARIN HÜKÜMLERİNE AYKIRI OLARAK YAYINCININ VEYA TEDARİKÇİNİN HİÇBİR SORUMLULUĞU SINIRLAMAYACAK VE MUAFİYET SAĞLAMAYACAKTIR.
        </div>
        <div className="legal-text-title">
          7     Nihai Hükümler
        </div>
        <div className="legal-text-container">
        </div>
        <div className="legal-text-title">
          7.1 Değiştirilebilirlik
        </div>
        <div className="legal-text-container">
          Yayıncı, gerekli gördüğü takdirde işbu SKLS ’da değişiklik yapma hakkını saklı tutmaktadır. Yayıncı, SKLS’da yapılabilecek önemli değişiklikleri Kullanıcıya bildirecektir. Değişiklikler, ilgili bildirimden itibaren 30 gün içinde kendiliğinden yürürlüğe girecektir. Bir Kullanıcının bir değişikliği kabul etmemesi halinde Kullanıcı, Uygulamayı kaldırmalı ve bir daha kullanmamalıdır. Kullanıcı, Uygulamayı kullanmaya devam ettiğinde SKLS’daki değişiklikleri kabul etmiş sayılır.
        </div>
        <div className="legal-text-title">
          7.2 Münferit Hükümlerin Geçersizliği
        </div>
        <div className="legal-text-container">
          İşbu SKLS’nın herhangi bir hükmünün şimdi veya gelecekte geçersiz, hükümsüz veya uygulanamaz olması durumunda diğer hükümler bu durumdan etkilenmez.
        </div>
        <div className="legal-text-title">
          7.3 Geçerli Yasalar
        </div>
        <div className="legal-text-container">
          Bu SKLS Türkiye Cumhuriyeti Mevzuatına tabi olup bu mevzuat hükümlerine göre uygulanacak ve yorumlanacaktır.
        </div>
        <div className="legal-text-title">
          7.4 Yargı Yeri
        </div>
        <div className="legal-text-container">
          Anlaşmazlık halinde yetkili mahkemeler ve icra daireleri olarak İstanbul Merkez (Çağlayan) Mahkemeleri ve İcra Daireleri olarak kararlaştırılmıştır.
        </div>
        <div className="legal-text-title">
          8     Ek Hükümler
        </div>
        <div className="legal-text-container">
          Platforma bağlı olarak Uygulamanın kullanımına ilişkin ek koşullar geçerli olabilir:
        </div>
        <div className="legal-text-title">
          8.1 Apple
        </div>
        <div className="legal-text-title">
          8.1.1
        </div>
        <div className="legal-text-container">
          İşbu SKLS yalnızca Kullanıcı ile Yayıncı arasında düzenlenmiştir. Apple işbu SKLS’nin tarafı değildir. Apple, Uygulamaya ilişkin hiçbir sorumluluk üstlenmemektedir, ancak SKLS’nın ihlali halinde Kullanıcı aleyhine talepte bulunma hakkına sahiptir.
        </div>
        <div className="legal-text-title">
          8.1.2
        </div>
        <div className="legal-text-container">
          Yayıncı, Kullanıcıya Uygulamayı yalnızca kendisinin sahibi olduğu veya kullandığı iOS cihazlarda ve App Store SKLS’sına uygun şekilde kullanma hakkını vermektedir.
        </div>
        <div className="legal-text-title">
          8.1.3
        </div>
        <div className="legal-text-container">
          Apple hiçbir şekilde Uygulamaya ilişkin bakım ve destek hizmetleri sunmakla yükümlü değildir.
        </div>
        <div className="legal-text-title">
          8.1.4
        </div>
        <div className="legal-text-container">
          Apple üçüncü şahıs fikri mülkiyet haklarının ihlalinden kaynaklanan taleplerin gözden geçirilmesi, savunulması, çözülmesi veya yerine getirilmesine ilişkin hiçbir sorumluluk üstlenmemektedir.
        </div>
        <div className="legal-text-title">
          8.1.5
        </div>
        <div className="legal-text-container">
          Apple, Kullanıcı veya bir üçüncü Şahıs tarafından Uygulama veya Uygulamanın mülkiyeti ve/veya kullanımı ile bağlantılı olarak yöneltilen talepleri yanıtlamakla yükümlü değildir. Bu durum, şu talepler için de geçerlidir: (a) ürün sorumluluğuna ilişkin talepleri; (b) Uygulamanın yasal veya düzenleyici hükümleri ihlal ettiğine ilişkin iddialar ve (c) Tüketici Koruma Kanunundan doğan talepler.
        </div>
        <div className="legal-text-title">
          8.1.6
        </div>
        <div className="legal-text-container">
          Uygulamanın garanti veya taahhüdü yerine getirmemesi halinde Kullanıcı, Apple’a ihbar etme hakkına sahiptir; bu şekilde Apple, varsa satın alma bedelini Kullanıcıya iade edebilir. Apple, Uygulamaya ilişkin hiçbir garanti vermemektedir.
        </div>
        <div className="legal-text-title">
          8.1.7
        </div>
        <div className="legal-text-container">
          Apple ile bağlı kuruluşları gizlilik beyanının ve işbu SKLS’dan faydalanandır ve Kullanıcının kabulü sonrasında işbu SKLS’dan fayda elde etmeye ve Kullanıcı aleyhlerine talepte bulunma hakkına sahiptir.
        </div>
        <div className="legal-text-title">
          Bölüm II     Veri Koruma Hükümleri
        </div>
        <div className="legal-text-container">
          İşbu veri koruma hükümlerinin amaçları doğrultusunda "Yayıncı" terimi, Yayıncının SKLS (Bölüm I)’in münhasır sözleşme ortağı olup olmadığına veya Sağlayıcı bilgilerinde başka bir Sağlayıcının tanımlanmış olmasına bakılmaksızın her iki türlü şahıs için de geçerli olacaktır. Verilerin korunması noktasında ise sorumluluk Sağlayıcıdadır (kontrolör).  Yayıncının sorumluluğu bulunmamaktadır.
        </div>
        <div className="legal-text-title">
          1     Kişisel Verilerin Kullanımı ve Amacın Sınırlanması
        </div>
        <div className="legal-text-container">
          1.1 Yayıncı, Uygulamayı ve işlevlerini temin etmek için kişisel verileri yalnızca gerektiği kadarıyla veya Kullanıcının ek kullanım için onay verdiği kadarıyla toplar, işler ve kullanır. Uygulama, bilhassa Kullanıcının girdiği verileri ve Kullanıcının onayı halinde mobil cihaz üzerindeki verileri veya cihaz işlevlerinin kullanılması yoluyla üretilen verileri (Konum) kullanır.
        </div>
        <div className="legal-text-container">
          1.2 Bu verilere erişilmeksizin Uygulamanın kullanılması mümkündür. Erişim, iOS ayarlarında herhangi bir zamanda devre dışı bırakılabilir ve devreye alınabilir ve uygulama içerisinde verilmiş olan bu izinleri iptal edebilir. iOS Ayarlar > Gizlilik > Konum Servisleri > Servisim. Ancak Uygulamaya erişimin devre dışı bırakılması halinde bu durum işlevlerde sınırlamalara neden olabilir.
        </div>
        <div className="legal-text-container">
          1.3 Kullanıcı, cihazının şifrelemesini etkin hale getirdiğinde ve bir parola/PIN ayarladığında Uygulama, kişisel verileri şifreli bir biçiminde saklayacaktır. Kullanıcının cihazı üzerinde şifreleme kullanmaması veya parola/PIN ayarlanmaması halinde kişisel verilerin şifrelenmesi sağlanamaz.
        </div>
        <div className="legal-text-title">
          3 Kişisel Verilerin Transferi Devri
        </div>
        <div className="legal-text-container">
          3.1 Uygulama ile bağlantılı olarak üçüncü şahıs hizmetlerinin (Google Maps, Whatsapp, Adobe Analytics) kullanılması halinde Yayıncı, Uygulamanın ilgili işlevleri için gerektiği kadarıyla kişisel verileri üçüncü şahıs sağlayıcıya aktarma hakkına sahip olacaktır.
        </div>
        <div className="legal-text-container">
          3.2 Bu amaçla kişisel Kullanıcı verileri EU/EWR dışındaki şu ülkelere de aktarılabilir: Singapur ve Türkiye.
        </div>
        <div className="legal-text-container">
          3.3  Kişisel veriler yalnızca geçerli zorunlu ulusal kanunlar kapsamında gerekmesi halinde kamu kurum ve yetkililerine aktarılabilecektir.
        </div>
        <div className="legal-text-title">
          4. Bildirim Gönderme
        </div>
        <div className="legal-text-container">
          4.1 Uygulama, servis randevu onayı ve aracın servisteki durum değişiklikleri hakkında kullanıcıyı uyarmak için bildirim yoluyla kullanıcıyı bilgilendirir. Bildirimi, herhangi bir zamanda / iOS sistem ayarından devre dışı bırakabilir ve yeniden etkinleştirebilir. iOS Ayarlar > Bildirimler > Servisim.
        </div>
        <div className="legal-text-container">
          4.2 Kullanıcı fonksiyonu uygulamanın ilk başlatılmasında veya daha sonra etkinleştirdiyse, Uygulama yeni kampanya ve etkinlikler hakkında bildirim yoluyla ve cihaz aracılığıyla Kullanıcıyı bilgilendirir. Bildirimler herhangi bir zamanda iOS Ayarlar > Bildirimler > Servisim üzerinden devre dışı bırakılabilir ve yeniden etkinleştirilebilir.
        </div>
        <div className="legal-text-title">
          6     Veri Koruma Konuları için İletişim Kişisi
        </div>
        <div className="legal-text-container">
          Uygulama içindeki kişisel verilerin işlenmesi hakkındaki her türlü soru için Kullanıcı, Kurumsal Veri Koruma İcra Kurulu Başkanı ile iletişime geçebilir; bu şahıs (ekibiyle birlikte) bilgi talepleri, öneriler veya şikayetlerle de ilgilenecektir.
        </div>
        <div className="legal-text-container">
          <br/>
        </div>
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
          D-70546
        </div>
        <div className="legal-text-container">
          Almanya
        </div>
      </div>
    </span>
  )
}
