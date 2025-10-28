// src/sections/checkout/AddressStep.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createAddress,
  updateAddress,
  fetchAddresses,
} from "../../store/address/thunks";
import AddressFormModal from "./AddressFormModal";

function maskPhone(p = "") {
  const s = String(p).replace(/\D/g, "");
  if (s.length < 10) return p;
  return `${s.slice(0, 3)} *** ** ${s.slice(-2)}`; // 530 *** ** 12
}

function AddressCard({ item, checked, onChange, onEdit }) {
  return (
    <label
      className={`relative block rounded-lg border p-3 md:p-4 cursor-pointer transition
        ${checked ? "border-[#23A6F0] ring-2 ring-[#23A6F0]/30 bg-[#F4FAFF]" : "border-gray-200 bg-white"}
      `}
    >
      <div className="absolute -left-2 top-3">
        <span
          className={`inline-block h-4 w-4 rounded-full border-2
            ${checked ? "border-[#23A6F0] bg-[#23A6F0]" : "border-gray-400 bg-white"}
          `}
        />
      </div>

      <input type="radio" className="hidden" checked={checked} onChange={onChange} />

      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">{item?.title || "Adres"}</div>
          <div className="text-sm text-gray-600 truncate">
            {item?.name} {item?.surname} · {maskPhone(item?.phone)}
          </div>
        </div>

        <button
          type="button"
          onClick={onEdit}
          className="text-xs text-[#23A6F0] hover:underline shrink-0"
        >
          Düzenle
        </button>
      </div>

      <div className="mt-2 text-sm text-gray-700 leading-snug">
        <div className="truncate">{item?.neighborhood}</div>
        <div className="truncate">{item?.address}</div>
        <div className="truncate">
          {item?.district}/{item?.city}
        </div>
      </div>
    </label>
  );
}

function AddNewCard({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-8 md:p-10 grid place-items-center text-center hover:bg-gray-50 transition"
    >
      <div className="text-3xl leading-none text-[#23A6F0]">＋</div>
      <div className="mt-2 text-sm font-medium text-gray-600">Yeni Adres Ekle</div>
    </button>
  );
}

export default function AddressStep({ addresses = [], loading }) {
  const dispatch = useDispatch();
  const { selectedShippingId, selectedBillingId, billingSameAsShipping } =
    useSelector((s) => s.address);

  // modal durumu
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [targetList, setTargetList] = useState("shipping"); // "shipping" | "billing"

  const openNew = (which = "shipping") => {
    setTargetList(which);
    setEditItem(null);
    setModalOpen(true);
  };
  const openEdit = (item, which = "shipping") => {
    setTargetList(which);
    setEditItem(item);
    setModalOpen(true);
  };

  const handleSubmit = async (form) => {
    if (editItem) {
      await dispatch(updateAddress({ ...editItem, ...form }));
    } else {
      await dispatch(createAddress(form));
    }
    setModalOpen(false);
    setEditItem(null);
    dispatch(fetchAddresses());
  };

  // seçim & toggle aksiyonları
  const selectShipping = (id) =>
    dispatch({ type: "address/selectShipping", payload: id });

  const selectBilling = (id) =>
    dispatch({ type: "address/selectBilling", payload: id });

  const toggleBillingSame = () =>
    dispatch({ type: "address/toggleBillingSame" });

  // iskelet
  if (loading) {
    return (
      <div className="space-y-3">
        <div className="h-12 rounded-lg bg-gray-100 animate-pulse" />
        <div className="h-10 rounded-lg bg-gray-100 animate-pulse" />
        <div className="grid md:grid-cols-2 gap-4">
          <div className="h-32 rounded-lg bg-gray-100 animate-pulse" />
          <div className="h-32 rounded-lg bg-gray-100 animate-pulse" />
          <div className="h-32 rounded-lg bg-gray-100 animate-pulse" />
          <div className="h-32 rounded-lg bg-gray-100 animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Üst bilgilendirme kutusu (beyaz arka plan, ince amber sol çizgi) */}
      <div className="rounded-lg border border-gray-200 bg-white p-3 text-sm pl-4 relative">
        <span className="absolute left-0 top-0 h-full w-1 rounded-l-lg bg-amber-400/80" />
        <span className="mr-2 text-amber-600">🛈</span>
        Kurumsal faturalı alışveriş yapmak için "<b>Faturamı Aynı Adrese Gönder</b>" tikini kaldırın
        ve Fatura adresi olarak kayıtlı Kurumsal Fatura adresinizi seçin.
      </div>

      {/* Başlık ve 'Faturamı aynı adrese gönder' */}
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl md:text-2xl font-bold">Teslimat Adresi</h2>

        <label className="inline-flex items-center gap-2 text-sm cursor-pointer select-none">
          <input
            type="checkbox"
            className="accent-[#23A6F0] h-5 w-5 scale-125"
            checked={billingSameAsShipping}
            onChange={toggleBillingSame}
          />
          <span className="text-gray-700">Faturamı Aynı Adrese Gönder</span>
        </label>
      </div>

      {/* Teslimat adresleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddNewCard onClick={() => openNew("shipping")} />

        {addresses.map((a) => (
          <AddressCard
            key={a.id}
            item={a}
            checked={selectedShippingId === a.id}
            onChange={() => selectShipping(a.id)}
            onEdit={() => openEdit(a, "shipping")}
          />
        ))}
      </div>

      {/* Fatura adresi bölümü - tik kapalıyken aç */}
      {!billingSameAsShipping && (
        <div className="pt-2 space-y-4">
          <h3 className="text-lg md:text-xl font-semibold">Fatura Adresi</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AddNewCard onClick={() => openNew("billing")} />

            {addresses.map((a) => (
              <AddressCard
                key={`b-${a.id}`}
                item={a}
                checked={selectedBillingId === a.id}
                onChange={() => selectBilling(a.id)}
                onEdit={() => openEdit(a, "billing")}
              />
            ))}
          </div>
        </div>
      )}

      {modalOpen && (
        <AddressFormModal
          initialValues={editItem}
          onClose={() => {
            setModalOpen(false);
            setEditItem(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
