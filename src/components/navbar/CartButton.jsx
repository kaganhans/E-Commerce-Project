// src/components/navbar/CartButton.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import CartDropdown from "./CartDropdown.jsx";

export default function CartButton({ items }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // items prop gelmezse store'dan oku
  const itemsFromStore =
    useSelector((s) => s.shoppingCart?.cart || s.shoppingCart?.items) || [];
  const list = Array.isArray(items) ? items : itemsFromStore;

  const count = useMemo(
    () => list.reduce((a, it) => a + (Number(it?.count) || 0), 0),
    [list]
  );

  useEffect(() => {
    if (!open) return;

    const onDocClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);

    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        aria-label="Sepet"
        onClick={(e) => {
          e.stopPropagation(); // dışarı tıklama kapamasını engelle
          setOpen((v) => !v);
        }}
        className="flex items-center gap-1 text-[#23A6F0]"
      >
        {/* sepet ikon */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 12.39a2 2 0 0 0 2 1.61h7.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>

        {/* sayaç */}
        <span className="inline-flex min-w-[18px] h-[18px] items-center justify-center rounded-full bg-[#23A6F0] px-1 text-[11px] font-bold text-white">
          {count}
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-3 z-[70]"
          onClick={(e) => e.stopPropagation()}   // panel içi tıklar kapanmasın
          onMouseDown={(e) => e.stopPropagation()}
        >
          <CartDropdown onClose={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}
