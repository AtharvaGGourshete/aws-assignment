import { Link, NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const linkClass = ({ isActive }) =>
  `rounded-none border px-4 py-2 text-sm font-medium transition ${
    isActive ? "border-ink bg-aqua" : "border-transparent hover:border-ink"
  }`;

const NavBar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { summary } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-ink bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8">
        <Link to="/" className="flex items-center gap-3">
          <span className="inline-flex h-11 w-11 items-center justify-center border border-ink bg-lemon text-lg font-extrabold">
            S
          </span>
          <div>
            <p className="text-lg font-extrabold uppercase tracking-[0.25em]">Sporty</p>
            <p className="text-xs uppercase tracking-[0.3em] text-zinc-500">Gear that moves</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            Explore
          </NavLink>
          <NavLink to="/checkout" className={linkClass}>
            Checkout ({summary.itemCount})
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <div className="hidden border border-ink bg-white px-4 py-2 text-sm md:block">
                {user?.fullName}
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="border border-ink bg-coral px-4 py-2 text-sm font-semibold text-ink transition hover:bg-lemon"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="border border-ink bg-aqua px-4 py-2 text-sm font-semibold transition hover:bg-lemon"
            >
              Login / Signup
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavBar;
