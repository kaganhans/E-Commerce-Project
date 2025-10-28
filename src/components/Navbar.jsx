// src/components/Navbar.jsx
import Container from "./Container";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DesktopNav from "./navbar/DesktopNav";
import MobileNav from "./navbar/MobileNav";
import { fetchCategoriesIfNeeded } from "../store/product/thunks";

export default function Navbar({ pageType = "Home" }) {
  const dispatch = useDispatch();

  // Kullanıcı ve kategoriler
  const user = useSelector((s) => s.client.user);
  const categories = useSelector((s) => s.product.categories || []);

  useEffect(() => {
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    dispatch({ type: "CLIENT_LOGOUT" });
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-gray-200/70 font-['Montserrat']">
      <Container>
        <DesktopNav
          pageType={pageType}
          categories={categories}
          user={user}
          onLogout={handleLogout}
        />
        <MobileNav pageType={pageType} user={user} />
      </Container>
    </header>
  );
}
