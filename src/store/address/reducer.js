// src/store/address/reducer.js
const initialState = {
  items: [],
  loading: false,
  error: null,

  selectedShippingId: null,
  selectedBillingId: null,
  billingSameAsShipping: true, // ✅ default: aynı adres
};

export default function addressReducer(state = initialState, action) {
  switch (action.type) {
    case "address/fetch/pending":
      return { ...state, loading: true, error: null };
    case "address/fetch/fulfilled":
      return { ...state, loading: false, items: action.payload || [] };
    case "address/fetch/rejected":
      return { ...state, loading: false, error: action.error || "Adres yüklenemedi" };

    case "address/create/fulfilled":
      return { ...state, items: [...state.items, action.payload] };

    case "address/update/fulfilled": {
      const u = action.payload;
      return {
        ...state,
        items: state.items.map((x) => (x.id === u.id ? u : x)),
      };
    }

    // --- seçimler & eşitleme ---

    case "address/selectShipping": {
      const id = action.payload;
      return {
        ...state,
        selectedShippingId: id,
        // ✅ tik açıkken fatura adresini de aynı yap
        selectedBillingId: state.billingSameAsShipping ? id : state.selectedBillingId,
      };
    }

    case "address/selectBilling":
      return { ...state, selectedBillingId: action.payload };

    case "address/toggleBillingSame": {
      const next = !state.billingSameAsShipping;
      return {
        ...state,
        billingSameAsShipping: next,
        // ✅ tik AÇILIYORSA faturayı kargoyla eşitle
        selectedBillingId: next ? state.selectedShippingId : state.selectedBillingId,
      };
    }

    case "address/delete/fulfilled": {
      const removedId = action.payload;
      const nextItems = state.items.filter((x) => x.id !== removedId);

      const fix = (id) => (id === removedId ? null : id);
      const nextShipping = fix(state.selectedShippingId);
      const nextBilling = fix(state.selectedBillingId);

      return {
        ...state,
        items: nextItems,
        selectedShippingId: nextShipping,
        selectedBillingId: state.billingSameAsShipping ? nextShipping : nextBilling,
      };
    }

    default:
      return state;
  }
}
