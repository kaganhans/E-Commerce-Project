import { createSlice } from "@reduxjs/toolkit";

const LS_KEY = "cart_v1";

function loadInitial() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
function persist(state) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(state.items)); } catch {}
}

const initialState = {
  items: loadInitial(), // [{ count, checked, product }]
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: {
      prepare(product, qty = 1) {
        return { payload: { product, qty } };
      },
      reducer(state, { payload }) {
        const id = payload?.product?.id ?? payload?.product?._id;
        if (!id) return;
        const existing = state.items.find(i => (i.product.id ?? i.product._id) === id);
        if (existing) {
          existing.count += payload.qty || 1;
        } else {
          state.items.push({
            count: payload.qty || 1,
            checked: true,
            product: payload.product,
          });
        }
        persist(state);
      },
    },
    increment(state, { payload: productId }) {
      const row = state.items.find(i => (i.product.id ?? i.product._id) === productId);
      if (row) row.count += 1;
      persist(state);
    },
    decrement(state, { payload: productId }) {
      const row = state.items.find(i => (i.product.id ?? i.product._id) === productId);
      if (row) {
        row.count -= 1;
        if (row.count <= 0) {
          state.items = state.items.filter(i => (i.product.id ?? i.product._id) !== productId);
        }
      }
      persist(state);
    },
    removeItem(state, { payload: productId }) {
      state.items = state.items.filter(i => (i.product.id ?? i.product._id) !== productId);
      persist(state);
    },
    setChecked(state, { payload: { productId, checked } }) {
      const row = state.items.find(i => (i.product.id ?? i.product._id) === productId);
      if (row) row.checked = !!checked;
      persist(state);
    },
    setCount(state, { payload: { productId, count } }) {
      const row = state.items.find(i => (i.product.id ?? i.product._id) === productId);
      if (row) {
        row.count = Math.max(1, Number(count) || 1);
      }
      persist(state);
    },
    clearCart(state) {
      state.items = [];
      persist(state);
    },
  },
});

export const {
  addToCart, increment, decrement, removeItem,
  setChecked, setCount, clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

// selectors
export const selectCartItems = (s) => s.cart?.items || [];
export const selectCartCount = (s) =>
  (s.cart?.items || []).reduce((sum, i) => sum + i.count, 0);
export const selectCartSubtotal = (s) =>
  (s.cart?.items || []).reduce((sum, i) => {
    const p = Number(i.product?.price) || 0;
    return sum + p * i.count;
  }, 0);
