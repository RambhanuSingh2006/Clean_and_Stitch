import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import toast from "react-hot-toast";

export default function Profile() {
  const navigate = useNavigate();

  // Load from localStorage (current implementation)
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [mobile, setMobile] = useState(localStorage.getItem("mobile") || "");
  const [address, setAddress] = useState(localStorage.getItem("address") || "");

  /* ---------------- SAVE PROFILE (FRONTEND ONLY FOR NOW) ---------------- */
  const saveProfile = () => {
    if (!name || !email) {
      toast.error("Name and Email are required");
      return;
    }

    // Save locally (until backend API is connected)
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("mobile", mobile);
    localStorage.setItem("address", address);

    toast.success("Profile updated successfully ✅");
  };

  /* ---------------- LOGOUT ---------------- */
  const logout = () => {
    localStorage.clear();
    toast.success("Logged out successfully 👋");
    navigate("/");
  };

  return (
    <PageLayout>
      <div className="container">
        <div className="card" style={{ maxWidth: 480, margin: "auto" }}>
          <h2>My Profile</h2>
          <p style={{ color: "gray", marginBottom: 15 }}>
            View and update your account details
          </p>

          {/* NAME */}
          <label>Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />

          {/* EMAIL */}
          <label style={{ marginTop: 10 }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />

          {/* MOBILE */}
          <label style={{ marginTop: 10 }}>Mobile Number</label>
          <input
            maxLength={10}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10-digit mobile number"
          />

          {/* ADDRESS */}
          <label style={{ marginTop: 10 }}>Address</label>
          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
          />

          {/* ACTION BUTTONS */}
          <button onClick={saveProfile} style={{ marginTop: 20 }}>
            Save Changes
          </button>

          <button
            onClick={logout}
            style={{
              marginTop: 10,
              background: "#ef4444"
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </PageLayout>
  );
}


