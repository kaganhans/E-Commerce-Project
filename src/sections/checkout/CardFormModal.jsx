// src/sections/checkout/CardFormModal.jsx
import React, { useEffect, useState } from "react";

const onlyDigits = (s = "") => s.replace(/\D/g, "");
const maskCard = (s = "") =>
  onlyDigits(s).slice(0, 16).replace(/(\d{4})(?=\d)/g, "$1 ").trim();

export default function CardFormModal({ initialValues, onClose, onSubmit }) {
  const [form, setForm] = useState({
    card_no: "",
    expire_month: "",
    expire_year: "",
    cvv: "",
    use3DS: false,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialValues) {
      setForm((f) => ({
        ...f,
        card_no: maskCard(initialValues.card_no || ""),
        expire_month: String(initialValues.expire_month || ""),
        expire_year: String(initialValues.expire_year || ""),
      }));
    }
  }, [initialValues]);

  const submit = (e) => {
    e.preventDefault();
    setError("");

    const cleanNo = onlyDigits(form.card_no);
    if (cleanNo.length !== 16) return setError("Kart numarası 16 haneli olmalı.");
    if (!form.expire_month || !form.expire_year) return setError("Son kullanma tarihi eksik.");
    if (!/^\d{3,4}$/.test(form.cvv)) return setError("CVV 3 veya 4 haneli olmalı.");

    onSubmit?.({
      card_no: cleanNo,
      expire_month: Number(form.expire_month),
      expire_year: Number(form.expire_year),
      cvv: form.cvv,
      use3DS: form.use3DS,
    });
  };

  return (
    <div className="fixed inset-0 z-[60] grid place-items-center bg-black/40 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-[780px] rounded-lg bg-white shadow-lg"
      >
        {/* Başlık */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-[22px] font-semibold">Kart Bilgileri</h2>
          <button
            type="button"
            onClick={onClose}
            className="text-[#23A6F0] hover:underline text-sm"
          >
            Kayıtlı kartımla ödeme yap
          </button>
        </div>

        {/* İçerik */}
        <div className="px-5 py-4">
          {error && (
            <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Kart numarası */}
          <label className="block mb-4">
            <div className="text-[15px] font-medium mb-1.5">Kart Numarası</div>
            <div className="flex rounded-md border bg-gray-50 overflow-hidden">
              {/* hata varsa sol şerit */}
              <span
                className={`w-1.5 ${
                  error?.toLowerCase().includes("kart numarası")
                    ? "bg-rose-500"
                    : "bg-transparent"
                }`}
              />
              <input
                value={form.card_no}
                onChange={(e) =>
                  setForm((f) => ({ ...f, card_no: maskCard(e.target.value) }))
                }
                placeholder="1234 1234 1234 1234"
                inputMode="numeric"
                className="flex-1 bg-gray-50 px-3.5 py-2.5 outline-none"
              />
            </div>
          </label>

          {/* SKT + CVV + 3D */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div>
              <div className="text-[15px] font-medium mb-1.5">Son Kullanma Tarihi</div>
              <div className="grid grid-cols-2 gap-3">
                <select
                  value={form.expire_month}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, expire_month: e.target.value }))
                  }
                  className="rounded-md border bg-gray-50 px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#23A6F0]"
                >
                  <option value="">Ay</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                    <option key={m} value={m}>
                      {String(m).padStart(2, "0")}
                    </option>
                  ))}
                </select>
                <select
                  value={form.expire_year}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, expire_year: e.target.value }))
                  }
                  className="rounded-md border bg-gray-50 px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#23A6F0]"
                >
                  <option value="">Yıl</option>
                  {Array.from({ length: 12 }, (_, i) => new Date().getFullYear() + i).map(
                    (y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[15px] font-medium mb-1.5">
                <span>CVV</span>
                <span className="text-amber-500">ⓘ</span>
              </div>
              <input
                value={form.cvv}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                  }))
                }
                placeholder="3-4 hane"
                inputMode="numeric"
                className="w-full rounded-md border bg-gray-50 px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#23A6F0]"
              />
            </div>

            <div className="flex items-end md:items-center pt-1">
              <label className="inline-flex items-center gap-2 select-none">
                <input
                  type="checkbox"
                  className="accent-[#23A6F0] h-4 w-4"
                  checked={form.use3DS}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, use3DS: e.target.checked }))
                  }
                />
                <span className="text-[15px]">3D Secure ile ödemek istiyorum</span>
              </label>
            </div>
          </div>
        </div>

        {/* Alt butonlar */}
        <div className="px-5 py-4 border-t flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md bg-gray-100 px-4 py-2 text-sm hover:bg-gray-200"
          >
            Vazgeç
          </button>
          <button
            type="submit"
            className="rounded-md bg-[#23A6F0] px-5 py-2 text-sm font-semibold text-white"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
