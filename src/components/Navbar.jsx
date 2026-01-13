import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CartBadge from "./CartBadge";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={scrolled ? "navbar scrolled" : "navbar"}>
      <h3>Clean & Stitch</h3>

      <div>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/create-order">Order</Link>
        <Link to="/track">Track</Link>
        <Link to="/profile">Profile</Link>
      </div>

      <CartBadge />
    </nav>
  );
}


