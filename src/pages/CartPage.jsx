// src/pages/CartPage.jsx
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";   // ✅ eklendi
import Navbar from "../components/Navbar";
import CartTable from "../components/CartTable";
import CartSummary from "../components/CartSummary";

export default function CartPage() {
  const navigate = useNavigate();                 // ✅ eklendi

  const items =
    useSelector((s) => s.shoppingCart?.cart || s.shoppingCart?.items) || [];

  const selectedSubtotal = items
    .filter((x) => x?.checked)
    .reduce((sum, it) =>
      sum + (Number(it?.product?.price) || 0) * (Number(it?.count) || 0), 0);

  const selectedCount = items
    .filter((x) => x?.checked)
    .reduce((sum, it) => sum + (Number(it?.count) || 0), 0);

  const isEmpty = items.length === 0;

  const goCreateOrder = () => navigate("/create-order"); // ✅ tek iş bu

  return (
    <div className="min-h-screen font-['Montserrat'] bg-[#FAFAFA]">
      <Navbar pageType="Cart" />

      <div className="max-w-[1200px] mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#252B42] mb-6">Sepetim</h1>

        {isEmpty ? (
          <div className="rounded-xl border bg-white p-10 text-center">
            <p className="text-[#737373] mb-4">Sepetiniz boş</p>
            <a href="/shop" className="inline-block rounded bg-[#23A6F0] px-4 py-2 text-white font-semibold">
              Alışverişe Devam Et
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_380px] gap-6">
            <CartTable />
            <CartSummary
              selectedSubtotal={selectedSubtotal}
              selectedCount={selectedCount}
              onCreate={goCreateOrder}               // ✅ butona bunu bağlayacağız
            />
          </div>
        )}
      </div>
    </div>
  );
}
