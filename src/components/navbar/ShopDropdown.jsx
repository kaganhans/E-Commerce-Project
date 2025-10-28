import { Link } from "react-router-dom";
import { getId, safeSlug, slugify, showName } from "./navUtils";

export default function ShopDropdown({ open, womenCats, menCats, onClose }) {
  if (!open) return null;

  // Hoca maketi: sabit etiketler
  const LABELS = ["Bags", "Belts", "Cosmetics", "Bags", "Hats"];
  const pickCat = (list, idx) => {
    if (!Array.isArray(list) || !list.length) return null;
    if (idx < list.length) return list[idx];
    return list[list.length - 1];
  };

  return (
    <div className="absolute left-0 top-full pt-3 z-[60]">
      <div className="w-[720px] rounded-xl border border-gray-200 bg-white shadow-[0_16px_40px_rgba(0,0,0,0.12)] p-8">
        <div className="grid grid-cols-2 gap-14">
          {/* Kadın */}
          <div>
            <div className="text-[#252B42] font-bold text-[16px] mb-3">
              Kadın
            </div>
            <ul className="space-y-3 pr-1">
              {LABELS.map((lbl, i) => {
                const cat = pickCat(womenCats, i);
                const id = getId(cat, i);
                const slug = cat ? safeSlug(cat) : slugify(lbl);
                const to = `/shop/kadin/${slug}/${id}`;
                return (
                  <li key={`w-${i}`}>
                    <Link
                      to={to}
                      className="text-[16px] text-[#737373] hover:text-[#23A6F0]"
                      onClick={onClose}
                      title={cat ? showName(cat) : lbl}
                    >
                      {lbl}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Erkek */}
          <div>
            <div className="text-[#252B42] font-bold text-[16px] mb-3">
              Erkek
            </div>
            <ul className="space-y-3 pr-1">
              {LABELS.map((lbl, i) => {
                const cat = pickCat(menCats, i);
                const id = getId(cat, i);
                const slug = cat ? safeSlug(cat) : slugify(lbl);
                const to = `/shop/erkek/${slug}/${id}`;
                return (
                  <li key={`m-${i}`}>
                    <Link
                      to={to}
                      className="text-[16px] text-[#737373] hover:text-[#23A6F0]"
                      onClick={onClose}
                      title={cat ? showName(cat) : lbl}
                    >
                      {lbl}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
