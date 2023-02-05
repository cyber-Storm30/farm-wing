import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    onRent: {
      type: Boolean,
      default: false,
    },
    rentInfo: {
      name: { type: String },
      contact: { type: String },
      email: { type: String },
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
