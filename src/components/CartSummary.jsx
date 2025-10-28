// src/components/CartSummary.jsx
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const formatTL = (n) =>
  (Number(n) || 0).toLocaleString("tr-TR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) + " ₺";

const AVAILABLE_COUPONS = {
  INDIRIM10: { type: "rate", value: 0.1, label: "%10 indirim" },
  KARGO: { type: "shipping_free", value: true, label: "Kargo ücretsiz" },
  YIRMILIRA: { type: "fixed", value: 20, label: "20₺ indirim" },
};

export default function CartSummary({
  selectedSubtotal = 0,
  selectedCount = 0,
  onCreate,                      // opsiyonel: dışarıdan yönlendirme
  buttonText = "Sipariş Oluştur",
  primaryDisabled = false,
  suppressDiscounts = false,     // create-order'da true
}) {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(null); // { key }

  const SHIPPING_FEE = 29.99;
  const freeShippingBySubtotal = selectedSubtotal >= 150;

  // Kupon indirimi
  const couponDiscountRaw = useMemo(() => {
    if (!applied) return 0;
    const rule = AVAILABLE_COUPONS[applied.key];
    if (!rule) return 0;
    if (rule.type === "rate") return selectedSubtotal * rule.value;
    if (rule.type === "fixed") return Math.min(rule.value, selectedSubtotal);
    return 0;
  }, [applied, selectedSubtotal]);

  const couponDiscount = suppressDiscounts ? 0 : couponDiscountRaw;

  // Kargo hesabı
  let shippingPayable;
  if (suppressDiscounts) {
    // kuponla kargo ücretsiz yok; sadece eşik kuralı
    shippingPayable = freeShippingBySubtotal ? 0 : SHIPPING_FEE;
  } else {
    const shippingDiscount =
      (applied && AVAILABLE_COUPONS[applied.key]?.type === "shipping_free"
        ? SHIPPING_FEE
        : 0) + (freeShippingBySubtotal ? SHIPPING_FEE : 0);
    shippingPayable = Math.max(0, SHIPPING_FEE - shippingDiscount);
  }

  const grandTotal = Math.max(0, selectedSubtotal + shippingPayable - couponDiscount);

  const applyCoupon = () => {
    const key = code.trim().toUpperCase();
    if (!AVAILABLE_COUPONS[key]) return;
    setApplied({ key });
    setCode(key);
  };

  const removeCoupon = () => {
    setApplied(null);
    setCode("");
  };

  const handlePrimary = () => {
    if (selectedCount <= 0 || primaryDisabled) return;
    if (typeof onCreate === "function") onCreate();
    else navigate("/create-order");
  };

  const isDisabled = selectedCount <= 0 || primaryDisabled;

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-4 md:p-5 w-full max-w-[380px]">
      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-bold text-[#252B42]">Sipariş Özeti</h3>
        <span className="text-xs text-gray-500">Seçili: {selectedCount}</span>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-gray-600">Ürünün Toplamı</span>
          <span className="font-semibold">{formatTL(selectedSubtotal)}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-600">Kargo Toplam</span>
          <span className="font-semibold">{formatTL(shippingPayable)}</span>
        </div>

        {!suppressDiscounts && (freeShippingBySubtotal || applied?.key === "KARGO") && (
          <div className="flex items-start justify-between text-emerald-700">
            <span className="max-w-[60%] leading-snug">
              150 TL ve Üzeri Kargo Bedava <span className="text-xs">(Satıcı Karşılar)</span>
            </span>
            <span className="font-semibold whitespace-nowrap">-{formatTL(SHIPPING_FEE)}</span>
          </div>
        )}

        {!suppressDiscounts && couponDiscount > 0 && applied && (
          <div className="flex items-center justify-between text-emerald-700">
            <span>
              Kupon İndirimi <span className="text-xs">({applied.key})</span>
            </span>
            <span className="font-semibold">-{formatTL(couponDiscount)}</span>
          </div>
        )}
      </div>

      <div className="mt-4 border-t pt-3 flex items-center justify-between">
        <span className="text-base font-semibold text-[#252B42]">Toplam</span>
        <span className="text-base font-extrabold">{formatTL(grandTotal)}</span>
      </div>

      {!suppressDiscounts && (
        <div className="mt-4">
          <label className="block text-xs font-semibold text-gray-600">
            İndirim Kodu (opsiyonel)
            <span className="ml-2 text-[11px] text-gray-500">(INDIRIM10 • KARGO • YIRMILIRA)</span>
          </label>

          <div className="mt-1 flex gap-2">
            <input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="KODU GİR"
              className="flex-1 rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#23A6F0]"
            />
            <button
              onClick={applyCoupon}
              className="rounded bg-gray-100 px-3 py-2 text-sm hover:bg-gray-200"
            >
              Uygula
            </button>
          </div>

          {applied && (
            <div className="mt-2 text-xs text-gray-600 flex items-center justify-between">
              <span>
                <span className="font-semibold">{applied.key}</span>
                {AVAILABLE_COUPONS[applied.key]?.label ? ` ${AVAILABLE_COUPONS[applied.key].label}` : ""}
              </span>
              <button onClick={removeCoupon} className="text-[#23A6F0] hover:underline">
                Kaldır
              </button>
            </div>
          )}
        </div>
      )}

      <button
        className={`mt-4 w-full rounded py-2.5 text-white font-semibold disabled:opacity-50
          ${isDisabled ? "bg-[#23A6F0]/60" : "bg-[#23A6F0] hover:brightness-95"}`}
        onClick={handlePrimary}
        disabled={isDisabled}
      >
        {buttonText}
      </button>
    </aside>
  );
}
