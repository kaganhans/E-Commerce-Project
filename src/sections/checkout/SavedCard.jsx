const brand = (no = "") => {
  const s = (no || "").replace(/\D/g, "");
  if (/^5[1-5]/.test(s)) return "Mastercard";
  if (/^4/.test(s)) return "Visa";
  return "Kart";
};

const maskForDisplay = (no = "") => {
  const s = no.replace(/\D/g, "");
  if (s.length < 16) return s;
  return `${s.slice(0,4)} ${s.slice(4,6)}** **** ${s.slice(-4)}`;
};

export default function SavedCard({
  card,
  checked,
  onSelect,
  onEdit,
  onDelete,
}) {
  return (
    <label
      className={`block rounded-lg border p-3 md:p-4 cursor-pointer transition ${
        checked ? "border-[#23A6F0] ring-2 ring-[#23A6F0]/30 bg-[#F4FAFF]" : "border-gray-200 bg-white"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-xs text-gray-500">{brand(card.card_no)}</div>
          <div className="text-sm font-medium">{maskForDisplay(card.card_no)}</div>
          <div className="text-xs text-gray-600">
            {String(card.expire_month).padStart(2, "0")}/{card.expire_year}
          </div>
          <div className="text-xs text-gray-600 truncate">{card.name_on_card}</div>
        </div>

        <input type="radio" checked={checked} onChange={onSelect} className="accent-[#23A6F0] mt-1" />
      </div>

      <div className="mt-2 text-xs flex gap-3">
        <button type="button" onClick={onEdit} className="text-[#23A6F0] hover:underline">
          Düzenle
        </button>
        <button type="button" onClick={onDelete} className="text-rose-600 hover:underline">
          Sil
        </button>
      </div>
    </label>
  );
}
