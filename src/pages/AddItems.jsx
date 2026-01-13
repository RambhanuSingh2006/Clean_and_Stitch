import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import PageLayout from "../components/PageLayout";

export default function AddItems() {
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [itemName, setItemName] = useState("");
  const [serviceType, setServiceType] = useState("laundry");
  const [quantity, setQuantity] = useState(1);

  const pricePerItem =
    serviceType === "laundry" ? 10 :
    serviceType === "tailoring" ? 30 : 20;

  const addToCart = () => {
    if (!itemName.trim()) {
      toast.error("Enter item name");
      return;
    }

    addItem({
      itemName,
      serviceType,
      quantity,
      pricePerItem
    });

    toast.success("Item added to cart");
    setItemName("");
    setQuantity(1);
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="card">
          <h2>Create Order</h2>
          <p style={{ color: "gray" }}>
            Describe your order and add items to cart
          </p>

          <label>Item Name</label>
          <input
            placeholder="e.g. Shirt, Pant"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />

          <label>Service Type</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
          >
            <option value="laundry">Laundry (₹10)</option>
            <option value="tailoring">Tailoring (₹30)</option>
            <option value="both">Laundry + Tailoring</option>
          </select>

          <label>Quantity</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <p><b>Item Total:</b> ₹{quantity * pricePerItem}</p>

          <button onClick={addToCart}>Add to Cart</button>

          <button
            onClick={() => navigate("/cart")}
            style={{ background: "#16a34a", marginTop: 10 }}
          >
            View Cart 🛒
          </button>
        </div>
      </div>
    </PageLayout>
  );
}

