import { useState, useRef } from "react";
import axios from "axios";
import PageLayout from "../components/PageLayout";
import toast from "react-hot-toast";

export default function Measurements() {
  const token = localStorage.getItem("token");
  const fileRef = useRef(null);

  const [orderDbId, setOrderDbId] = useState("");
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const [measurements, setMeasurements] = useState({
    chest: "",
    waist: "",
    length: "",
  });

  const submit = async () => {
    if (!orderDbId.trim()) {
      toast.error("Please enter Order Database ID");
      return;
    }

    if (!photo) {
      toast.error("Please upload a measurement photo");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("orderDbId", orderDbId);
      formData.append("photo", photo);
      formData.append("measurements", JSON.stringify(measurements));

      await axios.post(
        "http://localhost:5000/api/orders/measurements",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      toast.success("Measurements uploaded successfully");

      // Reset form
      setOrderDbId("");
      setPhoto(null);
      setMeasurements({ chest: "", waist: "", length: "" });
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      console.error("Measurement upload error:", err);
      toast.error("Failed to upload measurements");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="card" style={{ maxWidth: 500, margin: "auto" }}>
          <h2>Upload Measurements</h2>
          <p style={{ color: "gray", marginBottom: 15 }}>
            Enter tailoring measurements for your order
          </p>

          <label>Order Database ID</label>
          <input
            placeholder="Example: 65f8a91b8e3c4e9f12345678"
            value={orderDbId}
            onChange={(e) => setOrderDbId(e.target.value)}
          />
          <small style={{ color: "gray" }}>
            (You can find this after placing your order)
          </small>

          <label style={{ marginTop: 12 }}>Chest (in inches)</label>
          <input
            value={measurements.chest}
            onChange={(e) =>
              setMeasurements({ ...measurements, chest: e.target.value })
            }
          />

          <label style={{ marginTop: 10 }}>Waist (in inches)</label>
          <input
            value={measurements.waist}
            onChange={(e) =>
              setMeasurements({ ...measurements, waist: e.target.value })
            }
          />

          <label style={{ marginTop: 10 }}>Length (in inches)</label>
          <input
            value={measurements.length}
            onChange={(e) =>
              setMeasurements({ ...measurements, length: e.target.value })
            }
          />

          <label style={{ marginTop: 12 }}>Measurement Photo</label>
          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <button
            onClick={submit}
            disabled={loading}
            style={{ marginTop: 20, width: "100%" }}
          >
            {loading ? "Uploading..." : "Submit Measurements"}
          </button>
        </div>
      </div>
    </PageLayout>
  );
}



