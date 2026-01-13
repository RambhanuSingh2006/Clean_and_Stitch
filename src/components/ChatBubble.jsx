import { useState } from "react";

export default function ChatBubble() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating button */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: "#2563eb",
          color: "white",
          fontWeight: "600",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 1000
        }}
      >
        Help
      </div>

      {/* Chat window */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 300,
            height: 380,
            background: "white",
            borderRadius: 12,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column"
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "12px",
              background: "#2563eb",
              color: "white",
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12
            }}
          >
            <strong>Clean & Stitch Support</strong>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              padding: 12,
              fontSize: 14,
              overflowY: "auto"
            }}
          >
            <div
              style={{
                background: "#eef2ff",
                padding: 8,
                borderRadius: 8,
                marginBottom: 8
              }}
            >
              👋 Hi! How can we help you today?
            </div>

            <div
              style={{
                background: "#f1f5f9",
                padding: 8,
                borderRadius: 8,
                alignSelf: "flex-end",
                marginBottom: 8
              }}
            >
              I need help with my order
            </div>

            <div
              style={{
                background: "#eef2ff",
                padding: 8,
                borderRadius: 8
              }}
            >
              Sure! Please share your Order ID.
            </div>
          </div>

          {/* Input */}
          <div
            style={{
              padding: 10,
              borderTop: "1px solid #e5e7eb",
              display: "flex",
              gap: 8
            }}
          >
            <input
              placeholder="Type a message..."
              disabled
              style={{
                flex: 1,
                padding: 8,
                borderRadius: 6,
                border: "1px solid #d1d5db"
              }}
            />
            <button
              disabled
              style={{
                width: "auto",
                padding: "6px 12px",
                background: "#2563eb",
                color: "white",
                borderRadius: 6
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}


