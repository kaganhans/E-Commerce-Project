// src/sections/checkout/StepHeader.jsx
export default function StepHeader({ step = 1, onStepChange }) {
  const Item = ({ index, title, active }) => (
    <button
      type="button"
      onClick={() => onStepChange?.(index)}
      className={`flex-1 flex items-center gap-3 rounded-lg border px-4 py-3 text-left
        ${active ? "bg-white border-[#23A6F0]" : "bg-white border-gray-200"}
      `}
    >
      <div
        className={`w-7 h-7 grid place-items-center rounded-full text-white text-sm font-bold
          ${active ? "bg-[#23A6F0]" : "bg-gray-300"}
        `}
      >
        {index}
      </div>
      <div>
        <div className="text-sm font-semibold">{title}</div>
        {index === 2 && (
          <div className="text-xs text-gray-500">Banka/Kredi Kartı veya Alışveriş Kredisi ile ödeme</div>
        )}
      </div>
    </button>
  );

  return (
    <div className="grid grid-cols-2 gap-3">
      <Item index={1} title="Adres Bilgileri" active={step === 1} />
      <Item index={2} title="Ödeme Seçenekleri" active={step === 2} />
    </div>
  );
}
