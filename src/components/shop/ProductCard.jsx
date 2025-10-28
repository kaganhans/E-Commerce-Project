import { Link } from "react-router-dom";
import useCartAdd from "../../hooks/useCartAdd";

const slugify = (s = "") =>
  s.toString().toLowerCase().trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-ğüşıçö]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const buildProductPath = (p) => {
  const id = p?.id ?? p?._id;
  const gender = p?.genderSlug || p?.gender || "kadin";
  const catSlug = p?.categorySlug || p?.category?.slug || "genel";
  const catId = p?.categoryId ?? p?.category?.id ?? "0";
  const prodSlug = p?.slug || slugify(p?.name || p?.title || "urun");
  if (id) return `/shop/${gender}/${catSlug}/${catId}/${prodSlug}/${id}`;
  return "#";
};

const coverFromProduct = (p) => p?.image || p?.images?.[0]?.url || "";

export default function ProductCard({ product, coverUrl }) {
  const add = useCartAdd();
  const thumb = coverUrl || coverFromProduct(product);
  const href = buildProductPath(product);

  const handleGoDetail = () => {
    try { sessionStorage.setItem("last_thumb", thumb || ""); } catch {}
  };

  const handleAdd = () => add(product, 1, thumb);

  return (
    <div className="rounded border p-3 hover:shadow-sm transition-shadow">
      <Link
        to={href}
        state={{ thumb }}         // 👈 state ile taşı
        onClick={handleGoDetail}  // 👈 ve emniyet kemeri: sessionStorage
        className="block"
        title={product?.name || product?.title}
      >
        <img
          src={thumb || "https://via.placeholder.com/480x360"}
          alt={product?.name || product?.title || "Ürün"}
          className="w-full h-48 object-cover rounded"
          loading="lazy"
        />
      </Link>

      <div className="mt-2 text-sm font-semibold line-clamp-1">
        <Link to={href} state={{ thumb }} onClick={handleGoDetail} className="hover:underline">
          {product?.name || product?.title || "Ürün"}
        </Link>
      </div>

      <div className="mt-1 text-[#252B42] text-sm font-bold">
        {(Number(product?.price) || 0).toLocaleString("tr-TR")} ₺
      </div>

      <button
        onClick={handleAdd}
        className="mt-2 rounded bg-[#23A6F0] px-3 py-1.5 text-white text-sm font-semibold hover:opacity-90"
        aria-label="Sepete Ekle"
      >
        Sepete Ekle
      </button>
    </div>
  );
}
