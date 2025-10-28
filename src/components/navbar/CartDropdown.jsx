// src/components/navbar/CartDropdown.jsx
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCartItems, selectCartSubtotal } from "../../store/cart/selectors";
import { removeFromCart, increment, decrement } from "../../store/cart/actions";

const slugify = (s = "") =>
  (s || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-ğüşıçö]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

const buildProductPath = (p) => {
  const pid = p?.id ?? p?._id;
  if (p?.__from) return p.__from; // eklendiği sayfanın tam yolu
  const gender = p?.genderSlug || p?.gender || "kadin";
  const catSlug = p?.categorySlug || p?.category?.slug;
  const catId = p?.categoryId ?? p?.category?.id;
  const prodSlug = p?.slug || slugify(p?.name || p?.title || "");
  if (pid && gender && catSlug && catId && prodSlug) {
    return `/shop/${gender}/${catSlug}/${catId}/${prodSlug}/${pid}`;
  }
  if (pid) return `/product/${pid}`;
  return "#";
};

export default function CartDropdown({ onClose }) {
  const items = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const dispatch = useDispatch();

  const totalCount = items.reduce((s, i) => s + (i.count || 0), 0);

  const handleDec = (pid, from) => pid && dispatch(decrement(pid, from));
  const handleInc = (pid, from) => pid && dispatch(increment(pid, from));
  const handleRemove = (pid, from) => pid && dispatch(removeFromCart(pid, from));

  return (
    <div className="w-[360px] max-h-[70vh] overflow-auto rounded-xl border bg-white shadow-xl p-3">
      <div className="mb-2 text-sm font-semibold">Sepetim ({totalCount})</div>

      {items.length === 0 ? (
        <div className="py-8 text-center text-gray-500">Sepetiniz boş</div>
      ) : (
        <ul className="space-y-3">
          {items.map(({ product, count }) => {
            const pid = product?.id ?? product?._id ?? null;
            const from = product?.__from;
            const key = `${pid || Math.random()}-${from || "nofrom"}`;

            const img =
              product?.__thumb ||
              product?.image ||
              product?.images?.[0]?.url ||
              "https://via.placeholder.com/72";

            const href = buildProductPath(product);
            const name =
              product?.name ||
              product?.title ||
              product?.slug ||
              "Ürün";

            const unit = Number(product?.price || 0);
            const lineTotal = unit * (count || 0);

            const btn =
              "h-6 w-6 grid place-items-center rounded border disabled:opacity-40";

            return (
              <li key={key} className="flex gap-3">
                <img
                  src={img}
                  alt={name}
                  className="h-16 w-16 rounded object-cover bg-gray-100"
                />

                <div className="min-w-0 flex-1">
                  {/* ✅ Artık URL yerine ürün adı gösteriyoruz */}
                  <Link
                    to={href}
                    title={name}
                    onClick={onClose}
                    className="block text-sm font-semibold text-[#252B42] hover:text-[#23A6F0] line-clamp-2"
                  >
                    {name}
                  </Link>

                  <div className="mt-1 flex items-center gap-2">
                    <button
                      onClick={() => handleDec(pid, from)}
                      className={btn}
                      aria-label="Adeti azalt"
                      disabled={!pid}
                    >
                      −
                    </button>
                    <span className="min-w-[1.5rem] text-center text-sm">
                      {count}
                    </span>
                    <button
                      onClick={() => handleInc(pid, from)}
                      className={btn}
                      aria-label="Adeti artır"
                      disabled={!pid}
                    >
                      +
                    </button>
                    <button
                      onClick={() => handleRemove(pid, from)}
                      className="ml-3 text-xs text-red-500 hover:underline disabled:opacity-40"
                      disabled={!pid}
                    >
                      Kaldır
                    </button>
                  </div>
                </div>

                <div className="text-sm font-semibold whitespace-nowrap">
                  {lineTotal.toLocaleString("tr-TR")} ₺
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="mt-4 border-t pt-3 flex items-center justify-between">
        <div className="text-sm text-gray-600">Ara Toplam</div>
        <div className="text-base font-bold">
          {subtotal.toLocaleString("tr-TR")} ₺
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <Link
          to="/cart"
          onClick={onClose}
          className="rounded border py-2 text-center text-sm hover:bg-gray-50"
        >
          Sepete Git
        </Link>
        <Link
          to="/checkout"
          onClick={onClose}
          className="rounded bg-[#23A6F0] py-2 text-center text-sm font-semibold text-white hover:opacity-90"
        >
          Siparişi Tamamla
        </Link>
      </div>
    </div>
  );
}
