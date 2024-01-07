# MekanBul Web Uygulaması
---
Süleyman Demirel Üniversitesi - Bilgisayar Mühendisliği | **Web Teknolojileri ve Programlama** Dersinde yapmış olduğum insanların konumları civarındaki mekanları ve mekanların detaylarını, konumunu ve yapılan yorumları görmelerini bunlara ek olarak mekanlara yorum yapabilmelerini sağlayan bir web uygulamasıdır.

 * Uygulamada bulunan **"Admin Panel"** ile mekan ekleme, silme, güncelleme, gibi işlemler yapabilmektedir.

**Uygulamanın Çalışır Haline Ulaşmak İçin:**
[https://mekanbulapp-alihappy.vercel.app/](https://mekanbulapp-alihappy.vercel.app/)

**Uygulama Backend Kısmı (Express):**
[https://mekanbul-backend-alihappy.vercel.app/](https://mekanbul-backend-alihappy.vercel.app/)

---

## Uygulama Özellikleri
 - Uygulama frontend ve backend olmak üzere iki kısımdan oluşmaktadır.
 - MERN Teknolojisine uygun bir şekilde tasarlanmıştır.
 - Frontend, Bootstrap, CSS, Javascript ile kodlanmıştır. 
 - Backend'de NodeJS ve ExpressJS ile geliştirilmiş REST API çalışmaktadır.

- **Normal Kullanıcı:** 
  + Konuma göre mekan listeleme,
  + Mekan detaylarını görebilme

- **Admin:** 
  + Tüm mekanları listeleme,
  + Mekan detaylarını görebilme, 
  + Mekan ekleme,
  + Mekan silme, 
  + Mekan güncelleme

- **Yorum Yapma:**
  + Kullanıcı girişi gerekmektedir.

 
## Kullanılan Teknolojiler
 - **Front-end:** Recat & Javascript, Bootstrap, CSS
 - **Back-end:** NodeJS, ExpressJS, Javascript
 - **Haberleşme:** REST API, Axios
 - **Veri Modelleme:** Mongoose
 - **Veritabanı:** MongoDB
 - **Kimlik Doğrulama:** JWT


## Kütüphanelerin Yüklenmesi & Uygulamanın Çalıştırılması
- Uygulamanın çalışması ve erekli kütüphanelerin yüklenmesi için mekanbul kök dizininde,
 ```
 npm start 
 ```
  komutunun çalıştırılması yeterlidir.

 - Komutun çalışıtılmasıyla beraber gerekli tüm kütüphaneler yüklenecektir. Bunu sağlayan tanımlama kök dizindeki **package.json** dosyasında bulunan **"start"** komutunda bulunmaktadır.

- Uygulamada bulunan **JWT_SECRET** ve **MONGODB_URI** mekanbul/backend/.env dosyasına tanımlanmış olup kullanmanız durumunda eklemeniz gerekmektedir.

---


## API Metotları
- Mekan Ekleme: **POST > "/api/venues"**
  + Mekan Bilgileri: ad,adres, imkanlar, enlem, boylam, gunler1, acilis1, kapanis1, kapali1, gunler2, acilis2, kapanis2, kapali2.
- Konuma Göre Mekan Listeleme: **GET > "/api/venues?lat=37&lont=35"**
  + Enlem ve boylam sorgu parametresi olarak verilmeli.
- Tüm Mekanları Listeleme: **GET > "/api/admin"** 
  + Giriş yapılmalı.
- Mekan Getirme: **GET > "/api/venues/:venueid"**
- Mekan Güncelleme: **PUT > "/api/venues/:venueid"** 
  + Auth.Bearer Token Girilmeli, 
  + Mekan bilgileri girilmeli, 
  + Mekan Bilgileri: ad,adres, imkanlar, enlem, boylam, gunler1, acilis1, kapanis1, kapali1, gunler2, acilis2, kapanis2, kapali2
- Mekan Silme: **DELETE > "/api/venues/:venueid"** 
  + Auth.Bearer Token Girilmeli.
- Yorum Getirme: **GET > "/api/venues/:venueid/comments/:commentid"**
- Yorum Ekleme: **POST > "/api/venues/:venueid/comments"**
  + Auth.Bearer Token Girilmeli,
  + Yorum bilgileri girilmeli,
  + Yorum Bilgileri: Author, Rating, Text
- Yorum Güncelleme: **PUT > "/api/venues/:venueid/comments/:commentid"**
  + Auth.Bearer Token Girilmeli,
  + Yorum bilgileri girilmeli,
  + Yorum Bilgileri: Author, Rating, Text
- Yorum Silme: **DELETE > "/api/venues/:venueid/comments/:commentid"** 
  + Auth.Bearer Token Girilmeli
- Giriş Yapma: **POST > "/api/login"** 
  + Kullanıcı bilgileri girilmeli
  + Kullanıcı Bilgileri: e-posta, sifre
- Kayıt Ol: **POST > "/api/signup"**
  + Kullanıcı bilgileri girilmeli,
  + Kullanıcı Bilgileri: Ad Soyad, e-posta, sifre


---


## Postman, API Metot Denemeleri:
 - Tüm Mekanları Listeleme:
 ![](/readmeImg/tumMekan.png)

 - id'ye Göre Mekan Listeleme:
 ![](/readmeImg/idMekan.png)

 - Konuma Göre Mekanları Listeleme: 
 ![](/readmeImg/latLong.png)

 - Kullanıcı Giriş: 
 ![](/readmeImg/login.png)
 - Kullanıcı Ekleme:
 ![](/readmeImg/signup.png)

 - Tek Bir Yorum Getirme: 
 ![](/readmeImg/yorumGetir.png)

 - Mekan Silme: 
 ![](/readmeImg/mekanSil.png)


---


## Uygulama Örnek Sayfaları:
 - Ana Ekran:
 ![](/readmeImg/home.png)

 - Mekan Detayları:
 ![](/readmeImg/mekanDetay.png)

 - Yorum Ekleme:
 ![](/readmeImg/yorumEkle.png)

 - Kullanıcı Giriş: 
 ![](/readmeImg/loginPage.png)

 - Kullanıcı Kayıt:
 ![](/readmeImg/signupPage.png)

 - Admin Panel: 
 ![](/readmeImg/adminPanel.png)

 - Mekan Ekleme: 
 ![](/readmeImg/newPage.png)

 - Mekan Güncelleme: 
 ![](/readmeImg/updatePage.png)


---


### Teşekkür
  Bu proje [Doç. Dr. Asım Sinan YÜKSEL](https://github.com/asimsinan) hocamızın Web Teknolojileri ve Programlama Dersindeki anlatımlarıyla ve kendi eklemelerim sonucunda tamamlanmıştır. Şahsi geliştirmelerim devam edecektir.

 - Projenin her aşamasında vermiş olduğu destekler için **Doç. Dr. Asım Sinan YÜKSEL** hocama teşekkürlerimi sunarım.
