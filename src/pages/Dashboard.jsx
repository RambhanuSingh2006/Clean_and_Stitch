import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function Dashboard() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔐 remove auth token
    clearCart();                      // 🛒 clear cart
    toast.success("Logged out successfully");
    navigate("/", { replace: true }); // 🔁 go to login
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 900, margin: "auto" }}>
        
        {/* HEADER + LOGOUT */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
          }}
        >
          <h2>Welcome to Clean & Stitch 👋</h2>

          <button
            onClick={handleLogout}
            style={{
              width: "auto",
              background: "#ef4444",
              padding: "8px 14px",
              fontSize: 14,
            }}
          >
            Logout
          </button>
        </div>

        <p style={{ color: "gray", marginBottom: 20 }}>
          Manage your laundry & tailoring orders in one place
        </p>

        {/* DASHBOARD TILES */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 20,
          }}
        >
          <Link to="/create-order" style={{ textDecoration: "none" }}>
            <div className="card dashboard-tile">
              <h3>🧺 Create Order</h3>
              <p>Book laundry or tailoring service</p>
            </div>
          </Link>

          <Link to="/track" style={{ textDecoration: "none" }}>
            <div className="card dashboard-tile">
              <h3>📦 Track Order</h3>
              <p>Check current order status</p>
            </div>
          </Link>

          <Link to="/measurements" style={{ textDecoration: "none" }}>
            <div className="card dashboard-tile">
              <h3>📏 Measurements</h3>
              <p>Upload tailoring measurements</p>
            </div>
          </Link>

          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div className="card dashboard-tile">
              <h3>👤 Profile</h3>
              <p>View or update account details</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}



