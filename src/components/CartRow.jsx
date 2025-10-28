// src/components/CartRow.jsx
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { decrement, increment, removeFromCart, setChecked } from "../store/cart/actions";

export default function CartRow({ item }) {
  const dispatch = useDispatch();
  const { product = {}, count = 0, checked = true } = item || {};
  const pid = product?.id ?? product?._id;
  const from = product?.__from;

  const name = product?.name || product?.title || "Ürün";
  const desc =
    product?.description ||
    "Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.";

  const img =
    product?.__thumb ||
    product?.image ||
    product?.images?.[0]?.url ||
    "https://via.placeholder.com/96";

  const price = Number(product?.price || 0);
  const lineTotal = price * (Number(count) || 0);

  const href = product?.__from || (pid ? `/product/${pid}` : "#");

  const toggle = (val) => dispatch(setChecked(pid, !!val, from));
  const onKeyToggle = (e) => {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      toggle(!checked);
    }
  };

  return (
    <li className="grid grid-cols-[24px_minmax(240px,1fr)_120px_140px_120px] items-center gap-4 px-4 py-4 border-b">
      {/* checkbox */}
      <div
        role="checkbox"
        tabIndex={0}
        aria-checked={checked}
        className="flex justify-center"
        onKeyDown={onKeyToggle}
      >
        <input type="checkbox" checked={checked} onChange={(e) => toggle(e.target.checked)} />
      </div>

      {/* ürün */}
      <div className="flex items-center gap-3 min-w-0">
        <img src={img} alt={name} className="h-16 w-16 rounded object-cover bg-gray-100" />
        <div className="min-w-0">
          <Link to={href} className="block font-semibold text-[#252B42] truncate">
            {name}
          </Link>
          <div className="text-xs text-gray-500 line-clamp-2">{desc}</div>
        </div>
      </div>

      {/* adet */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          <button
            onClick={() => dispatch(decrement(pid, from))}
            aria-label="Adeti azalt"
            className="h-7 w-7 grid place-items-center rounded border"
          >
            −
          </button>
          <span className="w-6 text-center">{count}</span>
          <button
            onClick={() => dispatch(increment(pid, from))}
            aria-label="Adeti artır"
            className="h-7 w-7 grid place-items-center rounded border"
          >
            +
          </button>
        </div>
      </div>

      {/* birim fiyat */}
      <div className="text-center font-semibold">
        {price.toLocaleString("tr-TR")} ₺
      </div>

      {/* ara toplam + kaldır */}
      <div className="text-center">
        <div className="font-semibold">{lineTotal.toLocaleString("tr-TR")} ₺</div>
        <button
          onClick={() => dispatch(removeFromCart(pid, from))}
          className="text-xs text-red-500 hover:underline"
        >
          Kaldır
        </button>
      </div>
    </li>
  );
}
