import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import PageLayout from "../components/PageLayout";
import toast from "react-hot-toast";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [method, setMethod] = useState("ONLINE");
  const [loading, setLoading] = useState(false);

  /* ---------------- SAFETY CHECK ---------------- */
  if (!state?.orderDbId) {
    return (
      <PageLayout>
        <h3>No order found</h3>
        <p style={{ color: "gray", textAlign: "center" }}>
          Please place an order before payment.
        </p>
      </PageLayout>
    );
  }

  /* ---------------- CONFIRM PAYMENT ---------------- */
  const confirmOrder = async () => {
    try {
      setLoading(true);

      await axios.post(
        `http://localhost:5000/api/orders/pay/${state.orderDbId}`,
        { method },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(
        method === "COD"
          ? "Order placed successfully (Cash on Delivery)"
          : "Payment successful 🎉"
      );

      navigate("/payment-success", {
        state: {
          orderId: state.orderId,
          method,
          amount: state.amount,
        },
      });
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <h2>Payment</h2>

      <p style={{ color: "gray" }}>
        Choose a payment method to confirm your order
      </p>

      <div style={{ marginTop: 15 }}>
        <p>
          <b>Order ID:</b> {state.orderId}
        </p>
        <p>
          <b>Amount:</b> ₹{state.amount}
        </p>
      </div>

      <hr style={{ margin: "15px 0" }} />

      {/* PAYMENT METHODS */}
      <label style={{ display: "block", marginBottom: 8 }}>
        <input
          type="radio"
          checked={method === "ONLINE"}
          onChange={() => setMethod("ONLINE")}
        />{" "}
        Online Payment (Demo)
      </label>

      <label style={{ display: "block" }}>
        <input
          type="radio"
          checked={method === "COD"}
          onChange={() => setMethod("COD")}
        />{" "}
        Cash on Delivery (COD)
      </label>

      {/* INFO TEXT */}
      {method === "ONLINE" && (
        <p style={{ fontSize: 13, color: "gray", marginTop: 10 }}>
          🔒 Online payment is simulated for academic purposes.
        </p>
      )}

      {method === "COD" && (
        <p style={{ fontSize: 13, color: "gray", marginTop: 10 }}>
          💵 Pay cash when the clothes are delivered.
        </p>
      )}

      <button
        onClick={confirmOrder}
        disabled={loading}
        style={{ marginTop: 20 }}
      >
        {loading ? "Confirming Order..." : "Confirm Order"}
      </button>
    </PageLayout>
  );
}








