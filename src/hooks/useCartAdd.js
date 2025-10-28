// src/hooks/useCartAdd.js
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { addToCart } from "../store/cart/actions";

/**
 * Kullanım:
 *   const add = useCartAdd();
 *   add(product, 1, thumbUrl);
 *  - from: bulunduğun sayfanın path'i
 *  - thumb: kartta/detayda gördüğün görselin URL'si
 */
export default function useCartAdd() {
  const dispatch = useDispatch();
  const location = useLocation();
  return (product, count = 1, thumbUrl) => {
    const from = location?.pathname || "/";
    // ürüne meta’yı basıp gönderiyoruz
    const p = { ...product, __from: from, __thumb: thumbUrl };
    dispatch(addToCart(p, count));
  };
}
