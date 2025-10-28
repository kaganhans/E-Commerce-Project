import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { addToCart } from "../../store/cart/actions";

export default function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const gallery = product?.images?.map((x) => x.url) || [product?.image].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeUrl = gallery[activeIndex] || product?.image || "";

  const handleAdd = () => {
    const p = {
      ...product,
      __from: location.pathname, // detay sayfası path'i
      __thumb: activeUrl,        // seçili görsel
    };
    dispatch(addToCart(p, 1));
  };

  return (
    <button onClick={handleAdd} className="btn-primary">Sepete Ekle</button>
  );
}
