import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";

/* ---------- PAGES ---------- */
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddItems from "./pages/AddItems";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import TrackOrder from "./pages/TrackOrder";
import Measurements from "./pages/Measurements";
import Profile from "./pages/Profile";

/* ---------- COMPONENTS ---------- */
import Navbar from "./components/Navbar";
import ChatBubble from "./components/ChatBubble";
import ProtectedRoute from "./components/ProtectedRoute";
import PageTransition from "./components/PageTransition";

/* ---------- LAYOUT ---------- */
function Layout({ children }) {
  const location = useLocation();

  const hideUI =
    location.pathname === "/" || location.pathname === "/signup";

  return (
    <>
      {!hideUI && <Navbar />}
      {!hideUI && <ChatBubble />}

      <PageTransition key={location.pathname}>
        {children}
      </PageTransition>
    </>
  );
}

/* ---------- APP ---------- */
export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* ===== PUBLIC ROUTES ===== */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* ===== PROTECTED ROUTES ===== */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* ===== CART FLOW (PRIMARY) ===== */}
          <Route
            path="/add-items"
            element={
              <ProtectedRoute>
                <AddItems />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment-success"
            element={
              <ProtectedRoute>
                <PaymentSuccess />
              </ProtectedRoute>
            }
          />

          {/* ===== OTHER FEATURES ===== */}
          <Route
            path="/track"
            element={
              <ProtectedRoute>
                <TrackOrder />
              </ProtectedRoute>
            }
          />

          <Route
            path="/measurements"
            element={
              <ProtectedRoute>
                <Measurements />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* ===== BACKWARD COMPATIBILITY ===== */}
          {/* Redirect old route to new cart flow */}
          <Route
            path="/create-order"
            element={<Navigate to="/add-items" replace />}
          />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}












