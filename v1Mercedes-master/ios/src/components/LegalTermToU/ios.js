import React, { Component } from 'react'

export const tocItemIOS = (pushComponent) => {

  let name = "iOS"
  let date = "02/01/2020"
  let version = "1.3.0 "

  return (
    <span>
      <div className="legal-title">
        Mercedes Servisim Uygulaması ({name}) için Son Kullanıcı Lisans Şartları
      </div>
      <div className="legal-text">
        <div className="legal-text-container">
          <br />
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
          <br />
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
          (Yayıncı ve herhangi bir ayrı sağlayıcı olarak) bu uygulamaya olan ilginiz için teşekkür ederiz. Uygulama kullanıcısı olarak gizliliğinizi korumayı taahhüt ediyoruz. Bu doküman içerisinde, uygulamaya ilişkin kişisel verileri ne şekilde işlediğimiz açıklanmaktadır. Kişisel Veri, Kimliği belirli veya belirlenebilir gerçek kişiye ilişkin her türlü bilgidir. Kişisel verileri, daima, yürürlükte bulunan Veri Koruma Politikamız çerçevesinde işlemekteyiz.
        </div>
        <div className="legal-text-container">
          <a onClick={() => {
            window.open('https://www.mercedes-benz.com.tr/passengercars/the-brand/hakkimizda/kurumsal-bilgi/veri-korumasi.html', '_system')
          }}>https://www.mercedes-benz.com.tr/passengercars/the-brand/hakkimizda/kurumsal-bilgi/veri-korumasi.html</a>

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
          <i> Üçüncü taraflara aktarım</i>
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
          a. Veri Sorumlusunun Kimliği
        </div>
        <br />

        <div className="legal-text-container">
        ‘Veri Sorumlusunun Aydınlatma Yükümlülüğü’ başlıklı KVKK’nın 10’uncu maddesinin 1’inci fıkrasının (a) bendi veri sorumlusunun kimliği konusunda bilgi verilmesi yükümlülüğünü getirmiştir. KVKK’nın 3’üncü maddesinin 1’inci fıkrasının (ı) bendinde veri sorumlusu, ‘Kişisel verilerin işleme amaçlarını ve vasıtalarını belirleyen, veri kayıt sisteminin kurulmasından ve yönetilmesinden sorumlu olan gerçek veya tüzel kişiler’ olarak tanımlanmıştır. KVKK’nın uygulanması bakımından MBO ‘veri sorumlusu’ olabilir. Bu çerçevede ‘veri sorumlusunun kimliği’, Türkiye Cumhuriyeti kanunlarına uygun şekilde anonim şirket olarak kurulmuş ve fasılasız bir şekilde varlığını sürdüren, İstanbul Ticaret Sicil Memurluğu nezdinde 187958-5  sicil numarası ile kayıtlı, 0616068739300001 Mersis Numaralı, şirket merkezi Akçaburgaz Mah. Süleyman Şah Cad. No: 6/1 Esenyurt 34522 ESENYURT / İSTANBUL adresinde bulunan MERCEDES BENZ OTOMOTİV TİCARET VE HİZMETLER A.Ş.’dir.        </div>
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
        Şirketimiz tarafından Mercedes Benz Otomotiv Ticaret ve Hizmetler Anonim Şirketi Kişisel Verilerin Korunması ve İşlenmesi Politikası ve işbu Veri Koruma hükümlerine uygun olarak ve yukarıda yer alan Aydınlatma Metni kapsamında kişisel verilerinizin şirket nezdinde kayıt oluşturulması ve bu kapsamda; ürün ve hizmetlerin sizlerin beğeni, kullanım alışkanlıkları ve ihtiyaçlarına göre özelleştirilerek sizlere önerilmesi ile satış ve pazarlama faaliyetleri amacıyla işlenmesini onaylıyor musunuz?      </div>
   


      </div>
    </span>
  )
}
