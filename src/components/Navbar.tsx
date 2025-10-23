import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../store/cart";

export default function Navbar() {
  const itemsCount = useCartStore((s) => s.totalUnits());

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#fff9f4]/60 border-b border-[#e9e2da]/70 shadow-[0_4px_20px_rgba(0,0,0,0.05)] transition-all duration-300">
      <div className="container mx-auto h-16 px-6 flex items-center justify-between">
        {/* LOGO + NOMBRE */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:scale-[1.03] transition-transform duration-300"
        >
          {/* 🖼️ LOGO */}
          <img
            src="/img/logo.png" // 
            alt="Flor de Canela Logo"
            className="w-10 h-10 object-contain drop-shadow-md hover:drop-shadow-lg transition-all duration-300"
          />
          <span className="font-serifBrand text-xl font-semibold text-[#5a2a1c] drop-shadow-sm">
            Flor de Canela
          </span>
        </Link>

        {/* NAV LINKS */}
        <nav className="hidden md:flex items-center gap-12 text-lg font-semibold tracking-wide">
          {[
            ["Carta", "/carta"],
            ["Packs", "/packs"],
            ["Cotizador", "/cotizar"],
          ].map(([label, path]) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `relative transition-all duration-300 hover:text-[#b85c38] ${
                  isActive ? "text-[#b85c38]" : "text-[#3c2a1e]"
                } after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#b85c38] hover:after:w-full after:transition-all`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* BOTÓN COTIZAR */}
        <Link
          to="/cotizar"
          className="relative inline-flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-white 
                     bg-gradient-to-r from-[#b85c38] to-[#d9895b] shadow-md hover:shadow-[#b85c38]/30 
                     hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden"
        >
          <span className="relative z-10">Cotizar</span>
          <span className="ml-1 inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/90 text-[#b85c38] text-xs font-bold z-10">
            {itemsCount}
          </span>

          {/* efecto brillante */}
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700"></span>
        </Link>
      </div>
    </header>
  );
}
