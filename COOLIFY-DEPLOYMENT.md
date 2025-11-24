# USA Luxury Limo - Coolify Deployment Rehberi

**Türkçe Adım Adım Coolify Deployment Kılavuzu**

---

## 📋 İçindekiler

1. [Hazırlık](#hazırlık)
2. [Environment Değişkenleri](#environment-değişkenleri)
3. [Coolify'da Deployment](#coolifyda-deployment)
4. [Sorun Giderme](#sorun-giderme)
5. [Sık Sorulan Sorular](#sık-sorulan-sorular)

---

## 🔧 Hazırlık

### Gereken Dış Hizmetler

Deployment yapmadan önce aşağıdaki hizmetlerin ayarlanması gereklidir:

**Zorunlu:**
- ✅ PostgreSQL Veritabanı (Neon veya diğer yönetilen hizmet)
- ✅ MinIO veya S3 Nesneleri Saklama (Resimler/Dosyalar için)
- ✅ Stripe API Anahtarları (Ödeme işleme)
- ✅ Twilio Hesabı (SMS bildirimleri)
- ✅ TomTom API Anahtarı (Lokasyon servisleri)
- ✅ SMTP Sunucu (E-posta gönderimi)

**Opsiyonel:**
- PayPal
- Square
- AeroDataBox (Uçuş verileri)

### Alan Adı Ayarı

DNS kayıtlarınızı Coolify sunucusunun IP adresine yönlendirin:
```
yourdomain.com     → Coolify IP
api.yourdomain.com → Coolify IP
admin.yourdomain.com → Coolify IP
```

---

## 📝 Environment Değişkenleri

### Adım 1: .env.example'ı Kopyalayın

Proje root klasöründe `.env.example` dosyası bulunmaktadır. Tüm gereken değişkenleri içerir.

### Adım 2: Gerekli Değişkenleri Doldurun

**DATABASE_URL** (Zorunlu)
```
postgresql://user:password@host:5432/database_name
```

Özel karakterler varsa URL-encode yapın:
- `?` → `%3F`
- `@` → `%40`  
- `#` → `%23`

Örnek: `postgresql://admin:pass%40word@neon.tech:5432/mydb`

**SESSION_SECRET** (Zorunlu)
```bash
# Terminal'de rastgele bir anahtar oluşturun:
openssl rand -base64 32
```

Çıkacak değeri kopyalayın. Örnek:
```
d7kR9xK2mP5qL8nV3jW6hF4gB1cD2eR9xL5mN8pQ=
```

**ENCRYPTION_KEY** (Zorunlu - Tam olarak 32 karakter)

```bash
# Terminal'de 32 karakterli anahtar oluşturun:
node -e "console.log(require('crypto').randomBytes(16).toString('hex'))"
```

Çıkacak değer zaten 32 karakterdir. Kopyalayın.

**STRIPE_SECRET_KEY** (Zorunlu)

Stripe Dashboard'a gidin:
1. Dashboard → Developers → API Keys
2. Secret Key'i kopyalayın (`sk_live_...`)

**TOMTOM_API_KEY** (Zorunlu)

TomTom Developer Portal'dan:
1. Hesap oluşturun
2. API Key oluşturun
3. Key'i kopyalayın

**TWILIO Ayarları** (Zorunlu)

Twilio Console'dan:
1. Account SID ve Auth Token kopyalayın
2. Twilio telefon numarasını kullanın (alınan numara)

**SMTP Ayarları** (Zorunlu)

Gmail örneği:
- `SMTP_HOST`: `smtp.gmail.com`
- `SMTP_PORT`: `587`
- `SMTP_USER`: Sizin Gmail hesabınız
- `SMTP_PASS`: Gmail App Password (normal şifre değil!)

**MinIO/S3 Ayarları** (Zorunlu)

MinIO kurulu varsa:
- `MINIO_ENDPOINT`: `minio.yourdomain.com` (veya IP:9000)
- `MINIO_PORT`: `9000`
- `MINIO_USE_SSL`: `true` (HTTPS için)
- `MINIO_ACCESS_KEY`: MinIO Access Key
- `MINIO_SECRET_KEY`: MinIO Secret Key

**Alan Adı Ayarları**
```
DOMAIN=yourdomain.com
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
ADMIN_PANEL_HOSTS=admin.yourdomain.com
```

---

## 🚀 Coolify'da Deployment

### Adım 1: Coolify'a Giriş Yapın

Coolify panelinde oturum açın: `https://coolify.yourdomain.com`

### Adım 2: Yeni Bir Proje Oluşturun

1. "Projects" → "New Project" tıklayın
2. Proje adını girin: `USA Luxury Limo`
3. "Create" butonuna tıklayın

### Adım 3: Docker Compose Ekleyin

1. Yeni projede "Add Resource" → "Docker Compose" seçin
2. `docker-compose.production.yml` dosyasının içeriğini kopyalayın ve yapıştırın

**NOT:** `docker-compose.production.yml` dosyasını kopyalamak için:
```bash
cat docker-compose.production.yml
# Tüm içeriği kopyalayın ve Coolify'a yapıştırın
```

### Adım 4: Environment Değişkenlerini Ekleyin

Coolify'da "Environment Variables" sekmesine gidin:

#### Tüm Zorunlu Değişkenleri Ekleyin

Her değişken için:
1. "Add Variable" tıklayın
2. Değişken adını girin (örn: `DATABASE_URL`)
3. Değişken değerini girin
4. Şifre/Secret ise "Secret" checkbox'ını işaretleyin

**Sırasıyla eklenecek değişkenler:**

```
NODE_ENV = production
PORT = 5000
DATABASE_URL = postgresql://...
SESSION_SECRET = (oluşturduğunuz rastgele değer)
ENCRYPTION_KEY = (32 karakterli anahtar)
DOMAIN = yourdomain.com
ALLOWED_ORIGINS = https://yourdomain.com,https://www.yourdomain.com
ADMIN_PANEL_HOSTS = admin.yourdomain.com
STRIPE_SECRET_KEY = sk_live_...
VITE_STRIPE_PUBLIC_KEY = pk_live_...
TOMTOM_API_KEY = ...
TWILIO_ACCOUNT_SID = AC...
TWILIO_AUTH_TOKEN = ...
TWILIO_PHONE_NUMBER = +1...
SMTP_HOST = smtp.gmail.com
SMTP_PORT = 587
SMTP_USER = your@gmail.com
SMTP_PASS = (Gmail App Password)
EMAIL_FROM = noreply@yourdomain.com
MINIO_ENDPOINT = minio.yourdomain.com
MINIO_PORT = 9000
MINIO_USE_SSL = true
MINIO_ACCESS_KEY = ...
MINIO_SECRET_KEY = ...
MINIO_BUCKET = luxury-limo
```

### Adım 5: Deploy Etme

1. "Deploy" butonuna tıklayın
2. Konteynırlar kurulana kadar bekleyin (3-5 dakika)
3. Logs sekmesinde hata olup olmadığını kontrol edin

---

## ✅ Deployment Sonrası Kontrol

### Health Check

Uygulamanın düzgün çalışıp çalışmadığını kontrol edin:

```bash
# Backend API kontrolü
curl https://api.yourdomain.com/health

# Frontend kontrolü
curl https://yourdomain.com/
```

Her ikisi de 200 OK dönerse başarılıdır.

### Logs Kontrol

Coolify Dashboard'da:
1. Proje seçin
2. "Logs" sekmesine gidin
3. Hata olup olmadığını kontrol edin

---

## 🔧 Sorun Giderme

### 1. "Connection Refused" Hatası

**Sorun:** Database'e bağlanamıyor

**Çözüm:**
1. `DATABASE_URL` tam olarak doğru mu kontrol edin
2. Özel karakterler URL-encode edildi mi kontrol edin
3. Database dış erişime açık mı kontrol edin

### 2. "Migration Failed" Hatası

**Sorun:** Veritabanı migration'ları çalışmıyor

**Çözüm:**
1. Database'in boş olup olmadığını kontrol edin
2. Database connection string'i doğru mu
3. PostgreSQL sürümü 12+ mı kontrol edin

### 3. Services Başlamıyor

**Sorun:** Konteynırlar başlamaz veya hemen kapanır

**Çözüm:**
1. Coolify logs'unda başlama hatalarını kontrol edin
2. Tüm gerekli environment değişkenleri ayarlandı mı
3. Docker imajları başarıyla inşa edildim mi kontrol edin

### 4. 502 Bad Gateway Hatası

**Sorun:** "502 Bad Gateway" hatası alıyorum

**Çözüm:**
1. Backend servis sağlıklı mı kontrol edin: `curl https://api.yourdomain.com/health`
2. API endpoint'i doğru mu kontrol edin
3. ALLOWED_ORIGINS ayarı doğru mu kontrol edin

### 5. E-posta gönderilmiyor

**Sorun:** SMS veya Email gönderilmiyor

**Çözüm:**
1. SMTP ayarları doğru mu kontrol edin
2. Gmail kullanıyorsanız "App Password" kullanıyor musunuz
3. Twilio kredileri var mı kontrol edin
4. SMTP_USER ve SMTP_PASS doğru mu kontrol edin

---

## ❓ Sık Sorulan Sorular

### S: MinIO nasıl kurulur?

**C:** Coolify'da ayrı bir MinIO servisini kurabilirsiniz:
1. "Add Resource" → "MinIO" seçin
2. Kullanıcı adı/şifre ayarlayın
3. MINIO_ENDPOINT olarak MinIO servis adını kullanın

### S: SSL sertifikası nasıl alınır?

**C:** Coolify otomatik olarak Let's Encrypt ile SSL ayarlar:
1. Alan adı doğru ayarlandığından emin olun
2. DNS kayıtları Coolify'a yönlendirildiğinden emin olun
3. Coolify otomatik olarak sertifika almaya çalışır

### S: Veritabanını nasıl yedeklerim?

**C:** Yönetilen PostgreSQL hizmetinizin (Neon vb.) yedeğini alın:
1. Hizmet sağlayıcısı paneline gidin
2. Otomatik yedeğin etkin olup olmadığını kontrol edin
3. Manuel yedek almak için hizmet sağlayıcı arayüzünü kullanın

### S: Nasıl ölçeklendirim?

**C:** Birden fazla backend örneği çalıştırmak için:
1. Backend servisinin replika sayısını artırın
2. Tüm örnekler aynı veritabanını kullanacak
3. Coolify otomatik olarak load balancing yapacak

### S: Güncellemeleri nasıl dağıtırım?

**C:** 
1. Kodunuzu git repo'ya push edin
2. Coolify'da "Redeploy" tıklayın
3. Yeni image'ler kurulacak ve servisler yeniden başlayacak

### S: Herhangi biri neden tüm bağlantı türlerini desteklemiyor?

**C:** Coolify bağlantı türlerine bağlı değildir - tüm türler desteklenir:
- SSH
- HTTP Git
- Private Git Repos

---

## 📞 Destek ve İletişim

Sorun yaşıyorsanız:

1. **Coolify Logs Kontrol Edin:** Dashboard → Logs sekmesi
2. **Environment Değişkenleri Kontrol Edin:** Tüm zorunlu değişkenler ayarlandı mı
3. **Dış Hizmetler Kontrol Edin:** Database, MinIO vb. erişilebilir mi

Herhangi bir sorunuz varsa, documentation dosyalarını inceleyebilirsiniz:
- `DEPLOYMENT.md` - English deployment guide
- `docker-compose.production.yml` - Deployment configuration
- `.env.example` - Environment variables reference

---

**Başarılı deployment'ler dilerim! 🚀**
