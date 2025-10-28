// src/store/cart/reducer.js
import {
  CART_HYDRATE,
  CART_ADD,
  CART_REMOVE,
  CART_SET_CHECKED,
  CART_CLEAR,
  CART_TOGGLE_DROPDOWN,
} from "./types";

const initial = {
  cart: [], // [{ product:{... , __from, __thumb}, count, checked }]
  open: false,
};

const idEq = (a, b) => a != null && a === b;
const prodIdMatch = (p, productId) => idEq(p?.id, productId) || idEq(p?._id, productId);

// satır eşleşmesi: id + (opsiyonel) from
const lineMatch = (item, productId, from) =>
  prodIdMatch(item?.product, productId) &&
  (from ? item?.product?.__from === from : true);

export default function cartReducer(state = initial, action) {
  switch (action.type) {
    case CART_HYDRATE: {
      const next = Array.isArray(action.payload?.cart) ? action.payload.cart : state.cart;
      return { ...state, cart: next };
    }

    case CART_ADD: {
      const { product, count = 1, checked = true } = action.payload || {};
      if (!product) return state;
      const pid = product.id ?? product._id;
      const from = product.__from;

      // Aynı id + aynı from → adedi artır; farklı from → yeni satır
      const idx = state.cart.findIndex((i) => lineMatch(i, pid, from));
      if (idx === -1) {
        return { ...state, cart: [...state.cart, { product, count, checked }] };
      }
      const copy = state.cart.slice();
      const cur = copy[idx];
      copy[idx] = { ...cur, count: (Number(cur.count) || 0) + Number(count || 0) };
      return { ...state, cart: copy };
    }

    case "CART_SET_COUNT": {
      const { productId, from, count } = action.payload || {};
      if (productId == null) return state;
      const copy = state.cart.map((it) =>
        lineMatch(it, productId, from) ? { ...it, count: Number(count) || 0 } : it
      );
      const filtered = copy.filter((it) => (Number(it.count) || 0) > 0);
      return { ...state, cart: filtered };
    }

    case CART_REMOVE: {
      const { productId, from } = action.payload || {};
      if (productId == null) return state;
      return {
        ...state,
        cart: state.cart.filter((it) => !lineMatch(it, productId, from)),
      };
    }

    case CART_SET_CHECKED: {
      const { productId, checked, from } = action.payload || {};
      return {
        ...state,
        cart: state.cart.map((it) =>
          lineMatch(it, productId, from) ? { ...it, checked: !!checked } : it
        ),
      };
    }

    case CART_CLEAR:
      return { ...state, cart: [] };

    case CART_TOGGLE_DROPDOWN:
      return { ...state, open: !!action.payload?.open };

    default:
      return state;
  }
}
