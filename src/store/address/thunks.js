// src/store/address/thunks.js
import api from "../../lib/api";

export const fetchAddresses = () => async (dispatch) => {
  dispatch({ type: "address/fetch/pending" });
  try {
    const { data } = await api.get("/user/address");
    dispatch({ type: "address/fetch/fulfilled", payload: data });
    return data; // ✅
  } catch (e) {
    dispatch({ type: "address/fetch/rejected", error: e.message });
    throw e; // ✅ RHF görsün
  }
};

export const createAddress = (payload) => async (dispatch) => {
  dispatch({ type: "address/create/pending" });
  try {
    const { data } = await api.post("/user/address", payload);
    dispatch({ type: "address/create/fulfilled", payload: data });
    return data; // ✅
  } catch (e) {
    dispatch({ type: "address/create/rejected", error: e.message });
    throw e; // ✅
  }
};

export const updateAddress = (payload) => async (dispatch) => {
  dispatch({ type: "address/update/pending" });
  try {
    const { data } = await api.put("/user/address", payload);
    dispatch({ type: "address/update/fulfilled", payload: data });
    return data; // ✅
  } catch (e) {
    dispatch({ type: "address/update/rejected", error: e.message });
    throw e; // ✅
  }
};

export const deleteAddress = (addressId) => async (dispatch) => {
  dispatch({ type: "address/delete/pending", meta: { addressId } });
  try {
    await api.delete(`/user/address/${addressId}`);
    dispatch({ type: "address/delete/fulfilled", payload: addressId });
    return addressId; // ✅
  } catch (e) {
    dispatch({ type: "address/delete/rejected", error: e.message });
    throw e; // ✅
  }
};
