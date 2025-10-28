import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChecked, removeFromCart, increment, decrement } from "../store/cart/actions";
import { Link } from "react-router-dom";

const getName = (p) => p?.name || p?.title || p?.slug || "Ürün";
const getDesc = (p) =>
  p?.description ||
  p?.shortDescription ||
  "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.";

export default function CartTable() {
  const dispatch = useDispatch();
  const items = useSelector((s) => s.shoppingCart?.cart || s.shoppingCart?.items || []);

  if (!items.length) {
    // Boş görünüm burada da emniyet olsun
    return null;
  }

  return (
    <div className="bg-white border rounded-xl overflow-hidden">
      <div className="grid grid-cols-[1fr_128px_140px_160px] gap-4 px-6 py-3 border-b text-[#252B42] font-bold">
        <div>Ürün</div>
        <div className="text-center">Adet</div>
        <div className="text-center">Birim Fiyat</div>
        <div className="text-center">Ara Toplam</div>
      </div>

      <ul className="divide-y">
        {items.map((it, idx) => {
          const p = it.product || {};
          const name = getName(p);
          const desc = getDesc(p);
          const img =
            p?.__thumb || p?.image || p?.images?.[0]?.url || "https://via.placeholder.com/80";
          const href = p?.__from || "#";
          const unit = Number(p?.price || 0);
          const line = unit * (Number(it?.count) || 0);

          const onToggle = () =>
            dispatch(setChecked(p?.id ?? p?._id, !it?.checked, p?.__from));

          return (
            <li key={idx} className="px-4 py-4">
              <div className="grid grid-cols-[1fr_128px_140px_160px] gap-4 items-center">
                {/* Ürün hücresi */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    className="h-4 w-4 mt-1 shrink-0"
                    checked={!!it?.checked}
                    onChange={onToggle}
                    onKeyDown={(e) => {
                      if (e.key === " " || e.key === "Enter") {
                        e.preventDefault();
                        onToggle();
                      }
                    }}
                  />
                  <img
                    src={img}
                    alt={name}
                    className="h-16 w-16 rounded object-cover bg-gray-100"
                  />
                  <div className="min-w-0">
                    <Link
                      to={href}
                      className="block font-semibold text-[#252B42] hover:text-[#23A6F0] line-clamp-1"
                      title={name}
                    >
                      {name}
                    </Link>
                    <div className="text-[12px] text-[#737373] line-clamp-2">
                      {desc}
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      dispatch(removeFromCart(p?.id ?? p?._id, p?.__from))
                    }
                    className="ml-auto text-[13px] text-red-500 hover:underline"
                  >
                    Kaldır
                  </button>
                </div>

                {/* Adet */}
                <div className="flex items-center justify-center gap-2">
                  <button
                    aria-label="Adeti azalt"
                    className="h-7 w-7 grid place-items-center rounded border"
                    onClick={() => dispatch(decrement(p?.id ?? p?._id, p?.__from))}
                  >
                    −
                  </button>
                  <span className="w-6 text-center">{it?.count || 0}</span>
                  <button
                    aria-label="Adeti artır"
                    className="h-7 w-7 grid place-items-center rounded border"
                    onClick={() => dispatch(increment(p?.id ?? p?._id, p?.__from))}
                  >
                    +
                  </button>
                </div>

                {/* Birim fiyat */}
                <div className="text-center font-semibold">
                  {unit.toLocaleString("tr-TR")} ₺
                </div>

                {/* Ara toplam */}
                <div className="text-center font-semibold">
                  {line.toLocaleString("tr-TR")} ₺
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
