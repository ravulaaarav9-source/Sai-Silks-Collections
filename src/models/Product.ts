import mongoose from 'mongoose';

const ProductHighlightSchema = new mongoose.Schema({
  key: { type: String, required: true }, // e.g. 'Pattern', 'Fabric'
  value: { type: String, required: true }, // e.g. 'Floral Print', 'Cotton Linen'
}, { _id: false });

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  offerPrice: { type: Number },
  description: { type: String, required: true },
  images: [{ type: String }], // Array of Cloudinary URLs
  inStock: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  highlights: [ProductHighlightSchema],
}, {
  timestamps: true,
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
