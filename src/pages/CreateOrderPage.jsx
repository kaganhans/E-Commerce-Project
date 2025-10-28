// src/pages/CreateOrderPage.jsx
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAddresses } from "../store/address/thunks";
import AddressStep from "../sections/checkout/AddressStep";
import PaymentStep from "../sections/checkout/PaymentStep";
import StepHeader from "../sections/checkout/StepHeader";
import CartSummary from "../components/CartSummary";
import Navbar from "../components/Navbar";

export default function CreateOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    items: addresses,
    loading,
    selectedShippingId,
    selectedBillingId,
    billingSameAsShipping,
  } = useSelector((s) => s.address);

  // 🛒 sepet hesapları
  const cartItems =
    useSelector((s) => s.shoppingCart?.cart || s.shoppingCart?.items) || [];

  const { selectedCount, selectedSubtotal } = useMemo(() => {
    const checked = cartItems.filter((x) => x?.checked);
    const count = checked.reduce((sum, it) => sum + (Number(it?.count) || 0), 0);
    const subtotal = checked.reduce(
      (sum, it) =>
        sum + (Number(it?.product?.price) || 0) * (Number(it?.count) || 0),
      0
    );
    return { selectedCount: count, selectedSubtotal: subtotal };
  }, [cartItems]);

  // 🔁 sayfa yüklenince adresleri çek
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  // 👣 adım yönetimi
  const [step, setStep] = useState(1);

  // sözleşme onayı yalnızca Adres adımında
  const [agreed, setAgreed] = useState(false);

  // adres seçim kuralı
  const addressReady =
    !!selectedShippingId && (billingSameAsShipping || !!selectedBillingId);

  // adım1’de devam için gerekli
  const canProceedStep1 = agreed && addressReady && selectedCount > 0;

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1);
    else navigate("/cart");
  };

  // "Kaydet ve Devam Et": adım1 -> adım2
  const goStep2 = () => {
    if (!canProceedStep1) return;
    setStep(2);
  };

  return (
    <div className="min-h-screen font-['Montserrat'] bg-[#FAFAFA]">
      <Navbar pageType="CreateOrder" />

      <div className="max-w-[1292px] mx-auto grid lg:grid-cols-[1fr_380px] gap-6 p-4">
        <div>
          {/* Geri */}
          <button
            type="button"
            onClick={handleBack}
            className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#23A6F0] hover:underline"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Geri
          </button>

          {/* ── İki adımlı başlık */}
          <div className="mb-4">
            <StepHeader step={step} onStepChange={setStep} />
          </div>

          {/* Adım içerikleri */}
          {step === 1 ? (
            <>
              <div className="text-sm text-gray-500">1. Adres Bilgileri</div>
              <h1 className="text-2xl font-bold mb-3">Teslimat &amp; Fatura Adresi</h1>
              <AddressStep addresses={addresses} loading={loading} />
            </>
          ) : (
            <>
              <div className="text-sm text-gray-500">2. Ödeme Seçenekleri</div>
              <h1 className="text-2xl font-bold mb-3">Ödeme</h1>
              <PaymentStep
                amount={selectedSubtotal}
                onConfirm={(payload) => {
                  console.log("Frontend mock ödeme:", payload);
                  alert("Ödeme akışı backend bağlanınca tamamlanacak.");
                }}
              />
            </>
          )}
        </div>

        <aside className="space-y-3">
          {/* ÜST BUTON — iki adımda da aynı renk */}
          {step === 1 ? (
            <button
              type="button"
              onClick={goStep2}
              disabled={!canProceedStep1}
              className={`w-full rounded py-3 font-semibold text-white ${
                canProceedStep1
                  ? "bg-[#23A6F0] hover:brightness-95"
                  : "bg-[#23A6F0]/60 cursor-not-allowed"
              }`}
            >
              Kaydet ve Devam Et
            </button>
          ) : (
            <button
              type="button"
              className="w-full rounded py-3 font-semibold text-white bg-[#23A6F0] hover:brightness-95"
              onClick={() => alert("Ödeme adımı örnek: T21’de tamamlanacak")}
            >
              Devam
            </button>
          )}

          {/* Sözleşme onayı yalnızca Adres adımında göster */}
          {step === 1 && (
            <label className="flex items-start gap-3 rounded-lg border bg-white p-3 text-sm">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-1 accent-[#23A6F0]"
              />
              <span className="text-gray-700">
                <a href="/on-bilgilendirme" className="underline" target="_blank" rel="noreferrer">
                  Ön Bilgilendirme Koşulları
                </a>
                ’nı ve{" "}
                <a href="/mesafeli-satis-sozlesmesi" className="underline" target="_blank" rel="noreferrer">
                  Mesafeli Satış Sözleşmesi
                </a>
                ’ni okudum, onaylıyorum.
              </span>
            </label>
          )}

          {/* Sipariş özeti: create-order'da indirim/kupon gizli */}
          <CartSummary
            selectedSubtotal={selectedSubtotal}
            selectedCount={selectedCount}
            onCreate={step === 1 ? goStep2 : undefined}
            buttonText={step === 1 ? "Kaydet ve Devam Et" : "Devam"}
            primaryDisabled={step === 1 ? !canProceedStep1 : false}
            suppressDiscounts={true}
          />
        </aside>
      </div>
    </div>
  );
}
