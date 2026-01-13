import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

export default function CreateOrder() {
  const navigate = useNavigate();
  const { addItem } = useCart(); // ✅ correct

  const [itemName, setItemName] = useState("");
  const [service, setService] = useState("laundry");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(10); // default laundry price

  /* ---------- PRICE LOGIC ---------- */
  const getRate = (type) => {
    if (type === "laundry") return 10;
    if (type === "tailoring") return 30;
    return 40; // ✅ FIXED: laundry + tailoring
  };

  const calculatePrice = (qty, type) => {
    const rate = getRate(type);
    const total = qty * rate;
    setPrice(total);
    return rate;
  };

  /* ---------- ADD TO CART ---------- */
  const handleAddToCart = () => {
    if (!itemName.trim()) {
      toast.error("Please enter item name");
      return;
    }

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    const pricePerItem = getRate(service);

    addItem({
      itemName,                 // ✅ backend expects this
      serviceType: service,     // ✅ backend expects this
      quantity: Number(quantity),
      pricePerItem: Number(pricePerItem)
    });

    toast.success("Item added to cart 🛒");

    // Reset form safely
    setItemName("");
    setQuantity(1);
    calculatePrice(1, service);
  };

  return (
    <div className="container">
      <div className="card" style={{ maxWidth: 520, margin: "auto" }}>
        <h2>Add Item to Cart</h2>

        <p style={{ color: "gray", marginBottom: 15 }}>
          Laundry ₹10 / cloth • Tailoring ₹30 / cloth
        </p>

        <label>Item Name</label>
        <input
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="e.g. Shirt, Pant"
        />

        <label style={{ marginTop: 10 }}>Service Type</label>
        <select
          value={service}
          onChange={(e) => {
            const newService = e.target.value;
            setService(newService);
            calculatePrice(quantity, newService);
          }}
        >
          <option value="laundry">Laundry</option>
          <option value="tailoring">Tailoring</option>
          <option value="both">Laundry + Tailoring</option>
        </select>

        <label style={{ marginTop: 10 }}>Quantity</label>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => {
            const q = Math.max(1, Number(e.target.value));
            setQuantity(q);
            calculatePrice(q, service);
          }}
        />

        <p style={{ marginTop: 10, fontWeight: "bold" }}>
          Estimated Price: ₹{price}
        </p>

        <button onClick={handleAddToCart} style={{ marginTop: 15 }}>
          Add to Cart
        </button>

        <button
          onClick={() => navigate("/cart")}
          style={{ marginTop: 10, background: "#16a34a" }}
        >
          Go to Cart 🛒
        </button>
      </div>
    </div>
  );
}









