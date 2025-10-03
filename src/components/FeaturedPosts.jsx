import Container from "./Container";
import { POSTS, ICONS, COLORS } from "../images";
import { imgErr } from "../utils/imgErr";

// Mobil için post data
const mobilePostsData = [
  {
    tag: "NEW",
    category: "Google Trending New", 
    title: "Loudest à la Madison #1",
    subtitle: "(L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments"
  },
  {
    tag: "NEW",
    category: "Google Trending New",
    title: "Loudest à la Madison #1", 
    subtitle: "(L'integral)",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments"
  }
];

// Masaüstü için post data (yedek dosyadan)
const desktopPostsData = [
  {
    department: "English Department",
    title: "Graphic Design",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    originalPrice: "$16.48",
    discountPrice: "$6.48", 
    sales: "15 Sales",
  },
  {
    department: "English Department",
    title: "Graphic Design",
    description: "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    originalPrice: "$16.48",
    discountPrice: "$6.48",
    sales: "15 Sales",
  }
];

export default function FeaturedPosts() {
  // Görsel dağılımı: Masaüstü için 1-2, Mobil için 3-4
  const desktopPosts = POSTS ? POSTS.slice(0, 2) : ['/post-1.jpg', '/post-2.jpg'];
  const mobilePosts = POSTS ? POSTS.slice(2, 4) : ['/post-3.jpg', '/post-4.jpg'];

  return (
    <section className="py-16 bg-white font-['Montserrat']">
      <Container>
        <div className="flex flex-col items-center text-center gap-3 mb-8 md:mb-12">
          <span className="text-[12px] md:text-[14px] font-bold text-[#23A6F0] tracking-wider uppercase">
            Practice Advice
          </span>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[#252B42] leading-tight md:leading-[50px]">
            Featured Posts
          </h2>
        </div>

        {/* MASAÜSTÜ GÖRÜNÜM - Yedek dosyadaki detaylı yapı */}
        <div className="hidden md:flex flex-col md:flex-row gap-8 justify-center">
          {desktopPosts.map((src, i) => {
            const post = desktopPostsData[i];
            if (!post) return null;

            return (
              <article
                key={`desktop-${i}`}
                className="flex flex-row w-[620px] rounded-[8px] overflow-hidden shadow-lg"
              >
                <div className="w-[45%] relative">
                  <img
                    src={src}
                    alt={`post-${i + 1}`}
                    onError={imgErr(`POST ${i + 1}`)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-5 left-5">
                    <div className="bg-[#E74040] text-white px-3 py-1 rounded font-bold text-[14px] shadow-md">
                      Sale
                    </div>
                  </div>

                  {/* ALTTAKI İKONLAR */}
                  <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-3">
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                      <img
                        src={ICONS.like}
                        alt="like"
                        className="w-18 h-18"
                        onError={imgErr("LIKE ICON")}
                      />
                    </button>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                      <img
                        src={ICONS.shop}
                        alt="shop"
                        className="w-18 h-18"
                        onError={imgErr("SHOP ICON")}
                      />
                    </button>
                    <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-colors">
                      <img
                        src={ICONS.eye}
                        alt="eye"
                        className="w-18 h-18"
                        onError={imgErr("EYE ICON")}
                      />
                    </button>
                  </div>
                </div>

                <div className="w-[55%] p-7 flex flex-col gap-3">
                  {/* Sağ taraf daha geniş */}
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-bold text-[#23A6F0]">
                      {post.department}
                    </span>
                    <div className="flex items-center gap-1 bg-[#252B42] text-white px-2 py-1.5 rounded-full shadow-sm">
                      <img
                        src={ICONS.star}
                        alt="rating"
                        className="w-4 h-4"
                        onError={imgErr("STAR ICON")}
                      />
                      <span className="text-[12px] font-bold">4.9</span>
                    </div>
                  </div>
                  <h4 className="text-[16px] font-bold text-[#252B42] leading-6">
                    {post.title}
                  </h4>
                  {/* AÇIKLAMA */}
                  <p className="text-[14px] font-normal text-[#737373] leading-5 tracking-[0.2px]">
                    {post.description}
                  </p>
                  {/* SATIR 1: 15 Sales */}
                  <div className="flex items-center gap-2">
                    <img
                      src={ICONS.drop}
                      alt="sales"
                      className="w-4 h-4"
                      onError={imgErr("DROP ICON")}
                    />
                    <span className="text-[14px] font-bold text-[#737373] leading-6 tracking-[0.2px]">
                      {post.sales}
                    </span>
                  </div>
                  {/* SATIR 2: Fiyatlar YAN YANA */}
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] text-[#BDBDBD] line-through">
                      {post.originalPrice}
                    </span>
                    <span className="text-[16px] text-[#40A860] font-bold">
                      {post.discountPrice}
                    </span>
                  </div>
                  {/* RENKLER */}
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[12px] text-[#737373]">Colors:</span>
                    <div className="flex gap-1">
                      <img
                        src={COLORS.blue}
                        alt="blue"
                        className="w-6 h-6 rounded-full"
                        onError={imgErr("BLUE COLOR")}
                      />
                      <img
                        src={COLORS.green}
                        alt="green"
                        className="w-6 h-6 rounded-full"
                        onError={imgErr("GREEN COLOR")}
                      />
                      <img
                        src={COLORS.orange}
                        alt="orange"
                        className="w-6 h-6 rounded-full"
                        onError={imgErr("ORANGE COLOR")}
                      />
                      <img
                        src={COLORS.black}
                        alt="black"
                        className="w-6 h-6 rounded-full"
                        onError={imgErr("BLACK COLOR")}
                      />
                    </div>
                  </div>
                  {/* ALARM, DALGA, DENGE İKONLARI */}
                  <div className="flex items-center gap-5 text-[14px] text-[#737373] mt-2">
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <img
                        src={ICONS.alarm}
                        alt="alarm"
                        className="w-4 h-4"
                        onError={imgErr("ALARM ICON")}
                      />
                      <span>22h...</span>
                    </div>

                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <img
                        src={ICONS.dalga}
                        alt="dalga"
                        className="w-4 h-4"
                        onError={imgErr("DALGA ICON")}
                      />
                      <span>64 Lessons</span>
                    </div>

                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <img
                        src={ICONS.denge}
                        alt="denge"
                        className="w-4 h-4"
                        onError={imgErr("DENGE ICON")}
                      />
                      <span>Progress</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#23A6F0] text-[#23A6F0] text-[14px] font-bold rounded-full hover:bg-[#23A6F0] hover:text-white transition-colors"
                    >
                      Learn More
                      <span>&gt;</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* MOBİL GÖRÜNÜM - Mevcut kodun mobil yapısı */}
        <div className="flex md:hidden flex-col gap-8">
          {mobilePosts.map((src, i) => {
            const post = mobilePostsData[i];
            if (!post) return null;

            return (
              <article
                key={`mobile-${i}`}
                className="flex flex-col w-full rounded-[8px] overflow-hidden shadow-lg bg-white"
              >
                {/* Mobil resim */}
                <div className="w-full relative">
                  <img
                    src={src}
                    alt={`mobile-post-${i + 1}`}
                    onError={imgErr(`MOBILE POST ${i + 1}`)}
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                {/* İçerik - Her öğe ayrı satırda */}
                <div className="p-6 flex flex-col gap-4">
                  {/* Ayrı butonlar: Google - Trending - New */}
                  <div className="flex flex-wrap gap-2">
                    <span className="text-[12px] font-bold text-[#23A6F0] bg-[#E8F4FD] px-3 py-1 rounded">
                      Google
                    </span>
                    <span className="text-[12px] font-bold text-[#23A6F0] bg-[#E8F4FD] px-3 py-1 rounded">
                      Trending
                    </span>
                    <span className="text-[12px] font-bold text-[#23A6F0] bg-[#E8F4FD] px-3 py-1 rounded">
                      New
                    </span>
                  </div>

                  {/* Başlık - Aynı satırda, aynı kalınlıkta */}
                  <h4 className="text-[18px] font-bold text-[#252B42] leading-tight">
                    Loudest à la Madison #1
                    <br />
                    <span className="text-[16px] font-bold text-[#737373]">(L'integral)</span>
                  </h4>

                  {/* Açıklama - 3 satırda */}
                  <div className="text-[15px] text-[#737373] leading-relaxed">
                    <div>We focus on ergonomics and meeting</div>
                    <div>you where you work. It's only a</div>
                    <div>keystroke away.</div>
                  </div>

                  {/* Tarih ve Yorumlar - Kendi satırında */}
                  <div className="flex justify-between items-center text-[13px] text-[#737373]">
                    <span className="flex items-center gap-2">
                      <img src={ICONS.alarm} alt="calendar" className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <img src={ICONS.denge} alt="comments" className="w-4 h-4" />
                      {post.comments}
                    </span>
                  </div>

                  {/* Learn More Butonu - Kendi satırında */}
                  <div className="mt-2">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-[15px] font-bold text-[#737373] hover:text-[#23A6F0] transition-colors"
                    >
                      Learn More
                      <span>&gt;</span>
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}