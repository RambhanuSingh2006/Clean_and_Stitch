import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CartProvider>
      <App />

      {/* Global Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: "Poppins, sans-serif",
            fontSize: "14px"
          },
          success: {
            iconTheme: {
              primary: "#2563eb",
              secondary: "#ffffff"
            }
          },
          error: {
            iconTheme: {
              primary: "#dc2626",
              secondary: "#ffffff"
            }
          }
        }}
      />
    </CartProvider>
  </React.StrictMode>
);



