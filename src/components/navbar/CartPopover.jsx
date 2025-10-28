// components/navbar/CartPopover.jsx
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import CartDropdown from "./CartDropdown";
import { toggleCartDropdown } from "../../store/cart/actions"; // :contentReference[oaicite:2]{index=2}

export default function CartPopover({ Badge, Icon }) {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const timer = useRef(null);

  useEffect(() => {
    dispatch(toggleCartDropdown(open)); // opsiyonel: global state'e yaz
  }, [open, dispatch]);

  useEffect(() => {
    const onDocClick = () => setOpen(false);
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const safeOpen = () => {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  };
  const safeCloseSoon = () => {
    timer.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div className="relative" onMouseEnter={safeOpen} onMouseLeave={safeCloseSoon}>
      <button
        type="button"
        aria-label="Sepet"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="relative grid h-9 w-9 place-items-center rounded-full hover:bg-gray-100"
      >
        {Icon ? <Icon /> : (
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path d="M7 4h-2l-1 2h-2v2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 8 20h10v-2H8.42a.25.25 0 0 1-.22-.37L9 15h7a2 2 0 0 0 1.8-1.1L21 8H7.42l-.7-1.4L7 4Z"/>
          </svg>
        )}
        {Badge}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 z-50"
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <CartDropdown onClose={() => setOpen(false)} /> {/* :contentReference[oaicite:3]{index=3} */}
        </div>
      )}
    </div>
  );
}
