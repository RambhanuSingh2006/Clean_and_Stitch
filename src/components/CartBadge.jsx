import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartBadge() {
  const { totalCount } = useCart();
  const navigate = useNavigate();

  if (totalCount === 0) return null;

  return (
    <div className="cart-badge" onClick={() => navigate("/cart")}>
      🛒
      <span>{totalCount}</span>
    </div>
  );
}
