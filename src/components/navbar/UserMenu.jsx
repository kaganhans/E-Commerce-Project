import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function UserMenu({ user, open, setOpen, onLogout }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onEsc = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onEsc);
    };
  }, [open, setOpen]);

  return (
    <div className="relative" ref={ref}>
      {user ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex items-center gap-2"
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#252B42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
            </svg>
            <span className="text-[14px] font-bold text-[#252B42]">
              {user.name || user.email}
            </span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#252B42" strokeWidth="2" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 top-full mt-3 w-44 rounded-xl border border-gray-200 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.12)] z-[70] p-2">
              <Link
                to="/account"
                className="block w-full text-left px-3 py-2 text-[14px] text-[#252B42] hover:bg-gray-50"
                onClick={() => setOpen(false)}
                role="menuitem"
              >
                Account
              </Link>
              <button
                type="button"
                onClick={onLogout}
                className="block w-full text-left px-3 py-2 text-[14px] text-red-600 hover:bg-red-50"
                role="menuitem"
              >
                Logout
              </button>
            </div>
          )}
        </>
      ) : (
        <Link to="/login" className="flex items-center gap-2 text-[#23A6F0] font-bold text-[14px]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="7" r="4" />
            <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
          </svg>
          Login / Register
        </Link>
      )}
    </div>
  );
}
