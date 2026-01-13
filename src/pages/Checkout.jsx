import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import PageLayout from "../components/PageLayout";
import toast from "react-hot-toast";

export default function Checkout() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const { cart, clearCart } = useCart();

  const [pickupDate, setPickupDate] = useState("");
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [loading, setLoading] = useState(false);

  /* ---------------- PLACE ORDER ---------------- */
  const placeOrder = async () => {
    if (!cart.length) {
      toast.error("Your cart is empty");
      return;
    }

    if (!pickupDate || !address) {
      toast.error("Pickup date and address are required");
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    /* ✅ SANITIZE & RE-CALCULATE CART */
    const sanitizedItems = cart.map(item => ({
      itemName: item.itemName,
      serviceType: item.serviceType,
      quantity: Number(item.quantity),
      pricePerItem: Number(item.pricePerItem),
      totalPrice: Number(item.totalPrice),
    }));

    const calculatedTotal = sanitizedItems.reduce(
      (sum, item) => sum + item.totalPrice,
      0
    );

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/orders/create",
        {
          items: sanitizedItems,
          totalAmount: calculatedTotal,
          pickupDate,
          address,
          mobileNumber: mobile,
          paymentMethod,
        },
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (res.data?.success) {
        clearCart();

        toast.success("Order placed successfully 🎉");

        navigate("/payment", {
          state: {
            orderId: res.data.orderId,
            orderDbId: res.data.orderDbId,
            amount: calculatedTotal,
            method: paymentMethod,
          },
        });
      } else {
        toast.error(res.data?.message || "Order creation failed");
      }
    } catch (err) {
      console.error("Checkout error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="card" style={{ maxWidth: 520, margin: "auto" }}>
          <h2>Checkout</h2>

          {/* ORDER SUMMARY */}
          {cart.map((item) => (
            <p key={item.id}>
              {item.itemName} × {item.quantity} — ₹{item.totalPrice}
            </p>
          ))}

          <h3>
            Total: ₹
            {cart.reduce((sum, i) => sum + i.totalPrice, 0)}
          </h3>

          <label>Pickup Date</label>
          <input
            type="date"
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
          />

          <label>Pickup Address</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />

          <label>Mobile Number</label>
          <input
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />

          <label>Payment Method</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <option value="ONLINE">Online</option>
            <option value="COD">Cash on Delivery</option>
          </select>

          <button
            onClick={placeOrder}
            disabled={loading || cart.length === 0}
          >
            {loading
              ? "Placing Order..."
              : `Proceed ₹${cart.reduce(
                  (sum, i) => sum + i.totalPrice,
                  0
                )}`}
          </button>
        </div>
      </div>
    </PageLayout>
  );
}



