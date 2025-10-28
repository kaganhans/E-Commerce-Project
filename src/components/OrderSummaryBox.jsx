// src/components/OrderSummaryBox.jsx
import React, { useMemo, useState } from "react";

const SHIPPING_PRICE = 29.99;
const FREE_SHIPPING_THRESHOLD = 150;

export default function OrderSummaryBox({
  selectedSubtotal = 0,   // seçili satırların toplam tutarı
  selectedCount = 0,      // seçili ürün adedi (adet toplamı)
}) {
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(null); // { code, type: 'percent'|'shipping'|'flat', value }
  const [error, setError] = useState("");

  const {
    productsTotal,
    shippingCharge,
    shippingDiscount,
    couponDiscount,
    grandTotal,
  } = useMemo(() => {
    const productsTotal = Number(selectedSubtotal) || 0;

    // kampanya: 150+ TL ise kargo bedava (satır olarak indirim)
    const eligibleFreeShipping = productsTotal >= FREE_SHIPPING_THRESHOLD;
    const shippingCharge = SHIPPING_PRICE;
    const shippingDiscount = eligibleFreeShipping ? SHIPPING_PRICE : 0;

    // kupon indirimi (demo)
    let couponDiscount = 0;
    if (applied?.type === "percent") {
      couponDiscount = Math.min(productsTotal * (applied.value / 100), productsTotal);
    } else if (applied?.type === "shipping") {
      // kargo kuponu varsa, zaten kampanyadan düşmüşse tekrar düşmeyelim
      const netShippingLeft = shippingCharge - shippingDiscount;
      couponDiscount = Math.min(netShippingLeft, SHIPPING_PRICE);
    } else if (applied?.type === "flat") {
      couponDiscount = Math.min(applied.value, productsTotal);
    }

    const netShipping = shippingCharge - shippingDiscount;
    const grandTotal = Math.max(0, productsTotal + netShipping - couponDiscount);

    return { productsTotal, shippingCharge, shippingDiscount, couponDiscount, grandTotal };
  }, [selectedSubtotal, applied]);

  const toTL = (n) =>
    (Number(n) || 0).toLocaleString("tr-TR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const handleApply = () => {
    const code = (coupon || "").trim().toUpperCase();
    setError("");

    if (!code) {
      setError("Lütfen bir kod yazın.");
      return;
    }

    // Basit demo kuralları
    if (code === "INDIRIM10") {
      setApplied({ code, type: "percent", value: 10 });
    } else if (code === "KARGO") {
      setApplied({ code, type: "shipping", value: SHIPPING_PRICE });
    } else if (code === "YIRMILIRA") {
      setApplied({ code, type: "flat", value: 20.0 });
    } else {
      setApplied(null);
      setError("Geçersiz kod.");
      return;
    }

    // başarı durumu
    setError("");
  };

  const handleClearCoupon = () => {
    setApplied(null);
    setCoupon("");
    setError("");
  };

  const goCheckout = () => {
    if (selectedCount === 0) return;
    // Şimdilik sadece yönlendirme; gerçek akış T20+’de
    window.location.href = "/checkout";
  };

  return (
    <aside className="rounded-xl border bg-white p-4 shadow-sm w-full">
      <div className="flex items-center justify-between">
        <div className="text-base font-semibold">Sipariş Özeti</div>
        <div className="text-xs text-gray-500">Seçili: <b>{selectedCount}</b></div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span>Ürünün Toplamı</span>
          <span className="font-semibold">{toTL(productsTotal)} ₺</span>
        </div>

        <div className="flex items-center justify-between">
          <span>Kargo Toplam</span>
          <span className="font-semibold">{toTL(shippingCharge)} ₺</span>
        </div>

        {shippingDiscount > 0 && (
          <div className="flex items-center justify-between text-[#23856D]">
            <span>150 TL ve Üzeri Kargo Bedava (Satıcı Karşılar)</span>
            <span className="font-semibold">-{toTL(shippingDiscount)} ₺</span>
          </div>
        )}

        {applied && couponDiscount > 0 && (
          <div className="flex items-center justify-between text-[#23856D]">
            <span>
              Kupon İndirimi{" "}
              <span className="text-xs text-gray-500">({applied.code})</span>
            </span>
            <span className="font-semibold">-{toTL(couponDiscount)} ₺</span>
          </div>
        )}

        <hr className="my-2" />

        <div className="flex items-center justify-between text-[15px]">
          <span className="font-semibold">Toplam</span>
          <span className="font-extrabold">{toTL(grandTotal)} ₺</span>
        </div>
      </div>

      {/* Kupon alanı */}
      <div className="mt-4">
        <label className="block text-xs font-medium text-gray-600 mb-1">
          İndirim Kodu (opsiyonel)
        </label>

        {applied ? (
          <div className="flex items-center justify-between rounded border px-3 py-2 text-sm bg-gray-50">
            <div>
              <span className="font-semibold">{applied.code}</span>{" "}
              <span className="text-gray-500">
                {applied.type === "percent" && `%${applied.value} indirim`}
                {applied.type === "shipping" && "Kargo Bedava"}
                {applied.type === "flat" && `${toTL(applied.value)} ₺ indirim`}
              </span>
            </div>
            <button
              type="button"
              onClick={handleClearCoupon}
              className="text-[#23A6F0] hover:underline"
            >
              Kaldır
            </button>
          </div>
        ) : (
          <>
            <div className="flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="KODU GİR"
                className="flex-1 rounded border px-3 py-2 text-sm"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleApply();
                }}
              />
              <button
                type="button"
                onClick={handleApply}
                className="rounded border px-3 py-2 text-sm hover:bg-gray-50"
              >
                Uygula
              </button>
            </div>
            {error && <div className="mt-1 text-xs text-red-500">{error}</div>}
          </>
        )}
      </div>

      <button
        type="button"
        className="mt-4 w-full rounded bg-[#23A6F0] py-2 text-white font-semibold disabled:opacity-40"
        disabled={selectedCount === 0}
        onClick={goCheckout}
      >
        Sipariş Oluştur
      </button>
    </aside>
  );
}
