import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PageLayout from "../components/PageLayout";
import PageTransition from "../components/PageTransition";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = location.state?.from || "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      if (res.data?.success) {
        localStorage.setItem("token", res.data.token);
        toast.success("Login successful 🎉");
        navigate(redirectTo, { replace: true });
      } else {
        toast.error(res.data?.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Invalid credentials or server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransition>
      <PageLayout>
        <h2 style={{ textAlign: "center" }}>Welcome Back</h2>

        <p style={{ textAlign: "center", color: "gray" }}>
          Login to Clean & Stitch
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />

        <button
          onClick={login}
          disabled={loading}
          style={{ marginTop: 10 }}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ textAlign: "center", marginTop: 15 }}>
          No account? <Link to="/signup">Signup</Link>
        </p>
      </PageLayout>
    </PageTransition>
  );
}




