// src/sections/checkout/PaymentStep.jsx
import { useMemo, useState } from "react";
import SavedCard from "./SavedCard";
import CardFormModal from "./CardFormModal";

// Demo saved cards – backend bağlanınca kaldıracağız
const DEMO = [
  { id: "1", card_no: "5421190012345420", expire_month: 3, expire_year: 2025, name_on_card: "CUST OMER" },
  { id: "2", card_no: "5556600011116885", expire_month: 8, expire_year: 2030, name_on_card: "CUST OMER" },
];

// taksit listesi
const INSTALLMENTS = [1, 2, 3];

const fmtTL = (n) =>
  (Number(n) || 0).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " ₺";

export default function PaymentStep({ amount = 0, onConfirm }) {
  const [cards, setCards] = useState(DEMO);
  const [selectedId, setSelectedId] = useState(cards[0]?.id || null);

  // 3D Secure tercihi
  const [use3DS, setUse3DS] = useState(false);

  // modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // taksit seçimi (varsayılan tek çekim)
  const [selectedInstallment, setSelectedInstallment] = useState(1);

  const selectedCard = useMemo(
    () => cards.find((c) => c.id === selectedId) || null,
    [cards, selectedId]
  );

  const canPay = !!selectedCard;

  const openNewCard = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const handleSaveCard = ({ card_no, expire_month, expire_year }) => {
    if (editItem) {
      setCards((arr) =>
        arr.map((c) => (c.id === editItem.id ? { ...editItem, card_no, expire_month, expire_year } : c))
      );
      setSelectedId(editItem.id);
    } else {
      const id = String(Date.now());
      setCards((arr) => [{ id, card_no, expire_month, expire_year, name_on_card: "Yeni Kart" }, ...arr]);
      setSelectedId(id);
    }
    setModalOpen(false);
    setEditItem(null);
  };

  const removeCard = (id) => {
    setCards((arr) => arr.filter((c) => c.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  const handlePay = () => {
    if (!canPay) return;
    onConfirm?.({
      card: selectedCard,
      use3DS,
      installment: selectedInstallment,
    });
  };

  return (
    <div className="grid md:grid-cols-2 gap-5">
      {/* Sol: Kart Bilgileri */}
      <div className="rounded-xl border bg-white p-4 md:p-5 space-y-4">
        <div className="text-lg font-semibold">Kart Bilgileri</div>

        <div className="flex items-center justify-between text-sm">
          <div className="text-gray-600">Kayıtlı kartla ödeme yap</div>
          <button type="button" onClick={openNewCard} className="text-[#23A6F0] hover:underline">
            Başka bir Kart ile Ödeme Yap
          </button>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {cards.map((c) => (
            <SavedCard
              key={c.id}
              card={c}
              checked={selectedId === c.id}
              onSelect={() => setSelectedId(c.id)}
              onEdit={() => {
                setEditItem(c);
                setModalOpen(true);
              }}
              onDelete={() => removeCard(c.id)}
            />
          ))}
          {cards.length === 0 && (
            <div className="col-span-full text-sm text-gray-500">
              Kayıtlı kart bulunamadı. Yeni bir kart ekleyin.
            </div>
          )}
        </div>

        {/* 3D Secure tercihi */}
        <div className="pt-2">
          <label className="inline-flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              className="accent-[#23A6F0] h-4 w-4"
              checked={use3DS}
              onChange={(e) => setUse3DS(e.target.checked)}
            />
            <span>3D Secure ile ödemek istiyorum</span>
          </label>
        </div>
      </div>

      {/* Sağ: Taksit Seçenekleri (mavi tema) */}
      <div className="rounded-xl border bg-white p-4 md:p-5 space-y-4">
        <div className="text-lg font-semibold">Taksit Seçenekleri</div>
        <div className="text-sm text-gray-600 -mt-2 mb-2">
          Kartınıza uygun taksit seçeneğini seçiniz
        </div>

        <div className="overflow-hidden rounded-xl border">
          {/* başlık satırı */}
          <div className="grid grid-cols-2 bg-gray-50 text-sm font-medium text-gray-600">
            <div className="px-4 py-2 border-r">Taksit Sayısı</div>
            <div className="px-4 py-2">Aylık Ödeme</div>
          </div>

          {/* seçenekler */}
          <div className="divide-y">
            {INSTALLMENTS.map((n) => {
              const monthly = amount / n;
              const active = selectedInstallment === n;

              return (
                <button
                  key={n}
                  type="button"
                  onClick={() => setSelectedInstallment(n)}
                  className={`grid grid-cols-2 w-full text-left px-4 py-3 items-center transition ${
                    active ? "bg-[#23A6F0]/5" : "bg-white hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3 border-r">
                    {/* mavi radyo */}
                    <span
                      className={`grid place-items-center w-5 h-5 rounded-full border-2 ${
                        active ? "border-[#23A6F0]" : "border-gray-300"
                      }`}
                    >
                      <span
                        className={`w-2.5 h-2.5 rounded-full ${
                          active ? "bg-[#23A6F0]" : "bg-transparent"
                        }`}
                      />
                    </span>
                    <span className={`font-semibold ${active ? "text-[#23A6F0]" : "text-gray-800"}`}>
                      {n === 1 ? "Tek Çekim" : `${n} Taksit`}
                    </span>
                  </div>

                  <div
                    className={`px-4 font-semibold ${
                      active ? "text-[#23A6F0]" : "text-gray-900"
                    }`}
                  >
                    {fmtTL(monthly)}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          onClick={handlePay}
          disabled={!canPay}
          className={`w-full rounded py-3 font-semibold text-white ${
            canPay ? "bg-[#23A6F0] hover:brightness-95" : "bg-[#23A6F0]/60 cursor-not-allowed"
          }`}
        >
          Ödeme Yap
        </button>
      </div>

      {modalOpen && (
        <CardFormModal
          initialValues={editItem}
          onClose={() => {
            setModalOpen(false);
            setEditItem(null);
          }}
          onSubmit={handleSaveCard}
        />
      )}
    </div>
  );
}
