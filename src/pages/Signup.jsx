import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import PageLayout from "../components/PageLayout";
import PageTransition from "../components/PageTransition";
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (!data.name || !data.email || !data.password) {
      toast.error("Please fill all fields");
      return;
    }

    if (data.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/register",
        data
      );

      if (res.data?.success) {
        toast.success("Account created successfully 🎉");
        navigate("/", { replace: true });
      } else {
        toast.error(res.data?.message || "Signup failed");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Server error during signup");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <PageLayout>
        <h2 style={{ textAlign: "center" }}>Create Account</h2>

        <p style={{ textAlign: "center", color: "gray" }}>
          Join Clean & Stitch today
        </p>

        <input
          placeholder="Full Name"
          value={data.name}
          onChange={(e) =>
            setData({ ...data, name: e.target.value })
          }
          disabled={loading}
        />

        <input
          type="email"
          placeholder="Email Address"
          value={data.email}
          onChange={(e) =>
            setData({ ...data, email: e.target.value })
          }
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
          disabled={loading}
        />

        <button
          onClick={register}
          disabled={loading}
          style={{ marginTop: 10 }}
        >
          {loading ? "Creating account..." : "Signup"}
        </button>

        <p style={{ textAlign: "center", marginTop: 15 }}>
          Already have an account? <Link to="/">Login</Link>
        </p>
      </PageLayout>
    </PageTransition>
  );
}


