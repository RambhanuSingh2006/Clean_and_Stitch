import { useLocation, Link, Navigate, useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function PaymentSuccess() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();

  // 🚫 Prevent direct access
  if (!state) {
    return <Navigate to="/dashboard" />;
  }

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔐 remove auth
    clearCart();                      // 🛒 clear cart
    toast.success("Logged out successfully");
    navigate("/", { replace: true }); // 🔁 go to login
  };

  return (
    <PageLayout>
      <div className="container">
        <div
          className="card"
          style={{
            maxWidth: 450,
            margin: "auto",
            textAlign: "center",
          }}
        >
          <h2>✅ Order Confirmed</h2>

          <p style={{ marginTop: 10 }}>
            Thank you for choosing <b>Clean & Stitch</b>
          </p>

          <div style={{ marginTop: 15 }}>
            <p>
              <b>Order ID:</b>
            </p>
            <h3>{state.orderId}</h3>

            <p style={{ marginTop: 10 }}>
              <b>Payment Method:</b> {state.method}
            </p>

            <p>
              <b>Amount Paid:</b> ₹{state.amount}
            </p>
          </div>

          <hr style={{ margin: "20px 0" }} />

          <Link to="/track">
            <button style={{ width: "100%" }}>Track Order</button>
          </Link>

          <Link to="/dashboard">
            <button style={{ marginTop: 10, width: "100%" }}>
              Back to Dashboard
            </button>
          </Link>

          {/* 🔴 LOGOUT */}
          <button
            onClick={handleLogout}
            style={{
              marginTop: 15,
              width: "100%",
              background: "#ef4444",
            }}
          >
            Logout
          </button>

          <p style={{ fontSize: 12, color: "gray", marginTop: 15 }}>
            You can track your order anytime from the dashboard.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}


