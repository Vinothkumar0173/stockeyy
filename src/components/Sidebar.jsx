import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Dashboard", icon: "⌂", end: true },
  { to: "/stock", label: "Stock Management", icon: "▦" },
  { to: "/billing", label: "Billing", icon: "▤" },
  { to: "/bills", label: "Bill History", icon: "◷" },
  { to: "/customers", label: "Customers", icon: "♙" },
  { to: "/profile", label: "Profile", icon: "○" },
  { to: "/about", label: "About", icon: "ⓘ" }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon">S</span>
        <div>
          <h2>stockeyy</h2>
          <p>Stock made simple</p>
        </div>
      </div>

      <p className="nav-heading">WORKSPACE</p>

      <nav className="navigation">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active" : ""}`
            }
          >
            <span className="nav-icon">{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-note">
        <span>✦</span>
        <strong>Stay organized</strong>
        <p>Keep your stock and sales in one place.</p>
      </div>
    </aside>
  );
}