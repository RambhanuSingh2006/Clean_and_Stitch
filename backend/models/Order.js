import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    /* User who placed the order */
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    /* Cart items */
    items: [
      {
        itemName: {
          type: String, // e.g. Pant, Shirt
          required: true,
        },
        serviceType: {
          type: String, // laundry / tailoring
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        pricePerItem: {
          type: Number, // ₹10 or ₹30
          required: true,
        },
        totalPrice: {
          type: Number,
          required: true,
        },
      },
    ],

    /* Order summary */
    totalAmount: {
      type: Number,
      required: true,
    },

    pickupDate: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      required: true,
    },

    mobileNumber: {
      type: String,
      required: true,
    },

    /* Tracking ID */
    orderId: {
      type: String,
      unique: true,
      required: true,
    },

    /* Payment */
    paymentMethod: {
      type: String, // ONLINE or COD
      default: "ONLINE",
    },

    paymentStatus: {
      type: String,
      default: "PENDING",
    },

    /* Order lifecycle */
    orderStatus: {
      type: String,
      default: "PLACED", // PLACED → PICKED_UP → IN_PROCESS → DELIVERED
    },

    /* Tailoring measurements */
    measurements: {
      type: Object,
      default: {},
    },

    measurementPhoto: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);




