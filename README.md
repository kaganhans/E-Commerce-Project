# E-Commerce Project

HOMEPAGE (ANA SAYFA)
--------------------------------
AMAÇ
- Kullanıcıyı karşılayan giriş bölümü. Yeni koleksiyona yönlendirir.

DOSYA KONUMU
- Sayfa: src/pages/HomePage.jsx
- Bileşen: src/components/Hero.jsx
- Görsel: src/images.js içindeki HERO_SRC

İÇERİK (KISA ÖZET)
- Etiket: “SUMMER 2020”
- Başlık: “NEW COLLECTION”
- Açıklama: kısa metin
- Buton: SHOP NOW → /shop
- Arka plan: gradyan (#96E9FB → #ABECD6)
- Sağda ürün görseli (HERO_SRC)

DUYARLILIK (RESPONSIVE)
- Masaüstü: metin solda, görsel sağda (geniş hero alanı).
- Mobil: metin ve buton üstte, görsel altta. Boşluklar mobil uyumlu.

ÖZELLEŞTİRME
- Metinler: Hero.jsx içinden değiştirilebilir.
- Görsel: images.js → HERO_SRC öğesini değiştir.
- Yönlendirme: SHOP NOW bağlantısı Hero.jsx’teki href="/shop" ile ayarlanır.

NOTLAR
- Margin/padding ve hizalamalar Figma’ya göre düzenlendi.
- Görsel yüklenmezse konsola uyarı düşer (onError).



SHOP PAGE (MAĞAZA SAYFASI)
--------------------------------
AMAÇ
- Ürünlerin listelendiği sayfa. Basit filtre barı, grid ve sayfalama içerir.

DOSYA KONUMU
- Sayfa: src/pages/ShopPage.jsx
- Ana bileşen: src/components/Showing.jsx
- (Varsa) üst tanıtım: src/components/ShopHero.jsx
- Görseller dizisi: src/images.js → SHOWING

ÜST ÇUBUK (FILTER BAR)
- Sol: “Showing all 12 results” (adet SHOWING.length’e göre gelir).
- Orta: Views
  - Grid ikonu: 4 dolu kare, köşeleri yuvarlatılmış (rx=1.5), siyah.
  - List ikonu: gri (#737373), solda 3 nokta + sağda 3 kısa çizgi + her satırda tik.
  - Şu an ikonlar görsel amaçlıdır; gerçek görünüm geçişi için logic eklenebilir.
- Sağ: Popularity (örnek select) + Filter (örnek buton)

ÜRÜN GRID’İ
- ProductCard’lar 1–4 kolon arası (ekrana göre).
- Her kart: görsel, başlık (Graphic Design), alt başlık (English Department), eski fiyat (gri), indirimli fiyat (yeşil), renk noktaları.

SAYFALAMA
- Mobil: 4 ürün/sayfa. 1–2–3 butonları + First/Next çalışır.
- Masaüstü: tasarıma uygun sabit buton görünümü (örnek).

DUYARLILIK (RESPONSIVE)
- lg: 4 sütun ve tüm ürünler (genelde 12) bir arada.
- sm ve altı: dilimleme ile 4’erli gösterim + sayfalama.

ÖZELLEŞTİRME
- Görseller: images.js → SHOWING dizisini güncelle.
- Boşluk/hiza: Showing.jsx içindeki md:ml-[260px] ve md:ml-[230px] değerleri.
- Gerçek filtre/sıralama: select/Filter’a state ve sort/filter fonksiyonları ekle.

NOTLAR
- Şu an veri statik. İstenirse API veya JSON’dan fetch ile dinamik yapılabilir.
- Grid/List ikon renkleri ve şekilleri SVG içinde değiştirilebilir (fill, rx vb.).



KOMPONENTLER (TEKER TEKER)
--------------------------------
Container.jsx
- Amaç: içerikleri ortalar, maks. genişlik ve kenar boşluklarını standardize eder.
- Kullanım: Hero, Showing gibi blokları sarmalar; sayfa hizasını korur.

Hero.jsx
- Amaç: ana sayfanın tanıtım/afiş alanı.
- Mantık:
  - Masaüstünde metin solda, görsel sağda; mobilde metin üstte, görsel altta.
  - SHOP NOW → /shop yönlendirmesi.
  - Arka plan gradyanı ve HERO_SRC görseli.
  - Görsel hatasında onError ile uyarı.
- Özelleştirme: başlık/alt metin/button linki sınıflar ve props ile düzenlenir.

Showing.jsx
- Amaç: ürün listeleme, üst çubuk (sonuç metni + Views + filtreler) ve sayfalama.
- State:
  - currentPage: mobilde aktif sayfa.
  - isMobile: window.innerWidth < 640 ise true (resize ile güncellenir).
- Ürün dilimleme:
  - PRODUCTS_PER_PAGE = 4
  - Mobilde SHOWING dilimlenir; masaüstünde tamamı görünür.
- Üst çubuk:
  - “Showing all X results” (X = SHOWING.length)
  - Views ikonları:
    * Grid: 4 dolu kare (rx=1.5), siyah.
    * List: #737373, 3 nokta + 3 kısa çizgi + satır başına tik.
  - Popularity (örnek) + Filter (örnek).
- Grid:
  - 1–4 kolon arası responsive.
  - ProductCard bileşenleri ile doldurulur.
- Sayfalama:
  - Mobil: First/Next ve 1–2–3 çalışır (state değiştirir).
  - Masaüstü: örnek görünüm.
- Özelleştirme:
  - Gerçek grid/list geçişi için viewMode state eklenir.
  - Gerçek filtre/sıralama için state + sort/filter fonksiyonları eklenir.

ProductCard (Showing alt bileşeni)
- Amaç: tek ürün kartının görsel ve metinlerini çizmek.
- Yapı: görsel, başlık, alt başlık, fiyatlar (eski/indirimli), renk noktaları.
- Not: şu an statik; tıklama/sepete ekleme gibi işlevler istenirse eklenir.

images.js (yardımcı)
- HERO_SRC: Hero görseli.
- SHOWING: ürün görsellerinin yolu listesi.
- (Varsa) VIEWS gibi ek diziler.
- Amaç: görsel yollarını merkezi tutarak bileşenleri sadeleştirmek.

(Opsiyonel) ShopHero.jsx / ShopNav.jsx / Header.jsx / Footer.jsx
- ShopHero: Shop sayfasına özel üst tanıtım alanı (varsa).
- ShopNav: kategori/fiyat vb. bağlantılar (ileride filtre/route bağlanabilir).
- Header/Footer: ortak alanlar (logo, menü, sosyal linkler, telif vb.).

Kısa Akış
- HomePage → kullanıcıyı karşılar, /shop’a yönlendirir.
- ShopPage → ürünleri listeler; üst çubuk, grid ve sayfalama birliktedir.
- Container → tüm bu bölümleri hizalar.
- images.js → görsel yollarını tek yerden yönetir.
