import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import PageLayout from "../components/PageLayout";

export default function Cart() {
  const { cart, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  const handleRemove = (id) => {
    removeFromCart(id);
    toast.success("Item removed from cart");
  };

  const goToCheckout = () => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    navigate("/checkout");
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="card" style={{ maxWidth: 520, margin: "auto" }}>
          <h2>Your Cart</h2>
          <p style={{ color: "gray", marginBottom: 15 }}>
            Review items before checkout
          </p>

          {/* EMPTY CART */}
          {cart.length === 0 && (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <p style={{ fontSize: 24 }}>🛒</p>
              <p style={{ color: "gray" }}>Your cart is empty</p>
              <button
                style={{ marginTop: 10 }}
                onClick={() => navigate("/create-order")}
              >
                Add Items
              </button>
            </div>
          )}

          {/* CART ITEMS */}
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  {item.itemName}
                </p>
                <p style={{ margin: 0, fontSize: 13, color: "gray" }}>
                  {item.quantity} × ₹{item.pricePerItem} ({item.serviceType})
                </p>
              </div>

              <div style={{ textAlign: "right" }}>
                <p style={{ margin: 0, fontWeight: 600 }}>
                  ₹{item.totalPrice}
                </p>
                <button
                  onClick={() => handleRemove(item.id)}
                  style={{
                    marginTop: 6,
                    background: "#ef4444",
                    padding: "6px 12px",
                    fontSize: 12,
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* TOTAL & CHECKOUT */}
          {cart.length > 0 && (
            <>
              <hr style={{ margin: "20px 0" }} />

              <h3 style={{ textAlign: "right" }}>
                Total: ₹{totalAmount}
              </h3>

              <button
                onClick={goToCheckout}
                style={{ marginTop: 15 }}
              >
                Proceed to Checkout
              </button>
            </>
          )}
        </div>
      </div>
    </PageLayout>
  );
}



