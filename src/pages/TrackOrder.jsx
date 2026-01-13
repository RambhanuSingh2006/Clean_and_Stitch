import { useState } from "react";
import axios from "axios";
import PageLayout from "../components/PageLayout";
import toast from "react-hot-toast";

const statusSteps = ["PLACED", "PICKED", "IN_PROGRESS", "DELIVERED"];

export default function TrackOrder() {
  const [code, setCode] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ---------------- TRACK ORDER ---------------- */
  const track = async () => {
    if (!code.trim()) {
      toast.error("Please enter your Order ID");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:5000/api/orders/track/${code.trim()}`
      );

      if (res.data?.success) {
        setOrder(res.data.order);
        toast.success("Order found ✅");
      } else {
        setOrder(null);
        toast.error("Order not found");
      }
    } catch (err) {
      console.error("Track error:", err);
      setOrder(null);
      toast.error("Failed to fetch order");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="card" style={{ maxWidth: 520, margin: "auto" }}>
          <h2>Track Order</h2>
          <p style={{ color: "gray", marginBottom: 15 }}>
            Enter your tracking ID to see order status
          </p>

          <input
            placeholder="Enter Order ID (e.g. CS123456789)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            disabled={loading}
          />

          <button onClick={track} disabled={loading}>
            {loading ? "Searching..." : "Track Order"}
          </button>

          {/* ---------------- ORDER DETAILS ---------------- */}
          {order && (
            <div style={{ marginTop: 25 }}>
              <hr style={{ margin: "20px 0" }} />

              <h3>Order Details</h3>

              <p>
                <b>Service:</b> {order.serviceType}
              </p>

              <p>
                <b>Description:</b> {order.orderDescription}
              </p>

              <p>
                <b>Pickup Date:</b> {order.pickupDate}
              </p>

              <p>
                <b>Payment Status:</b>{" "}
                <span
                  style={{
                    fontWeight: 600,
                    color:
                      order.paymentStatus === "PAID"
                        ? "#16a34a"
                        : "#ca8a04",
                  }}
                >
                  {order.paymentStatus}
                </span>
              </p>

              {/* ---------------- ORDER TIMELINE ---------------- */}
              <h3 style={{ marginTop: 25 }}>Order Progress</h3>

              <div style={{ marginTop: 10 }}>
                {statusSteps.map((step, index) => {
                  const active =
                    statusSteps.indexOf(order.orderStatus) >= index;

                  return (
                    <div
                      key={step}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: "50%",
                          background: active ? "#22c55e" : "#d1d5db",
                          marginRight: 12,
                        }}
                      />

                      <span
                        style={{
                          fontWeight: active ? 600 : 400,
                          color: active ? "#16a34a" : "#6b7280",
                        }}
                      >
                        {step.replace("_", " ")}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}




